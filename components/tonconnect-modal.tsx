'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Wallet } from 'lucide-react';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

interface TonConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TonConnectModal({ isOpen, onClose }: TonConnectModalProps) {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (wallet) {
      setIsConnected(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setIsConnected(false);
    }
  }, [wallet, onClose]);

  const handleConnect = () => {
    tonConnectUI.openModal();
  };

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect();
      setIsConnected(false);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-gradient-to-br from-[#0a0e1f] to-[#1a1f3a] border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full neon-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {!isConnected ? (
                <>
                  {/* Instructions */}
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-cyan-400/10 rounded-full border border-cyan-400/30">
                        <Wallet size={32} className="text-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Connect your TON wallet
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Choose your preferred wallet to connect
                      </p>
                    </div>
                  </div>

                  {/* Connect Button */}
                  <div className="text-center">
                    <button
                      onClick={handleConnect}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-purple-700 transition-all neon-glow"
                    >
                      <Wallet size={20} />
                      <span>Connect Wallet</span>
                    </button>
                  </div>

                  {/* Alternative connection method */}
                  <div className="text-center">
                    <p className="text-gray-500 text-xs">
                      This will open the official TonConnect modal
                    </p>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-3 bg-green-400/10 rounded-full border border-green-400/30">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Wallet Connected!
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Your TON wallet is now connected
                    </p>
                  </div>
                  {wallet && (
                    <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-lg p-3">
                      <p className="text-cyan-400 text-sm font-mono">
                        {wallet.account.address.slice(0, 6)}...{wallet.account.address.slice(-4)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-xs">
                  Secure connection via Tonconnect
                </p>
                {isConnected && (
                  <button
                    onClick={handleDisconnect}
                    className="text-red-400 text-xs hover:text-red-300 transition-colors"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
