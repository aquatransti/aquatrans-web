import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

// Test component
const TestComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div>
      <span data-testid="theme">{isDarkMode ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

const renderWithTheme = () => {
  return render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.getItem = jest.fn().mockReturnValue(null);
    localStorage.setItem = jest.fn();
    jest.clearAllMocks();
  });

  test('provides default theme (light)', () => {
    renderWithTheme();
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  test('toggles theme when toggleTheme is called', () => {
    renderWithTheme();
    const toggleButton = screen.getByText('Toggle');
    
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  test('persists theme to localStorage', () => {
    renderWithTheme();
    const toggleButton = screen.getByText('Toggle');
    
    fireEvent.click(toggleButton);
    expect(localStorage.setItem).toHaveBeenCalledWith('aquatrans-theme', 'dark');
  });
});
