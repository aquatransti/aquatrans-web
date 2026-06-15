import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { Heart, CheckCircle2, Copy, Smartphone, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export function ApadrinhamentoPage() {
  const [copiedPix, setCopiedPix] = useState(false);

  const niveis = [
    {
      icon: "💙",
      title: "Apoiadore",
      value: "R$ 20",
      period: "/mês",
      color: "from-[#5BCEFA] to-blue-400",
      description: "Ajude a custear materiais básicos",
      benefits: [
        "Nome no mural de apoiadories",
        "Atualizações por e-mail"
      ]
    },
    {
      icon: "💖",
      title: "Amigue",
      value: "R$ 50",
      period: "/mês",
      color: "from-[#F5A9B8] to-pink-400",
      description: "Contribua para uma aula de natação",
      benefits: [
        "Benefícios anteriores",
        "Agradecimento nas redes sociais"
      ]
    },
    {
      icon: "🏳️‍⚧️",
      title: "Madrinhe",
      value: "R$ 100",
      period: "/mês",
      color: "from-purple-400 to-pink-500",
      description: "Patrocine um mês de aulas para uma pessoa",
      benefits: [
        "Benefícios anteriores",
        "Certificado digital de apoio",
        "Relatório de impacto"
      ],
      featured: true
    },
    {
      icon: "👑",
      title: "Guardiane",
      value: "R$ 200",
      period: "/mês",
      color: "from-yellow-400 to-orange-400",
      description: "Patrocine dois meses de aulas + materiais",
      benefits: [
        "Todos os benefícios",
        "Convite para eventos exclusivos",
        "Reconhecimento especial no site"
      ]
    }
  ];

  const doacaoImpacto = [
    {
      icon: "🏊",
      value: "R$ 50",
      description: "Custeia 1 aula de natação (flocos + óculos)"
    },
    {
      icon: "🏊",
      value: "R$ 80",
      description: "Compra 1 kit de natação (touca + óculos)"
    },
    {
      icon: "🏊‍♀️",
      value: "R$ 150",
      description: "Financia 1 mês de atividades"
    },
    {
      icon: "💜",
      value: "R$ 500",
      description: "Apoia o projeto por 1 trimestre"
    }
  ];

  const copyPixKey = () => {
    navigator.clipboard.writeText("aquatrans@email.com.br");
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-['Inter']">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.span 
              className="inline-block px-4 py-1.5 bg-[#5BCEFA]/10 text-[#5BCEFA] rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Faça a Diferença
            </motion.span>
            
            <motion.h1 
              className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Apadrinhamento
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Ajude o Aquatrans a continuar promovendo inclusão e bem-estar para a comunidade trans através de doações
            </motion.p>
          </div>
        </section>

        {/* Níveis de Apadrinhamento */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-[#5BCEFA]/10 text-[#5BCEFA] rounded-full text-sm font-medium mb-4">
                Escolha seu Nível
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Níveis de Apadrinhamento
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Cada contribuição faz diferença na vida de trans e não-bináries
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {niveis.map((nivel, index) => (
                <motion.div
                  key={nivel.title}
                  className={`bg-white dark:bg-gray-900 rounded-2xl border-2 p-6 hover:shadow-xl transition-all ${
                    nivel.featured 
                      ? 'border-[#5BCEFA] scale-105' 
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {nivel.featured && (
                    <div className="text-center mb-2">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#5BCEFA] to-[#F5A9B8] text-white text-xs font-medium rounded-full">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">{nivel.icon}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {nivel.title}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {nivel.value}
                      </span>
                      <span className="text-sm text-gray-500">{nivel.period}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                    {nivel.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {nivel.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-[#5BCEFA] mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full px-4 py-3 rounded-lg bg-gradient-to-r ${nivel.color} text-white font-medium hover:opacity-90 transition-opacity`}>
                    Selecionar
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PIX Section */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Doe via PIX
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Faça sua doação de forma rápida e segura usando PIX
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">E-mail</div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                aquatrans@email.com.br
              </div>
              <button
                onClick={copyPixKey}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#5BCEFA] to-[#F5A9B8] text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Copy className="w-5 h-5" />
                {copiedPix ? "Chave Copiada!" : "Copiar Chave"}
              </button>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Como doar:</h4>
                <ol className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>1. Abra o app do seu banco</li>
                  <li>2. Escolha pagar via PIX</li>
                  <li>3. Cole a chave copiada ou digite: <strong>aquatrans@email.com.br</strong></li>
                  <li>4. Digite o valor da doação</li>
                  <li>5. Confirme o pagamento</li>
                </ol>
              </div>

              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">QR Code PIX</div>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <QRCodeSVG
                    value="aquatrans@email.com.br"
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Aponte a câmera do seu celular para o QR Code
                </p>
              </div>
            </motion.div>

            {/* O que sua doação representa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-[#5BCEFA]/10 text-[#5BCEFA] rounded-full text-sm font-medium mb-6">
                Impacto Real
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-gray-900 dark:text-white mb-6">
                O que sua doação representa
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Veja como cada valor contribui para o projeto
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {doacaoImpacto.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center"
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <div className="text-2xl font-bold text-[#5BCEFA] mb-2">
                      {item.value}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Transparência Total */}
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Transparência Total
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                O Aquatrans é uma associação sem fins lucrativos. Toda doação é revertida integralmente para o projeto, incluindo:
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5BCEFA] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Aulas de natação para a comunidade trans</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5BCEFA] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Materiais (bóias, óculos, maiôs)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5BCEFA] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Atendimento psicossocial e jurídico</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5BCEFA] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Infraestrutura e comunicação</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">💰</div>
                  <div>
                    <div className="text-2xl font-bold text-[#5BCEFA]">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Revertido ao projeto</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">📊</div>
                  <div>
                    <div className="text-2xl font-bold text-[#5BCEFA]">Mensal</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Prestação de contas</div>
                  </div>
                </div>
              </div>

              <a
                href="/transparencia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#5BCEFA] text-[#5BCEFA] font-medium hover:bg-[#5BCEFA] hover:text-white transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                Ver Prestação de Contas →
              </a>
            </motion.div>
          </div>
        </section>

        {/* Outras Formas de Apoiar */}
        <section className="py-16 bg-gradient-to-r from-[#5BCEFA]/10 to-[#F5A9B8]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Outras Formas de Apoiar
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Não pode doar financeiramente? Existem outras formas de ajudar!
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <motion.div
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">📢</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Divulgar</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compartilhe nossas redes sociais
                </p>
              </motion.div>

              <motion.div
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Seja Voluntário</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contribua com tempo e habilidades
                </p>
              </motion.div>

              <motion.div
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">🏢</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Parcerias</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Proponha parcerias institucionais
                </p>
              </motion.div>
            </div>

            <a
              href="/contato"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 font-medium hover:border-[#5BCEFA] transition-colors"
            >
              Entre em Contato
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}