'use client';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contracts/config';
import { parseEther } from 'viem';
import { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

export const useNFTicket = () => {
  const { address } = useAccount();
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { writeContract, data: hash } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  // Check if user is an organizer
  const { data: organizerData, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'organizers',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  const registerAsOrganizer = async (name: string) => {
    try {
      setIsLoading(true);
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerOrganizer',
        args: [name],
        value: parseEther('0.001'),
      });
    } catch (error) {
      console.error('Registration failed:', error);
    }
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
    if (isSuccess) {
      refetch();
      setIsLoading(false);
    }
  }, [isSuccess, refetch]);

  useEffect(() => {
    if (organizerData) {
      setIsOrganizer(organizerData[4]); // boolean is the 5th element in tuple
    }
  }, [organizerData]);

  return {
    isOrganizer,
    isLoading,
    registerAsOrganizer,
    mintBatch,
    listBatchForSale,
    buyNFT,
    listForResale,
    batchInfo,
  };
}; 