'use client';

import { useNFTicket } from '@/lib/hooks/useNFTicket';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAccount } from 'wagmi';

interface ResaleNFT {
  tokenId: number;
  price: string;
  owner: string;
}

export default function MarketplacePage() {
  const { address } = useAccount();
  const { listForResale, buyNFT } = useNFTicket();
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [resalePrice, setResalePrice] = useState('');

  // This would come from contract
  const [ownedNFTs] = useState<ResaleNFT[]>([
    { tokenId: 1, price: '0.1', owner: '0x123...' },
    { tokenId: 2, price: '0.15', owner: '0x456...' },
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
      <h1 className="text-3xl font-bold mb-8">NFT Ticket Marketplace</h1>

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
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Owner: {nft.owner}</span>
                <span className="text-sm font-medium">{nft.price} ETH</span>
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
                <div className="flex gap-2">
                  {nft.owner.toLowerCase() === address.toLowerCase() ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedNFT(nft.tokenId)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                    >
                      List for Resale
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => buyNFT(nft.tokenId, nft.price)}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-sm"
                    >
                      Buy
                    </motion.button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 