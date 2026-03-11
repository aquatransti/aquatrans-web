const {
  performanceRecords,
  SKILL_LEVELS,
  SWIM_STYLES,
  createPerformanceTemplate,
  addSampleData,
  getPerformanceByAluno,
  getPerformanceById,
  createPerformance,
  updatePerformance,
  deletePerformance,
  getPerformanceStats
} = require('../data/performance');

describe('Performance Module', () => {
  describe('Constants', () => {
    test('SKILL_LEVELS contains all levels', () => {
      expect(SKILL_LEVELS.INICIANTE).toBe('iniciante');
      expect(SKILL_LEVELS.BASICO).toBe('basico');
      expect(SKILL_LEVELS.INTERMEDIARIO).toBe('intermediario');
      expect(SKILL_LEVELS.AVANCADO).toBe('avancado');
      expect(SKILL_LEVELS.EXPERT).toBe('expert');
    });

    test('SWIM_STYLES contains all styles', () => {
      expect(SWIM_STYLES.CRAWL).toBe('crawl');
      expect(SWIM_STYLES.COSTAS).toBe('costas');
      expect(SWIM_STYLES.PEITO).toBe('peito');
      expect(SWIM_STYLES.BORBOLETA).toBe('borboleta');
    });
  });

  describe('createPerformanceTemplate', () => {
    test('creates a valid template with all sections', () => {
      const template = createPerformanceTemplate();
      
      expect(template).toHaveProperty('dadosAntropometricos');
      expect(template).toHaveProperty('avaliacaoCardio');
      expect(template).toHaveProperty('estilos');
      expect(template).toHaveProperty('habilidadesAquaticas');
      expect(template).toHaveProperty('resistencia');
      expect(template).toHaveProperty('avaliacaoGeral');
    });

    test('dadosAntropometricos has correct fields', () => {
      const template = createPerformanceTemplate();
      const dados = template.dadosAntropometricos;
      
      expect(dados).toHaveProperty('peso');
      expect(dados).toHaveProperty('altura');
      expect(dados).toHaveProperty('imc');
      expect(dados).toHaveProperty('envergadura');
      expect(dados).toHaveProperty('percentualGordura');
    });

    test('estilos has all swimming styles', () => {
      const template = createPerformanceTemplate();
      
      expect(template.estilos).toHaveProperty('crawl');
      expect(template.estilos).toHaveProperty('costas');
      expect(template.estilos).toHaveProperty('peito');
      expect(template.estilos).toHaveProperty('borboleta');
    });

    test('each style has time and technique fields', () => {
      const template = createPerformanceTemplate();
      const crawl = template.estilos.crawl;
      
      expect(crawl).toHaveProperty('nivel');
      expect(crawl).toHaveProperty('tempo25m');
      expect(crawl).toHaveProperty('tempo50m');
      expect(crawl).toHaveProperty('tempo100m');
      expect(crawl).toHaveProperty('tecnica');
      expect(crawl).toHaveProperty('observacoes');
    });

    test('habilidadesAquaticas has all skills', () => {
      const template = createPerformanceTemplate();
      const hab = template.habilidadesAquaticas;
      
      expect(hab).toHaveProperty('flutuacao');
      expect(hab).toHaveProperty('respiracao');
      expect(hab).toHaveProperty('mergulho');
      expect(hab).toHaveProperty('virada');
      expect(hab).toHaveProperty('saida');
      expect(hab).toHaveProperty('propulsao');
      expect(hab).toHaveProperty('coordenacao');
    });
  });

  describe('CRUD Operations', () => {
    const testAlunoId = 'test-aluno-123';
    let createdRecordId;

    test('createPerformance creates a new record', () => {
      const record = createPerformance({
        alunoId: testAlunoId,
        data: '2026-02-01',
        tipo: 'mensal',
        professorNome: 'Test Professor',
        dadosAntropometricos: {
          peso: 70,
          altura: 175,
          imc: 22.9
        },
        avaliacaoGeral: {
          nivelGeral: 'basico',
          pontuacaoGeral: 50
        }
      });

      expect(record).toHaveProperty('id');
      expect(record.alunoId).toBe(testAlunoId);
      expect(record.dadosAntropometricos.peso).toBe(70);
      
      createdRecordId = record.id;
    });

    test('getPerformanceByAluno returns records for aluno', () => {
      const records = getPerformanceByAluno(testAlunoId);
      
      expect(Array.isArray(records)).toBe(true);
      expect(records.length).toBeGreaterThan(0);
      expect(records[0].alunoId).toBe(testAlunoId);
    });

    test('getPerformanceById returns specific record', () => {
      const record = getPerformanceById(createdRecordId);
      
      expect(record).toBeDefined();
      expect(record.id).toBe(createdRecordId);
    });

    test('updatePerformance updates existing record', () => {
      const updated = updatePerformance(createdRecordId, {
        avaliacaoGeral: {
          nivelGeral: 'intermediario',
          pontuacaoGeral: 65
        }
      });

      expect(updated).toBeDefined();
      expect(updated.avaliacaoGeral.nivelGeral).toBe('intermediario');
      expect(updated.avaliacaoGeral.pontuacaoGeral).toBe(65);
    });

    test('deletePerformance removes record', () => {
      const result = deletePerformance(createdRecordId);
      expect(result).toBe(true);

      const record = getPerformanceById(createdRecordId);
      expect(record).toBeUndefined();
    });

    test('deletePerformance returns false for non-existent id', () => {
      const result = deletePerformance('non-existent-id');
      expect(result).toBe(false);
    });
  });

  describe('Statistics', () => {
    const statsAlunoId = 'stats-test-aluno';

    beforeAll(() => {
      // Create sample data for stats testing
      createPerformance({
        alunoId: statsAlunoId,
        data: '2026-01-01',
        tipo: 'mensal',
        estilos: {
          crawl: { tempo25m: 30 }
        },
        resistencia: { distanciaMaxima: 200 },
        avaliacaoGeral: {
          nivelGeral: 'basico',
          pontuacaoGeral: 50
        }
      });

      createPerformance({
        alunoId: statsAlunoId,
        data: '2026-02-01',
        tipo: 'mensal',
        estilos: {
          crawl: { tempo25m: 25 }
        },
        resistencia: { distanciaMaxima: 300 },
        avaliacaoGeral: {
          nivelGeral: 'intermediario',
          pontuacaoGeral: 70
        }
      });
    });

    test('getPerformanceStats returns correct stats', () => {
      const stats = getPerformanceStats(statsAlunoId);
      
      expect(stats).toBeDefined();
      expect(stats.totalAvaliacoes).toBe(2);
      expect(stats.nivelAtual).toBe('intermediario');
      expect(stats.pontuacaoAtual).toBe(70);
      expect(stats.evolucaoPontuacao).toBe(20);
    });

    test('getPerformanceStats returns null for non-existent aluno', () => {
      const stats = getPerformanceStats('non-existent-aluno');
      expect(stats).toBeNull();
    });
  });

  describe('Sample Data', () => {
    test('addSampleData adds records for aluno', () => {
      const sampleAlunoId = 'sample-test-aluno';
      const initialCount = performanceRecords.length;
      
      addSampleData(sampleAlunoId);
      
      const records = getPerformanceByAluno(sampleAlunoId);
      expect(records.length).toBe(2); // Should add 2 sample records
    });
  });
});
