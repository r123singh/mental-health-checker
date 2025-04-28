import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import ChatInterface from '@/components/ChatInterface';
import { FaHeart, FaLeaf, FaSmile, FaUser, FaSignOutAlt, FaBook, FaChartLine } from 'react-icons/fa';
import SignOutButton from '@/components/SignOutButton';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-lavender-50 to-peach-50">
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
            </div>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-4xl font-serif font-light text-gray-800 mb-4">
            Welcome to Mental Health Chat & Tracker
          </h2>
          <p className="text-lg text-gray-600 mb-8 font-sans">
            A supportive space for mental health journaling and tracking, powered by AI.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signin"
              style={{ background: '#7c3aed', color: 'white' }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center px-6 py-3 border border-lavender-200 text-sm font-medium rounded-lg text-lavender-600 bg-white hover:bg-lavender-50 transition-colors duration-200 shadow-sm cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-lavender-50 to-peach-50">
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
                href="/journal"
                style={{ background: '#7c3aed', color: 'white' }}
                className="flex items-center px-4 py-2 rounded-lg shadow-sm cursor-pointer"
              >
                <FaBook className="mr-2" />
                Journal
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
      <div className="max-w-4xl mx-auto mt-8">
        <ChatInterface />
      </div>
    </main>
  );
}
