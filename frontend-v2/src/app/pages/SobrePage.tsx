import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Users, TrendingUp, Calendar, Award, Briefcase, Scale, DollarSign, Code, Megaphone } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function SobrePage() {
  const missaoVisaoValores = [
    {
      icon: <Target className="w-10 h-10" />,
      title: "Nossa Missão",
      description: "Promover a inclusão, bem-estar e qualidade de vida de trans e não-bináries através de atividades aquáticas, atendimento psicossocial e jurídico em um ambiente seguro e acolhedor.",
      color: "from-[#5BCEFA] to-blue-400"
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Nossa Visão",
      description: "Ser referência em inclusão e acolhimento para a comunidade trans, expandindo nosso alcance e impacto social, tornando as aulas totalmente gratuitas e acessíveis a todos.",
      color: "from-gray-700 to-gray-500"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Nossos Valores",
      description: "Respeito, acolhimento, transparência, coletividade e compromisso com a comunidade trans e não-binária. Acreditamos no poder transformador do esporte inclusivo.",
      color: "from-[#F5A9B8] to-pink-400"
    }
  ];

  const trajetoria = [
    {
      icon: "🏊",
      title: "Aulas de natação inclusivas",
      description: "Início das atividades aquáticas voltadas para a comunidade trans"
    },
    {
      icon: "🤝",
      title: "Parceria com Rio sem LGBTfobia",
      description: "Fortalecimento da rede de apoio e visibilidade"
    },
    {
      icon: "📋",
      title: "CNPJ Formalizado",
      description: "CNPJ 65.998.424/0001-32 - Organização oficialmente registrada"
    },
    {
      icon: "💰",
      title: "Apoio do FundoELAS",
      description: "Captação de recursos para expansão das atividades"
    }
  ];

  const principios = [
    {
      title: "Acessibilidade",
      description: "Valores flexíveis (R$ 20, R$ 40 ou R$ 60) de acordo com a possibilidade de cada pessoa. Ninguém fica de fora por questões financeiras.",
      color: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-[#5BCEFA]"
    },
    {
      title: "Transparência",
      description: "Prestação de contas regular, reuniões mensais com alunos e comunicação clara sobre o uso dos recursos.",
      color: "bg-gray-50 dark:bg-gray-900/30",
      borderColor: "border-gray-300"
    },
    {
      title: "Capacitação",
      description: "Treinamento da equipe técnica em diversidade de gênero e sexualidade para um atendimento respeitoso e informado.",
      color: "bg-pink-50 dark:bg-pink-950/30",
      borderColor: "border-[#F5A9B8]"
    },
    {
      title: "Sustentabilidade",
      description: "Diversificação de fontes de recursos através de editais, patrocínios, apadrinhamento e financiamento coletivo.",
      color: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-300"
    }
  ];

  const equipe = [
    {
      name: "Marcelo Silva",
      role: "Presidente e Professor",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Maya",
      role: "Coordenação Geral",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      name: "",
      role: "Gestão e Administração",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
    },
    {
      name: "Iracema Vieira",
      role: "Tesouraria",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
    },
    {
      name: "Leo Ignis",
      role: "Comunicação e Redes Sociais",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      name: "Caesar Lima",
      role: "Tecnologia",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
    }
  ];

  const setores = [
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Captação de Recursos",
      description: "Busca de editais, patrocínios, parcerias e financiamento coletivo",
      color: "border-[#5BCEFA]"
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "TI",
      description: "Desenvolvimento de site, sistemas e infraestrutura digital",
      color: "border-gray-400"
    },
    {
      icon: <Megaphone className="w-10 h-10" />,
      title: "Comunicação",
      description: "Redes sociais, divulgação e relacionamento com o público",
      color: "border-[#5BCEFA]"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Equipe Técnica",
      description: "Profissionais de educação física e instrutores de natação",
      color: "border-[#F5A9B8]"
    },
    {
      icon: <Scale className="w-10 h-10" />,
      title: "Jurídico",
      description: "Suporte legal e atendimento jurídico à comunidade",
      color: "border-[#5BCEFA]"
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "Financeiro",
      description: "Controle financeiro, prestação de contas e transparência",
      color: "border-[#F5A9B8]"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-['Inter']">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-cyan-50 to-white dark:from-slate-900 dark:to-slate-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.span 
              className="inline-block px-4 py-1.5 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Nossa História
            </motion.span>
            
            <motion.h1 
              className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Sobre o Aquatrans
            </motion.h1>
            
            <motion.p 
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Uma associação criada <strong className="font-semibold text-slate-900 dark:text-white">para e pela</strong> comunidade trans e não-binária
            </motion.p>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {missaoVisaoValores.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-white dark:bg-gray-900 rounded-2xl border-t-4 border-gray-200 dark:border-gray-800 p-8 hover:shadow-xl transition-shadow"
                  style={{ borderTopColor: index === 0 ? '#5BCEFA' : index === 1 ? '#6B7280' : '#F5A9B8' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.color} text-white mb-4`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nossa Trajetória */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  Nossa Trajetória
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>O Aquatrans nasceu da necessidade de criar um espaço onde <span className="font-bold">pessoas trans e não-bináries pudessem praticar atividades físicas sem enfrentar discriminação, olhares julgadores ou desconforto.</span></p>
                  <p>Sabemos que<span className="font-bold"> praias e ambientes esportivos podem ser lugares hostis para pessoas trans</span>. A exposição do corpo, os vestiários binários e o desconhecimento sobre identidades de gênero são barreiras reais que afastam nossa comunidade do esporte.</p>
                  <p>Por isso, criamos um projeto que vai além das aulas de natação: construímos uma                  <span className="font-bold">comunidade de apoio mútuo, onde cada pessoa é respeitada em sua identidade e tem espaço para ser quem é</span>.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {trajetoria.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
                  >
                    <div className="text-3xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Como Atuamos */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Como Atuamos
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Nossos princípios guiam todas as nossas ações
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principios.map((principio, index) => (
                <motion.div
                  key={principio.title}
                  className={`${principio.color} rounded-2xl border-2 ${principio.borderColor} p-6 hover:shadow-lg transition-shadow`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {principio.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {principio.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.span 
                className="inline-block px-4 py-1.5 bg-[#5BCEFA]/10 text-[#5BCEFA] rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Quem Faz Acontecer
              </motion.span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Nossa Equipe
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Conheça as pessoas que dedicam tempo e energia para tornar o Aquatrans realidade
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipe.map((membro, index) => (
                <motion.div
                  key={membro.name}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ImageWithFallback
                    src={membro.photo}
                    alt={`Foto de ${membro.name}`}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-cyan-100 dark:border-cyan-900"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {membro.name}
                  </h3>
                  <p className="text-sm text-[#5BCEFA]">
                    {membro.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nossos Setores */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Nossos Setores
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                O Aquatrans é organizado em diferentes frentes de trabalho
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {setores.map((setor, index) => (
                <motion.div
                  key={setor.title}
                  className={`bg-white dark:bg-gray-900 rounded-2xl border-l-4 ${setor.color} border-r border-t border-b border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="text-[#5BCEFA] mb-4">
                    {setor.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {setor.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {setor.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Quer Fazer Parte */}
        <section className="py-20 bg-gradient-to-r from-[#5BCEFA] via-purple-400 to-[#F5A9B8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl lg:text-4xl font-bold text-white mb-4">
                Quer fazer parte?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">Seja como aluno, voluntário, apoiador ou parceiro, você é bem-vinde ao Aquatrans!</p>
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-[#5BCEFA] font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Entre em Contato
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}