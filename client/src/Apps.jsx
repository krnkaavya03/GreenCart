import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';

function Apps() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-lightBackground' : 'bg-darkBackground'} text-${theme === 'light' ? 'darkText' : 'darkText'} transition-all duration-300`}>
      <ThemeSwitcher />
      <div className="max-w-xl mx-auto p-8">
        <h1 className="text-3xl font-bold">Welcome to My Website</h1>
        <p>This is a demo website where you can switch between light and dark themes!</p>
      </div>
    </div>
  );
}

export default Apps;