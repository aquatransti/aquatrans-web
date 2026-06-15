import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Services() {
  const services = [
    {
      emoji: "🏊",
      title: "Aulas de Natação",
      description: "Ambiente seguro e acolhedor para pessoas trans e não-binárias.",
      color: "from-[#5BCEFA] to-cyan-400",
      borderColor: "border-cyan-200 dark:border-cyan-800"
    },
    {
      emoji: "🧠",
      title: "Atendimento Psicossocial",
      description: "Suporte psicossocial especializado e humanizado.",
      color: "from-[#F5A9B8] to-pink-400",
      borderColor: "border-pink-200 dark:border-pink-800"
    },
    {
      emoji: "⚖️",
      title: "Atendimento Jurídico",
      description: "Orientação jurídica gratuita para a comunidade.",
      color: "from-purple-400 to-purple-500",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      emoji: "🎓",
      title: "Consultoria de Diversidade",
      description: "Treinamento em diversidade de gênero e sexualidade.",
      color: "from-green-400 to-green-500",
      borderColor: "border-green-200 dark:border-green-800"
    }
  ];

  return (
    <section id="servicos" className="py-20 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-50 to-pink-50 dark:from-cyan-950/30 dark:to-pink-950/30 border border-slate-200 dark:border-slate-700 rounded-full mb-6">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              O que Oferecemos
            </span>
          </div>
          
          <h2 className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Nossos Serviços
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Oferecemos diversos serviços para apoiar e acolher a comunidade trans
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`group relative bg-white dark:bg-slate-900 p-8 rounded-2xl border-2 ${service.borderColor} hover:shadow-2xl transition-all duration-300 overflow-hidden text-center`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8 }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className="relative">
                {/* Emoji */}
                <div className="text-5xl mb-4">
                  {service.emoji}
                </div>

                <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/servicos"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#5BCEFA] to-[#F5A9B8] text-white text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Conheça todos os detalhes
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            💙 Atendemos com respeito, sigilo e acolhimento 🩷
          </p>
        </motion.div>
      </div>
    </section>
  );
}