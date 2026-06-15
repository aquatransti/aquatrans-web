import { motion } from 'motion/react';
import { Instagram as InstagramIcon } from 'lucide-react';
import logoAquatrans from '../../assets/logo_aquatrans.jpg';

export function Instagram() {
  const gridItems = [
    { emoji: "🏊", label: "Aulas de Natação" },
    { emoji: "🏳️‍⚧️", label: "Comunidade Trans" },
    { emoji: "💙", label: "Inclusão" },
    { emoji: "🩷", label: "Acolhimento" },
    { emoji: "🌊", label: "Bem-estar" },
    { emoji: "+", label: "Ver mais", isMore: true }
  ];

  return (
    <section id="instagram" className="py-20 bg-gradient-to-b from-white to-cyan-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 rounded-full text-sm font-semibold mb-4">
            Siga-nos
          </span>
          
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Nos acompanhe no Instagram
          </h2>
          
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Veja nossos momentos, histórias e transformações em{' '}
            <a 
              href="https://www.instagram.com/aquatrans.oficial/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
            >
              @aquatrans.oficial
            </a>
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5BCEFA] via-[#F5A9B8] to-[#5BCEFA] p-1 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                <img src={logoAquatrans} alt="Logo Aquatrans" className="w-16 h-16 object-contain" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900 dark:text-white mb-2">
                aquatrans.oficial
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                🏳️‍⚧️ Natação inclusiva para trans e não-bináries<br />
                🏊 Espaço seguro e acolhedor<br />
                💙🩷 Rio de Janeiro, RJ
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around py-6 border-y border-slate-200 dark:border-slate-800 mb-6">
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">100+</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Alunos</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">R$ 45k</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">FundoELAS</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">💜</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Comunidade</div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {gridItems.map((item, index) => (
              <a
                key={index}
                href="https://www.instagram.com/aquatrans.oficial/"
                target="_blank"
                rel="noopener noreferrer"
                className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-lg ${
                  item.isMore 
                    ? 'bg-gradient-to-br from-[#5BCEFA] to-[#F5A9B8] text-white' 
                    : 'bg-gradient-to-br from-cyan-50 to-pink-50 dark:from-slate-800 dark:to-slate-700'
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className={`text-xs text-center px-2 font-medium ${
                  item.isMore ? 'text-white' : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Follow Button */}
          <a
            href="https://www.instagram.com/aquatrans.oficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#5BCEFA] to-[#F5A9B8] text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <InstagramIcon className="w-5 h-5" />
            Seguir @aquatrans.oficial
          </a>
        </motion.div>
      </div>
    </section>
  );
}