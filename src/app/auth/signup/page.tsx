'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaHeart, FaLeaf, FaSmile } from 'react-icons/fa';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        router.push('/auth/signin');
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-sans">
            Or{' '}
            <Link
              href="/auth/signin"
              style={{ color: '#7c3aed' }}
              className="font-medium transition-colors duration-200 cursor-pointer"
            >
              sign in to your existing account
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
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-all duration-200"
                style={{ boxShadow: '0 0 0 2px #ede9fe' }}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-all duration-200"
                style={{ boxShadow: '0 0 0 2px #ede9fe' }}
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
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm transition-all duration-200"
                style={{ boxShadow: '0 0 0 2px #ede9fe' }}
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 