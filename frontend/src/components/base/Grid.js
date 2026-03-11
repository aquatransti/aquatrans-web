import React from 'react';
import './Grid.css';

/**
 * Grid - Componente base para layouts em grid
 * @param {number} cols - Número de colunas (1-4)
 * @param {string} gap - Tamanho do gap: 'sm' | 'md' | 'lg'
 * @param {string} className - Classes adicionais
 * @param {React.ReactNode} children - Conteúdo do grid
 */
const Grid = ({ 
  cols = 3,
  gap = 'lg',
  className = '',
  children 
}) => {
  return (
    <div className={`grid grid-${cols} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

export default Grid;
