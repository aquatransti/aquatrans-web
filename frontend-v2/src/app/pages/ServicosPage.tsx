import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { Waves, Brain, Scale, Rainbow, CheckCircle2, Calendar, MapPin, Users } from 'lucide-react';

export function ServicosPage() {
  const servicosPrincipais = [
    {
      icon: <Waves className="w-12 h-12" />,
      title: "Aulas de Natação",
      description: "Nossas aulas de natação são realizadas em ambiente seguro e acolhedor, onde trans e não-bináries podem praticar atividades aquáticas sem medo de discriminação.",
      color: "border-[#5BCEFA]",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      beneficios: [
        "Instrutores capacitados em diversidade de gênero",
        "Turmas reduzidas para maior conforto",
        "Desenvolvimento físico e emocional",
        "Ambiente inclusivo e respeitoso",
        "Vestiários seguros e acolhedores"
      ],
      valores: {
        opcoes: ["R$ 20", "R$ 40", "R$ 60"],
        observacao: "Valores flexíveis de acordo com sua possibilidade"
      }
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Atendimento Psicossocial",
      description: "Oferecemos suporte psicossocial especializado para trans e não-bináries, com profissionais capacitados e sensíveis às questões da comunidade.",
      color: "border-[#F5A9B8]",
      bgColor: "bg-pink-50 dark:bg-pink-950/30",
      beneficios: [
        "Psicólogos com experiência em questões de gênero",
        "Atendimento individual e em grupo",
        "Acompanhamento contínuo",
        "Ambiente acolhedor e sem julgamentos",
        "Suporte para transição de gênero"
      ],
      cta: {
        text: "Consulte disponibilidade",
        link: "/contato"
      }
    },
    {
      icon: <Scale className="w-12 h-12" />,
      title: "Atendimento Jurídico",
      description: "Orientação jurídica gratuita para questões relacionadas à retificação de nome e gênero em documentos, discriminação, direitos trabalhistas e outros.",
      color: "border-[#5BCEFA]",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
      beneficios: [
        "Advogados especializados em direitos LGBTQIA+",
        "Suporte em casos de discriminação",
        "Encaminhamento para órgãos competentes",
        "Orientação para retificação de documentos",
        "Informações sobre direitos"
      ],
      cta: {
        text: "Agendar atendimento",
        link: "/contato"
      }
    },
    {
      icon: <Rainbow className="w-12 h-12" />,
      title: "Consultoria de Diversidade",
      description: "Oferecemos consultoria e treinamento em diversidade de gênero e sexualidade para empresas, organizações e profissionais que desejam criar ambientes mais inclusivos.",
      color: "border-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      beneficios: [
        "Treinamento em letramento de gênero",
        "Consultoria para políticas inclusivas",
        "Acompanhamento e avaliação",
        "Workshops para equipes",
        "Material educativo"
      ],
      cta: {
        text: "Faça orçamento",
        link: "/contato"
      }
    }
  ];

  const comoParticipar = [
    {
      numero: "1",
      title: "Entre em Contato",
      description: "Envie uma mensagem pelo nosso formulário ou redes sociais"
    },
    {
      numero: "2",
      title: "Conheça o Projeto",
      description: "Marque uma conversa para conhecer melhor nosso trabalho"
    },
    {
      numero: "3",
      title: "Faça sua Inscrição",
      description: "Escolha o serviço desejado e faça seu cadastro"
    },
    {
      numero: "4",
      title: "Participe!",
      description: "Comece a participar das atividades e da nossa comunidade"
    }
  ];

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
              O Que Oferecemos
            </motion.span>
            
            <motion.h1 
              className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >Nossos Serviços</motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Conheça os serviços que oferecemos para apoiar e acolher a comunidade trans e não-binária
            </motion.p>
          </div>
        </section>

        {/* Serviços Detalhados */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {servicosPrincipais.map((servico, index) => (
              <motion.div
                key={servico.title}
                className={`bg-white dark:bg-gray-900 rounded-2xl border-l-4 ${servico.color} border-r border-t border-b border-gray-200 dark:border-gray-800 overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`${servico.bgColor} p-4 rounded-xl text-[#5BCEFA]`}>
                      {servico.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                        {servico.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {servico.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                      O que oferecemos:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {servico.beneficios.map((beneficio, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#5BCEFA] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {beneficio}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {servico.valores && (
                    <div className={`${servico.bgColor} rounded-lg p-4 mb-4`}>
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Valores:
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        {servico.valores.opcoes.map((valor, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-white dark:bg-gray-900 rounded-lg font-semibold text-[#5BCEFA] border border-[#5BCEFA]/20"
                          >
                            {valor}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                        {servico.valores.observacao}
                      </p>
                    </div>
                  )}

                  {servico.cta && (
                    <a
                      href={servico.cta.link}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#5BCEFA] to-[#F5A9B8] text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      {servico.cta.text}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Como Participar */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900 dark:text-white mb-4 font-[Plus_Jakarta_Sans]">
                Como Participar
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                É simples fazer parte do Aquatrans
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {comoParticipar.map((passo, index) => (
                <motion.div
                  key={passo.numero}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5BCEFA] to-[#F5A9B8] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {passo.numero}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {passo.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {passo.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Informações Práticas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Calendar className="w-12 h-12 text-[#5BCEFA] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sabádo pela manhã</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Aulas nos finais de semana.</p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <MapPin className="w-12 h-12 text-[#F5A9B8] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Praia do Flamengo</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Geralmente entre o posto 2 e 3.</p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Users className="w-12 h-12 text-[#5BCEFA] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Comunidade
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Faça parte de uma rede de apoio.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-[#5BCEFA] via-purple-400 to-[#F5A9B8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-white mb-4 font-[Plus_Jakarta_Sans]">
                Interessado em nossos serviços?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Entre em contato conosco para saber mais informações ou agendar seu atendimento
              </p>
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-[#5BCEFA] font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Fale Conosco
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}