'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';

const moodEmojis = [
  { emoji: '😊', label: 'Calm' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '💪', label: 'Motivated' },
];

const aiTips = [
  'Remember to take a deep breath and appreciate yourself today! 🌸',
  'You are stronger than you think. 🌟',
  'A short walk or stretch can boost your mood.',
  'Write down 2–3 things you appreciated today, no matter how small.',
  'Consistent sleep is a superpower — keep up the good habits! 😴',
];

function Confetti() {
  // Simple confetti using emoji, for demo purposes
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-start justify-center">
      <div className="text-5xl animate-bounce select-none" style={{ animationDuration: '1.5s' }}>
        🎉🎊✨
      </div>
    </div>
  );
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sentiment?: number;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showTinyWin, setShowTinyWin] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tinyWinStreak, setTinyWinStreak] = useState(0);
  const [selectedMood, setSelectedMood] = useState(moodEmojis[0]);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Show Tiny Win if user sent 3+ messages
    const userMsgCount = messages.filter(m => m.sender === 'user').length;
    if (userMsgCount >= 3 && !showTinyWin) {
      setShowTinyWin(true);
      setShowConfetti(true);
      setTinyWinStreak((prev) => prev + 1);
      setTimeout(() => setShowConfetti(false), 1800);
    }
    // Occasionally show a motivational banner
    if (messages.length > 0 && Math.random() < 0.1) {
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 4000);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !session) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      // Pick a random tip for each AI message
      const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response + '\n\n💡 ' + randomTip,
        sender: 'ai',
        timestamp: new Date(),
        sentiment: data.sentiment,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble processing that right now. Would you like to try again?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-[80vh] bg-white rounded-lg shadow-lg relative">
      {showConfetti && <Confetti />}
      {/* Persistent Tiny Win Streak */}
      {tinyWinStreak > 0 && (
        <div className="absolute top-2 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full shadow text-sm flex items-center gap-2 z-20">
          🏆 Streak: {tinyWinStreak}
        </div>
      )}
      {/* Motivational Banner */}
      {showBanner && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow text-sm z-20 animate-pulse">
          "You are stronger than you think." 🌟
        </div>
      )}
      {/* Mood Tracker Emoji Row */}
      <div className="flex items-center justify-center gap-4 py-2 border-b mb-2">
        {moodEmojis.map((m) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setSelectedMood(m)}
            className={`text-2xl select-none focus:outline-none transition-transform ${selectedMood.label === m.label ? 'scale-125 ring-2 ring-lavender-600' : ''}`}
            style={selectedMood.label === m.label ? { background: '#ede9fe', borderRadius: '0.5rem' } : {}}
            aria-label={m.label}
          >
            {m.emoji}
          </button>
        ))}
        <span className="ml-4 text-gray-600 text-sm">How are you feeling?</span>
      </div>
      {/* Show selected mood */}
      <div className="flex items-center justify-center mb-2">
        <span className="text-lg text-gray-700">Current mood: </span>
        <span className="ml-2 text-2xl">{selectedMood.emoji}</span>
        <span className="ml-1 text-gray-500">({selectedMood.label})</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showTinyWin && (
          <div className="flex justify-center mb-2">
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg shadow flex items-center gap-2 animate-bounce-in">
              🎉 <span className="font-semibold">Tiny Win:</span> You've sent 3+ messages today! Keep it up!
            </div>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-4 ${
                message.sender === 'user'
                  ? ''
                  : 'bg-white text-gray-800 shadow'
              }`}
              style={message.sender === 'user' ? { background: '#7c3aed', color: 'white' } : {}}
            >
              {message.text.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
                {message.sentiment !== undefined && (
                  <span className="text-xs opacity-70">
                    Sentiment: {(message.sentiment * 100).toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white sticky bottom-0 z-10">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How are you feeling today?"
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2"
            style={{ boxShadow: '0 0 0 2px #7c3aed' }}
            disabled={isLoading}
          />
          <button
            type="submit"
            style={{ background: '#7c3aed', color: 'white' }}
            className="rounded-lg p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={isLoading || !input.trim()}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
} 