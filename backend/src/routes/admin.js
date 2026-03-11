const express = require('express');
const router = express.Router();
const { authenticate, authorize, isGestor } = require('../middleware/auth');
const { getAllUsers, getStudents, createUser, updateUser, findUserById } = require('../data/users');
const { ROLES } = require('../config/roles');

// Listar todos os usuários (apenas gestores e TI)
router.get('/users', authenticate, (req, res) => {
  if (!req.userPermissions.canManageUsers) {
    return res.status(403).json({ error: 'Sem permissão' });
  }
  
  const users = getAllUsers();
  res.json(users);
});

// Criar usuário (apenas gestores)
router.post('/users', authenticate, isGestor, (req, res) => {
  const { nome, email, password, role } = req.body;
  
  if (!nome || !email || !password || !role) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({ error: 'Role inválido' });
  }
  
  const newUser = createUser({ nome, email, password, role });
  res.status(201).json({ message: 'Usuário criado', user: newUser });
});

// Atualizar usuário (gestores)
router.put('/users/:id', authenticate, isGestor, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const updatedUser = updateUser(id, updates);
  
  if (!updatedUser) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  res.json({ message: 'Usuário atualizado', user: updatedUser });
});

// Listar alunos (professores, jurídico, psicossocial)
router.get('/students', authenticate, (req, res) => {
  if (!req.userPermissions.canManageStudents && req.user.role !== ROLES.GESTOR) {
    return res.status(403).json({ error: 'Sem permissão' });
  }
  
  const students = getStudents();
  res.json(students);
});

// Obter aluno específico
router.get('/students/:id', authenticate, (req, res) => {
  if (!req.userPermissions.canManageStudents && req.user.role !== ROLES.GESTOR) {
    return res.status(403).json({ error: 'Sem permissão' });
  }
  
  const student = findUserById(req.params.id);
  
  if (!student || student.role !== ROLES.ALUNO) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  
  const { password, ...studentData } = student;
  res.json(studentData);
});

// Registrar presença/avaliação (professores)
router.post('/students/:id/aulas', authenticate, authorize('canManageClasses'), (req, res) => {
  const { id } = req.params;
  const { data, presenca, avaliacao } = req.body;
  
  const student = findUserById(id);
  
  if (!student || student.role !== ROLES.ALUNO) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  
  if (!student.dadosAluno) {
    student.dadosAluno = { aulas: [] };
  }
  
  if (!student.dadosAluno.aulas) {
    student.dadosAluno.aulas = [];
  }
  
  student.dadosAluno.aulas.push({ data, presenca, avaliacao });
  
  res.json({ message: 'Aula registrada', aulas: student.dadosAluno.aulas });
});

// Registrar atendimento psicossocial
router.post('/students/:id/psicossocial', authenticate, authorize('canManageStudents'), (req, res) => {
  const { id } = req.params;
  const { data, tipo, observacao } = req.body;
  
  // Verifica se é do setor psicossocial ou gestor
  if (req.user.role !== ROLES.ADMIN_PSICOSSOCIAL && req.user.role !== ROLES.GESTOR) {
    return res.status(403).json({ error: 'Acesso restrito ao setor psicossocial' });
  }
  
  const student = findUserById(id);
  
  if (!student || student.role !== ROLES.ALUNO) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  
  if (!student.dadosAluno) {
    student.dadosAluno = { atendimentosPsicossocial: [] };
  }
  
  if (!student.dadosAluno.atendimentosPsicossocial) {
    student.dadosAluno.atendimentosPsicossocial = [];
  }
  
  student.dadosAluno.atendimentosPsicossocial.push({ data, tipo, observacao });
  
  res.json({ 
    message: 'Atendimento registrado', 
    atendimentos: student.dadosAluno.atendimentosPsicossocial 
  });
});

// Estatísticas gerais (gestores e contábil)
router.get('/stats', authenticate, (req, res) => {
  if (!req.userPermissions.canViewReports) {
    return res.status(403).json({ error: 'Sem permissão' });
  }
  
  const students = getStudents();
  const allUsers = getAllUsers();
  
  const stats = {
    totalAlunos: students.length,
    totalUsuarios: allUsers.length,
    alunosAtivos: students.filter(s => s.ativo).length,
    pagamentosEmDia: students.filter(s => s.dadosAluno?.statusPagamento === 'em_dia').length,
    pagamentosPendentes: students.filter(s => s.dadosAluno?.statusPagamento === 'pendente').length
  };
  
  res.json(stats);
});

module.exports = router;
