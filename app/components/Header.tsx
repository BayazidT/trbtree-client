'use client';

import { useEffect, useState } from 'react';
import { myBio } from '@/app/data/bio-data';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const profile = myBio;

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) setTheme(saved);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      setTheme('dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const navItems = ['Home', 'Bio-Data', 'Profile'];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 bg-white/70 dark:bg-gray-900/60
                 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-teal-600 dark:text-teal-400"
        >
          {profile.name}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${profile.username}/${item.toLowerCase()}`}
              className="relative group text-gray-600 dark:text-gray-300"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0
                               bg-teal-500 transition-all group-hover:w-full" />
            </Link>
          ))}

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${profile.username}/${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {item}
                </Link>
              ))}

              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="text-left text-gray-700 dark:text-gray-300"
              >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
