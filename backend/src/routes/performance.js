const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { ROLES } = require('../config/roles');
const { findUserById } = require('../data/users');
const {
  getPerformanceByAluno,
  getPerformanceById,
  getPerformanceByPeriod,
  createPerformance,
  updatePerformance,
  deletePerformance,
  getPerformanceStats,
  comparePerformance,
  SKILL_LEVELS,
  SWIM_STYLES
} = require('../data/performance');

// Middleware: pode gerenciar performance (professor ou gestor)
const canManagePerformance = (req, res, next) => {
  if (req.user.role !== ROLES.GESTOR && req.user.role !== ROLES.ADMIN_PROFESSOR) {
    return res.status(403).json({ error: 'Sem permissão para gerenciar performance' });
  }
  next();
};

// ================== ROTAS PARA PROFESSORES/GESTORES ==================

// Listar todas as avaliações de um aluno
router.get('/aluno/:alunoId', authenticate, canManagePerformance, (req, res) => {
  const { alunoId } = req.params;
  
  const aluno = findUserById(alunoId);
  if (!aluno || aluno.role !== ROLES.ALUNO) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  
  const records = getPerformanceByAluno(alunoId);
  
  res.json({
    aluno: { id: aluno.id, nome: aluno.nome, email: aluno.email },
    avaliacoes: records
  });
});

// Obter estatísticas de performance
router.get('/aluno/:alunoId/stats', authenticate, canManagePerformance, (req, res) => {
  const { alunoId } = req.params;
  const { periodo } = req.query; // mensal, semestral, anual, all
  
  const stats = getPerformanceStats(alunoId, periodo || 'all');
  
  if (!stats) {
    return res.json({ message: 'Nenhuma avaliação encontrada', stats: null });
  }
  
  res.json(stats);
});

// Obter avaliações por período
router.get('/aluno/:alunoId/periodo', authenticate, canManagePerformance, (req, res) => {
  const { alunoId } = req.params;
  const { inicio, fim } = req.query;
  
  if (!inicio || !fim) {
    return res.status(400).json({ error: 'Datas de início e fim são obrigatórias' });
  }
  
  const records = getPerformanceByPeriod(alunoId, inicio, fim);
  res.json(records);
});

// Comparar evolução entre duas datas
router.get('/aluno/:alunoId/comparar', authenticate, canManagePerformance, (req, res) => {
  const { alunoId } = req.params;
  const { data1, data2 } = req.query;
  
  if (!data1 || !data2) {
    return res.status(400).json({ error: 'Duas datas são necessárias para comparação' });
  }
  
  const comparison = comparePerformance(alunoId, data1, data2);
  
  if (!comparison) {
    return res.status(404).json({ error: 'Avaliações não encontradas nas datas especificadas' });
  }
  
  res.json(comparison);
});

// Obter uma avaliação específica
router.get('/:id', authenticate, canManagePerformance, (req, res) => {
  const record = getPerformanceById(req.params.id);
  
  if (!record) {
    return res.status(404).json({ error: 'Avaliação não encontrada' });
  }
  
  res.json(record);
});

// Criar nova avaliação de performance
router.post('/', authenticate, canManagePerformance, (req, res) => {
  const { alunoId, data, tipo, ...performanceData } = req.body;
  
  if (!alunoId || !data) {
    return res.status(400).json({ error: 'ID do aluno e data são obrigatórios' });
  }
  
  const aluno = findUserById(alunoId);
  if (!aluno || aluno.role !== ROLES.ALUNO) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  
  const record = createPerformance({
    alunoId,
    data,
    tipo: tipo || 'mensal',
    professorId: req.user.id,
    professorNome: req.user.nome,
    ...performanceData
  });
  
  res.status(201).json({
    message: 'Avaliação criada com sucesso',
    avaliacao: record
  });
});

// Atualizar avaliação de performance
router.put('/:id', authenticate, canManagePerformance, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const existing = getPerformanceById(id);
  if (!existing) {
    return res.status(404).json({ error: 'Avaliação não encontrada' });
  }
  
  const updated = updatePerformance(id, {
    ...updates,
    atualizadoPor: req.user.id,
    atualizadoPorNome: req.user.nome
  });
  
  res.json({
    message: 'Avaliação atualizada com sucesso',
    avaliacao: updated
  });
});

// Deletar avaliação de performance
router.delete('/:id', authenticate, canManagePerformance, (req, res) => {
  const { id } = req.params;
  
  const existing = getPerformanceById(id);
  if (!existing) {
    return res.status(404).json({ error: 'Avaliação não encontrada' });
  }
  
  const deleted = deletePerformance(id);
  
  if (deleted) {
    res.json({ message: 'Avaliação removida com sucesso' });
  } else {
    res.status(500).json({ error: 'Erro ao remover avaliação' });
  }
});

// ================== ROTAS PARA ALUNOS (APENAS VISUALIZAÇÃO) ==================

// Obter minhas avaliações (aluno logado)
router.get('/minha-performance', authenticate, (req, res) => {
  if (req.user.role !== ROLES.ALUNO) {
    return res.status(403).json({ error: 'Rota exclusiva para alunos' });
  }
  
  const records = getPerformanceByAluno(req.user.id);
  res.json(records);
});

// Obter minhas estatísticas (aluno logado)
router.get('/minha-performance/stats', authenticate, (req, res) => {
  if (req.user.role !== ROLES.ALUNO) {
    return res.status(403).json({ error: 'Rota exclusiva para alunos' });
  }
  
  const { periodo } = req.query;
  const stats = getPerformanceStats(req.user.id, periodo || 'all');
  
  res.json(stats || { message: 'Nenhuma avaliação encontrada' });
});

// Obter minhas avaliações por período (aluno logado)
router.get('/minha-performance/periodo', authenticate, (req, res) => {
  if (req.user.role !== ROLES.ALUNO) {
    return res.status(403).json({ error: 'Rota exclusiva para alunos' });
  }
  
  const { inicio, fim } = req.query;
  
  if (!inicio || !fim) {
    return res.status(400).json({ error: 'Datas de início e fim são obrigatórias' });
  }
  
  const records = getPerformanceByPeriod(req.user.id, inicio, fim);
  res.json(records);
});

// ================== ROTAS AUXILIARES ==================

// Obter níveis de habilidade disponíveis
router.get('/config/niveis', authenticate, (req, res) => {
  res.json(SKILL_LEVELS);
});

// Obter estilos de natação disponíveis
router.get('/config/estilos', authenticate, (req, res) => {
  res.json(SWIM_STYLES);
});

module.exports = router;
