'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ExternalLink, DollarSign } from 'lucide-react';
import { useStore } from '@/lib/store';

export function Collections() {
  const { profileNFTs, removeFromProfile, addCoins } = useStore();
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  const handleSellNFT = (nft: any) => {
    if (confirm(`Are you sure you want to sell "${nft.title}" for 0.5 TON?`)) {
      removeFromProfile(nft.image);
      const rewardCoins = Math.floor(nft.price * 0.1);
      addCoins(rewardCoins);
      alert(`Successfully sold "${nft.title}" for 0.5 TON and earned ${rewardCoins} coins!`);
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
      case 'legendary': return 'bg-yellow-400/20 border-yellow-400/30';
      case 'epic': return 'bg-purple-400/20 border-purple-400/30';
      case 'rare': return 'bg-blue-400/20 border-blue-400/30';
      case 'common': return 'bg-gray-400/20 border-gray-400/30';
      default: return 'bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold">My Collections</h3>
        <span className="text-sm text-gray-400">({profileNFTs.length} NFTs)</span>
      </div>

      {profileNFTs.length === 0 ? (
        <div className="text-center py-12 glass rounded-xl border-cyan-400/20">
          <div className="max-w-md mx-auto">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No NFTs in your collection yet</p>
            <p className="text-gray-500 text-sm mb-4">Buy NFTs from the marketplace to see them here</p>
            <button
              onClick={() => window.location.href = '/marketplace'}
              className="px-6 py-2 bg-cyan-400 text-[#0a0e1f] font-medium rounded-lg hover:bg-cyan-500 transition-all"
            >
              Browse Marketplace
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profileNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setSelectedNFT(nft)}
            >
              <div className="glass rounded-xl overflow-hidden border-cyan-400/20 hover:border-cyan-400/40 transition-all h-full">
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.jpg';
                    }}
                  />
                  
                  {/* Rarity Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold border ${getRarityBg(nft.rarity)} ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity.toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white truncate">{nft.title}</h3>
                  </div>

                  {/* Creator */}
                  <div className="flex items-center space-x-2 mb-3">
                    <img
                      src={nft.creatorAvatar}
                      alt={nft.creator}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-user.jpg';
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-300 truncate">{nft.creator}</p>
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
                  <div className="flex items-center justify-between text-sm text-gray-400">
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
                        alert('View details coming soon!');
                      }}
                      className="p-3 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all"
                    >
                      <ExternalLink size={20} className="text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSellNFT(nft);
                      }}
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
        </div>
      )}

      {/* NFT Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-cyan-400/30 shadow-2xl shadow-cyan-400/20"
          >
            <div className="flex justify-between items-start p-6 border-b border-cyan-400/20">
              <h2 className="text-2xl font-bold text-white">{selectedNFT.title}</h2>
              <button
                onClick={() => setSelectedNFT(null)}
                className="p-2 rounded-lg glass border border-gray-600/30 text-gray-400 hover:text-white hover:border-gray-600/50 transition-all"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                <img
                  src={selectedNFT.image}
                  alt={selectedNFT.title}
                  className="w-full rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.jpg';
                  }}
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
                    {selectedNFT.traits.map((trait: any, index: number) => (
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
                  <span className="ml-2">Sell for 0.5 TON</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
