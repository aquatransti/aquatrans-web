// Banco de dados em memória para usuários (em produção, usar banco real)
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { ROLES } = require('../config/roles');

if (!process.env.DEFAULT_USER_PASSWORD) {
  throw new Error('Variável de ambiente DEFAULT_USER_PASSWORD não configurada. Defina-a no arquivo .env');
}

const defaultPasswordHash = bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 10);

const users = [
  // Gestores
  {
    id: uuidv4(),
    nome: 'Maya',
    email: 'maya@aquatrans.org.br',
    password: defaultPasswordHash,
    role: ROLES.GESTOR,
    ativo: true,
    criadoEm: new Date().toISOString()
  },
  {
    id: uuidv4(),
    nome: 'Maria Elis Costa Alencar',
    email: 'mariaelis@aquatrans.org.br',
    password: defaultPasswordHash,
    role: ROLES.GESTOR,
    ativo: true,
    criadoEm: new Date().toISOString()
  },
  {
    id: uuidv4(),
    nome: 'Marcelo Silva',
    email: 'marcelo@aquatrans.org.br',
    password: defaultPasswordHash,
    role: ROLES.GESTOR,
    ativo: true,
    criadoEm: new Date().toISOString()
  },
  
  // Administradores
  {
    id: uuidv4(),
    nome: 'Caesar Lima',
    email: 'caesar@aquatrans.org.br',
    password: defaultPasswordHash,
    role: ROLES.ADMIN_TI,
    ativo: true,
    criadoEm: new Date().toISOString()
  },
  {
    id: uuidv4(),
    nome: 'Professor Demo',
    email: 'professor@aquatrans.org.br',
    password: defaultPasswordHash,
    role: ROLES.ADMIN_PROFESSOR,
    ativo: true,
    criadoEm: new Date().toISOString()
  },
  {
    id: uuidv4(),
    nome: 'Jurídico Demo',
    email: 'juridico@aquatrans.org.br',
    password: defaultPasswordHash,
    role: ROLES.ADMIN_JURIDICO,
    ativo: true,
    criadoEm: new Date().toISOString()
  },
  {
    id: uuidv4(),
    nome: 'Contábil Demo',
    email: 'contabil@aquatrans.org.br',
    password: defaultPasswordHash,
    role: ROLES.ADMIN_CONTABIL,
    ativo: true,
    criadoEm: new Date().toISOString()
  },
  {
    id: uuidv4(),
    nome: 'Psicossocial Demo',
    email: 'psicossocial@aquatrans.org.br',
    password: defaultPasswordHash,
    role: ROLES.ADMIN_PSICOSSOCIAL,
    ativo: true,
    criadoEm: new Date().toISOString()
  },
  
  // Aluno de exemplo
  {
    id: uuidv4(),
    nome: 'Aluno Demo',
    email: 'aluno@aquatrans.org.br',
    password: defaultPasswordHash,
    role: ROLES.ALUNO,
    ativo: true,
    criadoEm: new Date().toISOString(),
    // Dados específicos do aluno
    dadosAluno: {
      cpf: '000.000.000-00',
      telefone: '(21) 99999-9999',
      dataNascimento: '1990-01-01',
      plano: 'padrao', // social, padrao, colaborativo
      valorMensalidade: 40,
      dataMatricula: '2025-01-15',
      statusPagamento: 'em_dia', // em_dia, pendente, atrasado
      aulas: [
        { data: '2026-01-15', presenca: true, avaliacao: 'Bom progresso na técnica de crawl' },
        { data: '2026-01-22', presenca: true, avaliacao: 'Melhorando resistência' },
        { data: '2026-01-29', presenca: false, avaliacao: null }
      ],
      atendimentosPsicossocial: [
        { data: '2026-01-10', tipo: 'Individual', observacao: 'Sessão de acolhimento inicial' }
      ],
      pagamentos: [
        { mes: '01/2026', valor: 40, status: 'pago', dataPagamento: '2026-01-05', metodo: 'pix' },
        { mes: '02/2026', valor: 40, status: 'pendente', vencimento: '2026-02-10', metodo: null }
      ]
    }
  }
];

// Funções de acesso ao "banco de dados"
const findUserByEmail = (email) => {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

const findUserById = (id) => {
  return users.find(u => u.id === id);
};

const getAllUsers = () => {
  return users.map(({ password, ...user }) => user);
};

const createUser = (userData) => {
  const newUser = {
    id: uuidv4(),
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
    ativo: true,
    criadoEm: new Date().toISOString()
  };
  users.push(newUser);
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

const updateUser = (id, updates) => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  if (updates.password) {
    updates.password = bcrypt.hashSync(updates.password, 10);
  }
  
  users[index] = { ...users[index], ...updates };
  const { password, ...userWithoutPassword } = users[index];
  return userWithoutPassword;
};

const getStudents = () => {
  return users
    .filter(u => u.role === ROLES.ALUNO)
    .map(({ password, ...user }) => user);
};

module.exports = {
  users,
  findUserByEmail,
  findUserById,
  getAllUsers,
  createUser,
  updateUser,
  getStudents
};
