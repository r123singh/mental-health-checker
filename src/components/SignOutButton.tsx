'use client';

import { signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      style={{ background: '#7c3aed', color: 'white' }}
      className="flex items-center px-4 py-2 rounded-lg shadow-sm cursor-pointer"
    >
      <FaSignOutAlt className="mr-2" />
      Sign Out
    </button>
  );
} 