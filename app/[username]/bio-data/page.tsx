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

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const gallery = profile.gallery ?? [];


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
            {['Home', 'Bio-Data', 'Profile'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${profile.username}/${item.toLowerCase()}`}
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
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
              {profile.latestDegree}
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              {profile.latestDesignation} (Penta Global, Dhaka)
            </p>
            {gallery.length > 0 && (
              <button
                onClick={() => {
                  setActiveIndex(0);
                  setIsGalleryOpen(true);
                }}
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 text-lg font-medium
                    border border-teal-600 text-teal-600
                    hover:bg-teal-600 hover:text-white
                    transition rounded-md"
              >
                📸 View Photo Gallery
              </button>
            )}
          </motion.div>
        </div>
      </motion.section>

           <main className="max-w-5xl mx-auto px-6 pb-20 space-y-16">

        {/* Personal Information */}
        <motion.section
          variants={cardHover}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold border-l-4 border-teal-500 pl-3 mb-6">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-y-4 gap-x-12 text-lg text-gray-700 dark:text-gray-300">
            <p><strong>Father’s Name:</strong> {profile.personalInfo?.fatherName || '-'}</p>
            <p><strong>Mother’s Name:</strong> {profile.personalInfo?.motherName || '-'}</p>
            <p><strong>Religion:</strong> {profile.personalInfo?.religion || '-'}</p>
            <p><strong>Date of Birth:</strong> {profile.personalInfo?.dateOfBirth || '-'}</p>
            <p><strong>Place of Birth:</strong> {profile.personalInfo?.placeOfBirth  || '-'}</p>
            <p><strong>Blood Group:</strong> {profile.personalInfo?.bloodGroup || '-'}</p>
            <p><strong>Marital Status:</strong> {profile.personalInfo?.maritalStatus || '-'}</p>
            <p><strong>Present Address:</strong> {profile.personalInfo?.address || '-'}</p>
            <p>
              <strong>Siblings:</strong>{' '}
              {profile.personalInfo?.siblings
                ? `${profile.personalInfo.siblings.brothers} Brother(s), ${profile.personalInfo.siblings.sisters} Sister(s)`
                : '-'}
            </p>
            <p><strong>Birth Order:</strong> {profile.personalInfo?.birthOrder || '-'}</p>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          variants={cardHover}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold border-l-4 border-teal-500 pl-3 mb-6">
            Educational Qualification
          </h2>

          <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
            {profile.education?.map((edu, idx) => (
              <li key={idx} className="pb-3">
                <p className="font-medium">{edu.degree}</p>
                <p>{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </li>
            )) || <p>-</p>}
          </ul>
        </motion.section>

        {/* Professional Experience */}
        <motion.section
          variants={cardHover}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold border-l-4 border-teal-500 pl-3 mb-6">
            Professional Experience
          </h2>

          <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
            {profile.experience?.map((job, idx) => (
              <li key={idx} className="pb-3">
                <p className="font-medium">
                  {job.role} — {job.company}
                </p>
                <p className="text-sm text-gray-500">{job.duration}</p>
              </li>
            )) || <p>-</p>}
          </ul>
        </motion.section>
         {/* Hobbies */}
        <motion.section
          variants={cardHover}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold border-l-4 border-teal-500 pl-3 mb-6">
            Hobbies & Interests
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            {profile.hobbies?.join(', ') || '-'}
          </p>
        </motion.section>

        {/* Expectations */}
        <motion.section
          variants={cardHover}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold border-l-4 border-teal-500 pl-3 mb-6">
            Expectations
          </h2>

          <div className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
            <p><strong>Preferred Age:</strong> {profile.expectations?.agePreference || '-'}</p>
            <p><strong>Education:</strong> {profile.expectations?.educationPreference || '-'}</p>
            <p><strong>Profession:</strong> {profile.expectations?.professionPreference || '-'}</p>
            <p><strong>Location:</strong> {profile.expectations?.locationPreference || '-'}</p>
            <p><strong>Willing to Shift Abroad:</strong> {profile.expectations?.willingToShiftAbroad ? 'Yes' : 'No'}</p>
            <p>{profile.expectations?.bride.toLocaleString() || '-Loyal, modest, down to earth, equal in value and respect.......'}</p>
          </div>
        </motion.section>

       

      </main>
      {isGalleryOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
        >
          <div className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-lg overflow-hidden">

            {/* Close Button */}
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 z-50
                      text-2xl text-gray-700 dark:text-gray-300
                      hover:text-red-500"
            >
              ✕
            </button>


            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-[70vh]"
            >
              <Image
                src={gallery[activeIndex]}
                alt={`Gallery image ${activeIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Controls */}
            <div className="flex justify-between items-center px-6 py-4">
              <button
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((i) => i - 1)}
                className="px-4 py-2 text-lg disabled:opacity-40"
              >
                ◀ Prev
              </button>

              <span className="text-sm text-gray-500">
                {activeIndex + 1} / {gallery.length}
              </span>

              <button
                disabled={activeIndex === gallery.length - 1}
                onClick={() => setActiveIndex((i) => i + 1)}
                className="px-4 py-2 text-lg disabled:opacity-40"
              >
                Next ▶
              </button>
            </div>
          </div>
        </motion.div>
      )}


    </div>
  );
}
