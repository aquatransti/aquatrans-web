import { motion } from 'motion/react';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden bg-gradient-to-br from-[#5BCEFA] via-[#C8A8E8] to-[#F5A9B8] rounded-3xl p-12 lg:p-16 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48" />
          
          <div className="relative text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-white text-[#0f172b]">Sua jornada começa aqui</span>
            </motion.div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-white mb-6 text-[#0f172b]">
              Pronto para fazer parte dessa <br className="hidden sm:block" />
              <span className="relative inline-block">
                transformação?
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-white/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </h2>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed text-[#0f172be6]">
              Junte-se a uma comunidade que te acolhe de verdade. <strong className="font-semibold">Aqui você pertence.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/contato"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 text-lg font-semibold hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                Quero participar agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="/apadrinhamento"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white border-2 border-white font-semibold text-lg hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5" fill="currentColor" />
                Apoiar o projeto
              </motion.a>
            </div>

            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-[#0f172bcc]">Resposta em até 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-[#0f172bcc]">Aula experimental gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-[#0f172bcc]">100% seguro e acolhedor</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Apoiado por
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">FundoELAS</span>
            </div>
            <div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Rio sem LGBTfobia</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}