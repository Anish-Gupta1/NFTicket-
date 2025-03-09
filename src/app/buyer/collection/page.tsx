'use client';

import { useNFTicket } from '@/lib/hooks/useNFTicket';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAccount } from 'wagmi';

interface OwnedNFT {
  tokenId: number;
  batchNum: number;
  purchasePrice: string;
}

export default function CollectionPage() {
  const { address } = useAccount();
  const { listForResale } = useNFTicket();
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [resalePrice, setResalePrice] = useState('');

  // This would come from contract
  const [ownedNFTs] = useState<OwnedNFT[]>([
    { tokenId: 1, batchNum: 1, purchasePrice: '0.1' },
    { tokenId: 2, batchNum: 1, purchasePrice: '0.1' },
  ]);

  const handleResale = (tokenId: number) => {
    if (resalePrice) {
      listForResale(tokenId, resalePrice);
      setSelectedNFT(null);
      setResalePrice('');
    }
  };

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold">Please connect your wallet to continue</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My NFT Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ownedNFTs.map((nft) => (
          <motion.div
            key={nft.tokenId}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-square bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Token #{nft.tokenId}
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Batch #{nft.batchNum}</span>
                  <span className="text-sm font-medium">{nft.purchasePrice} ETH</span>
                </div>
                <div className="text-sm text-gray-500">
                  Purchased for {nft.purchasePrice} ETH
                </div>
              </div>

              {selectedNFT === nft.tokenId ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={resalePrice}
                    onChange={(e) => setResalePrice(e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter price in ETH"
                  />
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleResale(nft.tokenId)}
                      className="flex-1 bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 text-sm"
                    >
                      Confirm
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedNFT(null)}
                      className="flex-1 bg-gray-600 text-white py-1 px-3 rounded-md hover:bg-gray-700 text-sm"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNFT(nft.tokenId)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                >
                  List for Resale
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 