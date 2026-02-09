'use client';

import { useState, useEffect } from 'react';
import { myBio } from '@/app/data/bio-data';
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

export default function BioDataPage() {
  const profile = myBio;

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">

      {/* Navbar */}
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
            {['Home', 'Bio-Data'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${profile.username}/bio-data`}
                className={`relative group ${item === 'Bio-Data' ? 'text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-300'}`}
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

   {/* Hero Section */}
<motion.section
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
  className="pt-40 pb-16 px-6 bg-gradient-to-b from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 text-center"
>
  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
    {/* Sliding Profile Picture */}
    {profile.profilePic && (
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-teal-300 dark:border-teal-600"
      >
        <Image
          src={profile.profilePic}
          alt={profile.name}
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </motion.div>
    )}

    {/* Name and Basic Info */}
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="space-y-2 md:space-y-3 text-center md:text-left"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        {profile.name}, {profile.age || 30}
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
        BSc in CSE
      </p>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
        Software Engineer (Penta Global, Dhaka)
      </p>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-1">
        Age Preference: {profile.expectations?.agePreference || 26}
      </p>
    </motion.div>
  </div>
</motion.section>

<main className="container mx-auto px-6 pb-32 max-w-4xl space-y-12">

  {/* Personal Information */}
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={cardHover}
  >
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
    <div className="space-y-2 text-gray-700 dark:text-gray-300 text-lg md:text-xl">
      <p><strong>Father:</strong> {profile.personalInfo?.fatherName || '-'}</p>
      <p><strong>Mother:</strong> {profile.personalInfo?.motherName || '-'}</p>
      <p><strong>Religion:</strong> {profile.personalInfo?.religion || '-'}</p>
      <p><strong>Address:</strong> {profile.personalInfo?.address || '-'}</p>
      <p><strong>Siblings:</strong> {profile.personalInfo?.siblings ? `${profile.personalInfo.siblings.brothers} brothers, ${profile.personalInfo.siblings.sisters} sisters` : '-'}</p>
      <p><strong>Birth Order:</strong> {profile.personalInfo?.birthOrder || '-'}</p>
      <p><strong>Family Setup:</strong> {profile.personalInfo?.currentFamilySetup || '-'}</p>
    </div>
  </motion.section>

  {/* Education */}
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={cardHover}
  >
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Education</h2>
    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-lg md:text-xl">
      {profile.education?.length ? profile.education.map((edu, i) => (
        <li key={i}>{edu.degree} — {edu.institution} ({edu.year})</li>
      )) : <li>-</li>}
    </ul>
  </motion.section>

  {/* Experience */}
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={cardHover}
  >
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Experience</h2>
    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 text-lg md:text-xl">
      {profile.experience?.length ? profile.experience.map((exp, i) => (
        <li key={i}>
          <strong>{exp.role}</strong> — {exp.company} ({exp.duration})
          {exp.description?.length && (
            <ul className="list-disc pl-6 mt-1 space-y-1">
              {exp.description.map((d, j) => <li key={j}>{d}</li>)}
            </ul>
          )}
        </li>
      )) : <li>-</li>}
    </ul>
  </motion.section>

  {/* Expectations */}
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={cardHover}
  >
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Expectations</h2>
    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 text-lg md:text-xl">
      <li><strong>Preferred Bride Qualities:</strong> {profile.expectations?.bride?.join(', ') || '-'}</li>
      <li><strong>Preferred Location:</strong> {profile.expectations?.preferredLocation || '-'}</li>
      <li><strong>Willing to Shift Abroad:</strong> {profile.expectations?.willingToShiftAbroad ? 'Yes' : 'No'}</li>
    </ul>
  </motion.section>

  {/* Additional Info */}
  {profile.additionalInfo?.length && (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardHover}
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 text-lg md:text-xl">
        {profile.additionalInfo.map((info, i) => <li key={i}>{info}</li>)}
      </ul>
    </motion.section>
  )}

  {/* Hobbies */}
  {profile.hobbies?.length && (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardHover}
      className="text-center"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">Hobbies & Interests</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {profile.hobbies.map((hobby) => (
          <span
            key={hobby}
            className="px-4 py-2 bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded-full text-lg md:text-xl font-medium"
          >
            {hobby}
          </span>
        ))}
      </div>
    </motion.section>
  )}

</main>


    </div>
  );
}
