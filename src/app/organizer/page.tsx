'use client';

import { useNFTicket } from '@/lib/hooks/useNFTicket';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function OrganizerPage() {
  const { address } = useAccount();
  const { isOrganizer, registerAsOrganizer, mintBatch, listBatchForSale } = useNFTicket();
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState('');
  const [batchNum, setBatchNum] = useState(1);

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold">Please connect your wallet to continue</h1>
      </div>
    );
  }

  if (!isOrganizer) {
    return (
      <div className="max-w-lg mx-auto p-6 mt-10">
        <h1 className="text-3xl font-bold mb-6">Register as Organizer</h1>
        <p className="text-gray-600 mb-6">
          To become an organizer, you need to stake 0.001 ETH and provide your organization name.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your organization name"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => registerAsOrganizer(name)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Register (0.001 ETH)
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Organizer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mint NFTs */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mint NFT Tickets</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Tickets
              </label>
              <input
                type="number"
                min="1"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => mintBatch(count)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Mint Batch
            </motion.button>
          </div>
        </div>

        {/* List for Sale */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">List Tickets for Sale</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch Number
              </label>
              <input
                type="number"
                min="1"
                value={batchNum}
                onChange={(e) => setBatchNum(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (ETH)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="0.1"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => listBatchForSale(batchNum, price)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              List for Sale
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
} 