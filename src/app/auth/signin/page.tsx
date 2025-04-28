'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaHeart, FaLeaf, FaSmile } from 'react-icons/fa';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender-50 to-peach-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <FaHeart className="text-lavender-400 w-8 h-8" />
            <FaLeaf className="text-mint-400 w-8 h-8" />
            <FaSmile className="text-peach-400 w-8 h-8" />
          </div>
          <h2 className="mt-6 text-center text-4xl font-serif font-light text-gray-800">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-sans">
            Or{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-lavender-600 hover:text-lavender-500 transition-colors duration-200"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg shadow-sm">
              {error}
            </div>
          )}
          <div className="rounded-lg shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-lavender-200 focus:border-lavender-300 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-lavender-200 focus:border-lavender-300 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{ background: '#7c3aed', color: 'white' }}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 