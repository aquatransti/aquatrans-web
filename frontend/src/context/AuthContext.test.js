import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// Test component that uses the auth context
const TestComponent = () => {
  const { user, isAuthenticated, login, logout, hasPermission } = useAuth();
  
  return (
    <div>
      <span data-testid="authenticated">{isAuthenticated() ? 'yes' : 'no'}</span>
      <span data-testid="user">{user ? user.nome : 'no user'}</span>
      <span data-testid="permission">{hasPermission('canManageUsers') ? 'yes' : 'no'}</span>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

const renderWithAuth = () => {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('provides initial unauthenticated state', () => {
    renderWithAuth();
    expect(screen.getByTestId('authenticated')).toHaveTextContent('no');
    expect(screen.getByTestId('user')).toHaveTextContent('no user');
  });

  test('provides hasPermission function', () => {
    renderWithAuth();
    expect(screen.getByTestId('permission')).toHaveTextContent('no');
  });

  test('provides logout function', () => {
    renderWithAuth();
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });
});

describe('AuthContext - Token Management', () => {
  test('checks localStorage for existing token on mount', () => {
    renderWithAuth();
    expect(localStorage.getItem).toHaveBeenCalledWith('aquatrans_token');
  });
});
