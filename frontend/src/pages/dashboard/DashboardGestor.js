import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserValidation from '../../components/UserValidation';
import PerformanceManager from '../../components/PerformanceManager';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const DashboardGestor = () => {
  const { user, logout, getToken, isGestor } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (!isGestor()) {
      navigate('/login');
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGestor, navigate]);

  const fetchData = async () => {
    const token = getToken();
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/admin/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
      if (usersRes.ok) {
        setUsers(await usersRes.json());
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

  const getRoleLabel = (role) => {
    const labels = {
      gestor: 'Gestor',
      admin_ti: 'TI',
      admin_professor: 'Professor',
      admin_juridico: 'Jurídico',
      admin_contabil: 'Contábil',
      admin_psicossocial: 'Psicossocial',
      aluno: 'Aluno'
    };
    return labels[role] || role;
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
          <button 
            className={`nav-item ${activeSection === 'validation' ? 'active' : ''}`}
            onClick={() => setActiveSection('validation')}
          >
            <span className="nav-icon">✅</span>
            Validar Cadastros
          </button>
          <button 
            className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <span className="nav-icon">👥</span>
            Usuários
          </button>
          <button 
            className={`nav-item ${activeSection === 'students' ? 'active' : ''}`}
            onClick={() => setActiveSection('students')}
          >
            <span className="nav-icon">🎓</span>
            Alunos
          </button>
          <button 
            className={`nav-item ${activeSection === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveSection('performance')}
          >
            <span className="nav-icon">📊</span>
            Performance
          </button>
          
          <span className="nav-section-title">Gestão</span>
          <button 
            className={`nav-item ${activeSection === 'finances' ? 'active' : ''}`}
            onClick={() => setActiveSection('finances')}
          >
            <span className="nav-icon">💰</span>
            Financeiro
          </button>
          <button 
            className={`nav-item ${activeSection === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveSection('classes')}
          >
            <span className="nav-icon">🏊</span>
            Aulas
          </button>
          <button 
            className={`nav-item ${activeSection === 'editals' ? 'active' : ''}`}
            onClick={() => setActiveSection('editals')}
          >
            <span className="nav-icon">📋</span>
            Editais
          </button>
          
          <span className="nav-section-title">Sistema</span>
          <button 
            className={`nav-item ${activeSection === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveSection('reports')}
          >
            <span className="nav-icon">📈</span>
            Relatórios
          </button>
          <button 
            className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            <span className="nav-icon">⚙️</span>
            Configurações
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
            <h1>Dashboard do Gestor</h1>
            <p>Bem-vinde, {user?.nome}</p>
          </div>
          <div className="header-user">
            <span className="user-role">👑 {getRoleLabel(user?.role)}</span>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Validação de Usuários */}
          {activeSection === 'validation' && (
            <section className="dashboard-section">
              <h2 className="section-title">Validar Novos Cadastros</h2>
              <UserValidation />
            </section>
          )}

          {/* Performance de Natação */}
          {activeSection === 'performance' && (
            <section className="dashboard-section">
              <h2 className="section-title">Performance de Natação</h2>
              <PerformanceManager />
            </section>
          )}

          {/* Stats Cards */}
          {activeSection === 'overview' && (
          <section id="overview" className="dashboard-section">
            <h2 className="section-title">Visão Geral</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">👥</span>
                <div className="stat-info">
                  <span className="stat-value">{stats?.totalUsuarios || 0}</span>
                  <span className="stat-label">Usuários</span>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🎓</span>
                <div className="stat-info">
                  <span className="stat-value">{stats?.totalAlunos || 0}</span>
                  <span className="stat-label">Alunos</span>
                </div>
              </div>
              <div className="stat-card success">
                <span className="stat-icon">✅</span>
                <div className="stat-info">
                  <span className="stat-value">{stats?.pagamentosEmDia || 0}</span>
                  <span className="stat-label">Em Dia</span>
                </div>
              </div>
              <div className="stat-card warning">
                <span className="stat-icon">⚠️</span>
                <div className="stat-info">
                  <span className="stat-value">{stats?.pagamentosPendentes || 0}</span>
                  <span className="stat-label">Pendentes</span>
                </div>
              </div>
            </div>
          </section>
          )}

          {/* Users Table */}
          {activeSection === 'users' && (
          <section id="users" className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Usuários do Sistema</h2>
              <button className="btn btn-primary btn-sm">+ Novo Usuário</button>
            </div>
            <div className="table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Perfil</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nome}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-badge role-${u.role}`}>
                          {getRoleLabel(u.role)}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${u.ativo ? 'active' : 'inactive'}`}>
                          {u.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>
                        <button className="btn-icon" title="Editar">✏️</button>
                        <button className="btn-icon" title="Visualizar">👁️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          )}

          {/* Quick Actions */}
          {activeSection === 'overview' && (
          <section className="dashboard-section">
            <h2 className="section-title">Ações Rápidas</h2>
            <div className="quick-actions">
              <button className="action-card">
                <span className="action-icon">➕</span>
                <span className="action-text">Cadastrar Aluno</span>
              </button>
              <button className="action-card">
                <span className="action-icon">📊</span>
                <span className="action-text">Gerar Relatório</span>
              </button>
              <button className="action-card">
                <span className="action-icon">💰</span>
                <span className="action-text">Ver Financeiro</span>
              </button>
              <button className="action-card" onClick={() => setActiveSection('validation')}>
                <span className="action-icon">✅</span>
                <span className="action-text">Validar Cadastros</span>
              </button>
            </div>
          </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardGestor;
