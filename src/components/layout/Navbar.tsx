'use client'; 
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              NFTicket
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/organizer"
              className={`${isActive('/organizer')} inline-flex items-center px-1 pt-1 text-sm font-medium`}
            >
              Organizer
            </Link>
            <Link
              href="/buyer"
              className={`${isActive('/buyer')} inline-flex items-center px-1 pt-1 text-sm font-medium`}
            >
              Buyer
            </Link>
            <Link
              href="/buyer/marketplace"
              className={`${isActive('/buyer/marketplace')} inline-flex items-center px-1 pt-1 text-sm font-medium`}
            >
              Marketplace
            </Link>
          </div>

          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 