import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PerformanceView from '../../components/PerformanceView';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const DashboardAluno = () => {
  const { user, logout, getToken, isAluno } = useAuth();
  const navigate = useNavigate();
  const [dadosAluno, setDadosAluno] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [pagamentos, setPagamentos] = useState([]);
  const [pagamentoPendente, setPagamentoPendente] = useState(null);
  const [psicossocial, setPsicossocial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPixModal, setShowPixModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isAluno()) {
      navigate('/login');
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAluno, navigate]);

  const fetchData = async () => {
    const token = getToken();
    try {
      const [dadosRes, perfRes, pagRes, pendRes, psiRes] = await Promise.all([
        fetch(`${API_URL}/aluno/meus-dados`, { headers: { 'Authorization': `Bearer ${token}` }}),
        fetch(`${API_URL}/aluno/performance`, { headers: { 'Authorization': `Bearer ${token}` }}),
        fetch(`${API_URL}/aluno/pagamentos`, { headers: { 'Authorization': `Bearer ${token}` }}),
        fetch(`${API_URL}/aluno/pagamento-pendente`, { headers: { 'Authorization': `Bearer ${token}` }}),
        fetch(`${API_URL}/aluno/psicossocial`, { headers: { 'Authorization': `Bearer ${token}` }})
      ]);

      if (dadosRes.ok) setDadosAluno(await dadosRes.json());
      if (perfRes.ok) setPerformance(await perfRes.json());
      if (pagRes.ok) setPagamentos(await pagRes.json());
      if (pendRes.ok) setPagamentoPendente(await pendRes.json());
      if (psiRes.ok) setPsicossocial(await psiRes.json());
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const copyPixKey = async () => {
    if (pagamentoPendente?.pixKey) {
      await navigator.clipboard.writeText(pagamentoPendente.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleConfirmPayment = async () => {
    const token = getToken();
    try {
      const response = await fetch(`${API_URL}/aluno/pagar-pix`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mes: pagamentoPendente.mes,
          comprovante: 'confirmado_pelo_aluno'
        })
      });

      if (response.ok) {
        alert('Pagamento registrado! Aguarde a confirmação.');
        setShowPixModal(false);
        fetchData();
      }
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <img src="/logo_aquatrans.jpg" alt="Aquatrans" />
            <span>Aquatrans</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-title">Minha Área</span>
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">🏠</span>
            Início
          </button>
          <button 
            className={`nav-item ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            <span className="nav-icon">📈</span>
            Performance
          </button>
          <button 
            className={`nav-item ${activeTab === 'pagamentos' ? 'active' : ''}`}
            onClick={() => setActiveTab('pagamentos')}
          >
            <span className="nav-icon">💰</span>
            Pagamentos
          </button>
          <button 
            className={`nav-item ${activeTab === 'psicossocial' ? 'active' : ''}`}
            onClick={() => setActiveTab('psicossocial')}
          >
            <span className="nav-icon">🧠</span>
            Psicossocial
          </button>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="nav-item">
            <span className="nav-icon">🏠</span>
            Voltar ao Site
          </Link>
          <button onClick={handleLogout} className="nav-item logout-btn">
            <span className="nav-icon">🚪</span>
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Portal do Aluno</h1>
            <p>Olá, {user?.nome}! 👋</p>
          </div>
          <div className="header-user">
            <span className={`payment-status ${dadosAluno?.dadosAluno?.statusPagamento === 'em_dia' ? 'em-dia' : 'pendente'}`}>
              {dadosAluno?.dadosAluno?.statusPagamento === 'em_dia' ? '✅ Em Dia' : '⚠️ Pendente'}
            </span>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <section className="dashboard-section">
                <h2 className="section-title">Resumo</h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-icon">🏊</span>
                    <div className="stat-info">
                      <span className="stat-value">{performance?.totalAulas || 0}</span>
                      <span className="stat-label">Aulas</span>
                    </div>
                  </div>
                  <div className="stat-card success">
                    <span className="stat-icon">✅</span>
                    <div className="stat-info">
                      <span className="stat-value">{performance?.percentualPresenca || 0}%</span>
                      <span className="stat-label">Presença</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <span className="stat-icon">💰</span>
                    <div className="stat-info">
                      <span className="stat-value">R$ {dadosAluno?.dadosAluno?.valorMensalidade || 0}</span>
                      <span className="stat-label">Mensalidade</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pagamento Pendente */}
              {pagamentoPendente && (
                <section className="dashboard-section">
                  <div className="alert-card warning">
                    <span className="alert-icon">⚠️</span>
                    <div className="alert-content">
                      <h3>Pagamento Pendente</h3>
                      <p>Mensalidade de {pagamentoPendente.mes} - R$ {pagamentoPendente.valor}</p>
                      <p>Vencimento: {pagamentoPendente.vencimento}</p>
                    </div>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowPixModal(true)}
                    >
                      Pagar via PIX
                    </button>
                  </div>
                </section>
              )}

              {/* Últimas Avaliações */}
              {performance?.avaliacoes?.length > 0 && (
                <section className="dashboard-section">
                  <h2 className="section-title">Últimas Avaliações</h2>
                  <div className="avaliacoes-list">
                    {performance.avaliacoes.slice(0, 3).map((av, i) => (
                      <div key={i} className="avaliacao-card">
                        <span className="avaliacao-data">{av.data}</span>
                        <p className="avaliacao-texto">{av.avaliacao}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* Performance Tab - Visualização Completa de Natação */}
          {activeTab === 'performance' && (
            <section className="dashboard-section">
              <PerformanceView />
              
              {/* Resumo de Frequência nas Aulas */}
              {performance && (
                <div className="attendance-summary">
                  <h4>📋 Frequência nas Aulas</h4>
                  <div className="attendance-stats">
                    <div className="attendance-stat">
                      <span className="att-value">{performance?.totalAulas || 0}</span>
                      <span className="att-label">Aulas</span>
                    </div>
                    <div className="attendance-stat success">
                      <span className="att-value">{performance?.presencas || 0}</span>
                      <span className="att-label">Presenças</span>
                    </div>
                    <div className="attendance-stat danger">
                      <span className="att-value">{performance?.faltas || 0}</span>
                      <span className="att-label">Faltas</span>
                    </div>
                    <div className="attendance-stat">
                      <span className="att-value">{performance?.percentualPresenca || 0}%</span>
                      <span className="att-label">Frequência</span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Pagamentos Tab */}
          {activeTab === 'pagamentos' && (
            <section className="dashboard-section">
              <h2 className="section-title">Meus Pagamentos</h2>
              
              {pagamentoPendente && (
                <div className="alert-card warning">
                  <span className="alert-icon">⚠️</span>
                  <div className="alert-content">
                    <h3>Pagamento Pendente</h3>
                    <p>Mensalidade de {pagamentoPendente.mes} - R$ {pagamentoPendente.valor}</p>
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowPixModal(true)}
                  >
                    Pagar via PIX
                  </button>
                </div>
              )}

              <div className="table-container">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Valor</th>
                      <th>Status</th>
                      <th>Data Pagamento</th>
                      <th>Método</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagamentos.map((pag, i) => (
                      <tr key={i}>
                        <td>{pag.mes}</td>
                        <td>R$ {pag.valor}</td>
                        <td>
                          <span className={`status-badge ${pag.status === 'pago' ? 'active' : 'pending'}`}>
                            {pag.status === 'pago' ? 'Pago' : 'Pendente'}
                          </span>
                        </td>
                        <td>{pag.dataPagamento || '-'}</td>
                        <td>{pag.metodo || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Psicossocial Tab */}
          {activeTab === 'psicossocial' && (
            <section className="dashboard-section">
              <h2 className="section-title">Atendimento Psicossocial</h2>
              
              <div className="info-card">
                <h3>🧠 Precisa de suporte?</h3>
                <p>
                  O Aquatrans oferece atendimento psicossocial para alunes. 
                  Se você precisa conversar ou buscar apoio, estamos aqui para você.
                </p>
                <button className="btn btn-primary">
                  Solicitar Atendimento
                </button>
              </div>

              {psicossocial.length > 0 && (
                <>
                  <h3 className="subsection-title">Histórico de Atendimentos</h3>
                  <div className="atendimentos-list">
                    {psicossocial.map((at, i) => (
                      <div key={i} className="atendimento-card">
                        <div className="atendimento-header">
                          <span className="atendimento-data">📅 {at.data}</span>
                          <span className="atendimento-tipo">{at.tipo}</span>
                        </div>
                        {at.observacao && (
                          <p className="atendimento-obs">{at.observacao}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}
        </div>
      </main>

      {/* Modal PIX */}
      {showPixModal && pagamentoPendente && (
        <div className="modal-overlay" onClick={() => setShowPixModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPixModal(false)}>×</button>
            
            <h2>Pagar via PIX</h2>
            <div className="pix-info">
              <div className="pix-amount">
                <span>Valor:</span>
                <strong>R$ {pagamentoPendente.valor},00</strong>
              </div>
              <div className="pix-ref">
                <span>Referência:</span>
                <strong>{pagamentoPendente.mes}</strong>
              </div>
            </div>

            <div className="pix-key-box">
              <span className="pix-label">{pagamentoPendente.pixKeyType}</span>
              <span className="pix-value">{pagamentoPendente.pixKey}</span>
              <button className="btn btn-secondary" onClick={copyPixKey}>
                {copied ? '✓ Copiado!' : '📋 Copiar'}
              </button>
            </div>

            <div className="pix-instructions">
              <ol>
                <li>Abra o app do seu banco</li>
                <li>Escolha pagar via PIX</li>
                <li>Cole a chave copiada</li>
                <li>Confirme o valor: R$ {pagamentoPendente.valor},00</li>
                <li>Finalize o pagamento</li>
              </ol>
            </div>

            <button className="btn btn-primary btn-full" onClick={handleConfirmPayment}>
              Já fiz o pagamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAluno;
