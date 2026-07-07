import { Instagram, Facebook, Mail, HandCoins } from 'lucide-react';
import { Link } from 'react-router';
import logoAquatrans from '../../assets/logo_aquatrans.jpg';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 font-['Inter']">
      {/* Trans Flag Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-600 via-pink-600 to-cyan-600" role="presentation" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid md:grid-cols-4 gap-6 mb-3">
          {/* About */}
          <div>
            <h3 className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] text-base font-bold text-white mb-2">
              <img src={logoAquatrans} alt="Logo Aquatrans" className="w-6 h-6 object-contain" /> Aquatrans
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Inclusão e bem-estar para pessoas trans e não bináries através da natação.
            </p>
            <div className="flex gap-1.5">
              <a
                href="https://www.instagram.com/aquatrans.oficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              
              <a
                href="mailto:aqua.trans24@gmail.com"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links Coluna 1 */}
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-white mb-2 text-sm">Navegação</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-cyan-400 transition-colors">Sobre</Link></li>
              <li><Link to="/servicos" className="hover:text-cyan-400 transition-colors">Serviços</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-white mb-2 text-sm">Informações</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/eventos" className="hover:text-cyan-400 transition-colors">Eventos</Link></li>
              <li><Link to="/transparencia" className="hover:text-cyan-400 transition-colors">Transparência</Link></li>
              <li><Link to="/contato" className="hover:text-cyan-400 transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Apoie */}
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-white mb-2 text-sm">Apoie</h4>
            <Link
              to="/apadrinhamento"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#5BCEFA] to-[#F5A9B8] text-white rounded-lg hover:opacity-90 transition-opacity text-xs font-medium"
            >
              <HandCoins className="w-3.5 h-3.5" aria-hidden="true" />
              Apoie o Projeto
            </Link>
            <p className="text-[10px] text-slate-400 mt-2">
              Parceiros: FundoELAS, Rio sem LGBTfobia
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-3 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400">
            <p>© 2026 Aquatrans. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1.5">
              Feito com
              <span className="text-[#F5A9B8]">🩷</span>
              por Caesar, Wenny e Guillermo para a comunidade trans
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}