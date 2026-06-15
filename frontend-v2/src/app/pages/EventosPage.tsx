import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { Calendar, MapPin, DollarSign, Instagram, Facebook } from 'lucide-react';

export function EventosPage() {
  const eventos = [
    {
      icon: "🏊",
      title: "Aulas de Natação Semanais",
      description: "Aulas voltadas para trans e não-bináries em ambiente acolhedor e seguro. Instrutores capacitados em diversidade de gênero.",
      badge: "Ativo",
      badgeColor: "bg-green-100 text-green-700",
      frequency: "Semanal",
      location: "A definir",
      price: "R$ 20, R$ 40 ou R$ 60",
      buttonText: "Inscreva-se",
      buttonStyle: "from-[#5BCEFA] to-cyan-400"
    },
    {
      icon: "🏳️‍⚧️",
      title: "Marcha Transmasculina",
      description: "Participação do Aquatrans na Marcha Transmasculina em São Paulo. Uma celebração da identidade transmasculina e não-binária.",
      badge: "Em Planejamento",
      badgeColor: "bg-yellow-100 text-yellow-700",
      frequency: "A confirmar",
      location: "São Paulo - SP",
      price: "Gratuito",
      buttonText: "Saiba Mais",
      buttonStyle: "from-[#F5A9B8] to-pink-400"
    },
    {
      icon: "🤝",
      title: "Reunião Mensal com Alunos",
      description: "Reunião de prestação de contas e feedback com os alunos do projeto. Um momento de escuta e construção coletiva.",
      badge: "Ativo",
      badgeColor: "bg-green-100 text-green-700",
      frequency: "Mensal",
      location: "Online / Presencial",
      price: "Gratuito",
      buttonText: "Participar",
      buttonStyle: "from-[#5BCEFA] to-cyan-400"
    },
    {
      icon: "🎓",
      title: "Workshop de Diversidade",
      description: "Workshop de treinamento em diversidade de gênero e sexualidade para profissionais e público em geral.",
      badge: "Em Planejamento",
      badgeColor: "bg-yellow-100 text-yellow-700",
      frequency: "A definir",
      location: "A definir",
      price: "A definir",
      buttonText: "Interesse",
      buttonStyle: "from-[#F5A9B8] to-pink-400"
    }
  ];

  const proximosDestaques = [
    {
      emoji: "🏊",
      title: "Aulas de Natação",
      subtitle: "Toda semana"
    },
    {
      emoji: "🏳️‍⚧️",
      title: "Marcha Transmasculina",
      subtitle: "São Paulo - Data a confirmar"
    },
    {
      emoji: "🎉",
      title: "Lançamento do Site",
      subtitle: "Em breve!"
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
              Próximos Eventos
            </motion.span>
            
            <motion.h1 
              className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Eventos e Atividades
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Confira nossa programação de eventos, aulas e atividades
            </motion.p>
          </div>
        </section>

        {/* Eventos Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {eventos.map((evento, index) => (
                <motion.div
                  key={evento.title}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{evento.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${evento.badgeColor}`}>
                      {evento.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {evento.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {evento.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {evento.frequency}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {evento.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      {evento.price}
                    </div>
                  </div>
                  
                  <button className={`w-full px-4 py-2 rounded-lg bg-gradient-to-r ${evento.buttonStyle} text-white font-medium hover:opacity-90 transition-opacity`}>
                    {evento.buttonText}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Agenda Section */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Acompanhe Nossa Agenda
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">Nossos eventos e atividades são planejados com carinho para atender às necessidades da comunidade trans e não-binária.                <span className="font-bold">Fique atento às nossas redes sociais para novidades e atualizações</span>.</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/aquatrans.oficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="w-5 h-5" />
                    Instagram
                  </a>
                  
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Próximos Destaques
                </h3>
                <div className="space-y-3">
                  {proximosDestaques.map((destaque, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg">
                      <div className="text-2xl">{destaque.emoji}</div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {destaque.title}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {destaque.subtitle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}