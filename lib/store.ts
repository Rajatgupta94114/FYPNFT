import { create } from 'zustand';

export interface NFTItem {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  image: string;
  price: number;
  floorPrice: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  likes: number;
  liked: boolean;
  collection: string;
  owner: string;
  createdAt: string;
  description: string;
  priceHistory: { date: string; price: number }[];
  traits: { name: string; value: string }[];
  ownershipHistory: { address: string; date: string }[];
}

export interface CartItem extends NFTItem {
  quantity: number;
}

export interface Activity {
  id: string;
  type: 'mint' | 'sale' | 'listing' | 'like' | 'follow';
  user: string;
  nft?: string;
  amount?: number;
  timestamp: string;
  icon: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface UserAccount {
  fullName: string;
  username: string;
  phoneNumber?: string;
  email?: string;
  createdAt: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: boolean;
  totalSales: number;
  nftCount: number;
  socials?: {
    twitter?: string;
    website?: string;
  };
}

interface Store {
  // Cart
  cart: CartItem[];
  addToCart: (nft: NFTItem) => void;
  removeFromCart: (nftId: string) => void;
  clearCart: () => void;
  updateCartQuantity: (nftId: string, quantity: number) => void;
  
  
  // Wishlist
  wishlist: string[];
  addToWishlist: (nftId: string) => void;
  removeFromWishlist: (nftId: string) => void;
  isInWishlist: (nftId: string) => boolean;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;

  // Activity Feed
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;

  // Following
  following: string[];
  addFollowing: (creatorId: string) => void;
  removeFollowing: (creatorId: string) => void;
  isFollowing: (creatorId: string) => boolean;

  // User Stats
  userStats: {
    totalEarnings: number;
    nftsMinted: number;
    nftsSold: number;
    followers: number;
  };
  updateUserStats: (stats: Partial<Store['userStats']>) => void;

  // Coins System
  coins: number;
  deductCoins: (amount: number) => boolean;
  addCoins: (amount: number) => void;

  // Account Management
  userAccount: UserAccount | null;
  createAccount: (account: Omit<UserAccount, 'createdAt'>) => void;
  hasAccount: () => boolean;
  
  
  // Profile Management
  profileNFTs: NFTItem[];
  addToProfile: (nft: NFTItem) => void;
  removeFromProfile: (imageUrl: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  cart: [],
  profileNFTs: [],
  coins: 1000,
  userAccount: null,
  addToCart: (nft) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === nft.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === nft.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { cart: [...state.cart, { ...nft, quantity: 1 }] };
    }),
  removeFromCart: (nftId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== nftId),
    })),
  clearCart: () => set({ cart: [] }),
  updateCartQuantity: (nftId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === nftId ? { ...item, quantity } : item
      ),
    })),

  wishlist: [],
  addToWishlist: (nftId) =>
    set((state) => ({
      wishlist: [...state.wishlist, nftId],
    })),
  removeFromWishlist: (nftId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((id) => id !== nftId),
    })),
  isInWishlist: (nftId) => get().wishlist.includes(nftId),

  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Math.random().toString(36),
          timestamp: new Date().toISOString(),
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  activities: [],
  addActivity: (activity) =>
    set((state) => ({
      activities: [
        {
          ...activity,
          id: Math.random().toString(36),
        },
        ...state.activities,
      ].slice(0, 50),
    })),

  following: [],
  addFollowing: (creatorId) =>
    set((state) => ({
      following: [...state.following, creatorId],
    })),
  removeFollowing: (creatorId) =>
    set((state) => ({
      following: state.following.filter((id) => id !== creatorId),
    })),
  isFollowing: (creatorId) => get().following.includes(creatorId),

  userStats: {
    totalEarnings: 12500,
    nftsMinted: 47,
    nftsSold: 23,
    followers: 1250,
  },
  updateUserStats: (stats) =>
    set((state) => ({
      userStats: { ...state.userStats, ...stats },
    })),

  // Profile Management Implementations
  addToProfile: (nft) =>
    set((state) => ({
      profileNFTs: [...state.profileNFTs, nft],
    })),
  removeFromProfile: (imageUrl) =>
    set((state) => ({
      profileNFTs: state.profileNFTs.filter((nft) => nft.image !== imageUrl),
    })),

  // Coins System Implementations
  deductCoins: (amount) => {
    const currentCoins = get().coins;
    if (currentCoins >= amount) {
      set((state) => ({
        coins: state.coins - amount,
      }));
      return true;
    }
    return false;
  },
  addCoins: (amount) =>
    set((state) => ({
      coins: state.coins + amount,
    })),

  // Account Management Implementations
  createAccount: (account) =>
    set((state) => ({
      userAccount: {
        ...account,
        createdAt: new Date().toISOString(),
      },
    })),
  hasAccount: () => {
    const state = get();
    return state.userAccount !== null;
  },
}));
