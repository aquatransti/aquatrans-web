const jwt = require('jsonwebtoken');
const { findUserById } = require('../data/users');
const { PERMISSIONS } = require('../config/roles');

if (!process.env.JWT_SECRET) {
  throw new Error('Variável de ambiente JWT_SECRET não configurada. Defina-a no arquivo .env');
}

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = findUserById(decoded.id);
    
    if (!user || !user.ativo) {
      return res.status(401).json({ error: 'Usuário não encontrado ou inativo' });
    }
    
    // Remove senha antes de adicionar ao request
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    req.userPermissions = PERMISSIONS[user.role];
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware de autorização por permissão
const authorize = (permission) => {
  return (req, res, next) => {
    if (!req.user || !req.userPermissions) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    
    if (!req.userPermissions[permission]) {
      return res.status(403).json({ error: 'Sem permissão para esta ação' });
    }
    
    next();
  };
};

// Middleware para verificar se é gestor
const isGestor = (req, res, next) => {
  if (!req.user || req.user.role !== 'gestor') {
    return res.status(403).json({ error: 'Acesso restrito a gestores' });
  }
  next();
};

// Gerar token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = {
  authenticate,
  authorize,
  isGestor,
  generateToken,
  JWT_SECRET
};
