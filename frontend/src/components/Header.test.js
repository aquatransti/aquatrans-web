import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import Header from './Header';

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  test('renders logo correctly', () => {
    renderHeader();
    expect(screen.getByAltText('Aquatrans')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderHeader();
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Equipe')).toBeInTheDocument();
    expect(screen.getByText('Eventos')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  test('renders theme toggle button', () => {
    renderHeader();
    const themeButton = screen.getByTitle(/Ativar modo/i);
    expect(themeButton).toBeInTheDocument();
  });

  test('renders skip link for accessibility', () => {
    renderHeader();
    const skipLink = screen.getByText('Pular para o conteúdo principal');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveClass('skip-link');
  });

  test('mobile menu toggle works', () => {
    renderHeader();
    const menuButton = screen.getByLabelText(/menu/i);
    expect(menuButton).toBeInTheDocument();
    
    fireEvent.click(menuButton);
    // After click, menu should be open
  });

  test('has correct ARIA attributes', () => {
    renderHeader();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navegação principal');
  });

  test('login link is present', () => {
    renderHeader();
    const loginLinks = screen.getAllByText('Entrar');
    expect(loginLinks.length).toBeGreaterThan(0);
  });
});

describe('Header Accessibility', () => {
  test('links are present and accessible', () => {
    renderHeader();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  test('buttons are present', () => {
    renderHeader();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
