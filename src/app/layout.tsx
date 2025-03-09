import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/layout/Navbar';
import ClientLayout from '../components/layout/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NFTicket - NFT Event Ticketing',
  description: 'Decentralized event ticketing platform using NFTs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <Navbar />
          <main className="pt-16">{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
