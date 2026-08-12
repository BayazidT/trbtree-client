'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from '@/app/components/Logo';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid username or password');
      }

      // Authentication successful
      router.push('/');
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Login Card */}
        <div
          className="
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-xl
            border border-gray-200/70 dark:border-gray-800
            rounded-3xl
            shadow-xl
            p-8
          "
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                disabled={loading}
                placeholder="Enter your username"
                className="
                  w-full
                  px-4 py-3
                  rounded-xl
                  border border-gray-200 dark:border-gray-700
                  bg-gray-50 dark:bg-gray-800
                  text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500
                  focus:border-transparent
                  transition
                  disabled:opacity-60
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                disabled={loading}
                placeholder="Enter your password"
                className="
                  w-full
                  px-4 py-3
                  rounded-xl
                  border border-gray-200 dark:border-gray-700
                  bg-gray-50 dark:bg-gray-800
                  text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500
                  focus:border-transparent
                  transition
                  disabled:opacity-60
                "
              />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  rounded-xl
                  border border-red-200 dark:border-red-900
                  bg-red-50 dark:bg-red-950/40
                  px-4 py-3
                  text-sm
                  text-red-600 dark:text-red-400
                "
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="
                w-full
                py-3
                px-4
                rounded-xl
                bg-teal-600
                hover:bg-teal-700
                disabled:bg-gray-400
                disabled:cursor-not-allowed
                text-white
                font-semibold
                transition-all
                shadow-md
                hover:shadow-lg
              "
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Register */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
            >
              Create an account
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}