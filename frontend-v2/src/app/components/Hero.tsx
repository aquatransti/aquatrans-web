import { motion } from 'motion/react';
import { ArrowRight, Heart, ChevronDown } from 'lucide-react';
import heroBackgroundImage from '../../assets/hero-bg.png';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-cyan-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBackgroundImage}
          alt=""
          className="w-full h-full object-cover object-center opacity-60 sm:opacity-70 dark:opacity-40 sm:dark:opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-white/60 to-pink-50/50 dark:from-slate-900/60 dark:via-slate-950/70 dark:to-slate-900/60" />
      </div>

      {/* Animated Waves Background - 3 layers */}
      <div className="absolute inset-0 overflow-hidden opacity-30 sm:opacity-40 dark:opacity-15 sm:dark:opacity-20">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-t from-cyan-100 to-transparent dark:from-cyan-900/30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ clipPath: "polygon(0 30%, 100% 50%, 100% 100%, 0 100%)" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 bg-gradient-to-t from-pink-100 to-transparent dark:from-pink-900/30"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ clipPath: "polygon(0 50%, 100% 30%, 100% 100%, 0 100%)" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-purple-100 to-transparent dark:from-purple-900/20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ clipPath: "polygon(0 60%, 100% 40%, 100% 100%, 0 100%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-40 w-full">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-xl border border-cyan-200 dark:border-cyan-800 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">Espaço seguro e acolhedor para pessoas trans</span>
          </motion.div>

          <motion.h1
            className="relative font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 dark:text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Mergulhe em <br className="sm:hidden" />uma{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                comunidade <br className="sm:hidden" />inclusiva
              </span>
              <motion.span
                className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-3 sm:h-4 bg-gradient-to-r from-cyan-200 to-pink-200 dark:from-cyan-800 dark:to-pink-800 -z-0 rounded-full opacity-50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-10 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <strong className="font-semibold text-slate-900 dark:text-white">Aquatrans é muito mais que natação.</strong>{' '}
            É um movimento de acolhimento, empoderamento e transformação para pessoas trans e não bináries que buscam bem-estar, saúde e pertencimento.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a
              href="/contato"
              className="group inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-5 rounded-xl bg-gradient-to-r from-cyan-600 to-pink-600 text-white text-base sm:text-lg font-bold shadow-2xl hover:shadow-[0_20px_50px_rgba(91,206,250,0.4)] active:scale-95 sm:hover:scale-[1.02] transition-all duration-300 touch-manipulation"
            >
              Comece sua jornada
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/sobre"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-5 rounded-xl border-2 sm:border-3 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-base sm:text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-cyan-600 dark:hover:border-cyan-400 active:scale-95 sm:hover:-translate-y-0.5 transition-all duration-300 touch-manipulation"
            >
              Conheça nossa história
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="hidden sm:flex justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs font-medium uppercase tracking-wider">Role para explorar</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}