import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import './FinalizarCadastro.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const FinalizarCadastro = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [inviteData, setInviteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Token não fornecido');
      setLoading(false);
      return;
    }
    
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await fetch(`${API_URL}/validation/invite/${token}`);
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Token inválido');
      } else {
        setInviteData(data);
      }
    } catch (err) {
      setError('Erro ao verificar convite');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/validation/complete-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Erro ao finalizar cadastro');
      } else {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleLabel = (role) => {
    const labels = {
      aluno: 'Aluno(a)',
      admin_professor: 'Professor(a)',
      admin_juridico: 'Equipe Jurídica',
      admin_contabil: 'Equipe Contábil',
      admin_psicossocial: 'Equipe Psicossocial',
      admin_ti: 'Equipe de TI',
      gestor: 'Gestor(a)'
    };
    return labels[role] || role;
  };

  if (loading) {
    return (
      <div className="finalizar-page">
        <div className="finalizar-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Verificando convite...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!inviteData && error) {
    return (
      <div className="finalizar-page">
        <div className="finalizar-container">
          <div className="error-state">
            <span className="error-icon">❌</span>
            <h1>Convite Inválido</h1>
            <p>{error}</p>
            <p className="error-help">
              O link pode ter expirado ou já foi utilizado. 
              Entre em contato com a administração do Aquatrans.
            </p>
            <Link to="/" className="btn btn-primary">
              Voltar ao Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="finalizar-page">
        <div className="finalizar-container">
          <div className="success-state">
            <span className="success-icon">🎉</span>
            <h1>Cadastro Finalizado!</h1>
            <p>Bem-vinde ao Aquatrans, <strong>{inviteData.nome}</strong>!</p>
            <p>Você já pode fazer login com seu email e senha.</p>
            <p className="redirect-notice">Redirecionando para o login...</p>
            <Link to="/login" className="btn btn-primary">
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="finalizar-page">
      <div className="finalizar-container">
        <div className="finalizar-header">
          <Link to="/" className="finalizar-logo">
            <img src="/logo_aquatrans.jpg" alt="Aquatrans" className="logo-image" />
            <span className="logo-text">Aquatrans</span>
          </Link>
          <h1>Finalize seu Cadastro</h1>
          <p>Crie sua senha para acessar o sistema</p>
        </div>

        <div className="invite-info">
          <div className="invite-detail">
            <label>Nome</label>
            <span>{inviteData.nome}</span>
          </div>
          <div className="invite-detail">
            <label>E-mail</label>
            <span>{inviteData.email}</span>
          </div>
          <div className="invite-detail">
            <label>Perfil</label>
            <span className="role-badge">{getRoleLabel(inviteData.role)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="finalizar-form">
          {error && (
            <div className="form-error">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Criar Senha</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
                disabled={submitting}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Digite a senha novamente"
              minLength={6}
              required
              disabled={submitting}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-submit"
            disabled={submitting}
          >
            {submitting ? 'Finalizando...' : 'Finalizar Cadastro'}
          </button>
        </form>

        <div className="finalizar-footer">
          <p>
            Já tem uma conta? <Link to="/login">Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalizarCadastro;
