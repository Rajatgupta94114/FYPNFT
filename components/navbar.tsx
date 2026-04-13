'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Wallet, ShoppingCart, CheckCircle, Coins, UserPlus } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

const navLinks = [
  { label: 'Generate', href: '/generate' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Profile', href: '/profile' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { cart, coins, userAccount, hasAccount } = useStore();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const handleConnect = () => {
    if (wallet) {
      // Wallet is already connected, you could show wallet info here
      console.log('Wallet already connected:', wallet.account.address);
    } else {
      // Directly open TonConnect modal
      tonConnectUI.openModal();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 glass border-b border-[rgba(0,217,255,0.1)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">P</span>
            </motion.div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">PromptOwn</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hidden sm:flex items-center text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-cyan-400 text-[#0a0e1f] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.button>

            {/* Connect Wallet Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConnect}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                wallet
                  ? 'glass border-cyan-400/30 text-cyan-400 hover:border-cyan-400/60'
                  : 'btn-primary-neon neon-glow'
              }`}
            >
              {wallet ? (
                <>
                  <CheckCircle size={18} />
                  <span className="text-sm font-medium hidden sm:inline">
                    {wallet.account.address.slice(0, 4)}...{wallet.account.address.slice(-4)}
                  </span>
                </>
              ) : (
                <>
                  <Wallet size={18} />
                  <span className="text-sm font-medium hidden sm:inline">Connect Wallet</span>
                </>
              )}
            </motion.button>

            {/* Coins Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 px-4 py-2 glass rounded-lg border border-yellow-400/30 text-yellow-400"
            >
              <Coins size={18} />
              <span className="text-sm font-semibold">{coins}</span>
            </motion.div>

            {/* Username Display */}
            {hasAccount() && userAccount && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 px-4 py-2 glass rounded-lg border border-cyan-400/30 text-cyan-400"
              >
                <span className="text-sm font-semibold">{userAccount.username}</span>
              </motion.div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-[rgba(0,217,255,0.1)] pb-4 space-y-2 mt-2"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-[rgba(0,217,255,0.05)] rounded transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {/* Mobile Coins Display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center justify-center space-x-2 px-4 py-3 glass rounded-lg border border-yellow-400/30 text-yellow-400"
            >
              <Coins size={18} />
              <span className="text-sm font-semibold">{coins} Coins</span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={() => {
                handleConnect();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-400/10 to-purple-600/10 border border-cyan-400/30 text-cyan-400 hover:border-cyan-400/60 transition-all font-medium mt-2"
            >
              {wallet ? (
                <>
                  <CheckCircle size={18} />
                  <span className="text-sm">
                    {wallet.account.address.slice(0, 6)}...{wallet.account.address.slice(-4)}
                  </span>
                </>
              ) : (
                <>
                  <Wallet size={18} />
                  <span className="text-sm">Connect Wallet</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
