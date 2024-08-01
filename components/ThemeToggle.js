// components/ThemeToggle.js
"use client";
import '../styles/globals.css'

import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="toggle" onClick={toggleTheme}>
      <input type="checkbox" id="theme-toggle" checked={isDarkMode} readOnly />
      <label htmlFor="theme-toggle" className="toggle-label"></label>
      <span className="ml-2">{isDarkMode ? '🌙' : '☀️'}</span>
    </div>
  );
};

export default ThemeToggle;