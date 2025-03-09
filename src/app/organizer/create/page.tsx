'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { deployContract } from '@wagmi/core';
import { NFTicketABI } from '@/contracts/NFTicket';
import { CONTRACT_BYTECODE } from '@/contracts/config';
import { wagmiConfig } from '@/lib/config/wagmi';

export default function CreateEventPage() {
  const { address } = useAccount();
  const [status, setStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    initialUri: '',
    postConcertUri: '',
  });

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold">Please connect your wallet to continue</h1>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setStatus('creating');
      setError('');

      const result = await deployContract(wagmiConfig, {
        abi: NFTicketABI,
        bytecode: CONTRACT_BYTECODE,
        args: [formData.initialUri, formData.postConcertUri],
      });

      console.log('Contract deployed:', result);
      setStatus('success');
    } catch (error) {
      console.error('Failed to deploy:', error);
      setStatus('error');
      setError(error instanceof Error ? error.message : 'Failed to create event');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Event</h1>
      
      {status === 'success' ? (
        <div className="text-center text-green-600">
          <h2 className="text-xl font-semibold">Event Created Successfully!</h2>
          <p className="mt-2">Your event has been created and the NFTickets are ready to be minted.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter event name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial URI (Pre-concert metadata)
            </label>
            <input
              type="text"
              value={formData.initialUri}
              onChange={(e) => setFormData(prev => ({ ...prev, initialUri: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="ipfs://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post-concert URI
            </label>
            <input
              type="text"
              value={formData.postConcertUri}
              onChange={(e) => setFormData(prev => ({ ...prev, postConcertUri: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="ipfs://..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'creating'}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {status === 'creating' ? 'Creating...' : 'Create Event'}
          </button>

          {status === 'error' && (
            <div className="text-center mt-4 text-red-600">
              <p>{error || 'Something went wrong. Please try again.'}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
} 