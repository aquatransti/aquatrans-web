import React from 'react';
import { Link } from 'react-router-dom';
import './Transparencia.css';

const Transparencia = () => {
  // Dados de fundos e valores arrecadados
  const fundosArrecadados = [
    {
      id: 1,
      fonte: 'FundoELAS',
      valor: 45000,
      data: '2025',
      prazo: 'Maio de 2026',
      status: 'Em uso',
      descricao: 'Edital de apoio a projetos LGBTQIA+',
      prioridades: ['Registro e Formalização', 'Comunicação e Site', 'Logística e Materiais']
    }
  ];

  const prestacaoContas = [
    {
      periodo: 'Janeiro 2026',
      entradas: 2500,
      saidas: 1800,
      saldo: 700,
      detalhes: 'Mensalidades de alunos + materiais'
    },
    {
      periodo: 'Dezembro 2025',
      entradas: 3200,
      saidas: 2100,
      saldo: 1100,
      detalhes: 'Mensalidades + doações'
    },
    {
      periodo: 'Novembro 2025',
      entradas: 2800,
      saidas: 2500,
      saldo: 300,
      detalhes: 'Mensalidades + evento especial'
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="transparencia-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="hero-badge">Prestação de Contas</span>
          <h1 className="page-title">Transparência</h1>
          <p className="page-subtitle">
            Acompanhe os recursos arrecadados e como são utilizados no projeto
          </p>
        </div>
      </section>

      {/* Resumo Financeiro */}
      <section className="section">
        <div className="container">
          <div className="resumo-financeiro">
            <div className="resumo-card total-arrecadado">
              <span className="resumo-icon">💰</span>
              <div className="resumo-info">
                <span className="resumo-label">Total Arrecadado</span>
                <span className="resumo-valor">{formatCurrency(45000)}</span>
              </div>
            </div>
            <div className="resumo-card">
              <span className="resumo-icon">📊</span>
              <div className="resumo-info">
                <span className="resumo-label">Fundos Ativos</span>
                <span className="resumo-valor">1</span>
              </div>
            </div>
            <div className="resumo-card">
              <span className="resumo-icon">🏛️</span>
              <div className="resumo-info">
                <span className="resumo-label">CNPJ</span>
                <span className="resumo-valor status-pendente">Em Formalização</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fundos Arrecadados */}
      <section className="section fundos-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Fundos Arrecadados</h2>
            <p className="section-subtitle">
              Recursos obtidos através de editais e parcerias
            </p>
          </div>

          <div className="fundos-lista">
            {fundosArrecadados.map((fundo) => (
              <div key={fundo.id} className="fundo-card">
                <div className="fundo-header">
                  <div className="fundo-fonte">
                    <h3>{fundo.fonte}</h3>
                    <span className={`fundo-status status-${fundo.status.toLowerCase().replace(' ', '-')}`}>
                      {fundo.status}
                    </span>
                  </div>
                  <div className="fundo-valor">
                    <span className="valor-total">{formatCurrency(fundo.valor)}</span>
                    <span className="valor-ano">Ano: {fundo.data}</span>
                  </div>
                </div>
                
                <p className="fundo-descricao">{fundo.descricao}</p>
                
                <div className="fundo-detalhes">
                  <div className="fundo-prazo">
                    <strong>Prazo de utilização:</strong> {fundo.prazo}
                  </div>
                  <div className="fundo-prioridades">
                    <strong>Prioridades:</strong>
                    <ul>
                      {fundo.prioridades.map((p, i) => (
                        <li key={i}>
                          <span className="prioridade-numero">{i + 1}</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestação de Contas Mensal */}
      <section className="section prestacao-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Prestação de Contas</h2>
            <p className="section-subtitle">
              Movimentação financeira mensal do projeto
            </p>
          </div>

          <div className="prestacao-tabela-container">
            <table className="prestacao-tabela">
              <thead>
                <tr>
                  <th>Período</th>
                  <th>Entradas</th>
                  <th>Saídas</th>
                  <th>Saldo</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody>
                {prestacaoContas.map((item, index) => (
                  <tr key={index}>
                    <td data-label="Período">{item.periodo}</td>
                    <td data-label="Entradas" className="valor-positivo">
                      {formatCurrency(item.entradas)}
                    </td>
                    <td data-label="Saídas" className="valor-negativo">
                      {formatCurrency(item.saidas)}
                    </td>
                    <td data-label="Saldo" className={item.saldo >= 0 ? 'valor-positivo' : 'valor-negativo'}>
                      {formatCurrency(item.saldo)}
                    </td>
                    <td data-label="Observações">{item.detalhes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prestacao-info">
            <p>
              <strong>📅 Reuniões mensais:</strong> Realizamos reuniões de prestação de contas com alunes e comunidade.
            </p>
            <p>
              <strong>📄 Relatórios:</strong> Relatórios detalhados disponíveis sob solicitação.
            </p>
          </div>
        </div>
      </section>

      {/* Mensalidades */}
      <section className="section mensalidades-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Valores de Mensalidade</h2>
            <p className="section-subtitle">
              Valores flexíveis de acordo com a possibilidade de cada pessoa
            </p>
          </div>

          <div className="mensalidades-grid">
            <div className="mensalidade-card">
              <span className="mensalidade-tipo">Social</span>
              <span className="mensalidade-valor">R$ 20</span>
              <span className="mensalidade-periodo">/mês</span>
            </div>
            <div className="mensalidade-card destaque">
              <span className="mensalidade-tipo">Padrão</span>
              <span className="mensalidade-valor">R$ 40</span>
              <span className="mensalidade-periodo">/mês</span>
            </div>
            <div className="mensalidade-card">
              <span className="mensalidade-tipo">Colaborativo</span>
              <span className="mensalidade-valor">R$ 60</span>
              <span className="mensalidade-periodo">/mês</span>
            </div>
          </div>

          <p className="mensalidades-nota">
            * Nosso objetivo é tornar as aulas totalmente gratuitas através de captação de recursos
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Quer apoiar o Aquatrans?</h2>
            <p>
              Sua contribuição ajuda a manter o projeto funcionando e a 
              tornar as aulas acessíveis para mais pessoas.
            </p>
            <Link to="/apadrinhamento" className="btn btn-primary">
              💜 Faça uma Doação
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transparencia;
