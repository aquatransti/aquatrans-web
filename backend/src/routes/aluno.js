const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { findUserById, updateUser } = require('../data/users');
const { ROLES } = require('../config/roles');
const { v4: uuidv4 } = require('uuid');

// Middleware para verificar se é aluno
const isAluno = (req, res, next) => {
  if (req.user.role !== ROLES.ALUNO) {
    return res.status(403).json({ error: 'Acesso restrito a alunos' });
  }
  next();
};

// Obter dados do aluno
router.get('/meus-dados', authenticate, isAluno, (req, res) => {
  const user = findUserById(req.user.id);
  const { password, ...userData } = user;
  res.json(userData);
});

// Obter histórico de aulas
router.get('/aulas', authenticate, isAluno, (req, res) => {
  const user = findUserById(req.user.id);
  
  if (!user.dadosAluno?.aulas) {
    return res.json([]);
  }
  
  res.json(user.dadosAluno.aulas);
});

// Obter performance/avaliações
router.get('/performance', authenticate, isAluno, (req, res) => {
  const user = findUserById(req.user.id);
  
  if (!user.dadosAluno?.aulas) {
    return res.json({
      totalAulas: 0,
      presencas: 0,
      faltas: 0,
      percentualPresenca: 0,
      avaliacoes: []
    });
  }
  
  const aulas = user.dadosAluno.aulas;
  const presencas = aulas.filter(a => a.presenca).length;
  const faltas = aulas.filter(a => !a.presenca).length;
  
  res.json({
    totalAulas: aulas.length,
    presencas,
    faltas,
    percentualPresenca: aulas.length > 0 ? Math.round((presencas / aulas.length) * 100) : 0,
    avaliacoes: aulas.filter(a => a.avaliacao).map(a => ({
      data: a.data,
      avaliacao: a.avaliacao
    }))
  });
});

// Obter histórico de pagamentos
router.get('/pagamentos', authenticate, isAluno, (req, res) => {
  const user = findUserById(req.user.id);
  
  if (!user.dadosAluno?.pagamentos) {
    return res.json([]);
  }
  
  res.json(user.dadosAluno.pagamentos);
});

// Obter pagamento pendente (para boleto/PIX)
router.get('/pagamento-pendente', authenticate, isAluno, (req, res) => {
  const user = findUserById(req.user.id);
  
  if (!user.dadosAluno?.pagamentos) {
    return res.json(null);
  }
  
  const pendente = user.dadosAluno.pagamentos.find(p => p.status === 'pendente');
  
  if (!pendente) {
    return res.json(null);
  }
  
  // Adiciona dados para pagamento
  res.json({
    ...pendente,
    pixKey: 'aquatrans@email.com.br',
    pixKeyType: 'E-mail',
    codigoBarras: '23793.38128 60000.000003 00000.000400 1 84340000004000',
    linhaDigitavel: '23793381286000000000300000000401843400000040 00'
  });
});

// Registrar pagamento via PIX
router.post('/pagar-pix', authenticate, isAluno, (req, res) => {
  const { mes, comprovante } = req.body;
  const user = findUserById(req.user.id);
  
  if (!user.dadosAluno?.pagamentos) {
    return res.status(400).json({ error: 'Nenhum pagamento encontrado' });
  }
  
  const pagamentoIndex = user.dadosAluno.pagamentos.findIndex(
    p => p.mes === mes && p.status === 'pendente'
  );
  
  if (pagamentoIndex === -1) {
    return res.status(400).json({ error: 'Pagamento não encontrado ou já pago' });
  }
  
  // Atualiza o pagamento (em produção, verificar comprovante)
  user.dadosAluno.pagamentos[pagamentoIndex] = {
    ...user.dadosAluno.pagamentos[pagamentoIndex],
    status: 'pago',
    dataPagamento: new Date().toISOString().split('T')[0],
    metodo: 'pix',
    comprovante
  };
  
  // Atualiza status geral
  const temPendente = user.dadosAluno.pagamentos.some(p => p.status === 'pendente');
  user.dadosAluno.statusPagamento = temPendente ? 'pendente' : 'em_dia';
  
  res.json({ 
    message: 'Pagamento registrado com sucesso!',
    pagamento: user.dadosAluno.pagamentos[pagamentoIndex]
  });
});

// Obter atendimentos psicossociais
router.get('/psicossocial', authenticate, isAluno, (req, res) => {
  const user = findUserById(req.user.id);
  
  if (!user.dadosAluno?.atendimentosPsicossocial) {
    return res.json([]);
  }
  
  res.json(user.dadosAluno.atendimentosPsicossocial);
});

// Solicitar atendimento psicossocial
router.post('/solicitar-psicossocial', authenticate, isAluno, (req, res) => {
  const { motivo, urgencia } = req.body;
  const user = findUserById(req.user.id);
  
  if (!user.dadosAluno) {
    user.dadosAluno = {};
  }
  
  if (!user.dadosAluno.solicitacoesPsicossocial) {
    user.dadosAluno.solicitacoesPsicossocial = [];
  }
  
  const solicitacao = {
    id: uuidv4(),
    data: new Date().toISOString(),
    motivo,
    urgencia: urgencia || 'normal',
    status: 'pendente'
  };
  
  user.dadosAluno.solicitacoesPsicossocial.push(solicitacao);
  
  res.json({ 
    message: 'Solicitação enviada! Entraremos em contato em breve.',
    solicitacao
  });
});

module.exports = router;
