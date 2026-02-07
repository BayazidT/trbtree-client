'use client';

import { useState, useEffect } from 'react';
import { myProfile } from '@/app/data/profile';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 15px rgba(0,0,0,0.06)' },
  hover: { y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' },
};

export default function ProfilePage() {
  const profile = myProfile;

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ---------------- Navbar ---------------- */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed inset-x-0 top-0 z-50 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/60"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">
            {profile.name}
          </Link>

          <div className="flex items-center gap-8 text-sm font-medium">
            {['Home', 'Bio-Data', 'Profile'].map((item) => (
              <Link
                key={item}
                href={item === 'Profile' ? `/${profile.username}/profile` : item === 'Home' ? '/' : `/${profile.username}/bio-data`}
                className={`relative group ${
                  item === 'Profile'
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-teal-500 transition-all group-hover:w-full" />
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

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="pt-40 pb-24 px-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div variants={cardHover} className="mb-12">
            <div className="inline-block p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
              <Image
                src={profile.profilePic}
                alt={profile.name}
                width={200}
                height={200}
                className="rounded-full border-4 border-teal-100 dark:border-teal-900 shadow-md object-cover transition-transform hover:scale-105 duration-500"
                priority
              />
            </div>
          </motion.div>

          <motion.h1 variants={cardHover} className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-4">
            {profile.name}
          </motion.h1>

          <motion.p variants={cardHover} className="text-3xl md:text-4xl font-light text-teal-600 dark:text-teal-400 mb-12">
            {profile.designation}
          </motion.p>

          <motion.div variants={cardHover} className="flex flex-wrap justify-center gap-6">
            <motion.a
              href={`mailto:${profile.contact.email}`}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-5 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Me
            </motion.a>

            {profile.contact.linkedin && (
              <motion.a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="px-10 py-5 bg-white dark:bg-gray-800 border-2 border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 rounded-full font-bold hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                LinkedIn
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.section>

      <main className="container mx-auto px-6 pb-32 max-w-6xl space-y-32">
        {/* About Me */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardHover}
          className="bg-white dark:bg-gray-900 p-10 md:p-14 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
          <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            {profile.introduction}
          </p>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Skills
          </h2>
          <div className="space-y-4">
            <p className="text-xl"><strong>Languages:</strong> {profile.skills.languages.join(', ')}</p>
            <p className="text-xl"><strong>Frameworks:</strong> {profile.skills.frameworks.join(', ')}</p>
            <p className="text-xl"><strong>Tools:</strong> {profile.skills.tools.join(', ')}</p>
            <p className="text-xl"><strong>Concepts:</strong> {profile.skills.concepts.join(', ')}</p>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-10 text-center md:text-left">
            Education
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {profile.education.map((edu, i) => (
              <motion.div
                key={i}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <h3 className="text-3xl font-semibold text-teal-700 dark:text-teal-400 mb-3">
                  {edu.degree}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  {edu.institution} | {edu.year}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-10 text-center md:text-left">
            Experience
          </h2>
          <div className="space-y-10">
            {profile.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-10 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <h3 className="text-3xl font-semibold text-teal-700 dark:text-teal-400 mb-2">
                  {exp.role} — {exp.company}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {exp.duration}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-xl text-gray-700 dark:text-gray-300">
                  {exp.description.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-10 text-center md:text-left">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.projects.map((proj, i) => (
              <motion.div
                key={i}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md flex flex-col"
              >
                <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">
                  {proj.title}
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                  {proj.description.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Tech:</strong> {proj.tech.join(', ')}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Languages */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Languages
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {profile.languages.map((lang) => (
              <motion.span
                key={lang}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded-full text-lg font-medium shadow-sm"
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Certifications
          </h2>
          <div className="space-y-6">
            {profile.certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-2">
                  {cert.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">{cert.date}</p>
                <p className="text-gray-700 dark:text-gray-300">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Publications */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Publications
          </h2>
          <div className="space-y-6">
            {profile.publications.map((pub, i) => (
              <motion.div
                key={i}
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-2">
                  {pub.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">{pub.date}</p>
                <p className="text-gray-700 dark:text-gray-300">{pub.description}</p>
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-semibold"
                >
                  View Publication →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Hobbies */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Interests & Hobbies
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {profile.hobbies.map((hobby) => (
              <motion.span
                key={hobby}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded-full text-lg font-medium shadow-sm"
              >
                {hobby}
              </motion.span>
            ))}
          </div>
        </motion.section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-16 mt-20 border-t border-gray-200 dark:border-gray-800"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg mb-6">
            © {new Date().getFullYear()} {profile.name}. Built in Berlin.
          </p>
          <div className="space-x-8">
            <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}