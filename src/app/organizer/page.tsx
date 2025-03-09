'use client';

import { useNFTicket } from '@/lib/hooks/useNFTicket';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OrganizerPage() {
  const { address } = useAccount();
  const { isOrganizer, registerAsOrganizer, isLoading } = useNFTicket();
  const [name, setName] = useState('');

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Please connect your wallet</h1>
      </div>
    );
  }

  if (!isOrganizer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Register as Organizer</h1>
        <p className="mb-4 text-gray-600">Registration requires a 0.001 ETH deposit</p>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => registerAsOrganizer(name)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            disabled={isLoading || !name}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex justify-between items-center w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
        <Link href="/organizer/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Create New Event
          </motion.button>
        </Link>
      </div>
      {/* Add your event list or other dashboard content here */}
    </div>
  );
} 