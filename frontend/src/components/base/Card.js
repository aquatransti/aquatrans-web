import React from 'react';
import './Card.css';

/**
 * Card - Componente base para cards
 * @param {string} className - Classes adicionais
 * @param {string} variant - Variante: 'default' | 'highlighted' | 'gradient'
 * @param {string} icon - Emoji ou ícone
 * @param {string} title - Título do card
 * @param {string} subtitle - Subtítulo (opcional)
 * @param {React.ReactNode} children - Conteúdo do card
 * @param {function} onClick - Callback de clique (opcional)
 * @param {string} href - Link (opcional, transforma em <a>)
 */
const Card = ({ 
  className = '',
  variant = 'default',
  icon,
  title,
  subtitle,
  children,
  onClick,
  href,
  target,
  ...props
}) => {
  const cardClass = `card card-${variant} ${className}`;
  
  const content = (
    <>
      {icon && <span className="card-icon">{icon}</span>}
      {title && <h3 className="card-title">{title}</h3>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      {children && <div className="card-content">{children}</div>}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={cardClass} 
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button className={cardClass} onClick={onClick} {...props}>
        {content}
      </button>
    );
  }

  return (
    <div className={cardClass} {...props}>
      {content}
    </div>
  );
};

export default Card;
