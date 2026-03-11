import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import './PerformanceView.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const PerformanceView = () => {
  const { getToken } = useAuth();
  const [performances, setPerformances] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewPeriod, setViewPeriod] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    const token = getToken();
    setLoading(true);
    
    try {
      const [perfRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/performance/minha-performance`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/performance/minha-performance/stats?periodo=${viewPeriod}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (perfRes.ok) {
        setPerformances(await perfRes.json());
      }
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
    } catch (error) {
      console.error('Erro ao carregar performance:', error);
    } finally {
      setLoading(false);
    }
  }, [viewPeriod]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getLevelLabel = (level) => {
    const labels = {
      iniciante: 'Iniciante',
      basico: 'Básico',
      intermediario: 'Intermediário',
      avancado: 'Avançado',
      expert: 'Expert'
    };
    return labels[level] || level;
  };

  const getLevelClass = (level) => {
    return `level-${level}`;
  };

  const renderSkillBar = (value, max = 10) => {
    const percentage = (value / max) * 100;
    return (
      <div className="skill-bar">
        <div 
          className="skill-fill" 
          style={{ width: `${percentage}%` }}
        />
        <span className="skill-value">{value}/{max}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="performance-view-loading">
        <div className="loading-spinner"></div>
        <p>Carregando sua performance...</p>
      </div>
    );
  }

  if (performances.length === 0) {
    return (
      <div className="performance-view">
        <div className="no-performance">
          <span className="no-perf-icon">🏊</span>
          <h3>Nenhuma avaliação ainda</h3>
          <p>
            Suas avaliações de performance aparecerão aqui assim que seu professor registrar.
            Continue nadando e evoluindo!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="performance-view">
      {/* Cabeçalho com Filtro */}
      <div className="pv-header">
        <h3>🏊 Minha Performance de Natação</h3>
        <select 
          value={viewPeriod} 
          onChange={e => setViewPeriod(e.target.value)}
          className="period-select"
        >
          <option value="all">Todo o histórico</option>
          <option value="mensal">Mês atual</option>
          <option value="semestral">Último semestre</option>
          <option value="anual">Ano atual</option>
        </select>
      </div>

      {/* Cards de Resumo */}
      {stats && stats.totalAvaliacoes > 0 && (
        <div className="pv-stats">
          <div className="pv-stat-card highlight">
            <span className="stat-icon">🎯</span>
            <div className="stat-content">
              <span className={`stat-level ${getLevelClass(stats.nivelAtual)}`}>
                {getLevelLabel(stats.nivelAtual)}
              </span>
              <span className="stat-label">Nível Atual</span>
            </div>
          </div>
          
          <div className="pv-stat-card">
            <span className="stat-icon">📊</span>
            <div className="stat-content">
              <span className="stat-value">{stats.pontuacaoAtual}/100</span>
              <span className="stat-label">Pontuação</span>
            </div>
          </div>
          
          <div className="pv-stat-card">
            <span className="stat-icon">📈</span>
            <div className="stat-content">
              <span className={`stat-value ${stats.evolucaoPontuacao >= 0 ? 'positive' : 'negative'}`}>
                {stats.evolucaoPontuacao > 0 ? '+' : ''}{stats.evolucaoPontuacao}
              </span>
              <span className="stat-label">Evolução</span>
            </div>
          </div>
          
          <div className="pv-stat-card">
            <span className="stat-icon">📋</span>
            <div className="stat-content">
              <span className="stat-value">{stats.totalAvaliacoes}</span>
              <span className="stat-label">Avaliações</span>
            </div>
          </div>
          
          {stats.melhorTempo25mCrawl && (
            <div className="pv-stat-card">
              <span className="stat-icon">⏱️</span>
              <div className="stat-content">
                <span className="stat-value">{stats.melhorTempo25mCrawl}s</span>
                <span className="stat-label">Melhor 25m Crawl</span>
              </div>
            </div>
          )}
          
          {stats.distanciaMaxima && (
            <div className="pv-stat-card">
              <span className="stat-icon">🏆</span>
              <div className="stat-content">
                <span className="stat-value">{stats.distanciaMaxima}m</span>
                <span className="stat-label">Distância Máx.</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lista de Avaliações */}
      <div className="pv-records">
        <h4>Histórico de Avaliações</h4>
        
        {performances.map((record, index) => (
          <div 
            key={record.id} 
            className={`pv-record ${selectedRecord === record.id ? 'expanded' : ''}`}
          >
            <div 
              className="pv-record-header"
              onClick={() => setSelectedRecord(selectedRecord === record.id ? null : record.id)}
            >
              <div className="record-date-info">
                <span className="record-date">{formatDate(record.data)}</span>
                <span className="record-type">{record.tipo}</span>
                {index === 0 && <span className="record-latest">Mais recente</span>}
              </div>
              <div className="record-summary">
                <span className={`level-badge ${getLevelClass(record.avaliacaoGeral?.nivelGeral)}`}>
                  {getLevelLabel(record.avaliacaoGeral?.nivelGeral)}
                </span>
                <span className="score">{record.avaliacaoGeral?.pontuacaoGeral}/100</span>
                <span className="expand-icon">{selectedRecord === record.id ? '▼' : '▶'}</span>
              </div>
            </div>

            {selectedRecord === record.id && (
              <div className="pv-record-details">
                {/* Dados Físicos */}
                <div className="detail-section">
                  <h5>📏 Dados Físicos</h5>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Peso</span>
                      <span className="detail-value">{record.dadosAntropometricos?.peso || '-'} kg</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Altura</span>
                      <span className="detail-value">{record.dadosAntropometricos?.altura || '-'} cm</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">IMC</span>
                      <span className="detail-value">{record.dadosAntropometricos?.imc || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">FC Repouso</span>
                      <span className="detail-value">{record.avaliacaoCardio?.fcRepouso || '-'} bpm</span>
                    </div>
                  </div>
                </div>

                {/* Estilos de Natação */}
                <div className="detail-section">
                  <h5>🏊 Estilos de Natação</h5>
                  <div className="styles-grid">
                    {['crawl', 'costas', 'peito', 'borboleta'].map(style => {
                      const styleData = record.estilos?.[style];
                      if (!styleData?.nivel) return null;
                      
                      return (
                        <div key={style} className="style-card">
                          <h6>{style.charAt(0).toUpperCase() + style.slice(1)}</h6>
                          <span className={`mini-badge ${getLevelClass(styleData.nivel)}`}>
                            {getLevelLabel(styleData.nivel)}
                          </span>
                          <div className="style-times">
                            {styleData.tempo25m && (
                              <div className="time-item">
                                <span className="time-label">25m:</span>
                                <span className="time-value">{styleData.tempo25m}s</span>
                              </div>
                            )}
                            {styleData.tempo50m && (
                              <div className="time-item">
                                <span className="time-label">50m:</span>
                                <span className="time-value">{styleData.tempo50m}s</span>
                              </div>
                            )}
                            {styleData.tempo100m && (
                              <div className="time-item">
                                <span className="time-label">100m:</span>
                                <span className="time-value">{styleData.tempo100m}s</span>
                              </div>
                            )}
                          </div>
                          {styleData.tecnica && (
                            <div className="technique">
                              <span>Técnica:</span>
                              {renderSkillBar(styleData.tecnica)}
                            </div>
                          )}
                          {styleData.observacoes && (
                            <p className="style-obs">{styleData.observacoes}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Habilidades Aquáticas */}
                <div className="detail-section">
                  <h5>💧 Habilidades Aquáticas</h5>
                  <div className="skills-list">
                    {Object.entries(record.habilidadesAquaticas || {}).map(([skill, value]) => {
                      if (!value) return null;
                      return (
                        <div key={skill} className="skill-item">
                          <span className="skill-name">
                            {skill.charAt(0).toUpperCase() + skill.slice(1)}
                          </span>
                          {renderSkillBar(value)}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Resistência */}
                <div className="detail-section">
                  <h5>💪 Resistência</h5>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Distância Máxima</span>
                      <span className="detail-value">{record.resistencia?.distanciaMaxima || '-'} m</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Nado Contínuo</span>
                      <span className="detail-value">{record.resistencia?.tempoNadoContinuo || '-'} min</span>
                    </div>
                  </div>
                </div>

                {/* Feedback do Professor */}
                <div className="detail-section feedback-section">
                  <h5>💬 Feedback do Professor</h5>
                  
                  {record.avaliacaoGeral?.pontoFortes && (
                    <div className="feedback-item positive">
                      <span className="feedback-label">✅ Pontos Fortes</span>
                      <p>{record.avaliacaoGeral.pontoFortes}</p>
                    </div>
                  )}
                  
                  {record.avaliacaoGeral?.pontosAmelhoria && (
                    <div className="feedback-item improve">
                      <span className="feedback-label">🎯 A Melhorar</span>
                      <p>{record.avaliacaoGeral.pontosAmelhoria}</p>
                    </div>
                  )}
                  
                  {record.avaliacaoGeral?.objetivos && (
                    <div className="feedback-item goals">
                      <span className="feedback-label">🏆 Objetivos</span>
                      <p>{record.avaliacaoGeral.objetivos}</p>
                    </div>
                  )}
                  
                  {record.avaliacaoGeral?.observacoesGerais && (
                    <div className="feedback-item general">
                      <span className="feedback-label">📝 Observações</span>
                      <p>{record.avaliacaoGeral.observacoesGerais}</p>
                    </div>
                  )}
                </div>

                <div className="record-footer">
                  <span>Avaliado por: {record.professorNome || 'Professor'}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceView;
