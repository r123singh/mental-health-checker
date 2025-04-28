'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaHeart, FaLeaf, FaSmile, FaUser, FaSignOutAlt, FaBook, FaChartLine } from 'react-icons/fa';
import SignOutButton from '@/components/SignOutButton';
import Link from 'next/link';

export default function Journal() {
  const { data: session } = useSession();
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entry.trim()) {
      setEntries([...entries, entry]);
      setEntry('');
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender-50 to-peach-50">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-light text-gray-800 mb-4">
            Please sign in to access your journal
          </h2>
          <Link
            href="/auth/signin"
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-lavender-600 hover:bg-lavender-700 transition-colors duration-200 shadow-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-peach-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <FaHeart className="text-lavender-400 w-6 h-6" />
                <FaLeaf className="text-mint-400 w-6 h-6" />
                <FaSmile className="text-peach-400 w-6 h-6" />
              </div>
              <h1 className="text-xl font-serif font-light text-gray-800">
                Mental Health Chat & Tracker
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                style={{ background: '#7c3aed', color: 'white' }}
                className="flex items-center px-4 py-2 rounded-lg shadow-sm cursor-pointer"
              >
                <FaBook className="mr-2" />
                Chat
              </Link>
              <Link
                href="/dashboard"
                style={{ background: '#7c3aed', color: 'white' }}
                className="flex items-center px-4 py-2 rounded-lg shadow-sm cursor-pointer"
              >
                <FaChartLine className="mr-2" />
                Dashboard
              </Link>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-lavender-600" />
                  <span className="text-gray-700">{session.user?.name || session.user?.email}</span>
                </div>
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h2 className="text-3xl font-serif font-light text-gray-800 mb-6">Your Journal</h2>
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lavender-500"
          />
          <button
            type="submit"
            style={{ background: '#7c3aed', color: 'white' }}
            className="mt-4 px-6 py-2 rounded-lg shadow-sm cursor-pointer"
          >
            Save Entry
          </button>
        </form>

        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-800">{entry}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 