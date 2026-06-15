import { motion } from 'motion/react';
import { Heart, Sparkles, Info } from 'lucide-react';

export function Pricing() {
  const prices = [
    { 
      value: "R$ 20", 
      label: "Valor solidário",
      description: "Para quem está começando",
      accessible: true
    },
    { 
      value: "R$ 40", 
      label: "Valor sugerido", 
      featured: true,
      description: "Ajuda a manter o projeto",
      accessible: true
    },
    { 
      value: "R$ 60", 
      label: "Valor apoiador",
      description: "Contribui com bolsas",
      accessible: true
    }
  ];

  return (
    <section id="valores" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5BCEFA] via-[#C8A8E8] to-[#F5A9B8]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Heart className="w-4 h-4 text-white" fill="currentColor" />
            <span className="text-sm font-semibold text-white text-[#0f172b]">
              Investimento acessível
            </span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans'] text-4xl lg:text-5xl font-bold text-white mb-6 text-[#0f172b]">
            Mensalidades que <br className="hidden sm:block" />cabem no seu bolso
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed text-[#0f172be6]"> Ninguém fica de fora por questões financeiras. <strong className="font-semibold text-[#0f172be6]">Escolha o valor de acordo com sua possibilidade.</strong></p>

          <div className="inline-flex items-start gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 max-w-2xl">
            <Info className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <p className="text-sm text-white/90 text-left leading-relaxed text-[#0f172be6]">Nosso objetivo: Tornar as aulas 100% gratuitas!&nbsp;&nbsp;&nbsp;A cada mensalidade nos aproxima desse objetivo.<strong className="font-semibold">Nossa meta:</strong></p>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 mb-12">
          {prices.map((price, index) => (
            <motion.div
              key={index}
              className={`relative flex-1 max-w-sm px-8 py-10 rounded-2xl border-2 transition-all duration-300 ${
                price.featured
                  ? 'bg-white border-white shadow-2xl scale-105 sm:scale-110'
                  : 'bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8 }}
            >
              {price.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#5BCEFA] to-[#F5A9B8] text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Mais escolhido
                </div>
              )}
              
              <div className="text-center">
                <div className={`text-5xl font-bold mb-2 ${price.featured ? 'text-slate-900' : 'text-white'} text-[#0f172b]`}>
                  {price.value}
                </div>
                <div className={`text-sm font-semibold mb-3 ${price.featured ? 'text-slate-700' : 'text-white/90'} text-[#0f172be6]`}>
                  {price.label}
                </div>
                <div className={`text-sm leading-relaxed ${price.featured ? 'text-slate-600' : 'text-white/80'} text-[#0f172bcc]`}>
                  {price.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/contato"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Quero me inscrever
          </a>

          
        </motion.div>
      </div>
    </section>
  );
}