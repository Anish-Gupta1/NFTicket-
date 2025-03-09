// This will be replaced with the actual contract address after deployment
export const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' as const;

// This will be replaced with the actual ABI after deployment
export const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_initialURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_postConcertURI",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "registerOrganizer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "mintBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listBatchForSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buyNFT",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listForResale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllBatchInfo",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "batchNumbers",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "startTokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "endTokenIds",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "organizers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalMinted",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "unsoldCount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "exist",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] as const; 