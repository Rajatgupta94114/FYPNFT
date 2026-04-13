'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, Settings, Share2, Camera, DollarSign, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsDashboard } from './analytics-dashboard';
import { CreatorProfile } from './creator-profile';
import { Collections } from './collections-profile';
import { ActivityFeed } from './activity-feed';
import { useStore } from '@/lib/store';

const userProfile = {
  id: 'user-001',
  username: 'ArtCreator99',
  address: '0x1234...5678',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  bio: 'Creating unique AI art and minting NFTs',
  followers: 1234,
  following: 567,
  totalEarnings: 12.5,
  socials: {
    twitter: 'https://twitter.com',
    website: 'https://example.com',
  },
};

const myNFTs = [
  {
    id: '1',
    title: 'Cosmic Journey',
    creator: 'ArtCreator99',
    creatorAvatar: userProfile.avatar,
    image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=400&h=400&fit=crop',
    price: 2.5,
    floorPrice: 2.0,
    rarity: 'legendary' as const,
    likes: 342,
    liked: false,
    collection: 'Cyber Minds',
    owner: userProfile.address,
    createdAt: '2 days ago',
    description: 'A cosmic journey through digital consciousness',
    traits: [
      { name: 'Theme', value: 'Space' },
      { name: 'Color', value: 'Cyan' },
    ],
    priceHistory: [{ date: '2024-03-15', price: 2.5 }],
    ownershipHistory: [{ address: userProfile.address, date: '2024-03-15' }],
  },
  {
    id: '2',
    title: 'Purple Infinity',
    creator: 'ArtCreator99',
    creatorAvatar: userProfile.avatar,
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=400&fit=crop',
    price: 1.8,
    floorPrice: 1.5,
    rarity: 'epic' as const,
    likes: 289,
    liked: false,
    collection: 'Digital Dreams',
    owner: userProfile.address,
    createdAt: '5 days ago',
    description: 'Purple horizons meet infinity',
    traits: [
      { name: 'Theme', value: 'Abstract' },
      { name: 'Color', value: 'Purple' },
    ],
    priceHistory: [{ date: '2024-03-12', price: 1.8 }],
    ownershipHistory: [{ address: userProfile.address, date: '2024-03-12' }],
  },
  {
    id: '3',
    title: 'Neon Galaxy',
    creator: 'ArtCreator99',
    creatorAvatar: userProfile.avatar,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
    price: 3.2,
    floorPrice: 2.8,
    rarity: 'legendary' as const,
    likes: 512,
    liked: false,
    collection: 'Cyber Minds',
    owner: userProfile.address,
    createdAt: '1 week ago',
    description: 'Neon lights illuminate a galactic landscape',
    traits: [
      { name: 'Theme', value: 'Cosmic' },
      { name: 'Color', value: 'Neon' },
    ],
    priceHistory: [{ date: '2024-03-10', price: 3.2 }],
    ownershipHistory: [{ address: userProfile.address, date: '2024-03-10' }],
  },
  {
    id: '4',
    title: 'Digital Dreams',
    creator: 'ArtCreator99',
    creatorAvatar: userProfile.avatar,
    image: 'https://images.unsplash.com/photo-1462684223066-81342ee5ff30?w=400&h=400&fit=crop',
    price: 1.5,
    floorPrice: 1.2,
    rarity: 'rare' as const,
    likes: 178,
    liked: false,
    collection: 'Abstract Art',
    owner: userProfile.address,
    createdAt: '2 weeks ago',
    description: 'Dreams rendered in digital form',
    traits: [
      { name: 'Theme', value: 'Surreal' },
      { name: 'Color', value: 'Mixed' },
    ],
    priceHistory: [{ date: '2024-03-08', price: 1.5 }],
    ownershipHistory: [{ address: userProfile.address, date: '2024-03-08' }],
  },
];

const earningsHistory = [
  { id: 1, nft: 'Cosmic Journey', amount: 2.5, date: '2024-01-15', buyer: '0xabcd...ef01' },
  { id: 2, nft: 'Purple Infinity', amount: 1.8, date: '2024-01-12', buyer: '0x2345...6789' },
  { id: 3, nft: 'Neon Galaxy', amount: 3.2, date: '2024-01-10', buyer: '0x6789...abcd' },
  { id: 4, nft: 'Digital Dreams', amount: 1.5, date: '2024-01-08', buyer: '0xabcd...ef01' },
  { id: 5, nft: 'Synthetic Soul', amount: 2.1, date: '2024-01-05', buyer: '0x3456...7890' },
];

export function Profile() {
  const { addNotification, profileNFTs, removeFromProfile, addToCart, coins, deductCoins, addCoins } = useStore();
  const [activeTab, setActiveTab] = useState('nfts');
  const [userAvatar, setUserAvatar] = useState(userProfile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(userProfile.address);
    addNotification({
      type: 'success',
      message: 'Address copied to clipboard!',
    });
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userProfile.username}'s Profile`,
        text: `Check out my NFT collection on PromptOwn!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addNotification({
        type: 'success',
        message: 'Profile link copied to clipboard!',
      });
    }
  };

  const handleDPUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUserAvatar(result);
        addNotification({
          type: 'success',
          message: 'Profile picture updated successfully!',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDPClick = () => {
    fileInputRef.current?.click();
  };

  const handleSellNFT = (nft: any) => {
    if (confirm(`Are you sure you want to sell "${nft.title}" for 0.5 TON?`)) {
      removeFromProfile(nft.image);
      const rewardCoins = Math.floor(nft.price * 0.1);
      addCoins(rewardCoins);
      addNotification({
        type: 'success',
        message: `Successfully sold "${nft.title}" for 0.5 TON and earned ${rewardCoins} coins!`,
      });
      
      const cart = useStore.getState().cart;
      const cartItem = cart.find((item: any) => item.id === nft.id);
      if (cartItem) {
        useStore.getState().removeFromCart(nft.id);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl border-cyan-400/20 p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div
                  onClick={handleDPClick}
                  className="relative cursor-pointer group"
                >
                  <img
                    src={userAvatar}
                    alt={userProfile.username}
                    className="w-24 h-24 rounded-full border-2 border-cyan-400 object-cover group-hover:border-purple-400 transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera size={20} className="text-white" />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleDPUpload}
                  className="hidden"
                />
              </motion.div>

              {/* Info */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {userProfile.username}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                  <code className="bg-[#1a1f3a] px-2 py-1 rounded">
                    {userProfile.address}
                  </code>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1 hover:text-cyan-400 transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <p className="text-gray-300 mb-4">{userProfile.bio}</p>
                <div className="flex space-x-6 text-sm">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <span className="text-gray-400">Followers</span>
                    <p className="font-bold text-white">
                      {userProfile.followers.toLocaleString()}
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <span className="text-gray-400">Following</span>
                    <p className="font-bold text-white">
                      {userProfile.following.toLocaleString()}
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <span className="text-gray-400">Total Earnings</span>
                    <p className="font-bold text-cyan-400">
                      {userProfile.totalEarnings} ETH
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full md:w-auto flex-col md:flex-row">
              <button
                onClick={handleShareProfile}
                className="flex items-center justify-center space-x-2 px-6 py-2 glass rounded-lg border border-cyan-400/30 text-cyan-400 hover:border-cyan-400/60 font-medium transition-all"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
              <button 
                onClick={() => window.location.href = '/settings'}
                className="flex items-center justify-center space-x-2 px-6 py-2 btn-primary-neon rounded-lg font-medium"
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="glass rounded-lg border border-cyan-400/20 p-1 mb-8 flex w-full h-auto gap-2">
              <TabsTrigger
                value="nfts"
                className="flex-1 rounded-md data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400 text-gray-400 font-semibold py-3 transition-all"
              >
                My NFTs ({profileNFTs.length})
              </TabsTrigger>
              <TabsTrigger
                value="earnings"
                className="flex-1 rounded-md data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400 text-gray-400 font-semibold py-3 transition-all"
              >
                Earnings
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex-1 rounded-md data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400 text-gray-400 font-semibold py-3 transition-all"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="collections"
                className="flex-1 rounded-md data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400 text-gray-400 font-semibold py-3 transition-all"
              >
                Collections
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="flex-1 rounded-md data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-400 text-gray-400 font-semibold py-3 transition-all"
              >
                Activity
              </TabsTrigger>
            </TabsList>

            {/* My NFTs Tab */}
            <TabsContent value="nfts">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {profileNFTs.map((nft, i) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group"
                  >
                    <div className="glass rounded-xl overflow-hidden border-cyan-400/10 hover:border-cyan-400/40 transition-all h-full flex flex-col">
                      {/* Image */}
                      <div className="relative w-full h-48 overflow-hidden bg-[#1a1f3a]">
                        <img
                          src={nft.image}
                          alt={nft.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20"
                          >
                            <ExternalLink size={20} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleSellNFT(nft)}
                            className="p-2 rounded-full bg-red-400/20 backdrop-blur text-red-300 hover:bg-red-400/30"
                          >
                            <DollarSign size={20} />
                          </motion.button>
                        </div>

                        {/* Rarity Badge */}
                        <div className={`absolute top-3 right-3 glass rounded-lg px-2 py-1 text-xs font-semibold border ${
                          nft.rarity === 'legendary'
                            ? 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30'
                            : nft.rarity === 'epic'
                            ? 'bg-purple-400/20 text-purple-300 border-purple-400/30'
                            : 'bg-blue-400/20 text-blue-300 border-blue-400/30'
                        }`}>
                          {nft.rarity.toUpperCase()}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-white mb-1">
                            {nft.title}
                          </h3>
                          <p className="text-xs text-gray-400">{nft.createdAt}</p>
                        </div>

                        <div className="pt-4 border-t border-cyan-400/10">
                          <p className="text-sm text-gray-400 mb-2">Listed for</p>
                          <p className="font-bold text-cyan-400">{nft.price} ETH</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Earnings Tab */}
            <TabsContent value="earnings">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Earnings', value: '12.5 ETH', color: 'cyan' },
                    { label: 'This Month', value: '3.2 ETH', color: 'purple' },
                    {
                      label: 'This Week',
                      value: '0.8 ETH',
                      color: 'pink',
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`glass rounded-lg p-6 border-${stat.color}-400/30`}
                    >
                      <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                      <p
                        className={`text-2xl font-bold ${
                          stat.color === 'cyan'
                            ? 'text-cyan-400'
                            : stat.color === 'purple'
                            ? 'text-purple-400'
                            : 'text-pink-400'
                        }`}
                      >
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Earnings Table */}
                <div className="glass rounded-lg border-cyan-400/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-cyan-400/10">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            NFT
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Buyer
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {earningsHistory.map((earning, i) => (
                          <motion.tr
                            key={earning.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="border-b border-cyan-400/10 hover:bg-cyan-400/5 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm text-white font-medium">
                              {earning.nft}
                            </td>
                            <td className="px-6 py-4 text-sm text-cyan-400 font-bold">
                              {earning.amount} ETH
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400">
                              <code className="bg-[#1a1f3a] px-2 py-1 rounded">
                                {earning.buyer}
                              </code>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400">
                              {earning.date}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AnalyticsDashboard />
              </motion.div>
            </TabsContent>

            {/* Collections Tab */}
            <TabsContent value="collections">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Collections />
              </motion.div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ActivityFeed />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
