'use client';

import { useState, useCallback } from 'react';
import EventForm from '@/components/organizer/EventForm';
import { deployContract } from '@wagmi/core';
import { NFTicketABI } from '@/contracts/NFTicket';
import { wagmiConfig } from '@/lib/config/wagmi';

export default function CreateEventPage() {
  const [status, setStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleDeploy = useCallback(async (initialURI: string, postConcertURI: string) => {
    try {
      setStatus('creating');
      setError('');

      const result = await deployContract(wagmiConfig, {
        abi: NFTicketABI,
        args: [initialURI, postConcertURI],
        bytecode: '0x...' // We need the bytecode here - will ask user for it
      });
      console.log('Contract deployed:', result);
      setStatus('success');
    } catch (error) {
      console.error('Failed to deploy:', error);
      setStatus('error');
      setError(error instanceof Error ? error.message : 'Failed to create event');
    }
  }, []);

  const handleSubmit = async (initialUri: string, postConcertUri: string) => {
    try {
      await handleDeploy(initialUri, postConcertUri);
    } catch (err) {
      console.error('Failed to handle submit:', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to create event');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Event</h1>
      
      {status === 'success' ? (
        <div className="text-center text-green-600">
          <h2 className="text-xl font-semibold">Event Created Successfully!</h2>
          <p className="mt-2">Your event has been created and the NFTickets are ready to be minted.</p>
        </div>
      ) : (
        <>
          <EventForm onSubmit={handleSubmit} />
          
          {status === 'creating' && (
            <div className="text-center mt-4">
              <p className="text-indigo-600">
                Deploying contract...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center mt-4 text-red-600">
              <p>{error || 'Something went wrong. Please try again.'}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
} 