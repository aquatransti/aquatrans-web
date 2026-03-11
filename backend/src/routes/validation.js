const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { 
  getAllPendingUsers, 
  getPendingUserById, 
  approvePendingUser, 
  rejectPendingUser,
  createInvite,
  getInviteByToken,
  useInvite,
  addPendingUser,
  getHistoryUsers
} = require('../data/pendingUsers');
const { createUser, findUserByEmail } = require('../data/users');
const { sendInviteEmail, sendRejectionEmail } = require('../services/emailService');
const { ROLES } = require('../config/roles');

// Middleware para verificar se pode validar usuários (gestor ou TI)
const canValidateUsers = (req, res, next) => {
  if (req.user.role !== ROLES.GESTOR && req.user.role !== ROLES.ADMIN_TI) {
    return res.status(403).json({ error: 'Sem permissão para validar usuários' });
  }
  next();
};

// Listar usuários pendentes
router.get('/pending', authenticate, canValidateUsers, (req, res) => {
  const pending = getAllPendingUsers();
  res.json(pending);
});

// Listar histórico de validações
router.get('/history', authenticate, canValidateUsers, (req, res) => {
  const history = getHistoryUsers();
  res.json(history);
});

// Obter detalhes de um usuário pendente
router.get('/pending/:id', authenticate, canValidateUsers, (req, res) => {
  const user = getPendingUserById(req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  res.json(user);
});

// Aprovar usuário e enviar convite
router.post('/approve/:id', authenticate, canValidateUsers, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  
  if (!role || !Object.values(ROLES).includes(role)) {
    return res.status(400).json({ error: 'Role inválido' });
  }
  
  const pendingUser = getPendingUserById(id);
  
  if (!pendingUser) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  if (pendingUser.status !== 'pendente') {
    return res.status(400).json({ error: 'Usuário já foi processado' });
  }
  
  // Verifica se email já existe
  const existingUser = findUserByEmail(pendingUser.email);
  if (existingUser) {
    return res.status(400).json({ error: 'Já existe um usuário com este email' });
  }
  
  // Aprova o usuário
  const approved = approvePendingUser(id, role, req.user.id);
  
  // Cria convite
  const invite = createInvite(id, role);
  
  // Envia email
  const emailResult = await sendInviteEmail(
    pendingUser.email,
    pendingUser.nome,
    invite.token,
    role
  );
  
  res.json({
    message: 'Usuário aprovado! Email de convite enviado.',
    user: approved,
    invite: {
      token: invite.token,
      expiresAt: invite.expiresAt
    },
    email: emailResult
  });
});

// Rejeitar usuário
router.post('/reject/:id', authenticate, canValidateUsers, async (req, res) => {
  const { id } = req.params;
  const { motivo } = req.body;
  
  const pendingUser = getPendingUserById(id);
  
  if (!pendingUser) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  if (pendingUser.status !== 'pendente') {
    return res.status(400).json({ error: 'Usuário já foi processado' });
  }
  
  // Rejeita o usuário
  const rejected = rejectPendingUser(id, req.user.id, motivo);
  
  // Envia email de rejeição
  await sendRejectionEmail(pendingUser.email, pendingUser.nome, motivo);
  
  res.json({
    message: 'Usuário rejeitado.',
    user: rejected
  });
});

// Verificar token de convite (rota pública)
router.get('/invite/:token', (req, res) => {
  const invite = getInviteByToken(req.params.token);
  
  if (!invite) {
    return res.status(404).json({ error: 'Convite inválido ou expirado' });
  }
  
  // Verifica expiração
  if (new Date(invite.expiresAt) < new Date()) {
    return res.status(400).json({ error: 'Convite expirado' });
  }
  
  const pendingUser = getPendingUserById(invite.pendingUserId);
  
  res.json({
    valid: true,
    nome: pendingUser?.nome,
    email: pendingUser?.email,
    role: invite.role,
    expiresAt: invite.expiresAt
  });
});

// Finalizar cadastro com token (rota pública)
router.post('/complete-registration', async (req, res) => {
  const { token, password } = req.body;
  
  if (!token || !password) {
    return res.status(400).json({ error: 'Token e senha são obrigatórios' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
  }
  
  const invite = getInviteByToken(token);
  
  if (!invite) {
    return res.status(404).json({ error: 'Convite inválido ou já utilizado' });
  }
  
  // Verifica expiração
  if (new Date(invite.expiresAt) < new Date()) {
    return res.status(400).json({ error: 'Convite expirado' });
  }
  
  const pendingUser = getPendingUserById(invite.pendingUserId);
  
  if (!pendingUser) {
    return res.status(404).json({ error: 'Dados do usuário não encontrados' });
  }
  
  // Verifica se email já existe
  const existingUser = findUserByEmail(pendingUser.email);
  if (existingUser) {
    return res.status(400).json({ error: 'Já existe um usuário com este email' });
  }
  
  // Cria o usuário final
  const newUser = createUser({
    nome: pendingUser.nome,
    email: pendingUser.email,
    password,
    role: invite.role,
    telefone: pendingUser.telefone,
    cpf: pendingUser.cpf,
    dataNascimento: pendingUser.dataNascimento,
    // Se for aluno, adiciona dados específicos
    ...(invite.role === ROLES.ALUNO && {
      dadosAluno: {
        plano: 'padrao',
        valorMensalidade: 40,
        dataMatricula: new Date().toISOString().split('T')[0],
        statusPagamento: 'pendente',
        aulas: [],
        atendimentosPsicossocial: [],
        pagamentos: []
      }
    })
  });
  
  // Marca convite como usado
  useInvite(token);
  
  res.json({
    message: 'Cadastro finalizado com sucesso! Você já pode fazer login.',
    user: newUser
  });
});

// Webhook para receber dados do Google Forms (rota pública com chave)
router.post('/webhook/google-forms', (req, res) => {
  const { apiKey } = req.query;
  
  // Verifica chave de API (em produção, usar uma chave segura)
  if (apiKey !== (process.env.GOOGLE_FORMS_API_KEY || 'aquatrans-forms-key-2026')) {
    return res.status(401).json({ error: 'API key inválida' });
  }
  
  const { nome, email, telefone, cpf, dataNascimento, interesse, comoConheceu, observacoes } = req.body;
  
  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }
  
  // Adiciona usuário pendente
  const pendingUser = addPendingUser({
    nome,
    email,
    telefone,
    cpf,
    dataNascimento,
    interesse,
    comoConheceu,
    observacoes
  });
  
  console.log('📝 Novo cadastro via Google Forms:', pendingUser.nome);
  
  res.json({
    message: 'Cadastro recebido com sucesso!',
    id: pendingUser.id
  });
});

// Listar roles disponíveis para atribuição
router.get('/roles', authenticate, canValidateUsers, (req, res) => {
  const roles = [
    { id: ROLES.ALUNO, label: 'Aluno(a)', description: 'Acesso ao portal do aluno' },
    { id: ROLES.ADMIN_PROFESSOR, label: 'Professor(a)', description: 'Gerenciar alunos e aulas' },
    { id: ROLES.ADMIN_JURIDICO, label: 'Jurídico', description: 'Gerenciar alunos e editais' },
    { id: ROLES.ADMIN_CONTABIL, label: 'Contábil', description: 'Gerenciar finanças' },
    { id: ROLES.ADMIN_PSICOSSOCIAL, label: 'Psicossocial', description: 'Atendimento de alunos' },
    { id: ROLES.ADMIN_TI, label: 'TI', description: 'Gerenciar sistema' }
  ];
  
  // Apenas gestores podem atribuir role de gestor
  if (req.user.role === ROLES.GESTOR) {
    roles.push({ id: ROLES.GESTOR, label: 'Gestor(a)', description: 'Acesso total ao sistema' });
  }
  
  res.json(roles);
});

module.exports = router;
