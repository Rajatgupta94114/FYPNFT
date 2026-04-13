'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ExternalLink, Tag } from 'lucide-react';
import { NFTItem, useStore } from '@/lib/store';
import { realNFTs } from '@/lib/nft-data';

export function MarketplaceFixed() {
  const { addToCart, removeFromCart, coins, deductCoins } = useStore();
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);

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

  const handleLikeNFT = (nft: NFTItem) => {
    const updatedNFT = { ...nft, liked: !nft.liked, likes: nft.liked ? nft.likes - 1 : nft.likes + 1 };
    console.log('NFT liked:', updatedNFT);
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">Marketplace</h1>
          <p className="text-gray-400 text-lg">Discover unique AI-generated NFTs from our community</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 glass rounded-xl border-cyan-400/20 p-6"
        >
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg bg-cyan-400 text-[#0a0e1f] font-medium hover:bg-cyan-500 transition-all">
              All
            </button>
            <button className="px-4 py-2 rounded-lg glass border border-cyan-400/30 text-cyan-400 hover:border-cyan-400/60 font-medium transition-all">
              Legendary
            </button>
            <button className="px-4 py-2 rounded-lg glass border border-purple-400/30 text-purple-400 hover:border-purple-400/60 font-medium transition-all">
              Epic
            </button>
            <button className="px-4 py-2 rounded-lg glass border border-blue-400/30 text-blue-400 hover:border-blue-400/60 font-medium transition-all">
              Rare
            </button>
            <button className="px-4 py-2 rounded-lg glass border border-gray-400/30 text-gray-400 hover:border-gray-400/60 font-medium transition-all">
              Common
            </button>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {realNFTs.map((nft, i) => (
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
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden bg-[#1a1f3a]">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Rarity Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${getRarityBg(nft.rarity)} ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity.toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white truncate">{nft.title}</h3>
                    <Tag size={14} className="text-gray-400" />
                  </div>

                  {/* Creator */}
                  <div className="flex items-center space-x-2 mb-3">
                    <img
                      src={nft.creatorAvatar}
                      alt={nft.creator}
                      className="w-6 h-6 rounded-full"
                    />
                    <div>
                      <p className="text-sm text-gray-300">{nft.creator}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-2xl font-bold text-white">{nft.price} TON</p>
                      <p className="text-sm text-gray-400">Floor: {nft.floorPrice} TON</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Heart size={16} className={nft.liked ? 'text-red-400 fill-current' : ''} />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ExternalLink size={16} />
                      <span>{nft.ownershipHistory.length}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeNFT(nft);
                      }}
                      className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                    >
                      <Heart size={20} className={nft.liked ? 'text-red-400 fill-current' : 'text-white'} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNFT(nft);
                      }}
                      className="px-4 py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-purple-700 transition-all"
                    >
                      <ShoppingCart size={20} />
                      <span>Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* NFT Modal */}
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
              {/* Left - Image */}
              <div>
                <img
                  src={selectedNFT.image}
                  alt={selectedNFT.title}
                  className="w-full rounded-lg"
                />
              </div>

              {/* Right - Details */}
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
                  <h3 className="text-lg font-semibold text-white mb-2">Creator</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedNFT.creatorAvatar}
                      alt={selectedNFT.creator}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium">{selectedNFT.creator}</p>
                      <p className="text-gray-400 text-sm">{selectedNFT.owner}</p>
                    </div>
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

                {/* Buy Button */}
                <button
                  onClick={() => handleBuyNFT(selectedNFT)}
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-purple-700 transition-all"
                >
                  <ShoppingCart size={20} />
                  <span>Buy for {selectedNFT.price} TON</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
