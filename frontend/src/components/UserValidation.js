import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './UserValidation.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const UserValidation = () => {
  const { getToken } = useAuth();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const token = getToken();
    try {
      const [pendingRes, rolesRes, historyRes] = await Promise.all([
        fetch(`${API_URL}/validation/pending`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/validation/roles`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/validation/history`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (pendingRes.ok) setPendingUsers(await pendingRes.json());
      if (rolesRes.ok) setRoles(await rolesRes.json());
      if (historyRes.ok) setHistory(await historyRes.json());
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedUser || !selectedRole) {
      setMessage({ type: 'error', text: 'Selecione um perfil para o usuário' });
      return;
    }

    setProcessing(true);
    const token = getToken();

    try {
      const response = await fetch(`${API_URL}/validation/approve/${selectedUser.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: selectedRole })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: `${selectedUser.nome} foi aprovade! Email de convite enviado.`,
          previewUrl: data.email?.previewUrl
        });
        setSelectedUser(null);
        setSelectedRole('');
        fetchData();
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro ao aprovar usuário' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedUser) return;

    setProcessing(true);
    const token = getToken();

    try {
      const response = await fetch(`${API_URL}/validation/reject/${selectedUser.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ motivo: rejectReason })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Cadastro de ${selectedUser.nome} foi rejeitado.` });
        setShowRejectModal(false);
        setSelectedUser(null);
        setRejectReason('');
        fetchData();
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro ao rejeitar usuário' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleLabel = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role?.label || roleId;
  };

  if (loading) {
    return (
      <div className="validation-loading">
        <div className="loading-spinner"></div>
        <p>Carregando cadastros...</p>
      </div>
    );
  }

  return (
    <div className="user-validation">
      {/* Message */}
      {message && (
        <div className={`validation-message ${message.type}`}>
          <span>{message.type === 'success' ? '✅' : '❌'}</span>
          <div>
            <p>{message.text}</p>
            {message.previewUrl && (
              <a href={message.previewUrl} target="_blank" rel="noopener noreferrer" className="preview-link">
                Ver email enviado (teste)
              </a>
            )}
          </div>
          <button onClick={() => setMessage(null)}>×</button>
        </div>
      )}

      {/* Tabs */}
      <div className="validation-tabs">
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pendentes ({pendingUsers.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Histórico
        </button>
      </div>

      {/* Google Forms Info */}
      <div className="google-forms-info">
        <h4>📋 Integração com Google Forms</h4>
        <p>
          Os cadastros chegam automaticamente do formulário de inscrição do Aquatrans. 
          Valide cada cadastro e escolha o perfil adequado.
        </p>
        <details>
          <summary>Ver configuração do webhook</summary>
          <code>
            POST {API_URL}/validation/webhook/google-forms?apiKey=aquatrans-forms-key-2026
          </code>
        </details>
      </div>

      {activeTab === 'pending' ? (
        <>
          {pendingUsers.length === 0 ? (
            <div className="no-pending">
              <span className="no-pending-icon">🎉</span>
              <h3>Nenhum cadastro pendente!</h3>
              <p>Todos os cadastros foram validados.</p>
            </div>
          ) : (
            <div className="validation-content">
              {/* Lista de usuários pendentes */}
              <div className="pending-list">
                <h3>Cadastros Pendentes</h3>
                {pendingUsers.map(user => (
                  <div 
                    key={user.id} 
                    className={`pending-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedUser(user);
                      setSelectedRole('');
                    }}
                  >
                    <div className="pending-card-header">
                      <span className="pending-name">{user.nome}</span>
                      <span className="pending-date">{formatDate(user.dataInscricao)}</span>
                    </div>
                    <div className="pending-card-body">
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Interesse:</strong> {user.interesse}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detalhes do usuário selecionado */}
              {selectedUser && (
                <div className="user-details">
                  <h3>Detalhes do Cadastro</h3>
                  
                  <div className="details-grid">
                    <div className="detail-item">
                      <label>Nome Completo</label>
                      <span>{selectedUser.nome}</span>
                    </div>
                    <div className="detail-item">
                      <label>E-mail</label>
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="detail-item">
                      <label>Telefone</label>
                      <span>{selectedUser.telefone || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <label>CPF</label>
                      <span>{selectedUser.cpf || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Data de Nascimento</label>
                      <span>{selectedUser.dataNascimento || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Como conheceu</label>
                      <span>{selectedUser.comoConheceu || '-'}</span>
                    </div>
                    <div className="detail-item full-width">
                      <label>Interesse</label>
                      <span>{selectedUser.interesse || '-'}</span>
                    </div>
                    {selectedUser.observacoes && (
                      <div className="detail-item full-width">
                        <label>Observações</label>
                        <span>{selectedUser.observacoes}</span>
                      </div>
                    )}
                  </div>

                  {/* Seleção de perfil */}
                  <div className="role-selection">
                    <h4>Selecione o perfil:</h4>
                    <div className="roles-grid">
                      {roles.map(role => (
                        <label 
                          key={role.id} 
                          className={`role-option ${selectedRole === role.id ? 'selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.id}
                            checked={selectedRole === role.id}
                            onChange={(e) => setSelectedRole(e.target.value)}
                          />
                          <span className="role-label">{role.label}</span>
                          <span className="role-desc">{role.description}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="validation-actions">
                    <button 
                      className="btn btn-success"
                      onClick={handleApprove}
                      disabled={!selectedRole || processing}
                    >
                      {processing ? 'Processando...' : '✅ Aprovar e Enviar Convite'}
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => setShowRejectModal(true)}
                      disabled={processing}
                    >
                      ❌ Rejeitar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        /* Histórico */
        <div className="history-list">
          <h3>Histórico de Validações</h3>
          {history.length === 0 ? (
            <p className="no-history">Nenhuma validação realizada ainda.</p>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Perfil</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {history.map(user => (
                  <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status === 'aprovado' ? '✅ Aprovado' : '❌ Rejeitado'}
                      </span>
                    </td>
                    <td>{user.roleAtribuido ? getRoleLabel(user.roleAtribuido) : '-'}</td>
                    <td>{user.dataValidacao ? formatDate(user.dataValidacao) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal de Rejeição */}
      {showRejectModal && (
        <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRejectModal(false)}>×</button>
            
            <h2>Rejeitar Cadastro</h2>
            <p>Você está prestes a rejeitar o cadastro de <strong>{selectedUser?.nome}</strong>.</p>
            
            <div className="form-group">
              <label>Motivo da rejeição (opcional)</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Informe o motivo da rejeição..."
                rows={4}
              />
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowRejectModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleReject}
                disabled={processing}
              >
                {processing ? 'Processando...' : 'Confirmar Rejeição'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserValidation;
