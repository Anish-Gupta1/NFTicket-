# NFTicket - NFT Event Ticketing Platform

NFTicket is a decentralized event ticketing platform built on Ethereum that uses NFTs to represent event tickets. The platform allows event organizers to mint and sell tickets as NFTs, and enables ticket buyers to purchase and resell their tickets in a secure and transparent way.

## Features

- **For Organizers:**

  - Register as an organizer by staking ETH
  - Mint batches of NFT tickets
  - Set ticket prices and list them for sale
  - Track sales and revenue

- **For Buyers:**
  - Browse available tickets
  - Purchase tickets directly from organizers
  - View owned tickets in personal collection
  - Resell tickets in the secondary marketplace

## Technology Stack

- Next.js 14 with TypeScript
- Wagmi for Ethereum interactions
- RainbowKit for wallet connections
- TailwindCSS for styling
- Framer Motion for animations
- Ethers.js for blockchain interactions

## Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- MetaMask or any other Web3 wallet
- Some test ETH on the Sepolia network

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nfticket.git
   cd nfticket
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your WalletConnect project ID:

   ```
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   ```

4. Update the contract address in `src/contracts/config.ts` if needed.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract

The smart contract is deployed on the Sepolia testnet. The contract implements:

- ERC1155 token standard for NFT tickets
- Organizer registration with staking
- Batch minting of tickets
- Primary and secondary market sales
- Royalties for resales
- Metadata management for pre and post-event

## Usage

1. **For Organizers:**

   - Connect your wallet
   - Navigate to the Organizer page
   - Register by staking 0.5 ETH
   - Mint ticket batches and set prices
   - Monitor sales and revenue

2. **For Buyers:**
   - Connect your wallet
   - Browse available tickets
   - Purchase tickets
   - View your collection
   - List tickets for resale if desired

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
