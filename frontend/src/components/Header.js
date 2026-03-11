import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, permissions } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const getDashboardLink = () => {
    if (!permissions) return '/login';
    switch (permissions.dashboard) {
      case 'gestor': return '/dashboard/gestor';
      case 'admin': return '/dashboard/admin';
      case 'aluno': return '/dashboard/aluno';
      default: return '/login';
    }
  };

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/equipe', label: 'Equipe' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/eventos', label: 'Eventos' },
    { path: '/transparencia', label: 'Transparência' },
    { path: '/apadrinhamento', label: 'Apoie', highlight: true },
    { path: '/contato', label: 'Contato' },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <div className="trans-bar" aria-hidden="true" />
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`} role="banner">
        <div className="container">
          <nav className="nav" aria-label="Navegação principal">
            <Link to="/" className="logo" aria-label="Aquatrans - Página inicial">
              <img 
                src="/logo_aquatrans.jpg" 
                alt="Logo Aquatrans" 
                className="logo-image"
              />
              <span className="logo-text">Aquatrans</span>
            </Link>

            <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`} role="menubar">
              {navLinks.map((link) => (
                <li key={link.path} role="none">
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''} ${link.highlight ? 'nav-link-highlight' : ''}`}
                    role="menuitem"
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.highlight && <span className="heart-icon">💜</span>}
                    {link.label}
                  </Link>
                </li>
              ))}
              
              {/* Login/Área do Usuário */}
              <li role="none" className="nav-login-item">
                <Link
                  to={isAuthenticated() ? getDashboardLink() : '/login'}
                  className="nav-link nav-link-login"
                  role="menuitem"
                >
                  <span className="login-icon">👤</span>
                  {isAuthenticated() ? user?.nome?.split(' ')[0] : 'Entrar'}
                </Link>
              </li>
              
              <li className="nav-theme-toggle" role="none">
                <ThemeToggle />
              </li>
            </ul>

            <div className="header-actions">
              <Link
                to={isAuthenticated() ? getDashboardLink() : '/login'}
                className="header-login-btn"
                aria-label={isAuthenticated() ? 'Minha área' : 'Fazer login'}
              >
                👤
              </Link>
              <ThemeToggle />
              <button
                className={`menu-toggle ${isMenuOpen ? 'menu-toggle-open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMenuOpen}
                aria-controls="nav-menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
