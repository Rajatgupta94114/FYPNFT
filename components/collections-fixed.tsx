'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ExternalLink, DollarSign, ShoppingCart } from 'lucide-react';
import { NFTItem, useStore } from '@/lib/store';
import { realNFTs } from '@/lib/nft-data';

export function CollectionsNew() {
  const { profileNFTs, removeFromProfile, addToCart, coins, deductCoins, addCoins } = useStore();
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);

  const handleSellNFT = (nft: NFTItem) => {
    if (confirm(`Are you sure you want to sell "${nft.title}" for 0.5 TON?`)) {
      removeFromProfile(nft.image);
      const rewardCoins = Math.floor(nft.price * 0.1);
      addCoins(rewardCoins);
      alert(`Successfully sold "${nft.title}" for 0.5 TON and earned ${rewardCoins} coins!`);
      
      const cart = useStore.getState().cart;
      const cartItem = cart.find(item => item.id === nft.id);
      if (cartItem) {
        useStore.getState().removeFromCart(nft.id);
      }
    }
  };

  const handleBuyNFT = (nft: NFTItem) => {
    if (coins < nft.price) {
      alert(`Insufficient coins! You need ${nft.price} coins to buy this NFT. You currently have ${coins} coins.`);
      return;
    }

    const success = deductCoins(nft.price);
    if (success) {
      addToCart(nft);
      alert(`Successfully purchased "${nft.title}" for ${nft.price} coins!`);
    } else {
      alert('Failed to process purchase. Please try again.');
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400';
      case 'epic': return 'text-purple-400';
      case 'rare': return 'text-blue-400';
      case 'common': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-400/20';
      case 'epic': return 'bg-purple-400/20';
      case 'rare': return 'bg-blue-400/20';
      case 'common': return 'bg-gray-400/20';
      default: return 'bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">My Collections</h1>
          <p className="text-gray-400 text-lg">Manage your NFT collection and earnings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {profileNFTs.map((nft, i) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setSelectedNFT(nft)}
            >
              <div className="glass rounded-xl overflow-hidden border-cyan-400/20 hover:border-cyan-400/40 transition-all h-full">
                <div className="relative w-full h-48 overflow-hidden bg-[#1a1f3a]">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${getRarityBg(nft.rarity)} ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity.toUpperCase()}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white truncate">{nft.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${getRarityBg(nft.rarity)} ${getRarityColor(nft.rarity)}`}>
                        {nft.rarity.toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-xs">· {nft.collection}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-2xl font-bold text-white">{nft.price} TON</p>
                      <p className="text-sm text-gray-400">Floor: {nft.floorPrice} TON</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      Value: +{((nft.price - nft.floorPrice) / nft.floorPrice * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Heart size={16} className="text-red-400 fill-current" />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ExternalLink size={16} />
                      <span>{nft.ownershipHistory.length}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => alert('View details coming soon!')}
                      className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                    >
                      <ExternalLink size={20} className="text-white" />
                    </button>
                    <button
                      onClick={() => handleSellNFT(nft)}
                      className="p-3 bg-gradient-to-r from-red-400 to-orange-600 text-white font-semibold rounded-lg hover:from-red-500 hover:to-orange-700 transition-all"
                    >
                      <DollarSign size={20} />
                      <span>Sell</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedNFT && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-cyan-400/20">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedNFT.title}</h2>
              <button
                onClick={() => setSelectedNFT(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedNFT.image}
                  alt={selectedNFT.title}
                  className="w-full rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Details</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedNFT.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Properties</h3>
                  <div className="space-y-2">
                    {selectedNFT.traits.map((trait, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded border border-gray-700">
                        <span className="text-sm text-gray-300">{trait.name}:</span>
                        <span className="text-sm font-medium text-cyan-400">{trait.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Pricing</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Current Price:</span>
                      <span className="text-2xl font-bold text-white">{selectedNFT.price} TON</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Floor Price:</span>
                      <span className="text-lg font-medium text-cyan-400">{selectedNFT.floorPrice} TON</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSellNFT(selectedNFT)}
                  className="w-full py-3 bg-gradient-to-r from-red-400 to-orange-600 text-white font-semibold rounded-lg hover:from-red-500 hover:to-orange-700 transition-all"
                >
                  <DollarSign size={20} />
                  <span>Sell for 0.5 TON</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
