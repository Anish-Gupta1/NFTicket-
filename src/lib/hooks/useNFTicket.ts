'use client';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contracts/config';
import { parseEther } from 'viem';
import { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

export const useNFTicket = () => {
  const { address } = useAccount();
  const [isOrganizer, setIsOrganizer] = useState(false);
  const { writeContract } = useWriteContract();

  // Check if user is an organizer
  const { data: organizerData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'organizers',
    args: [address as `0x${string}`],
  });

  const registerAsOrganizer = (name: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'registerOrganizer',
      args: [name],
      value: parseEther('0.001'),
    });
  };

  const mintBatch = (count: number) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mintBatch',
      args: [BigInt(count)],
    });
  };

  const listBatchForSale = (batchNum: number, price: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'listBatchForSale',
      args: [BigInt(batchNum), parseEther(price)],
    });
  };

  const buyNFT = (tokenId: number, price: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'buyNFT',
      args: [BigInt(tokenId)],
      value: parseEther(price),
    });
  };

  const listForResale = (tokenId: number, price: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'listForResale',
      args: [BigInt(tokenId), parseEther(price)],
    });
  };

  // Get all batch info
  const { data: batchInfo } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllBatchInfo',
  });

  useEffect(() => {
    if (organizerData) {
      setIsOrganizer(organizerData[4]); // boolean is the 5th element in tuple
    }
  }, [organizerData]);

  return {
    isOrganizer,
    registerAsOrganizer,
    mintBatch,
    listBatchForSale,
    buyNFT,
    listForResale,
    batchInfo,
  };
}; 