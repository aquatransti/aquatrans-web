const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { findUserByEmail, findUserById, createUser, updateUser } = require('../data/users');
const { authenticate, generateToken } = require('../middleware/auth');
const { PERMISSIONS, ROLES } = require('../config/roles');

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }
  
  const user = findUserByEmail(email);
  
  if (!user) {
    return res.status(401).json({ error: 'Email ou senha incorretos' });
  }
  
  if (!user.ativo) {
    return res.status(401).json({ error: 'Usuário desativado' });
  }
  
  const isValidPassword = bcrypt.compareSync(password, user.password);
  
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Email ou senha incorretos' });
  }
  
  const token = generateToken(user);
  const permissions = PERMISSIONS[user.role];
  
  // Remove senha do retorno
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({
    message: 'Login realizado com sucesso',
    token,
    user: userWithoutPassword,
    permissions
  });
});

// Obter usuário atual
router.get('/me', authenticate, (req, res) => {
  res.json({
    user: req.user,
    permissions: req.userPermissions
  });
});

// Atualizar perfil
router.put('/me', authenticate, (req, res) => {
  const { nome, telefone, dataNascimento } = req.body;
  
  const updatedUser = updateUser(req.user.id, {
    nome: nome || req.user.nome,
    telefone,
    dataNascimento
  });
  
  if (!updatedUser) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  res.json({
    message: 'Perfil atualizado',
    user: updatedUser
  });
});

// Alterar senha
router.put('/change-password', authenticate, (req, res) => {
  const { senhaAtual, novaSenha } = req.body;
  
  if (!senhaAtual || !novaSenha) {
    return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias' });
  }
  
  if (novaSenha.length < 6) {
    return res.status(400).json({ error: 'Nova senha deve ter pelo menos 6 caracteres' });
  }
  
  const user = findUserById(req.user.id);
  const isValidPassword = bcrypt.compareSync(senhaAtual, user.password);
  
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Senha atual incorreta' });
  }
  
  updateUser(req.user.id, { password: novaSenha });
  
  res.json({ message: 'Senha alterada com sucesso' });
});

// Listar roles disponíveis
router.get('/roles', authenticate, (req, res) => {
  const roles = Object.entries(PERMISSIONS).map(([key, value]) => ({
    id: key,
    ...value
  }));
  
  res.json(roles);
});

module.exports = router;
