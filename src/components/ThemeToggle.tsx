import React from 'react';

interface ThemeToggleProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
