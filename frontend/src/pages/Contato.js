import React, { useState } from 'react';
import './Contato.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003/api';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/contato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' });
        setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Erro ao enviar mensagem. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro:', error);
      setStatus({ type: 'error', message: 'Erro ao enviar mensagem. Tente novamente mais tarde.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contato-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="hero-badge">Fale Conosco</span>
          <h1 className="page-title">Contato</h1>
          <p className="page-subtitle">
            Tem alguma dúvida, sugestão ou quer fazer parte do Aquatrans? Entre em contato!
          </p>
        </div>
      </section>

      {/* Contato Section */}
      <section className="section">
        <div className="container">
          <div className="contato-grid">
            {/* Formulário */}
            <div className="contato-form-container">
              <h2>Envie sua Mensagem</h2>
              <form onSubmit={handleSubmit} className="contato-form">
                <div className="form-group">
                  <label htmlFor="nome" className="form-label">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="form-input"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="assunto" className="form-label">Assunto</label>
                  <select
                    id="assunto"
                    name="assunto"
                    className="form-input"
                    value={formData.assunto}
                    onChange={handleChange}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="aulas">Quero participar das aulas</option>
                    <option value="voluntario">Quero ser voluntárie</option>
                    <option value="parceria">Proposta de parceria</option>
                    <option value="doacao">Quero fazer uma doação</option>
                    <option value="imprensa">Imprensa</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensagem" className="form-label">Mensagem *</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    className="form-textarea"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    placeholder="Escreva sua mensagem aqui..."
                    rows={6}
                  />
                </div>

                {status.message && (
                  <div className={`form-status ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            </div>

            {/* Informações */}
            <div className="contato-info">
              <div className="info-box">
                <h3>Outras Formas de Contato</h3>
                
                <div className="contato-item">
                  <span className="contato-icon">📧</span>
                  <div>
                    <h4>E-mail</h4>
                    <p>contato@aquatrans.org.br</p>
                  </div>
                </div>

                <div className="contato-item">
                  <span className="contato-icon">📸</span>
                  <div>
                    <h4>Instagram</h4>
                    <a href="https://www.instagram.com/aquatrans.oficial/" target="_blank" rel="noopener noreferrer">
                      @aquatrans
                    </a>
                  </div>
                </div>

                <div className="contato-item">
                  <span className="contato-icon">📘</span>
                  <div>
                    <h4>Facebook</h4>
                    <a href="https://facebook.com/aquatrans" target="_blank" rel="noopener noreferrer">
                      /aquatrans
                    </a>
                  </div>
                </div>
              </div>

              <div className="info-box destaque">
                <h3>🏊 Quer Participar das Aulas?</h3>
                <p>
                  Nossas aulas de natação são para pessoas trans e não-binárias 
                  em ambiente acolhedor e seguro.
                </p>
                <ul className="info-lista">
                  <li>✓ Valores: R$ 20, R$ 40 ou R$ 60</li>
                  <li>✓ Instrutores capacitados</li>
                  <li>✓ Ambiente inclusivo</li>
                </ul>
              </div>

              <div className="info-box apoie">
                <h3>💜 Como Apoiar</h3>
                <p>Existem várias formas de ajudar o Aquatrans:</p>
                <ul className="apoio-lista">
                  <li>
                    <span className="apoio-icon">💰</span>
                    <span>Doações financeiras</span>
                  </li>
                  <li>
                    <span className="apoio-icon">🤝</span>
                    <span>Voluntariado</span>
                  </li>
                  <li>
                    <span className="apoio-icon">📢</span>
                    <span>Divulgação</span>
                  </li>
                  <li>
                    <span className="apoio-icon">🏢</span>
                    <span>Parcerias institucionais</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Perguntas Frequentes</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Quem pode participar das aulas?</h4>
              <p>
                Nossas aulas são voltadas para pessoas trans e não-binárias 
                de todas as idades e níveis de habilidade na natação.
              </p>
            </div>
            <div className="faq-item">
              <h4>Preciso saber nadar para participar?</h4>
              <p>
                Não! Oferecemos aulas para todos os níveis, desde iniciantes 
                até quem já sabe nadar e quer aprimorar.
              </p>
            </div>
            <div className="faq-item">
              <h4>Como funciona o pagamento?</h4>
              <p>
                Trabalhamos com valores flexíveis (R$ 20, R$ 40 ou R$ 60) 
                de acordo com a possibilidade de cada pessoa.
              </p>
            </div>
            <div className="faq-item">
              <h4>Como posso me tornar voluntárie?</h4>
              <p>
                Entre em contato conosco! Temos setores de captação, TI, 
                comunicação e equipe técnica que precisam de apoio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
