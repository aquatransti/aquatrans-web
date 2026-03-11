import React from 'react';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className="sobre-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="hero-badge">Nossa História</span>
          <h1 className="page-title">Sobre o Aquatrans</h1>
          <p className="page-subtitle">
            Uma associação criada para e pela comunidade trans e não-binária
          </p>
        </div>
      </section>

      {/* Missão */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <span className="mission-icon">🎯</span>
              <h3>Nossa Missão</h3>
              <p>
                Promover a inclusão, bem-estar e qualidade de vida de pessoas trans 
                e não-binárias através de atividades aquáticas, atendimento 
                psicossocial e jurídico em um ambiente seguro e acolhedor.
              </p>
            </div>
            <div className="mission-card">
              <span className="mission-icon">👁️</span>
              <h3>Nossa Visão</h3>
              <p>
                Ser referência em inclusão e acolhimento para a comunidade trans, 
                expandindo nosso alcance e impacto social, tornando as aulas 
                totalmente gratuitas e acessíveis a todes.
              </p>
            </div>
            <div className="mission-card">
              <span className="mission-icon">💜</span>
              <h3>Nossos Valores</h3>
              <p>
                Respeito, acolhimento, transparência, coletividade e 
                compromisso com a comunidade trans e não-binária. Acreditamos 
                no poder transformador do esporte inclusivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="section history-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nossa Trajetória</h2>
          </div>
          <div className="history-content">
            <div className="history-text">
              <p>
                O Aquatrans nasceu da necessidade de criar um espaço onde pessoas 
                trans e não-binárias pudessem praticar atividades físicas sem 
                enfrentar discriminação, olhares julgadores ou desconforto.
              </p>
              <p>
                Sabemos que piscinas e ambientes esportivos podem ser lugares 
                hostis para pessoas trans. A exposição do corpo, os vestiários 
                binários e o desconhecimento sobre identidades de gênero são 
                barreiras reais que afastam nossa comunidade do esporte.
              </p>
              <p>
                Por isso, criamos um projeto que vai além das aulas de natação: 
                construímos uma comunidade de apoio mútuo, onde cada pessoa é 
                respeitada em sua identidade e tem espaço para ser quem é.
              </p>
            </div>
            <div className="history-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">🏊</span>
                <span className="highlight-text">Aulas de natação inclusivas</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🤝</span>
                <span className="highlight-text">Parceria com Rio sem LGBTfobia</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">📋</span>
                <span className="highlight-text">Formalização do CNPJ em andamento</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">💰</span>
                <span className="highlight-text">Apoio do FundoELAS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Princípios */}
      <section className="section principles-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Como Atuamos</h2>
            <p className="section-subtitle">
              Nossos princípios guiam todas as nossas ações
            </p>
          </div>
          <div className="principles-grid">
            <div className="principle-card">
              <h4>Acessibilidade</h4>
              <p>
                Valores flexíveis (R$ 20, R$ 40 ou R$ 60) de acordo com a 
                possibilidade de cada pessoa. Ninguém fica de fora por questões 
                financeiras.
              </p>
            </div>
            <div className="principle-card">
              <h4>Transparência</h4>
              <p>
                Prestação de contas regular, reuniões mensais com alunes e 
                comunicação clara sobre o uso dos recursos.
              </p>
            </div>
            <div className="principle-card">
              <h4>Capacitação</h4>
              <p>
                Treinamento da equipe técnica em diversidade de gênero e 
                sexualidade para um atendimento respeitoso e informado.
              </p>
            </div>
            <div className="principle-card">
              <h4>Sustentabilidade</h4>
              <p>
                Diversificação de fontes de recursos através de editais, 
                patrocínios, apadrinhamento e financiamento coletivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Quer fazer parte?</h2>
            <p>
              Seja como alune, voluntárie, apoiadore ou parceire, 
              você é bem-vinde no Aquatrans.
            </p>
            <a href="/contato" className="btn btn-primary">
              Entre em Contato
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
