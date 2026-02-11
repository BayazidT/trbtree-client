'use client';

import { useEffect, useState } from 'react';
import { myBio } from '@/app/data/bio-data';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  const profile = myBio;
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) setTheme(saved);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 bg-white/70 dark:bg-gray-900/60
                 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-extrabold text-teal-600 dark:text-teal-400"
        >
          {profile.name}
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          {['Home', 'Bio-Data', 'Profile'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${profile.username}/${item.toLowerCase()}`}
              className={`relative group ${
                item === 'Bio-Data'
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
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
      </div>
    </motion.nav>
  );
}
