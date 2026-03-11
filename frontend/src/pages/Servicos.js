import React from 'react';
import './Servicos.css';

const Servicos = () => {
  const servicosDetalhados = [
    {
      titulo: 'Aulas de Natação',
      icon: '🏊',
      descricao: 'Nossas aulas de natação são realizadas em ambiente seguro e acolhedor, onde pessoas trans e não-binárias podem praticar atividades aquáticas sem medo de discriminação.',
      beneficios: [
        'Instrutores capacitados em diversidade de gênero',
        'Ambiente inclusivo e respeitoso',
        'Turmas reduzidas para maior conforto',
        'Vestiários seguros e acolhedores',
        'Desenvolvimento físico e emocional'
      ],
      valores: ['R$ 20', 'R$ 40', 'R$ 60'],
      nota: 'Valores flexíveis de acordo com sua possibilidade'
    },
    {
      titulo: 'Atendimento Psicossocial',
      icon: '🧠',
      descricao: 'Oferecemos suporte psicossocial especializado para pessoas trans e não-binárias, com profissionais capacitados e sensíveis às questões da comunidade.',
      beneficios: [
        'Psicólogos com experiência em questões de gênero',
        'Ambiente acolhedor e sem julgamentos',
        'Atendimento individual e em grupo',
        'Suporte para transição de gênero',
        'Acompanhamento contínuo'
      ],
      disponibilidade: 'Consulte disponibilidade'
    },
    {
      titulo: 'Atendimento Jurídico',
      icon: '⚖️',
      descricao: 'Orientação jurídica gratuita para questões relacionadas a retificação de nome e gênero em documentos, discriminação, direitos trabalhistas e outros.',
      beneficios: [
        'Advogados especializados em direitos LGBTQIA+',
        'Orientação para retificação de documentos',
        'Suporte em casos de discriminação',
        'Informações sobre direitos',
        'Encaminhamento para órgãos competentes'
      ],
      disponibilidade: 'Agendamento prévio necessário'
    },
    {
      titulo: 'Consultoria de Diversidade',
      icon: '🌈',
      descricao: 'Oferecemos consultoria e treinamento em diversidade de gênero e sexualidade para empresas, organizações e profissionais que desejam criar ambientes mais inclusivos.',
      beneficios: [
        'Treinamento em letramento de gênero',
        'Workshops para equipes',
        'Consultoria para políticas inclusivas',
        'Material educativo',
        'Acompanhamento e avaliação'
      ],
      disponibilidade: 'Sob demanda'
    }
  ];

  return (
    <div className="servicos-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="hero-badge">O Que Oferecemos</span>
          <h1 className="page-title">Nossos Serviços</h1>
          <p className="page-subtitle">
            Conheça os serviços que oferecemos para apoiar e acolher a comunidade trans e não-binária
          </p>
        </div>
      </section>

      {/* Serviços Detalhados */}
      <section className="section">
        <div className="container">
          <div className="servicos-lista">
            {servicosDetalhados.map((servico, index) => (
              <div key={index} className={`servico-detalhe ${index % 2 === 1 ? 'servico-reverse' : ''}`}>
                <div className="servico-content">
                  <span className="servico-icon-large">{servico.icon}</span>
                  <h2 className="servico-titulo">{servico.titulo}</h2>
                  <p className="servico-descricao">{servico.descricao}</p>
                  
                  <div className="servico-beneficios">
                    <h4>O que oferecemos:</h4>
                    <ul>
                      {servico.beneficios.map((beneficio, i) => (
                        <li key={i}>
                          <span className="check-icon">✓</span>
                          {beneficio}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {servico.valores && (
                    <div className="servico-valores">
                      <h4>Valores:</h4>
                      <div className="valores-badges">
                        {servico.valores.map((valor, i) => (
                          <span key={i} className="valor-badge">{valor}</span>
                        ))}
                      </div>
                      <p className="valores-nota">{servico.nota}</p>
                    </div>
                  )}

                  {servico.disponibilidade && (
                    <p className="servico-disponibilidade">
                      <strong>📅 {servico.disponibilidade}</strong>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Participar */}
      <section className="section como-participar">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Como Participar</h2>
            <p className="section-subtitle">
              É simples fazer parte do Aquatrans
            </p>
          </div>
          <div className="passos-grid">
            <div className="passo-card">
              <span className="passo-numero">1</span>
              <h4>Entre em Contato</h4>
              <p>Envie uma mensagem pelo nosso formulário ou redes sociais</p>
            </div>
            <div className="passo-card">
              <span className="passo-numero">2</span>
              <h4>Conheça o Projeto</h4>
              <p>Marque uma conversa para conhecer melhor nosso trabalho</p>
            </div>
            <div className="passo-card">
              <span className="passo-numero">3</span>
              <h4>Faça sua Inscrição</h4>
              <p>Escolha o serviço desejado e faça seu cadastro</p>
            </div>
            <div className="passo-card">
              <span className="passo-numero">4</span>
              <h4>Participe!</h4>
              <p>Comece a participar das atividades e da nossa comunidade</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Interessade em nossos serviços?</h2>
            <p>Entre em contato conosco para saber mais informações ou agendar seu atendimento</p>
            <a href="/contato" className="btn btn-primary">
              Fale Conosco
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
