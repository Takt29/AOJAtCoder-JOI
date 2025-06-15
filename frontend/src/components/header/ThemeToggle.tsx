"use client"

import { FiSun, FiMoon } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="テーマ切り替え"
    >
      {theme === 'dark' ? (
        <FiSun  />
      ) : (
        <FiMoon />
      )}
    </Button>
  );
}; 