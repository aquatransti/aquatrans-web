import React, { useState, useEffect } from 'react';
import './Equipe.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003/api';

const Equipe = () => {
  const [equipe, setEquipe] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEquipe();
  }, []);

  const fetchEquipe = async () => {
    try {
      const response = await fetch(`${API_URL}/equipe`);
      const data = await response.json();
      setEquipe(data);
    } catch (error) {
      console.error('Erro ao carregar equipe:', error);
      // Dados fallback
      setEquipe([
        { id: 1, nome: 'Maya', cargo: 'Coordenação Geral', foto: null },
        { id: 2, nome: 'Maria Elis Costa Alencar', cargo: 'Equipe', foto: null },
        { id: 3, nome: 'Marcelo Silva', cargo: 'Equipe Técnica', foto: null },
        { id: 4, nome: 'Mario Alves', cargo: 'Captação de Recursos', foto: null },
        { id: 5, nome: 'Iracema Vieira', cargo: 'Equipe', foto: null },
        { id: 6, nome: 'Caesar Lima', cargo: 'TI', foto: null },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (nome) => {
    return nome
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getColorClass = (index) => {
    const colors = ['blue', 'pink', 'purple', 'teal'];
    return colors[index % colors.length];
  };

  return (
    <div className="equipe-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="hero-badge">Quem Faz Acontecer</span>
          <h1 className="page-title">Nossa Equipe</h1>
          <p className="page-subtitle">
            Conheça as pessoas que dedicam tempo e energia para tornar o Aquatrans realidade
          </p>
        </div>
      </section>

      {/* Equipe Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Carregando equipe...</p>
            </div>
          ) : (
            <div className="equipe-grid">
              {equipe.map((membro, index) => (
                <div key={membro.id} className="membro-card">
                  <div className={`membro-avatar ${getColorClass(index)}`}>
                    {membro.foto ? (
                      <img src={membro.foto} alt={membro.nome} />
                    ) : (
                      <span>{getInitials(membro.nome)}</span>
                    )}
                  </div>
                  <h3 className="membro-nome">{membro.nome}</h3>
                  <span className="membro-cargo">{membro.cargo}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Setores */}
      <section className="section setores-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nossos Setores</h2>
            <p className="section-subtitle">
              O Aquatrans é organizado em diferentes frentes de trabalho
            </p>
          </div>
          <div className="setores-grid">
            <div className="setor-card">
              <span className="setor-icon">📊</span>
              <h4>Captação de Recursos</h4>
              <p>Busca de editais, patrocínios, parcerias e financiamento coletivo</p>
            </div>
            <div className="setor-card">
              <span className="setor-icon">💻</span>
              <h4>TI</h4>
              <p>Desenvolvimento do site, sistemas e infraestrutura digital</p>
            </div>
            <div className="setor-card">
              <span className="setor-icon">📢</span>
              <h4>Comunicação</h4>
              <p>Redes sociais, divulgação e relacionamento com o público</p>
            </div>
            <div className="setor-card">
              <span className="setor-icon">🏊</span>
              <h4>Equipe Técnica</h4>
              <p>Profissionais de educação física e instrutores de natação</p>
            </div>
            <div className="setor-card">
              <span className="setor-icon">⚖️</span>
              <h4>Jurídico</h4>
              <p>Suporte legal e atendimento jurídico à comunidade</p>
            </div>
            <div className="setor-card">
              <span className="setor-icon">💰</span>
              <h4>Financeiro</h4>
              <p>Controle financeiro, prestação de contas e transparência</p>
            </div>
          </div>
        </div>
      </section>

      {/* Faça Parte */}
      <section className="section join-section">
        <div className="container">
          <div className="join-content">
            <h2>Quer fazer parte da equipe?</h2>
            <p>
              Estamos sempre em busca de pessoas comprometidas com a causa trans. 
              Se você tem habilidades em comunicação, educação física, captação de recursos, 
              TI ou outras áreas, entre em contato conosco!
            </p>
            <a href="/contato" className="btn btn-primary">
              Quero Ser Voluntárie
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Equipe;
