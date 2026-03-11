// Sistema de Performance de Natação - Aquatrans
// Baseado em métricas de Educação Física e Saúde

const { v4: uuidv4 } = require('uuid');

// Avaliações de performance dos alunos
const performanceRecords = [];

// Níveis de habilidade
const SKILL_LEVELS = {
  INICIANTE: 'iniciante',
  BASICO: 'basico',
  INTERMEDIARIO: 'intermediario',
  AVANCADO: 'avancado',
  EXPERT: 'expert'
};

// Estilos de natação
const SWIM_STYLES = {
  CRAWL: 'crawl',
  COSTAS: 'costas',
  PEITO: 'peito',
  BORBOLETA: 'borboleta'
};

// Estrutura de uma avaliação de performance
const createPerformanceTemplate = () => ({
  // Dados Antropométricos
  dadosAntropometricos: {
    peso: null,           // kg
    altura: null,         // cm
    imc: null,            // calculado
    envergadura: null,    // cm
    percentualGordura: null // %
  },
  
  // Avaliação Cardiorrespiratória
  avaliacaoCardio: {
    fcRepouso: null,      // bpm - Frequência cardíaca em repouso
    fcMaxima: null,       // bpm - Frequência cardíaca máxima
    fcRecuperacao: null,  // bpm - FC após 1 min de repouso
    vo2MaxEstimado: null, // ml/kg/min - Capacidade aeróbica estimada
    pressaoArterial: null // mmHg (ex: "120/80")
  },
  
  // Avaliação por Estilo de Natação
  estilos: {
    crawl: {
      nivel: null,
      tempo25m: null,     // segundos
      tempo50m: null,     // segundos
      tempo100m: null,    // segundos
      bracadasPorMinuto: null,
      tecnica: null,      // 1-10
      observacoes: ''
    },
    costas: {
      nivel: null,
      tempo25m: null,
      tempo50m: null,
      tempo100m: null,
      bracadasPorMinuto: null,
      tecnica: null,
      observacoes: ''
    },
    peito: {
      nivel: null,
      tempo25m: null,
      tempo50m: null,
      tempo100m: null,
      bracadasPorMinuto: null,
      tecnica: null,
      observacoes: ''
    },
    borboleta: {
      nivel: null,
      tempo25m: null,
      tempo50m: null,
      tempo100m: null,
      bracadasPorMinuto: null,
      tecnica: null,
      observacoes: ''
    }
  },
  
  // Habilidades Aquáticas Fundamentais
  habilidadesAquaticas: {
    flutuacao: null,      // 1-10
    respiracao: null,     // 1-10
    mergulho: null,       // 1-10
    virada: null,         // 1-10
    saida: null,          // 1-10 (saída do bloco)
    propulsao: null,      // 1-10
    coordenacao: null     // 1-10
  },
  
  // Resistência e Condicionamento
  resistencia: {
    distanciaMaxima: null,     // metros (máx. nadado sem parar)
    tempoNadoContinuo: null,   // minutos
    nivelFadiga: null,         // 1-10 (percepção subjetiva)
    recuperacao: null          // 1-10 (velocidade de recuperação)
  },
  
  // Avaliação Geral
  avaliacaoGeral: {
    nivelGeral: null,          // iniciante, basico, intermediario, avancado, expert
    pontuacaoGeral: null,      // 0-100
    pontoFortes: '',
    pontosAmelhoria: '',
    objetivos: '',
    observacoesGerais: ''
  }
});

// Adicionar dados de exemplo para o aluno demo
const addSampleData = (alunoId) => {
  const sampleRecords = [
    // Avaliação de Janeiro 2026
    {
      id: uuidv4(),
      alunoId,
      data: '2026-01-15',
      professorId: null,
      professorNome: 'Professor Demo',
      tipo: 'mensal',
      ...createPerformanceTemplate(),
      dadosAntropometricos: {
        peso: 68,
        altura: 170,
        imc: 23.5,
        envergadura: 175,
        percentualGordura: 18
      },
      avaliacaoCardio: {
        fcRepouso: 72,
        fcMaxima: 180,
        fcRecuperacao: 95,
        vo2MaxEstimado: 38,
        pressaoArterial: '120/80'
      },
      estilos: {
        crawl: {
          nivel: 'basico',
          tempo25m: 32,
          tempo50m: 72,
          tempo100m: null,
          bracadasPorMinuto: 42,
          tecnica: 6,
          observacoes: 'Boa evolução na respiração lateral'
        },
        costas: {
          nivel: 'iniciante',
          tempo25m: 40,
          tempo50m: null,
          tempo100m: null,
          bracadasPorMinuto: 38,
          tecnica: 5,
          observacoes: 'Precisa trabalhar a posição da cabeça'
        },
        peito: {
          nivel: 'iniciante',
          tempo25m: 45,
          tempo50m: null,
          tempo100m: null,
          bracadasPorMinuto: 32,
          tecnica: 4,
          observacoes: 'Início do aprendizado'
        },
        borboleta: {
          nivel: 'iniciante',
          tempo25m: null,
          tempo50m: null,
          tempo100m: null,
          bracadasPorMinuto: null,
          tecnica: 2,
          observacoes: 'Ainda não domina o movimento ondulado'
        }
      },
      habilidadesAquaticas: {
        flutuacao: 7,
        respiracao: 6,
        mergulho: 5,
        virada: 3,
        saida: 4,
        propulsao: 6,
        coordenacao: 5
      },
      resistencia: {
        distanciaMaxima: 200,
        tempoNadoContinuo: 8,
        nivelFadiga: 6,
        recuperacao: 5
      },
      avaliacaoGeral: {
        nivelGeral: 'basico',
        pontuacaoGeral: 52,
        pontoFortes: 'Boa flutuação, determinação, evolução constante',
        pontosAmelhoria: 'Técnica de virada, resistência, estilo borboleta',
        objetivos: 'Nadar 400m contínuos até março, melhorar tempo do crawl',
        observacoesGerais: 'Alune demonstra grande comprometimento e evolução consistente.'
      }
    },
    // Avaliação de Fevereiro 2026
    {
      id: uuidv4(),
      alunoId,
      data: '2026-02-01',
      professorId: null,
      professorNome: 'Professor Demo',
      tipo: 'mensal',
      ...createPerformanceTemplate(),
      dadosAntropometricos: {
        peso: 67,
        altura: 170,
        imc: 23.2,
        envergadura: 175,
        percentualGordura: 17
      },
      avaliacaoCardio: {
        fcRepouso: 70,
        fcMaxima: 178,
        fcRecuperacao: 90,
        vo2MaxEstimado: 40,
        pressaoArterial: '118/78'
      },
      estilos: {
        crawl: {
          nivel: 'intermediario',
          tempo25m: 28,
          tempo50m: 65,
          tempo100m: 145,
          bracadasPorMinuto: 44,
          tecnica: 7,
          observacoes: 'Evolução significativa! Respiração mais natural'
        },
        costas: {
          nivel: 'basico',
          tempo25m: 35,
          tempo50m: 78,
          tempo100m: null,
          bracadasPorMinuto: 40,
          tecnica: 6,
          observacoes: 'Melhorou a posição do corpo'
        },
        peito: {
          nivel: 'basico',
          tempo25m: 38,
          tempo50m: 85,
          tempo100m: null,
          bracadasPorMinuto: 34,
          tecnica: 5,
          observacoes: 'Pernada mais coordenada'
        },
        borboleta: {
          nivel: 'iniciante',
          tempo25m: 55,
          tempo50m: null,
          tempo100m: null,
          bracadasPorMinuto: 28,
          tecnica: 4,
          observacoes: 'Começando a dominar o golfinho'
        }
      },
      habilidadesAquaticas: {
        flutuacao: 8,
        respiracao: 7,
        mergulho: 6,
        virada: 5,
        saida: 5,
        propulsao: 7,
        coordenacao: 6
      },
      resistencia: {
        distanciaMaxima: 350,
        tempoNadoContinuo: 12,
        nivelFadiga: 5,
        recuperacao: 6
      },
      avaliacaoGeral: {
        nivelGeral: 'basico',
        pontuacaoGeral: 62,
        pontoFortes: 'Crawl em ótima evolução, boa resistência, mentalidade positiva',
        pontosAmelhoria: 'Borboleta, virada olímpica',
        objetivos: 'Completar 500m contínuos, aprender virada olímpica',
        observacoesGerais: 'Mês de grande evolução! Parabéns pelo empenho.'
      }
    }
  ];

  performanceRecords.push(...sampleRecords);
};

// Funções de acesso

const getPerformanceByAluno = (alunoId) => {
  return performanceRecords
    .filter(r => r.alunoId === alunoId)
    .sort((a, b) => new Date(b.data) - new Date(a.data));
};

const getPerformanceById = (id) => {
  return performanceRecords.find(r => r.id === id);
};

const getPerformanceByPeriod = (alunoId, startDate, endDate) => {
  return performanceRecords.filter(r => {
    const date = new Date(r.data);
    return r.alunoId === alunoId && 
           date >= new Date(startDate) && 
           date <= new Date(endDate);
  }).sort((a, b) => new Date(b.data) - new Date(a.data));
};

const createPerformance = (data) => {
  const record = {
    id: uuidv4(),
    ...createPerformanceTemplate(),
    ...data,
    criadoEm: new Date().toISOString()
  };
  performanceRecords.push(record);
  return record;
};

const updatePerformance = (id, updates) => {
  const index = performanceRecords.findIndex(r => r.id === id);
  if (index === -1) return null;
  
  performanceRecords[index] = {
    ...performanceRecords[index],
    ...updates,
    atualizadoEm: new Date().toISOString()
  };
  
  return performanceRecords[index];
};

const deletePerformance = (id) => {
  const index = performanceRecords.findIndex(r => r.id === id);
  if (index === -1) return false;
  
  performanceRecords.splice(index, 1);
  return true;
};

// Estatísticas agregadas
const getPerformanceStats = (alunoId, period = 'all') => {
  let records = getPerformanceByAluno(alunoId);
  
  if (period !== 'all') {
    const now = new Date();
    let startDate;
    
    switch (period) {
      case 'mensal':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'semestral':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case 'anual':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }
    
    records = records.filter(r => new Date(r.data) >= startDate);
  }
  
  if (records.length === 0) {
    return null;
  }
  
  // Calcula evolução
  const latest = records[0];
  const oldest = records[records.length - 1];
  
  return {
    totalAvaliacoes: records.length,
    primeiraAvaliacao: oldest?.data,
    ultimaAvaliacao: latest?.data,
    nivelAtual: latest?.avaliacaoGeral?.nivelGeral,
    pontuacaoAtual: latest?.avaliacaoGeral?.pontuacaoGeral,
    evolucaoPontuacao: records.length > 1 
      ? latest.avaliacaoGeral.pontuacaoGeral - oldest.avaliacaoGeral.pontuacaoGeral 
      : 0,
    melhorTempo25mCrawl: Math.min(...records.map(r => r.estilos?.crawl?.tempo25m).filter(t => t)),
    distanciaMaxima: Math.max(...records.map(r => r.resistencia?.distanciaMaxima).filter(d => d))
  };
};

// Comparação de evolução entre duas avaliações
const comparePerformance = (alunoId, date1, date2) => {
  const record1 = performanceRecords.find(r => r.alunoId === alunoId && r.data === date1);
  const record2 = performanceRecords.find(r => r.alunoId === alunoId && r.data === date2);
  
  if (!record1 || !record2) return null;
  
  return {
    periodo: { de: date1, ate: date2 },
    evolucaoPeso: record2.dadosAntropometricos.peso - record1.dadosAntropometricos.peso,
    evolucaoIMC: record2.dadosAntropometricos.imc - record1.dadosAntropometricos.imc,
    evolucaoPontuacao: record2.avaliacaoGeral.pontuacaoGeral - record1.avaliacaoGeral.pontuacaoGeral,
    evolucaoCrawl: record1.estilos.crawl.tempo25m && record2.estilos.crawl.tempo25m
      ? record1.estilos.crawl.tempo25m - record2.estilos.crawl.tempo25m  // tempo menor é melhor
      : null,
    evolucaoDistancia: record2.resistencia.distanciaMaxima - record1.resistencia.distanciaMaxima
  };
};

module.exports = {
  performanceRecords,
  SKILL_LEVELS,
  SWIM_STYLES,
  createPerformanceTemplate,
  addSampleData,
  getPerformanceByAluno,
  getPerformanceById,
  getPerformanceByPeriod,
  createPerformance,
  updatePerformance,
  deletePerformance,
  getPerformanceStats,
  comparePerformance
};
