'use client';

import { useState, FormEvent } from 'react';
import { uploadToPinata, uploadMetadataToPinata, createEventMetadata } from '@/lib/pinata';

interface EventFormProps {
  onSubmit: (initialUri: string, postConcertUri: string) => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [postConcertImage, setPostConcertImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!image || !postConcertImage) {
        throw new Error('Please select both pre and post-concert images');
      }

      // Upload initial event image
      const imageUrl = await uploadToPinata(image);
      
      // Upload post-concert image
      const postConcertImageUrl = await uploadToPinata(postConcertImage);

      // Create and upload initial metadata
      const initialMetadata = createEventMetadata(
        name,
        description,
        imageUrl,
        [
          { trait_type: 'Event Name', value: name },
          { trait_type: 'Status', value: 'Active' }
        ]
      );
      const initialUri = await uploadMetadataToPinata(initialMetadata, 1);

      // Create and upload post-concert metadata
      const postConcertMetadata = createEventMetadata(
        name,
        `${description} (Post-Concert)`,
        postConcertImageUrl,
        [
          { trait_type: 'Event Name', value: name },
          { trait_type: 'Status', value: 'Completed' }
        ]
      );
      const postConcertUri = await uploadMetadataToPinata(postConcertMetadata, 1);

      onSubmit(initialUri, postConcertUri);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Event Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label htmlFor="postConcertImage" className="block text-sm font-medium text-gray-700">
          Post-Concert Image
        </label>
        <input
          type="file"
          id="postConcertImage"
          accept="image/*"
          onChange={(e) => setPostConcertImage(e.target.files?.[0] || null)}
          required
          className="mt-1 block w-full"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
      >
        {loading ? 'Creating Event...' : 'Create Event'}
      </button>
    </form>
  );
} 