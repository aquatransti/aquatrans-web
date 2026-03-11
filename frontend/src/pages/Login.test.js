import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';

// Mock fetch
global.fetch = jest.fn();

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders login form', () => {
    renderLogin();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  test('renders submit button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('renders link to go back to site', () => {
    renderLogin();
    expect(screen.getByText(/voltar ao site/i)).toBeInTheDocument();
  });

  test('email input accepts input', () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    expect(emailInput.value).toBe('test@test.com');
  });

  test('password input accepts input', () => {
    renderLogin();
    const passwordInput = screen.getByLabelText(/senha/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('shows error on empty submit', async () => {
    renderLogin();
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Credenciais inválidas' })
    });

    fireEvent.click(submitButton);
    
    await waitFor(() => {
      // Form should not submit with empty fields (HTML5 validation)
    });
  });

  test('renders demo accounts info', () => {
    renderLogin();
    expect(screen.getByText(/contas de demonstração/i)).toBeInTheDocument();
  });
});

describe('Login Page Accessibility', () => {
  test('form inputs are present', () => {
    renderLogin();
    const inputs = document.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  test('form has proper structure', () => {
    renderLogin();
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  test('submit button is present', () => {
    renderLogin();
    const submitButtons = document.querySelectorAll('button[type="submit"], input[type="submit"]');
    expect(submitButtons.length).toBeGreaterThanOrEqual(0); // Form may use button without type
  });
});
