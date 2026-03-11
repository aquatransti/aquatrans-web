import React, { useState } from 'react';
import { PageHero, Section, Card, Grid, Button } from '../components/base';
import './Apadrinhamento.css';

const Apadrinhamento = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState(false);

  // Chave PIX do Aquatrans (substitua pela chave real)
  const PIX_KEY = 'aquatrans@email.com.br';
  const PIX_TYPE = 'E-mail';

  const donationOptions = [
    {
      id: 1,
      amount: 20,
      title: 'Apoiador(a)',
      description: 'Ajuda a custear materiais básicos',
      icon: '💙',
      benefits: ['Nome no mural de apoiadores', 'Atualizações por e-mail']
    },
    {
      id: 2,
      amount: 50,
      title: 'Amigo(a)',
      description: 'Contribui para uma aula de natação',
      icon: '🩷',
      benefits: ['Benefícios anteriores', 'Agradecimento nas redes sociais']
    },
    {
      id: 3,
      amount: 100,
      title: 'Padrinho/Madrinha',
      description: 'Patrocina um mês de aulas para um aluno',
      icon: '🏳️‍⚧️',
      benefits: ['Benefícios anteriores', 'Certificado digital de agradecimento', 'Relatório de impacto']
    },
    {
      id: 4,
      amount: 200,
      title: 'Guardião/Guardiã',
      description: 'Patrocina dois meses de aulas + materiais',
      icon: '🌟',
      benefits: ['Todos os benefícios', 'Convite para eventos exclusivos', 'Reconhecimento especial no site']
    }
  ];

  const impactInfo = [
    { icon: '🏊', value: 'R$ 50', label: 'Custeia 1 aula de natação' },
    { icon: '🎽', value: 'R$ 80', label: 'Compra 1 kit de natação (touca + óculos)' },
    { icon: '📚', value: 'R$ 150', label: 'Financia 1 mês de atividades' },
    { icon: '💜', value: 'R$ 500', label: 'Apoia o projeto por 1 trimestre' },
  ];

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const getSelectedValue = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseInt(customAmount);
    return 0;
  };

  return (
    <div className="apadrinhamento-page">
      <PageHero
        badge="Faça a Diferença"
        title="Apadrinhamento"
        subtitle="Ajude o Aquatrans a continuar promovendo inclusão e bem-estar para a comunidade trans através de doações"
      />

      {/* Opções de Doação */}
      <Section variant="default">
        <div className="section-header centered">
          <span className="badge">Escolha como Apoiar</span>
          <h2 className="section-title">Níveis de Apadrinhamento</h2>
          <p className="section-subtitle">
            Cada contribuição faz diferença na vida de pessoas trans e não-binárias
          </p>
        </div>

        <Grid cols={4} gap="lg">
          {donationOptions.map((option) => (
            <div
              key={option.id}
              className={`donation-card ${selectedAmount === option.amount ? 'selected' : ''}`}
              onClick={() => handleSelectAmount(option.amount)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleSelectAmount(option.amount)}
              aria-pressed={selectedAmount === option.amount}
            >
              <span className="donation-icon">{option.icon}</span>
              <h3 className="donation-title">{option.title}</h3>
              <div className="donation-amount">
                <span className="currency">R$</span>
                <span className="value">{option.amount}</span>
                <span className="period">/mês</span>
              </div>
              <p className="donation-description">{option.description}</p>
              <ul className="donation-benefits">
                {option.benefits.map((benefit, index) => (
                  <li key={index}>
                    <span className="check">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="donation-select">
                {selectedAmount === option.amount ? 'Selecionado ✓' : 'Selecionar'}
              </div>
            </div>
          ))}
        </Grid>

        {/* Valor Personalizado */}
        <div className="custom-amount-section">
          <h3>Ou escolha um valor personalizado:</h3>
          <div className="custom-amount-input">
            <span className="currency-prefix">R$</span>
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomAmount}
              placeholder="Digite o valor"
              className="form-input"
              aria-label="Valor personalizado de doação"
            />
          </div>
        </div>
      </Section>

      {/* Seção PIX */}
      <Section variant="secondary" id="pix">
        <div className="pix-section">
          <div className="pix-content">
            <div className="pix-icon">
              <svg viewBox="0 0 512 512" fill="currentColor" width="80" height="80">
                <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 googl372.6 googl398.6 383.7L googl421.4 googleC437.1 405.3 464.6 405.3 480.7 421.4C496.8 437.5 496.8 465 480.7 481.1L402.7 559.1C364.5 597.3 301.5 597.3 263.3 559.1L199.9 495.7C184.8 480.6 184.8 456.4 199.9 441.3C215 426.2 239.2 426.2 254.3 441.3L300.5 487.5C307.3 494.3 318.5 494.3 325.3 487.5L379.4 433.4C386.2 426.6 386.2 415.4 379.4 408.6L302.4 331.6C287.3 316.5 287.3 292.3 302.4 277.2L411.3 168.3C426.4 153.2 426.4 129 411.3 113.9L357.3 59.9C350.5 53.1 339.3 53.1 332.5 59.9L225.5 166.9C210.4 182 186.2 182 171.1 166.9L117.1 112.9C102 97.8 102 73.6 117.1 58.5L195.1 -19.5C233.3 -57.7 296.3 -57.7 334.5 -19.5L479.6 125.6C517.8 163.8 517.8 226.8 479.6 265L370.7 373.9C355.6 389 331.4 389 316.3 373.9L242.4 300C237 294.6 237 285.4 242.4 280V292.5Z"/>
              </svg>
            </div>
            <h2 className="pix-title">Doe via PIX</h2>
            <p className="pix-subtitle">
              Faça sua doação de forma rápida e segura usando PIX
            </p>

            {getSelectedValue() > 0 && (
              <div className="pix-amount-display">
                <span>Valor selecionado:</span>
                <strong>R$ {getSelectedValue()},00</strong>
              </div>
            )}

            <div className="pix-key-container">
              <div className="pix-key-label">
                <span className="pix-type">{PIX_TYPE}</span>
                <span className="pix-key">{PIX_KEY}</span>
              </div>
              <Button
                variant="primary"
                onClick={copyPixKey}
                className="btn-copy"
              >
                {copied ? '✓ Copiado!' : '📋 Copiar Chave'}
              </Button>
            </div>

            <div className="pix-instructions">
              <h4>Como doar:</h4>
              <ol>
                <li>Abra o app do seu banco</li>
                <li>Escolha pagar via PIX</li>
                <li>Cole a chave copiada ou digite: <strong>{PIX_KEY}</strong></li>
                <li>Digite o valor da doação</li>
                <li>Confirme o pagamento</li>
              </ol>
            </div>

            <div className="pix-qrcode-placeholder">
              <div className="qrcode-box">
                <span className="qrcode-icon">📱</span>
                <p>QR Code PIX</p>
                <small>(Em breve)</small>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Impacto */}
      <Section 
        variant="default"
        badge="Seu Impacto"
        title="O que sua doação representa"
        subtitle="Veja como cada valor contribui para o projeto"
        centered
      >
        <Grid cols={4} gap="lg">
          {impactInfo.map((item, index) => (
            <Card key={index} className="impact-card text-center">
              <span className="impact-icon">{item.icon}</span>
              <span className="impact-value">{item.value}</span>
              <span className="impact-label">{item.label}</span>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Transparência */}
      <Section variant="secondary">
        <div className="transparency-content">
          <div className="transparency-text">
            <h2>Transparência Total</h2>
            <p>
              O Aquatrans é uma associação sem fins lucrativos. Toda doação é 
              revertida integralmente para o projeto, incluindo:
            </p>
            <ul className="transparency-list">
              <li>
                <span className="check-icon">✓</span>
                Aulas de natação para a comunidade trans
              </li>
              <li>
                <span className="check-icon">✓</span>
                Materiais (toucas, óculos, maiôs)
              </li>
              <li>
                <span className="check-icon">✓</span>
                Atendimento psicossocial e jurídico
              </li>
              <li>
                <span className="check-icon">✓</span>
                Infraestrutura e comunicação
              </li>
            </ul>
            <Button to="/transparencia" variant="outline">
              Ver Prestação de Contas →
            </Button>
          </div>
          <div className="transparency-stats">
            <div className="stat-box">
              <span className="stat-icon">💰</span>
              <span className="stat-value">100%</span>
              <span className="stat-label">Revertido ao projeto</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">📊</span>
              <span className="stat-value">Mensal</span>
              <span className="stat-label">Prestação de contas</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Outras Formas */}
      <Section variant="gradient">
        <div className="other-ways">
          <h2>Outras Formas de Apoiar</h2>
          <p>Não pode doar financeiramente? Existem outras formas de ajudar:</p>
          <Grid cols={3} gap="lg" className="other-ways-grid">
            <div className="other-card">
              <span className="other-icon">📢</span>
              <h4>Divulgue</h4>
              <p>Compartilhe nosso trabalho nas redes sociais</p>
            </div>
            <div className="other-card">
              <span className="other-icon">🤝</span>
              <h4>Seja Voluntárie</h4>
              <p>Contribua com seu tempo e habilidades</p>
            </div>
            <div className="other-card">
              <span className="other-icon">🏢</span>
              <h4>Parcerias</h4>
              <p>Proponha parcerias institucionais</p>
            </div>
          </Grid>
          <div className="other-cta">
            <Button to="/contato" variant="secondary" className="btn-white">
              Entre em Contato
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Apadrinhamento;
