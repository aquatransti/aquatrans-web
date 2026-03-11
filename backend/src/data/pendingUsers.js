// Banco de dados em memória para usuários pendentes (vindos do Google Forms)
const { v4: uuidv4 } = require('uuid');

// Usuários que se cadastraram via Google Forms aguardando validação
const pendingUsers = [
  // Exemplos de cadastros pendentes
  {
    id: uuidv4(),
    nome: 'Ana Carolina Santos',
    email: 'ana.santos@email.com',
    telefone: '(21) 98765-4321',
    cpf: '123.456.789-00',
    dataNascimento: '1995-05-15',
    interesse: 'Aulas de natação',
    comoConheceu: 'Instagram',
    observacoes: 'Gostaria de participar das aulas de sábado',
    dataInscricao: '2026-01-28T14:30:00.000Z',
    status: 'pendente', // pendente, aprovado, rejeitado
    roleAtribuido: null,
    validadoPor: null,
    dataValidacao: null
  },
  {
    id: uuidv4(),
    nome: 'João Pedro Lima',
    email: 'joao.lima@email.com',
    telefone: '(21) 99876-5432',
    cpf: '987.654.321-00',
    dataNascimento: '1998-11-20',
    interesse: 'Aulas de natação + Atendimento psicossocial',
    comoConheceu: 'Indicação de amigo',
    observacoes: '',
    dataInscricao: '2026-01-30T10:15:00.000Z',
    status: 'pendente',
    roleAtribuido: null,
    validadoPor: null,
    dataValidacao: null
  },
  {
    id: uuidv4(),
    nome: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    telefone: '(21) 97654-3210',
    cpf: '456.789.123-00',
    dataNascimento: '2000-03-08',
    interesse: 'Voluntariado - Área jurídica',
    comoConheceu: 'Rio sem LGBTfobia',
    observacoes: 'Sou advogada e gostaria de ajudar como voluntária',
    dataInscricao: '2026-02-01T16:45:00.000Z',
    status: 'pendente',
    roleAtribuido: null,
    validadoPor: null,
    dataValidacao: null
  }
];

// Convites enviados (tokens para finalização de cadastro)
const invites = [];

// Funções de acesso
const getAllPendingUsers = () => {
  return pendingUsers.filter(u => u.status === 'pendente');
};

const getPendingUserById = (id) => {
  return pendingUsers.find(u => u.id === id);
};

const addPendingUser = (userData) => {
  const newUser = {
    id: uuidv4(),
    ...userData,
    dataInscricao: new Date().toISOString(),
    status: 'pendente',
    roleAtribuido: null,
    validadoPor: null,
    dataValidacao: null
  };
  pendingUsers.push(newUser);
  return newUser;
};

const updatePendingUser = (id, updates) => {
  const index = pendingUsers.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  pendingUsers[index] = { ...pendingUsers[index], ...updates };
  return pendingUsers[index];
};

const approvePendingUser = (id, role, validadorId) => {
  const index = pendingUsers.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  pendingUsers[index] = {
    ...pendingUsers[index],
    status: 'aprovado',
    roleAtribuido: role,
    validadoPor: validadorId,
    dataValidacao: new Date().toISOString()
  };
  
  return pendingUsers[index];
};

const rejectPendingUser = (id, validadorId, motivo) => {
  const index = pendingUsers.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  pendingUsers[index] = {
    ...pendingUsers[index],
    status: 'rejeitado',
    validadoPor: validadorId,
    dataValidacao: new Date().toISOString(),
    motivoRejeicao: motivo
  };
  
  return pendingUsers[index];
};

// Convites
const createInvite = (pendingUserId, role) => {
  const token = uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, '');
  const invite = {
    id: uuidv4(),
    token,
    pendingUserId,
    role,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias
    used: false,
    usedAt: null
  };
  invites.push(invite);
  return invite;
};

const getInviteByToken = (token) => {
  return invites.find(i => i.token === token && !i.used);
};

const useInvite = (token) => {
  const index = invites.findIndex(i => i.token === token);
  if (index === -1) return null;
  
  invites[index].used = true;
  invites[index].usedAt = new Date().toISOString();
  return invites[index];
};

const getHistoryUsers = () => {
  return pendingUsers.filter(u => u.status !== 'pendente');
};

module.exports = {
  pendingUsers,
  invites,
  getAllPendingUsers,
  getPendingUserById,
  addPendingUser,
  updatePendingUser,
  approvePendingUser,
  rejectPendingUser,
  createInvite,
  getInviteByToken,
  useInvite,
  getHistoryUsers
};
