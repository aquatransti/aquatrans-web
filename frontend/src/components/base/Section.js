import React from 'react';
import './Section.css';

/**
 * Section - Componente base para seções de página
 * @param {string} id - ID da seção (opcional, para ancoragem)
 * @param {string} className - Classes adicionais
 * @param {string} variant - Variante de estilo: 'default' | 'secondary' | 'gradient' | 'dark'
 * @param {string} badge - Texto do badge (opcional)
 * @param {string} title - Título da seção (opcional)
 * @param {string} subtitle - Subtítulo (opcional)
 * @param {boolean} centered - Se o conteúdo deve ser centralizado
 * @param {React.ReactNode} children - Conteúdo da seção
 */
const Section = ({ 
  id,
  className = '',
  variant = 'default',
  badge,
  title,
  subtitle,
  centered = false,
  children 
}) => {
  const variantClass = `section-${variant}`;
  
  return (
    <section 
      id={id} 
      className={`section ${variantClass} ${className}`}
    >
      <div className="container">
        {(badge || title || subtitle) && (
          <div className={`section-header ${centered ? 'centered' : ''}`}>
            {badge && <span className="badge">{badge}</span>}
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className={`section-content ${centered ? 'centered' : ''}`}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
