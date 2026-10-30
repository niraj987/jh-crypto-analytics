'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
  setTheme: (theme: Theme) => void;
  isRippling: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
  isRippling: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const [rippleData, setRippleData] = useState<{
    active: boolean;
    x: number;
    y: number;
    type: 'sunrise' | 'twilight';
  }>({
    active: false,
    x: 0,
    y: 0,
    type: 'sunrise',
  });

  useEffect(() => {
    // Read saved theme or default to comfortable institutional dark theme
    const saved = localStorage.getItem('jh_theme') as Theme | null;
    const initialTheme: Theme = saved === 'light' ? 'light' : 'dark';
    
    setThemeState(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('jh_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = (e?: React.MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    
    // Position of sunrise ripple origin
    let x = window.innerWidth - 100;
    let y = 40;
    if (e && e.clientX && e.clientY) {
      x = e.clientX;
      y = e.clientY;
    }

    // Trigger sunshine sunrise bloom or twilight bloom
    setRippleData({
      active: true,
      x,
      y,
      type: nextTheme === 'light' ? 'sunrise' : 'twilight',
    });

    // Slight delay so the wave expands over the screen smoothly as colors invert
    setTimeout(() => {
      setTheme(nextTheme);
    }, 280);

    setTimeout(() => {
      setRippleData((prev) => ({ ...prev, active: false }));
    }, 1150);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isRippling: rippleData.active }}>
      {children}

      {/* Radiant Sunshine / Twilight Ripple Overlay */}
      {rippleData.active && (
        <div
          className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
          aria-hidden="true"
        >
          {/* Expanding Radial Light Sunburst */}
          <div
            className={`absolute rounded-full pointer-events-none ${
              rippleData.type === 'sunrise' ? 'sunrise-bloom-anim' : 'twilight-bloom-anim'
            }`}
            style={{
              left: `${rippleData.x}px`,
              top: `${rippleData.y}px`,
              width: '120px',
              height: '120px',
              marginLeft: '-60px',
              marginTop: '-60px',
              background:
                rippleData.type === 'sunrise'
                  ? 'radial-gradient(circle, rgba(251, 191, 36, 0.98) 0%, rgba(245, 158, 11, 0.85) 25%, rgba(254, 215, 170, 0.5) 60%, rgba(255, 255, 255, 0) 100%)'
                  : 'radial-gradient(circle, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.85) 30%, rgba(51, 65, 85, 0.4) 65%, rgba(7, 12, 24, 0) 100%)',
              boxShadow:
                rippleData.type === 'sunrise'
                  ? '0 0 100px 40px rgba(251, 191, 36, 0.8)'
                  : '0 0 100px 40px rgba(30, 41, 59, 0.7)',
            }}
          />

          {/* Rotating Solar Sunbeam Rays (When Switching to Light Mode) */}
          {rippleData.type === 'sunrise' && (
            <div
              className="absolute pointer-events-none solar-rays-anim"
              style={{
                left: `${rippleData.x}px`,
                top: `${rippleData.y}px`,
                width: '380px',
                height: '380px',
                marginLeft: '-190px',
                marginTop: '-190px',
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(253, 224, 71, 0.45) 20deg, transparent 40deg, rgba(245, 158, 11, 0.45) 60deg, transparent 80deg, rgba(253, 224, 71, 0.45) 120deg, transparent 150deg, rgba(245, 158, 11, 0.45) 200deg, transparent 240deg, rgba(253, 224, 71, 0.45) 300deg, transparent 340deg)',
              }}
            />
          )}
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
