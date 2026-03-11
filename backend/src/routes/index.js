const express = require('express');
const router = express.Router();

// Dados da equipe
const equipe = [
  { id: 1, nome: 'Maya', cargo: 'Coordenação Geral', foto: null },
  { id: 2, nome: 'Maria Elis Costa Alencar', cargo: 'Equipe', foto: null },
  { id: 3, nome: 'Marcelo Silva', cargo: 'Equipe Técnica', foto: null },
  { id: 4, nome: 'Mario Alves', cargo: 'Captação de Recursos', foto: null },
  { id: 5, nome: 'Iracema Vieira', cargo: 'Equipe', foto: null },
  { id: 6, nome: 'Caesar Lima', cargo: 'TI', foto: null },
];

// Dados de eventos
const eventos = [
  {
    id: 1,
    titulo: 'Aulas de Natação',
    descricao: 'Aulas de natação para pessoas trans e não-binárias em ambiente acolhedor e seguro.',
    data: 'Semanal',
    local: 'A definir',
    valor: 'R$ 20, R$ 40 ou R$ 60 (conforme possibilidade)'
  },
  {
    id: 2,
    titulo: 'Marcha Transmasculina',
    descricao: 'Participação na Marcha Transmasculina em São Paulo.',
    data: 'A confirmar',
    local: 'São Paulo - SP',
    valor: 'Gratuito'
  }
];

// Dados de transparência
const transparencia = {
  cnpj: 'Em processo de formalização',
  fundo: {
    disponivel: 45000,
    fonte: 'FundoELAS',
    prazo: 'Maio de 2026',
    prioridades: ['Registro', 'Comunicação', 'Logística']
  },
  mensalidades: {
    opcoes: ['R$ 20', 'R$ 40', 'R$ 60'],
    observacao: 'Valores flexíveis de acordo com a possibilidade de cada aluno'
  },
  parcerias: ['Rio sem LGBTfobia']
};

// Serviços oferecidos
const servicos = [
  { id: 1, titulo: 'Aulas de Natação', descricao: 'Ambiente seguro e acolhedor para pessoas trans', icone: 'swimming' },
  { id: 2, titulo: 'Atendimento Psicológico', descricao: 'Suporte psicológico especializado', icone: 'psychology' },
  { id: 3, titulo: 'Atendimento Jurídico', descricao: 'Orientação jurídica para a comunidade trans', icone: 'gavel' },
  { id: 4, titulo: 'Consultoria de Diversidade', descricao: 'Treinamento e letramento em diversidade de gênero', icone: 'diversity' },
];

// Rotas
router.get('/equipe', (req, res) => {
  res.json(equipe);
});

router.get('/eventos', (req, res) => {
  res.json(eventos);
});

router.get('/transparencia', (req, res) => {
  res.json(transparencia);
});

router.get('/servicos', (req, res) => {
  res.json(servicos);
});

// Rota de contato (POST)
router.post('/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  // Aqui seria integrado com email ou banco de dados
  console.log('Nova mensagem de contato:', { nome, email, mensagem });
  
  res.json({ success: true, message: 'Mensagem recebida com sucesso!' });
});

module.exports = router;
