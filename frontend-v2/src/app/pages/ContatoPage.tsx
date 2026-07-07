import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { Mail, Instagram, Facebook, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function ContatoPage() {
  const [selectedAssunto, setSelectedAssunto] = useState('');
  const [showComoAjudar, setShowComoAjudar] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Quem pode participar das aulas?",
      answer: "Nossas aulas são voltadas para trans e não-bináries de todas as idades e níveis de habilidade na natação."
    },
    {
      question: "Preciso saber nadar para participar?",
      answer: "Não! Oferecemos aulas para todos os níveis, desde iniciantes até quem já sabe nadar e quer aprimorar."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "Trabalhamos com valores flexíveis (R$ 20, R$ 40 ou R$ 60) de acordo com a possibilidade de cada pessoa."
    },
    {
      question: "Como posso me tornar voluntário?",
      answer: "Entre em contato conosco! Temos setores de captação, TI, comunicação e equipe técnica que precisam de apoio."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada! Em breve entraremos em contato.');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-['Inter']">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 px-[0px] py-[64px] mx-[0px] my-[-1px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Contato
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Tem alguma dúvida, sugestão ou quer fazer parte do Aquatrans?
              <br />Entre em contato!
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Formulário */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                  <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Envie sua Mensagem
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Seu nome"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BCEFA]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BCEFA]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Assunto *
                      </label>
                      <select
                        required
                        value={selectedAssunto}
                        onChange={(e) => setSelectedAssunto(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BCEFA]"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="aulas">Aulas de Natação</option>
                        <option value="apoio">Apoio/Doações</option>
                        <option value="voluntario">Voluntariado</option>
                        <option value="parceria">Parcerias</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Escreva sua mensagem aqui..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BCEFA] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#5BCEFA] to-[#F5A9B8] text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Informações de Contato */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Outras Formas de Contato */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Outras Formas de Contato
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:aqua.trans24@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#5BCEFA]/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#5BCEFA]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">E-mail</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">aqua.trans24@gmail.com</div>
                      </div>
                    </a>

                    <a
                      href="https://www.instagram.com/aquatrans.oficial/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Instagram</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">@aquatrans.oficial</div>
                      </div>
                    </a>

                    
                  </div>
                </div>

                {/* Quer Participar das Aulas? */}
                <div className="bg-gradient-to-br from-[#5BCEFA]/10 to-[#F5A9B8]/10 rounded-2xl border border-[#5BCEFA]/20 p-6">
                  <div className="text-4xl mb-3">🏊</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quer Participar das Aulas?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Nossas aulas de natação são para trans e não-bináries em ambiente acolhedor e seguro.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                    <li className="flex items-center gap-2">
                      <span className="text-[#5BCEFA]">✓</span>
                      Valores: R$ 20, R$ 40 ou R$ 60
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#5BCEFA]">✓</span>
                      Instrutores capacitados
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#5BCEFA]">✓</span>
                      Ambiente inclusivo
                    </li>
                  </ul>
                </div>

                {/* Como Ajudar */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <button
                    onClick={() => setShowComoAjudar(!showComoAjudar)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💜</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Como Ajudar</span>
                    </div>
                    {showComoAjudar ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {showComoAjudar && (
                    <div className="px-6 pb-6 space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-xl">💰</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Doações financeiras</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Contribua com qualquer valor</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-xl">🤝</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Voluntariado</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Doe seu tempo e habilidades</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-xl">📢</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Divulgação</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Compartilhe nas redes sociais</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-xl">🏢</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Parcerias institucionais</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Proponha parcerias corporativas</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Dúvidas comuns sobre o Aquatrans
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-[#5BCEFA] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openFaq === index && (
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}