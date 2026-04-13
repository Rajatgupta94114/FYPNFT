'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { NFTItem, useStore } from '@/lib/store';
import { X, Heart, Share2, TrendingUp, Clock, User } from 'lucide-react';
import { useState } from 'react';

interface NFTModalProps {
  nft: NFTItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NFTModal({ nft, isOpen, onClose }: NFTModalProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, addNotification } = useStore();
  const [isLiked, setIsLiked] = useState(nft?.liked || false);
  const [likes, setLikes] = useState(nft?.likes || 0);

  if (!nft) return null;

  const inWishlist = isInWishlist(nft.id);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    addNotification({
      type: 'success',
      message: isLiked ? 'Removed from likes' : 'Added to likes!',
    });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(nft.id);
      addNotification({
        type: 'info',
        message: 'Removed from wishlist',
      });
    } else {
      addToWishlist(nft.id);
      addNotification({
        type: 'success',
        message: 'Added to wishlist!',
      });
    }
  };

  const handleBuy = () => {
    addToCart(nft);
    addNotification({
      type: 'success',
      message: `${nft.title} added to cart!`,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <div className="flex justify-end p-4 border-b border-[rgba(0,217,255,0.1)]">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[rgba(0,217,255,0.1)] rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={handleLike}
                      className={`p-2 rounded-full transition-all ${
                        isLiked
                          ? 'bg-red-400/20 border border-red-400'
                          : 'glass border border-[rgba(0,217,255,0.3)]'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isLiked ? 'fill-red-400 text-red-400' : 'text-gray-400'
                        }`}
                      />
                    </button>
                    <button
                      onClick={handleWishlist}
                      className={`p-2 rounded-full transition-all ${
                        inWishlist
                          ? 'bg-purple-400/20 border border-purple-400'
                          : 'glass border border-[rgba(0,217,255,0.3)]'
                      }`}
                    >
                      <Share2 className={`w-5 h-5 ${
                        inWishlist ? 'text-purple-400' : 'text-gray-400'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Header */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{nft.title}</h2>
                      <p className="text-gray-400">Collection: {nft.collection}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        nft.rarity === 'legendary'
                          ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400'
                          : nft.rarity === 'epic'
                          ? 'bg-purple-400/20 text-purple-300 border border-purple-400'
                          : nft.rarity === 'rare'
                          ? 'bg-blue-400/20 text-blue-300 border border-blue-400'
                          : 'bg-gray-400/20 text-gray-300 border border-gray-400'
                      }`}>
                        {nft.rarity.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>By {nft.creator}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{nft.description}</p>
                </div>

                {/* Traits */}
                <div>
                  <h3 className="font-semibold mb-3">Traits</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {nft.traits.map((trait, i) => (
                      <div key={i} className="glass rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-400 mb-1">{trait.name}</p>
                        <p className="text-sm font-semibold text-cyan-400">{trait.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price History Chart */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Price History</span>
                  </h3>
                  <div className="space-y-2">
                    {nft.priceHistory.slice(-5).map((history, i) => (
                      <div key={i} className="flex justify-between text-sm p-2 bg-[rgba(0,217,255,0.05)] rounded">
                        <span className="text-gray-400">{history.date}</span>
                        <span className="text-cyan-400 font-semibold">{history.price} ETH</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Owner Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">CURRENT OWNER</p>
                    <p className="font-semibold text-sm">{nft.owner}</p>
                  </div>
                  <div className="glass rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">CURRENT PRICE</p>
                    <p className="font-semibold text-cyan-400">{nft.price} ETH</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleBuy}
                    className="flex-1 btn-primary-neon rounded-lg py-3 font-semibold hover:shadow-lg transition-all"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWishlist}
                    className="flex-1 btn-neon rounded-lg py-3 font-semibold hover:shadow-lg transition-all"
                  >
                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
