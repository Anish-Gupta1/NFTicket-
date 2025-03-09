'use client';

import { useNFTicket } from '@/lib/hooks/useNFTicket';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

interface NFTCard {
  tokenId: number;
  price: string;
  batchNum: number;
}

export default function BuyerPage() {
  const { address } = useAccount();
  const { batchInfo, buyNFT } = useNFTicket();
  const [nfts, setNfts] = useState<NFTCard[]>([]);

  useEffect(() => {
    if (batchInfo) {
      const [batchNumbers, startTokenIds, endTokenIds] = batchInfo;
      const newNfts: NFTCard[] = [];

      for (let i = 0; i < batchNumbers.length; i++) {
        const start = Number(startTokenIds[i]);
        const end = Number(endTokenIds[i]);
        const batchNum = Number(batchNumbers[i]);

        for (let tokenId = start; tokenId <= end; tokenId++) {
          newNfts.push({
            tokenId,
            price: '0.1', // This should come from contract
            batchNum,
          });
        }
      }

      setNfts(newNfts);
    }
  }, [batchInfo]);

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold">Please connect your wallet to continue</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Available NFT Tickets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <motion.div
            key={nft.tokenId}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-square bg-gray-200 relative">
              {/* NFT Image would go here */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Token #{nft.tokenId}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Batch #{nft.batchNum}</span>
                <span className="text-sm font-medium">{nft.price} ETH</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => buyNFT(nft.tokenId, nft.price)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
              >
                Purchase Ticket
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 