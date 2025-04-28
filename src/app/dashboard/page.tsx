'use client';

import { useSession } from 'next-auth/react';
import { FaHeart, FaLeaf, FaSmile, FaUser, FaSignOutAlt, FaBook, FaChartLine } from 'react-icons/fa';
import SignOutButton from '@/components/SignOutButton';
import Link from 'next/link';

const checkInData = [
  {
    category: 'Mood',
    emoji: '😊',
    response: 'Calm',
    tip: 'Great! Consider doing a short gratitude exercise to maintain the positive mood.',
    color: 'bg-green-100',
  },
  {
    category: 'Stress Level',
    emoji: '⚡',
    response: 'Slightly Stressed',
    tip: 'Take 5 minutes for mindful breathing. It can lower cortisol levels effectively.',
    color: 'bg-yellow-100',
  },
  {
    category: 'Energy Level',
    emoji: '🔋',
    response: 'Medium',
    tip: 'A short walk or stretching could boost your energy for the afternoon.',
    color: 'bg-yellow-50',
  },
  {
    category: 'Sleep Quality',
    emoji: '😴',
    response: '7 hours, Restful',
    tip: 'Consistent sleep is a superpower — keep up the good habits!',
    color: 'bg-green-50',
  },
  {
    category: 'Journal Prompt',
    emoji: '📝',
    response: '"Today, I\'m grateful for..."',
    tip: 'Write 2–3 things you appreciated today, no matter how small.',
    color: 'bg-blue-50',
  },
];

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender-50 to-peach-50">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-light text-gray-800 mb-4">
            Please sign in to access your dashboard
          </h2>
          <Link
            href="/auth/signin"
            style={{ background: '#7c3aed', color: 'white' }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm cursor-pointer"
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
                href="/journal"
                style={{ background: '#7c3aed', color: 'white' }}
                className="flex items-center px-4 py-2 rounded-lg shadow-sm cursor-pointer"
              >
                <FaBook className="mr-2" />
                Journal
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
        <h2 className="text-3xl font-serif font-light text-gray-800 mb-6">Your Dashboard</h2>

        {/* Daily Check-In Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-2xl font-serif font-light text-gray-800 mb-4 flex items-center gap-2">🧠 Daily Check-In Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checkInData.map((item) => (
              <div key={item.category} className={`rounded-lg p-4 flex flex-col gap-2 ${item.color}`}>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-semibold">{item.category}:</span>
                  <span>{item.response}</span>
                </div>
                <div className="text-sm text-gray-600 italic">{item.tip}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tiny Wins & Motivation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 p-6 rounded-lg shadow flex flex-col items-center justify-center">
            <span className="text-3xl">🎉</span>
            <div className="font-semibold text-lg mt-2">Tiny Wins</div>
            <div className="text-gray-700 mt-1 text-center">Congrats! You slept 7+ hours for 3 days in a row!</div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow flex flex-col items-center justify-center">
            <span className="text-2xl">🌟</span>
            <div className="font-semibold text-lg mt-2">Motivational Quote</div>
            <div className="text-gray-700 mt-1 text-center">"You are stronger than you think."</div>
          </div>
        </div>

        {/* Mood Tracker Emojis */}
        <div className="bg-white rounded-lg shadow p-4 mb-8 flex items-center gap-4 justify-center">
          <span className="text-2xl">😊</span>
          <span className="text-2xl">😐</span>
          <span className="text-2xl">😔</span>
          <span className="text-2xl">😴</span>
          <span className="text-2xl">💪</span>
          <span className="ml-4 text-gray-600">Mood Tracker</span>
        </div>

        {/* Activity Summary & Recent Activity (original content) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-serif font-light text-gray-800 mb-4">Activity Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Journal Entries</span>
                <span className="text-lavender-600 font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Chat Sessions</span>
                <span className="text-lavender-600 font-medium">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Mood</span>
                <span className="text-lavender-600 font-medium">Positive</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-serif font-light text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-lavender-500 rounded-full" />
                <div>
                  <p className="text-gray-800">Journal entry created</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-mint-500 rounded-full" />
                <div>
                  <p className="text-gray-800">Chat session completed</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 