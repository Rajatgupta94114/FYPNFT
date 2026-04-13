'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Heart, Zap, TrendingUp, Users, Share2, Clock } from 'lucide-react';

const activityIcons = {
  mint: <Zap className="w-5 h-5 text-cyan-400" />,
  sale: <TrendingUp className="w-5 h-5 text-green-400" />,
  listing: <Share2 className="w-5 h-5 text-blue-400" />,
  like: <Heart className="w-5 h-5 text-red-400" />,
  follow: <Users className="w-5 h-5 text-purple-400" />,
};

export function ActivityFeed() {
  const { activities } = useStore();

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold">Activity Feed</h3>
      </div>

      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No activities yet. Get started by minting your first NFT!
          </div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass rounded-lg p-4 flex items-center space-x-4 hover:bg-[rgba(0,217,255,0.08)] transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(0,217,255,0.1)] flex items-center justify-center">
                {activityIcons[activity.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  <span className="font-bold text-cyan-400">{activity.user}</span>
                  {' '}
                  {activity.type === 'mint' && 'minted'}
                  {activity.type === 'sale' && 'sold'}
                  {activity.type === 'listing' && 'listed'}
                  {activity.type === 'like' && 'liked'}
                  {activity.type === 'follow' && 'followed you'}
                  {activity.nft && ` "${activity.nft}"`}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {getTimeAgo(activity.timestamp)}
                  {activity.amount && ` • ${activity.amount} ETH`}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
