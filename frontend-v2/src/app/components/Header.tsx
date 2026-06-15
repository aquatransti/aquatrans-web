import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Moon, Sun, HandCoins } from 'lucide-react';
import logo from '../../assets/logo_aquatrans.jpg';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Trans Flag Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-cyan-600 via-pink-600 to-cyan-600" role="presentation" aria-hidden="true" />
      
      <header className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <nav className="flex items-center justify-between h-18" aria-label="Main navigation">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all group" aria-label="Aquatrans - Voltar para a página inicial">
              <img
                src={logo}
                alt="Logo Aquatrans"
                className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white">
                Aquatrans
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-2 ml-auto mr-4">
              <li><Link to="/" className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 ${isActive('/') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Início</Link></li>
              <li><Link to="/sobre" className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 ${isActive('/sobre') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Sobre</Link></li>
              <li><Link to="/servicos" className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 ${isActive('/servicos') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Serviços</Link></li>
              <li><Link to="/eventos" className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 ${isActive('/eventos') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Eventos</Link></li>
              <li><Link to="/transparencia" className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 ${isActive('/transparencia') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Transparência</Link></li>
              <li><Link to="/contato" className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 ${isActive('/contato') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Contato</Link></li>
              <li>
                <Link to="/apadrinhamento" className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-700 hover:to-pink-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center gap-1.5" aria-label="Apoiar o Aquatrans">
                  <HandCoins className="w-4 h-4" aria-hidden="true" />
                  Apoie
                </Link>
              </li>
            </ul>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {isDark ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {isDark ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-slate-700 dark:text-slate-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800" role="menu">
              <ul className="flex flex-col gap-2">
                <li role="menuitem"><Link to="/" className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`} onClick={() => setIsMenuOpen(false)}>Início</Link></li>
                <li role="menuitem"><Link to="/sobre" className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/sobre') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`} onClick={() => setIsMenuOpen(false)}>Sobre</Link></li>
                <li role="menuitem"><Link to="/servicos" className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/servicos') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`} onClick={() => setIsMenuOpen(false)}>Serviços</Link></li>
                <li role="menuitem"><Link to="/eventos" className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/eventos') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`} onClick={() => setIsMenuOpen(false)}>Eventos</Link></li>
                <li role="menuitem"><Link to="/transparencia" className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/transparencia') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`} onClick={() => setIsMenuOpen(false)}>Transparência</Link></li>
                <li role="menuitem">
                  <Link to="/apadrinhamento" className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-700 hover:to-pink-700 shadow-md" onClick={() => setIsMenuOpen(false)}>
                    <HandCoins className="w-4 h-4" aria-hidden="true" />
                    Apoie o Projeto
                  </Link>
                </li>
                <li role="menuitem"><Link to="/contato" className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive('/contato') ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`} onClick={() => setIsMenuOpen(false)}>Contato</Link></li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
}