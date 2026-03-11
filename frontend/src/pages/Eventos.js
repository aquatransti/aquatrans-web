import React from 'react';
import './Eventos.css';

const Eventos = () => {
  const eventosCompletos = [
    {
      id: 1,
      titulo: 'Aulas de Natação Semanais',
      descricao: 'Aulas de natação para pessoas trans e não-binárias em ambiente acolhedor e seguro. Instrutores capacitados em diversidade de gênero.',
      tipo: 'recorrente',
      data: 'Semanal',
      local: 'A definir',
      valor: 'R$ 20, R$ 40 ou R$ 60',
      status: 'ativo',
      icon: '🏊'
    },
    {
      id: 2,
      titulo: 'Marcha Transmasculina',
      descricao: 'Participação do Aquatrans na Marcha Transmasculina em São Paulo. Uma celebração da identidade transmasculina e não-binária.',
      tipo: 'unico',
      data: 'A confirmar',
      local: 'São Paulo - SP',
      valor: 'Gratuito',
      status: 'planejado',
      icon: '🏳️‍⚧️'
    },
    {
      id: 3,
      titulo: 'Reunião Mensal com Alunos',
      descricao: 'Reunião de prestação de contas e feedback com os alunos do projeto. Um momento de escuta e construção coletiva.',
      tipo: 'recorrente',
      data: 'Mensal',
      local: 'Online / Presencial',
      valor: 'Gratuito',
      status: 'ativo',
      icon: '🤝'
    },
    {
      id: 4,
      titulo: 'Workshop de Diversidade',
      descricao: 'Workshop de letramento em diversidade de gênero e sexualidade para profissionais e público em geral.',
      tipo: 'unico',
      data: 'A definir',
      local: 'A definir',
      valor: 'A definir',
      status: 'planejado',
      icon: '🎓'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ativo':
        return <span className="status-badge status-ativo">Ativo</span>;
      case 'planejado':
        return <span className="status-badge status-planejado">Em Planejamento</span>;
      case 'encerrado':
        return <span className="status-badge status-encerrado">Encerrado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="eventos-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="hero-badge">Agenda</span>
          <h1 className="page-title">Eventos e Atividades</h1>
          <p className="page-subtitle">
            Confira nossa programação de eventos, aulas e atividades
          </p>
        </div>
      </section>

      {/* Eventos Grid */}
      <section className="section">
        <div className="container">
          <div className="eventos-grid">
            {eventosCompletos.map((evento) => (
              <div key={evento.id} className="evento-card">
                <div className="evento-header">
                  <span className="evento-icon">{evento.icon}</span>
                  {getStatusBadge(evento.status)}
                </div>
                <h3 className="evento-titulo">{evento.titulo}</h3>
                <p className="evento-descricao">{evento.descricao}</p>
                <div className="evento-info">
                  <div className="info-item">
                    <span className="info-icon">📅</span>
                    <span>{evento.data}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <span>{evento.local}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">💰</span>
                    <span>{evento.valor}</span>
                  </div>
                </div>
                <span className={`evento-tipo tipo-${evento.tipo}`}>
                  {evento.tipo === 'recorrente' ? 'Recorrente' : 'Evento Único'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendário Info */}
      <section className="section calendario-section">
        <div className="container">
          <div className="calendario-content">
            <div className="calendario-text">
              <h2>Acompanhe Nossa Agenda</h2>
              <p>
                Nossos eventos e atividades são planejados com carinho para atender 
                às necessidades da comunidade trans e não-binária. Fique atente às 
                nossas redes sociais para novidades e atualizações.
              </p>
              <div className="social-links">
                <a href="https://www.instagram.com/aquatrans.oficial/" target="_blank" rel="noopener noreferrer" className="social-btn">
                  📸 Instagram
                </a>
                <a href="https://facebook.com/aquatrans" target="_blank" rel="noopener noreferrer" className="social-btn">
                  📘 Facebook
                </a>
              </div>
            </div>
            <div className="calendario-destaque">
              <h3>Próximos Destaques</h3>
              <ul className="destaques-lista">
                <li>
                  <span className="destaque-icon">🏊</span>
                  <div>
                    <strong>Aulas de Natação</strong>
                    <p>Toda semana</p>
                  </div>
                </li>
                <li>
                  <span className="destaque-icon">🏳️‍⚧️</span>
                  <div>
                    <strong>Marcha Transmasculina</strong>
                    <p>São Paulo - Data a confirmar</p>
                  </div>
                </li>
                <li>
                  <span className="destaque-icon">🎉</span>
                  <div>
                    <strong>Lançamento do Site</strong>
                    <p>Em breve!</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Quer participar de um evento?</h2>
            <p>Entre em contato para saber mais sobre nossas atividades e como participar</p>
            <a href="/contato" className="btn btn-primary">
              Quero Participar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Eventos;
