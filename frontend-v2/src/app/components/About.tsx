import { Coins, Users, Shield, HeartHandshake, ArrowRight, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const poolImage = "https://images.unsplash.com/photo-1568003074863-30e82910b658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdHJhbnNnZW5kZXIlMjBzd2ltbWluZyUyMHBvb2x8ZW58MXx8fHwxNzczMjUxOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const swimmingImage = "https://images.unsplash.com/photo-1616564367700-90bb6ad56fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFucyUyMHBlcnNvbiUyMHN3aW1taW5nJTIwaGFwcHl8ZW58MXx8fHwxNzczMjUxOTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const communityImage = "https://images.unsplash.com/photo-1593714604578-d9e41b00c6c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNsdXNpdmUlMjBzd2ltbWluZyUyMHBvb2wlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzczMjUxOTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  const stats = [
    {
      icon: <Shield className="w-8 h-8" />,
      number: "100%",
      label: "Espaço Seguro",
      description: "Zero tolerância com discriminação",
      color: "from-cyan-600 to-cyan-500"
    },
    {
      icon: <Coins className="w-8 h-8" />,
      number: "R$45k",
      label: "Investimento Social",
      description: "Apoio FundoELAS",
      color: "from-pink-600 to-pink-500"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      number: "Sem fins lucrativos",
      label: "CNPJ 65.998.424/0001-32",
      description: "Organização oficialmente registrada",
      color: "from-emerald-600 to-teal-600"
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      number: "24/7",
      label: "Acolhimento Real",
      description: "Venha como você é, sempre",
      color: "from-cyan-600 to-blue-500"
    }
  ];

  return (
    <section id="sobre" className="py-20 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-full mb-6">
              <div className="w-2 h-2 bg-cyan-600 dark:bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-cyan-900 dark:text-cyan-100">
                Por que existimos
              </span>
            </div>
            
            <h2 className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Natação que{' '}
              <span className="text-cyan-600 dark:text-cyan-400">acolhe</span>,{' '}
              <span className="text-pink-600 dark:text-pink-400">transforma</span> e{' '}
              <span className="text-purple-600 dark:text-purple-400">empodera</span>
            </h2>
            
            <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong className="font-semibold text-slate-900 dark:text-white">Sabemos que praias podem ser espaços hostis</strong> para pessoas trans e não bináries. Por isso criamos um ambiente onde você pode ser completamente você mesme.
              </p>

              <p>
                Aqui não existe julgamento, desconforto ou medo. <strong className="font-semibold text-slate-900 dark:text-white">Existe respeito, comunidade e liberdade.</strong>
              </p>

              <p className="text-base text-slate-500 dark:text-slate-400 italic border-l-4 border-cyan-600 dark:border-cyan-400 pl-4">
                "O esporte inclusivo tem o poder de curar, fortalecer e conectar. É isso que oferecemos todos os dias."
              </p>
            </div>
            
            <a
              href="/sobre"
              className="group inline-flex items-center gap-2 mt-8 text-cyan-700 dark:text-cyan-400 font-semibold text-lg hover:gap-3 transition-all"
            >
              Descubra nossa história completa
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6 lg:gap-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * index }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative">
                  <motion.div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4 shadow-lg group-hover:shadow-xl`}
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}