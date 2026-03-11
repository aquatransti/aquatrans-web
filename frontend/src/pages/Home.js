import React from 'react';
import { Link } from 'react-router-dom';
import InstagramFeed from '../components/InstagramFeed';
import './Home.css';

const Home = () => {
  const servicos = [
    {
      icon: '🏊',
      title: 'Aulas de Natação',
      description: 'Ambiente seguro e acolhedor para pessoas trans e não-binárias.'
    },
    {
      icon: '🧠',
      title: 'Atendimento Psicossocial',
      description: 'Suporte psicossocial especializado e humanizado.'
    },
    {
      icon: '⚖️',
      title: 'Atendimento Jurídico',
      description: 'Orientação jurídica gratuita para a comunidade.'
    },
    {
      icon: '🎓',
      title: 'Consultoria de Diversidade',
      description: 'Treinamento em diversidade de gênero e sexualidade.'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-wave hero-wave-1"></div>
          <div className="hero-wave hero-wave-2"></div>
          <div className="hero-wave hero-wave-3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Associação Trans</span>
            <h1 className="hero-title">
              Bem-vindx ao <span className="text-gradient">Aquatrans</span>
            </h1>
            <p className="hero-subtitle">
              Somos uma associação dedicada a promover inclusão, bem-estar e 
              comunidade para pessoas trans e não-binárias através de atividades 
              aquáticas e apoio social.
            </p>
            <div className="hero-buttons">
              <Link to="/sobre" className="btn btn-primary">
                Conheça Nossa História
              </Link>
              <Link to="/contato" className="btn btn-secondary">
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section className="section about-preview">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="badge">Quem Somos</span>
              <h2 className="section-title">Natação com Acolhimento</h2>
              <p>
                O Aquatrans nasceu da necessidade de criar espaços seguros onde 
                pessoas trans e não-binárias possam praticar atividades físicas 
                sem medo de discriminação.
              </p>
              <p>
                Acreditamos que o acesso ao esporte e ao bem-estar é um direito 
                de todas as pessoas, independentemente de sua identidade de gênero.
              </p>
              <Link to="/sobre" className="btn btn-outline">
                Saiba Mais →
              </Link>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <span className="stat-icon">🏳️‍⚧️</span>
                <span className="stat-number">100%</span>
                <span className="stat-label">Inclusivo</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">💙</span>
                <span className="stat-number">R$45k</span>
                <span className="stat-label">Fundo FundoELAS</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🤝</span>
                <span className="stat-number">Sem</span>
                <span className="stat-label">Fins Lucrativos</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🌊</span>
                <span className="stat-number">∞</span>
                <span className="stat-label">Acolhimento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section className="section services-preview">
        <div className="container">
          <div className="section-header">
            <span className="badge">O Que Oferecemos</span>
            <h2 className="section-title">Nossos Serviços</h2>
            <p className="section-subtitle">
              Oferecemos diversos serviços para apoiar e acolher a comunidade trans
            </p>
          </div>
          
          <div className="services-grid">
            {servicos.map((servico, index) => (
              <div key={index} className="service-card card">
                <span className="service-icon">{servico.icon}</span>
                <h3 className="service-title">{servico.title}</h3>
                <p className="service-description">{servico.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
            <Link to="/servicos" className="btn btn-primary">
              Ver Todos os Serviços
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Valores Section */}
      <section className="section values-section">
        <div className="container">
          <div className="values-content">
            <h2 className="section-title">Valores Acessíveis</h2>
            <p className="values-text">
              Nossos valores de mensalidade são flexíveis, de acordo com a 
              possibilidade de cada pessoa:
            </p>
            <div className="pricing-options">
              <div className="pricing-card">
                <span className="pricing-value">R$ 20</span>
                <span className="pricing-label">por mês</span>
              </div>
              <div className="pricing-card pricing-featured">
                <span className="pricing-value">R$ 40</span>
                <span className="pricing-label">por mês</span>
              </div>
              <div className="pricing-card">
                <span className="pricing-value">R$ 60</span>
                <span className="pricing-label">por mês</span>
              </div>
            </div>
            <p className="values-note">
              * Trabalhamos para que um dia as aulas possam ser totalmente gratuitas
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Faça Parte da Nossa Comunidade</h2>
            <p className="cta-text">
              Junte-se a nós e ajude a construir um espaço mais inclusivo e acolhedor
            </p>
            <div className="cta-buttons">
              <Link to="/contato" className="btn btn-primary">
                Quero Participar
              </Link>
              <Link to="/apadrinhamento" className="btn btn-secondary">
                💜 Apoie o Projeto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
