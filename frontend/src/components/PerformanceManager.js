import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './PerformanceManager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const SKILL_LEVELS = [
  { value: 'iniciante', label: 'Iniciante' },
  { value: 'basico', label: 'Básico' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
  { value: 'expert', label: 'Expert' }
];

const PerformanceManager = () => {
  const { getToken } = useAuth();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [performances, setPerformances] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [message, setMessage] = useState(null);
  const [viewPeriod, setViewPeriod] = useState('all');

  // Estado do formulário
  const [formData, setFormData] = useState(getEmptyFormData());

  function getEmptyFormData() {
    return {
      data: new Date().toISOString().split('T')[0],
      tipo: 'mensal',
      dadosAntropometricos: {
        peso: '',
        altura: '',
        imc: '',
        envergadura: '',
        percentualGordura: ''
      },
      avaliacaoCardio: {
        fcRepouso: '',
        fcMaxima: '',
        fcRecuperacao: '',
        vo2MaxEstimado: '',
        pressaoArterial: ''
      },
      estilos: {
        crawl: { nivel: '', tempo25m: '', tempo50m: '', tempo100m: '', bracadasPorMinuto: '', tecnica: '', observacoes: '' },
        costas: { nivel: '', tempo25m: '', tempo50m: '', tempo100m: '', bracadasPorMinuto: '', tecnica: '', observacoes: '' },
        peito: { nivel: '', tempo25m: '', tempo50m: '', tempo100m: '', bracadasPorMinuto: '', tecnica: '', observacoes: '' },
        borboleta: { nivel: '', tempo25m: '', tempo50m: '', tempo100m: '', bracadasPorMinuto: '', tecnica: '', observacoes: '' }
      },
      habilidadesAquaticas: {
        flutuacao: '',
        respiracao: '',
        mergulho: '',
        virada: '',
        saida: '',
        propulsao: '',
        coordenacao: ''
      },
      resistencia: {
        distanciaMaxima: '',
        tempoNadoContinuo: '',
        nivelFadiga: '',
        recuperacao: ''
      },
      avaliacaoGeral: {
        nivelGeral: '',
        pontuacaoGeral: '',
        pontoFortes: '',
        pontosAmelhoria: '',
        objetivos: '',
        observacoesGerais: ''
      }
    };
  }

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchPerformances();
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent, viewPeriod]);

  const fetchStudents = async () => {
    const token = getToken();
    try {
      const response = await fetch(`${API_URL}/admin/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setStudents(await response.json());
      }
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPerformances = async () => {
    if (!selectedStudent) return;
    
    const token = getToken();
    try {
      const response = await fetch(`${API_URL}/performance/aluno/${selectedStudent.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPerformances(data.avaliacoes || []);
      }
    } catch (error) {
      console.error('Erro ao carregar performances:', error);
    }
  };

  const fetchStats = async () => {
    if (!selectedStudent) return;
    
    const token = getToken();
    try {
      const response = await fetch(
        `${API_URL}/performance/aluno/${selectedStudent.id}/stats?periodo=${viewPeriod}`, 
        { headers: { 'Authorization': `Bearer ${token}` }}
      );
      if (response.ok) {
        setStats(await response.json());
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const calculateIMC = (peso, altura) => {
    if (peso && altura) {
      const alturaM = altura / 100;
      return (peso / (alturaM * alturaM)).toFixed(1);
    }
    return '';
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (section) {
        newData[section] = { ...newData[section], [field]: value };
        
        // Auto-calcular IMC
        if (section === 'dadosAntropometricos' && (field === 'peso' || field === 'altura')) {
          const peso = field === 'peso' ? value : newData.dadosAntropometricos.peso;
          const altura = field === 'altura' ? value : newData.dadosAntropometricos.altura;
          newData.dadosAntropometricos.imc = calculateIMC(peso, altura);
        }
      } else {
        newData[field] = value;
      }
      return newData;
    });
  };

  const handleStyleChange = (style, field, value) => {
    setFormData(prev => ({
      ...prev,
      estilos: {
        ...prev.estilos,
        [style]: { ...prev.estilos[style], [field]: value }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = getToken();
    const url = editingRecord 
      ? `${API_URL}/performance/${editingRecord.id}`
      : `${API_URL}/performance`;
    
    try {
      const response = await fetch(url, {
        method: editingRecord ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alunoId: selectedStudent.id,
          ...formData
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: editingRecord ? 'Avaliação atualizada!' : 'Avaliação criada!' });
        setShowForm(false);
        setEditingRecord(null);
        setFormData(getEmptyFormData());
        fetchPerformances();
        fetchStats();
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro ao salvar' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      data: record.data,
      tipo: record.tipo || 'mensal',
      dadosAntropometricos: record.dadosAntropometricos || getEmptyFormData().dadosAntropometricos,
      avaliacaoCardio: record.avaliacaoCardio || getEmptyFormData().avaliacaoCardio,
      estilos: record.estilos || getEmptyFormData().estilos,
      habilidadesAquaticas: record.habilidadesAquaticas || getEmptyFormData().habilidadesAquaticas,
      resistencia: record.resistencia || getEmptyFormData().resistencia,
      avaliacaoGeral: record.avaliacaoGeral || getEmptyFormData().avaliacaoGeral
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta avaliação?')) return;
    
    const token = getToken();
    try {
      const response = await fetch(`${API_URL}/performance/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Avaliação excluída!' });
        fetchPerformances();
        fetchStats();
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao excluir' });
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const getLevelBadgeClass = (level) => {
    const classes = {
      iniciante: 'level-iniciante',
      basico: 'level-basico',
      intermediario: 'level-intermediario',
      avancado: 'level-avancado',
      expert: 'level-expert'
    };
    return classes[level] || '';
  };

  if (loading) {
    return <div className="performance-loading">Carregando...</div>;
  }

  return (
    <div className="performance-manager">
      {message && (
        <div className={`perf-message ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage(null)}>×</button>
        </div>
      )}

      {/* Seleção de Aluno */}
      {!selectedStudent ? (
        <div className="student-selection">
          <h3>Selecione um Aluno</h3>
          <div className="students-grid">
            {students.map(student => (
              <div 
                key={student.id} 
                className="student-card"
                onClick={() => setSelectedStudent(student)}
              >
                <span className="student-avatar">🏊</span>
                <span className="student-name">{student.nome}</span>
                <span className="student-email">{student.email}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Header do Aluno */}
          <div className="student-header">
            <button className="back-btn" onClick={() => {
              setSelectedStudent(null);
              setPerformances([]);
              setStats(null);
            }}>
              ← Voltar
            </button>
            <div className="student-info">
              <h3>🏊 {selectedStudent.nome}</h3>
              <span>{selectedStudent.email}</span>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingRecord(null);
                setFormData(getEmptyFormData());
                setShowForm(true);
              }}
            >
              + Nova Avaliação
            </button>
          </div>

          {/* Filtro de Período */}
          <div className="period-filter">
            <span>Visualizar:</span>
            <select value={viewPeriod} onChange={e => setViewPeriod(e.target.value)}>
              <option value="all">Todo o histórico</option>
              <option value="mensal">Mês atual</option>
              <option value="semestral">Último semestre</option>
              <option value="anual">Ano atual</option>
            </select>
          </div>

          {/* Estatísticas */}
          {stats && stats.totalAvaliacoes > 0 && (
            <div className="stats-cards">
              <div className="stat-card">
                <span className="stat-value">{stats.totalAvaliacoes}</span>
                <span className="stat-label">Avaliações</span>
              </div>
              <div className="stat-card">
                <span className={`stat-value level-badge ${getLevelBadgeClass(stats.nivelAtual)}`}>
                  {stats.nivelAtual || '-'}
                </span>
                <span className="stat-label">Nível Atual</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.pontuacaoAtual || 0}/100</span>
                <span className="stat-label">Pontuação</span>
              </div>
              <div className="stat-card">
                <span className={`stat-value ${stats.evolucaoPontuacao >= 0 ? 'positive' : 'negative'}`}>
                  {stats.evolucaoPontuacao > 0 ? '+' : ''}{stats.evolucaoPontuacao || 0}
                </span>
                <span className="stat-label">Evolução</span>
              </div>
              {stats.melhorTempo25mCrawl && (
                <div className="stat-card">
                  <span className="stat-value">{stats.melhorTempo25mCrawl}s</span>
                  <span className="stat-label">Melhor 25m Crawl</span>
                </div>
              )}
              {stats.distanciaMaxima && (
                <div className="stat-card">
                  <span className="stat-value">{stats.distanciaMaxima}m</span>
                  <span className="stat-label">Distância Máx.</span>
                </div>
              )}
            </div>
          )}

          {/* Lista de Avaliações */}
          {!showForm && (
            <div className="performances-list">
              <h4>Histórico de Avaliações</h4>
              {performances.length === 0 ? (
                <p className="no-data">Nenhuma avaliação registrada.</p>
              ) : (
                performances.map(record => (
                  <div key={record.id} className="performance-card">
                    <div className="perf-card-header">
                      <div className="perf-date">
                        <span className="date">{formatDate(record.data)}</span>
                        <span className="type">{record.tipo}</span>
                      </div>
                      <div className="perf-level">
                        <span className={`level-badge ${getLevelBadgeClass(record.avaliacaoGeral?.nivelGeral)}`}>
                          {record.avaliacaoGeral?.nivelGeral || 'N/A'}
                        </span>
                        <span className="score">{record.avaliacaoGeral?.pontuacaoGeral || 0}/100</span>
                      </div>
                    </div>
                    
                    <div className="perf-card-body">
                      <div className="perf-metrics">
                        <div className="metric">
                          <span className="metric-label">Peso/Altura</span>
                          <span className="metric-value">
                            {record.dadosAntropometricos?.peso || '-'}kg / {record.dadosAntropometricos?.altura || '-'}cm
                          </span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">IMC</span>
                          <span className="metric-value">{record.dadosAntropometricos?.imc || '-'}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Crawl 25m</span>
                          <span className="metric-value">{record.estilos?.crawl?.tempo25m || '-'}s</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Distância Máx.</span>
                          <span className="metric-value">{record.resistencia?.distanciaMaxima || '-'}m</span>
                        </div>
                      </div>
                      
                      {record.avaliacaoGeral?.observacoesGerais && (
                        <p className="perf-obs">{record.avaliacaoGeral.observacoesGerais}</p>
                      )}
                    </div>
                    
                    <div className="perf-card-footer">
                      <span className="professor">Por: {record.professorNome || 'Professor'}</span>
                      <div className="perf-actions">
                        <button className="btn-sm btn-edit" onClick={() => handleEdit(record)}>Editar</button>
                        <button className="btn-sm btn-delete" onClick={() => handleDelete(record.id)}>Excluir</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Formulário de Avaliação */}
          {showForm && (
            <div className="performance-form">
              <div className="form-header">
                <h4>{editingRecord ? 'Editar Avaliação' : 'Nova Avaliação de Performance'}</h4>
                <button className="close-btn" onClick={() => {
                  setShowForm(false);
                  setEditingRecord(null);
                }}>×</button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Data e Tipo */}
                <div className="form-section">
                  <h5>📅 Informações Básicas</h5>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Data da Avaliação</label>
                      <input 
                        type="date" 
                        value={formData.data}
                        onChange={e => handleInputChange(null, 'data', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Tipo</label>
                      <select 
                        value={formData.tipo}
                        onChange={e => handleInputChange(null, 'tipo', e.target.value)}
                      >
                        <option value="mensal">Mensal</option>
                        <option value="semestral">Semestral</option>
                        <option value="anual">Anual</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Dados Antropométricos */}
                <div className="form-section">
                  <h5>📏 Dados Antropométricos</h5>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Peso (kg)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={formData.dadosAntropometricos.peso}
                        onChange={e => handleInputChange('dadosAntropometricos', 'peso', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Altura (cm)</label>
                      <input 
                        type="number" 
                        value={formData.dadosAntropometricos.altura}
                        onChange={e => handleInputChange('dadosAntropometricos', 'altura', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>IMC (auto)</label>
                      <input 
                        type="text" 
                        value={formData.dadosAntropometricos.imc}
                        readOnly
                        className="readonly"
                      />
                    </div>
                    <div className="form-group">
                      <label>Envergadura (cm)</label>
                      <input 
                        type="number" 
                        value={formData.dadosAntropometricos.envergadura}
                        onChange={e => handleInputChange('dadosAntropometricos', 'envergadura', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>% Gordura</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={formData.dadosAntropometricos.percentualGordura}
                        onChange={e => handleInputChange('dadosAntropometricos', 'percentualGordura', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Avaliação Cardiorrespiratória */}
                <div className="form-section">
                  <h5>❤️ Avaliação Cardiorrespiratória</h5>
                  <div className="form-row">
                    <div className="form-group">
                      <label>FC Repouso (bpm)</label>
                      <input 
                        type="number" 
                        value={formData.avaliacaoCardio.fcRepouso}
                        onChange={e => handleInputChange('avaliacaoCardio', 'fcRepouso', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>FC Máxima (bpm)</label>
                      <input 
                        type="number" 
                        value={formData.avaliacaoCardio.fcMaxima}
                        onChange={e => handleInputChange('avaliacaoCardio', 'fcMaxima', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>FC Recuperação</label>
                      <input 
                        type="number" 
                        value={formData.avaliacaoCardio.fcRecuperacao}
                        onChange={e => handleInputChange('avaliacaoCardio', 'fcRecuperacao', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>VO2 Máx Estimado</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={formData.avaliacaoCardio.vo2MaxEstimado}
                        onChange={e => handleInputChange('avaliacaoCardio', 'vo2MaxEstimado', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Pressão Arterial</label>
                      <input 
                        type="text" 
                        placeholder="120/80"
                        value={formData.avaliacaoCardio.pressaoArterial}
                        onChange={e => handleInputChange('avaliacaoCardio', 'pressaoArterial', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Estilos de Natação */}
                <div className="form-section">
                  <h5>🏊 Estilos de Natação</h5>
                  {['crawl', 'costas', 'peito', 'borboleta'].map(style => (
                    <div key={style} className="style-section">
                      <h6>{style.charAt(0).toUpperCase() + style.slice(1)}</h6>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Nível</label>
                          <select 
                            value={formData.estilos[style].nivel}
                            onChange={e => handleStyleChange(style, 'nivel', e.target.value)}
                          >
                            <option value="">Selecione</option>
                            {SKILL_LEVELS.map(l => (
                              <option key={l.value} value={l.value}>{l.label}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>25m (seg)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={formData.estilos[style].tempo25m}
                            onChange={e => handleStyleChange(style, 'tempo25m', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>50m (seg)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={formData.estilos[style].tempo50m}
                            onChange={e => handleStyleChange(style, 'tempo50m', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>100m (seg)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={formData.estilos[style].tempo100m}
                            onChange={e => handleStyleChange(style, 'tempo100m', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Técnica (1-10)</label>
                          <input 
                            type="number" 
                            min="1" max="10"
                            value={formData.estilos[style].tecnica}
                            onChange={e => handleStyleChange(style, 'tecnica', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group full-width">
                        <label>Observações</label>
                        <input 
                          type="text"
                          value={formData.estilos[style].observacoes}
                          onChange={e => handleStyleChange(style, 'observacoes', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Habilidades Aquáticas */}
                <div className="form-section">
                  <h5>💧 Habilidades Aquáticas (1-10)</h5>
                  <div className="form-row">
                    {Object.keys(formData.habilidadesAquaticas).map(skill => (
                      <div key={skill} className="form-group">
                        <label>{skill.charAt(0).toUpperCase() + skill.slice(1)}</label>
                        <input 
                          type="number" 
                          min="1" max="10"
                          value={formData.habilidadesAquaticas[skill]}
                          onChange={e => handleInputChange('habilidadesAquaticas', skill, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resistência */}
                <div className="form-section">
                  <h5>💪 Resistência e Condicionamento</h5>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Distância Máxima (m)</label>
                      <input 
                        type="number" 
                        value={formData.resistencia.distanciaMaxima}
                        onChange={e => handleInputChange('resistencia', 'distanciaMaxima', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Tempo Nado Contínuo (min)</label>
                      <input 
                        type="number" 
                        value={formData.resistencia.tempoNadoContinuo}
                        onChange={e => handleInputChange('resistencia', 'tempoNadoContinuo', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nível Fadiga (1-10)</label>
                      <input 
                        type="number" 
                        min="1" max="10"
                        value={formData.resistencia.nivelFadiga}
                        onChange={e => handleInputChange('resistencia', 'nivelFadiga', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Recuperação (1-10)</label>
                      <input 
                        type="number" 
                        min="1" max="10"
                        value={formData.resistencia.recuperacao}
                        onChange={e => handleInputChange('resistencia', 'recuperacao', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Avaliação Geral */}
                <div className="form-section">
                  <h5>📊 Avaliação Geral</h5>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nível Geral</label>
                      <select 
                        value={formData.avaliacaoGeral.nivelGeral}
                        onChange={e => handleInputChange('avaliacaoGeral', 'nivelGeral', e.target.value)}
                      >
                        <option value="">Selecione</option>
                        {SKILL_LEVELS.map(l => (
                          <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Pontuação (0-100)</label>
                      <input 
                        type="number" 
                        min="0" max="100"
                        value={formData.avaliacaoGeral.pontuacaoGeral}
                        onChange={e => handleInputChange('avaliacaoGeral', 'pontuacaoGeral', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label>Pontos Fortes</label>
                    <textarea 
                      value={formData.avaliacaoGeral.pontoFortes}
                      onChange={e => handleInputChange('avaliacaoGeral', 'pontoFortes', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Pontos a Melhorar</label>
                    <textarea 
                      value={formData.avaliacaoGeral.pontosAmelhoria}
                      onChange={e => handleInputChange('avaliacaoGeral', 'pontosAmelhoria', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Objetivos</label>
                    <textarea 
                      value={formData.avaliacaoGeral.objetivos}
                      onChange={e => handleInputChange('avaliacaoGeral', 'objetivos', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Observações Gerais</label>
                    <textarea 
                      value={formData.avaliacaoGeral.observacoesGerais}
                      onChange={e => handleInputChange('avaliacaoGeral', 'observacoesGerais', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => {
                    setShowForm(false);
                    setEditingRecord(null);
                  }}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingRecord ? 'Salvar Alterações' : 'Criar Avaliação'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PerformanceManager;
