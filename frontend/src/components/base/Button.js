import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Button - Componente base para botões
 * @param {string} variant - Variante: 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} size - Tamanho: 'sm' | 'md' | 'lg'
 * @param {string} to - Rota interna (usa Link)
 * @param {string} href - Link externo
 * @param {boolean} fullWidth - Se ocupa 100% da largura
 * @param {boolean} disabled - Se está desabilitado
 * @param {string} className - Classes adicionais
 * @param {React.ReactNode} children - Conteúdo do botão
 */
const Button = ({ 
  variant = 'primary',
  size = 'md',
  to,
  href,
  fullWidth = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`;

  // Link interno (React Router)
  if (to) {
    return (
      <Link to={to} className={buttonClass} {...props}>
        {children}
      </Link>
    );
  }

  // Link externo
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClass}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Botão padrão
  return (
    <button 
      className={buttonClass} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
