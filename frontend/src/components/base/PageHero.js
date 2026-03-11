import React from 'react';
import './PageHero.css';

/**
 * PageHero - Componente base para hero de páginas internas
 * @param {string} badge - Texto do badge (opcional)
 * @param {string} title - Título principal
 * @param {string} subtitle - Subtítulo (opcional)
 * @param {React.ReactNode} children - Conteúdo adicional (opcional)
 */
const PageHero = ({ badge, title, subtitle, children }) => {
  return (
    <section className="page-hero">
      <div className="container">
        {badge && <span className="hero-badge">{badge}</span>}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

export default PageHero;
