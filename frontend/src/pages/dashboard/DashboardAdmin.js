import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserValidation from '../../components/UserValidation';
import PerformanceManager from '../../components/PerformanceManager';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const DashboardAdmin = () => {
  const { user, permissions, logout, getToken, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, navigate]);

  const fetchData = async () => {
    const token = getToken();
    try {
      if (permissions?.canManageStudents) {
        const studentsRes = await fetch(`${API_URL}/admin/students`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (studentsRes.ok) {
          setStudents(await studentsRes.json());
        }
      }

      if (permissions?.canViewReports) {
        const statsRes = await fetch(`${API_URL}/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (statsRes.ok) {
          setStats(await statsRes.json());
        }
      }
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

  const getAdminTitle = () => {
    switch (user?.role) {
      case 'admin_ti': return 'Painel TI';
      case 'admin_professor': return 'Painel do Professor';
      case 'admin_juridico': return 'Painel Jurídico';
      case 'admin_contabil': return 'Painel Contábil';
      case 'admin_psicossocial': return 'Painel Psicossocial';
      default: return 'Painel Administrativo';
    }
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'admin_ti': return '💻';
      case 'admin_professor': return '🏊';
      case 'admin_juridico': return '⚖️';
      case 'admin_contabil': return '📊';
      case 'admin_psicossocial': return '🧠';
      default: return '👤';
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
          <span className="nav-section-title">Principal</span>
          <button 
            className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <span className="nav-icon">📊</span>
            Visão Geral
          </button>
          
          {/* TI pode validar usuários */}
          {user?.role === 'admin_ti' && (
            <button 
              className={`nav-item ${activeSection === 'validation' ? 'active' : ''}`}
              onClick={() => setActiveSection('validation')}
            >
              <span className="nav-icon">✅</span>
              Validar Cadastros
            </button>
          )}
          
          {permissions?.canManageStudents && (
            <button 
              className={`nav-item ${activeSection === 'students' ? 'active' : ''}`}
              onClick={() => setActiveSection('students')}
            >
              <span className="nav-icon">🎓</span>
              Alunos
            </button>
          )}
          
          {permissions?.canManageClasses && (
            <>
              <button 
                className={`nav-item ${activeSection === 'classes' ? 'active' : ''}`}
                onClick={() => setActiveSection('classes')}
              >
                <span className="nav-icon">🏊</span>
                Aulas
              </button>
              <button 
                className={`nav-item ${activeSection === 'performance' ? 'active' : ''}`}
                onClick={() => setActiveSection('performance')}
              >
                <span className="nav-icon">📊</span>
                Performance
              </button>
            </>
          )}
          
          {permissions?.canManageFinances && (
            <button 
              className={`nav-item ${activeSection === 'finances' ? 'active' : ''}`}
              onClick={() => setActiveSection('finances')}
            >
              <span className="nav-icon">💰</span>
              Financeiro
            </button>
          )}
          
          {permissions?.canManageEditals && (
            <button 
              className={`nav-item ${activeSection === 'editals' ? 'active' : ''}`}
              onClick={() => setActiveSection('editals')}
            >
              <span className="nav-icon">📋</span>
              Editais
            </button>
          )}
          
          {permissions?.canManageSystem && (
            <>
              <span className="nav-section-title">Sistema</span>
              <button 
                className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveSection('settings')}
              >
                <span className="nav-icon">⚙️</span>
                Configurações
              </button>
            </>
          )}
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
            <h1>{getAdminTitle()}</h1>
            <p>Bem-vinde, {user?.nome}</p>
          </div>
          <div className="header-user">
            <span className="user-role">{getRoleIcon()} {permissions?.label}</span>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Validação de Usuários (apenas TI) */}
          {activeSection === 'validation' && user?.role === 'admin_ti' && (
            <section className="dashboard-section">
              <h2 className="section-title">Validar Novos Cadastros</h2>
              <UserValidation />
            </section>
          )}

          {/* Stats */}
          {activeSection === 'overview' && permissions?.canViewReports && stats && (
            <section id="overview" className="dashboard-section">
              <h2 className="section-title">Resumo</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-icon">🎓</span>
                  <div className="stat-info">
                    <span className="stat-value">{stats.totalAlunos}</span>
                    <span className="stat-label">Alunos</span>
                  </div>
                </div>
                <div className="stat-card success">
                  <span className="stat-icon">✅</span>
                  <div className="stat-info">
                    <span className="stat-value">{stats.pagamentosEmDia}</span>
                    <span className="stat-label">Em Dia</span>
                  </div>
                </div>
            </div>
          </section>
          )}

          {/* Students List - Para professores, jurídico, psicossocial */}
          {activeSection === 'students' && permissions?.canManageStudents && (
            <section id="students" className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Alunos</h2>
              </div>
              <div className="table-container">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>E-mail</th>
                      <th>Status Pagamento</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.nome}</td>
                        <td>{student.email}</td>
                        <td>
                          <span className={`status-badge ${student.dadosAluno?.statusPagamento === 'em_dia' ? 'active' : 'pending'}`}>
                            {student.dadosAluno?.statusPagamento === 'em_dia' ? 'Em Dia' : 'Pendente'}
                          </span>
                        </td>
                        <td>
                          <button className="btn-icon" title="Ver detalhes">👁️</button>
                          {permissions?.canManageClasses && (
                            <button className="btn-icon" title="Registrar aula">📝</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Performance de Natação (Professor) */}
          {activeSection === 'performance' && permissions?.canManageClasses && (
            <section className="dashboard-section">
              <h2 className="section-title">Performance de Natação</h2>
              <PerformanceManager />
            </section>
          )}

          {/* Specific panels based on role */}
          {activeSection === 'students' && user?.role === 'admin_professor' && (
            <section className="dashboard-section">
              <h2 className="section-title">Registrar Presença/Avaliação</h2>
              <div className="form-card">
                <p>Selecione um aluno na tabela acima para registrar presença e avaliação.</p>
              </div>
            </section>
          )}

          {activeSection === 'students' && user?.role === 'admin_psicossocial' && (
            <section className="dashboard-section">
              <h2 className="section-title">Atendimentos Psicossociais</h2>
              <div className="form-card">
                <p>Selecione um aluno na tabela acima para registrar atendimento.</p>
              </div>
            </section>
          )}

          {user?.role === 'admin_contabil' && (
            <section id="finances" className="dashboard-section">
              <h2 className="section-title">Gestão Financeira</h2>
              <div className="quick-actions">
                <button className="action-card">
                  <span className="action-icon">📥</span>
                  <span className="action-text">Registrar Entrada</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">📤</span>
                  <span className="action-text">Registrar Saída</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">📊</span>
                  <span className="action-text">Relatório Mensal</span>
                </button>
              </div>
            </section>
          )}

          {activeSection === 'editals' && user?.role === 'admin_juridico' && (
            <section id="editals" className="dashboard-section">
              <h2 className="section-title">Editais e Documentos</h2>
              <div className="quick-actions">
                <button className="action-card">
                  <span className="action-icon">📋</span>
                  <span className="action-text">Novo Edital</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">📄</span>
                  <span className="action-text">Documentos</span>
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
