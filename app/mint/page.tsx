'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Crown, Wallet, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

export default function MintPage() {
  const router = useRouter();
  const { addToCart, addToProfile, coins, deductCoins, addTransaction, updateTransactionStatus } = useStore();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  
  const [imageData, setImageData] = useState<{
    url: string;
    prompt: string;
    aspectRatio: string;
  } | null>(null);
  const [royalty, setRoyalty] = useState(5);
  const [nftName, setNftName] = useState('');
  const [description, setDescription] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending');

  useEffect(() => {
    // Get image data from localStorage (set from generate page)
    const savedImageData = localStorage.getItem('mintImageData');
    if (savedImageData) {
      const data = JSON.parse(savedImageData);
      setImageData(data);
      setNftName(`AI Art - ${data.prompt.slice(0, 20)}${data.prompt.length > 20 ? '...' : ''}`);
      setDescription(`Generated AI art from prompt: "${data.prompt}"`);
    }
  }, []);

  const handleMint = async () => {
    if (!imageData || !nftName.trim()) {
      alert('Please provide an NFT name');
      return;
    }

    // Check if user has enough coins (5 coins required)
    if (coins < 5) {
      alert('Insufficient coins! You need 5 coins to mint an NFT. You currently have ' + coins + ' coins.');
      return;
    }

    // Check if wallet is connected
    if (!wallet) {
      alert('Please connect your TON wallet first!');
      tonConnectUI.openModal();
      return;
    }

    setIsMinting(true);

    try {
      // Create NFT object matching NFTItem interface
      const nftData = {
        id: `nft-${Date.now()}`,
        title: nftName,
        creator: 'You',
        creatorAvatar: '/placeholder-user.jpg',
        image: imageData.url,
        price: 0.1 + (royalty * 0.01),
        floorPrice: 0.05,
        rarity: 'common' as const,
        likes: 0,
        liked: false,
        collection: 'PromptOwn AI Collection',
        owner: wallet.account.address,
        createdAt: new Date().toISOString(),
        description,
        priceHistory: [],
        traits: [
          { name: 'Prompt', value: imageData.prompt },
          { name: 'Royalty', value: `${royalty}%` },
          { name: 'Model', value: 'Stable Diffusion XL' }
        ],
        ownershipHistory: [
          { address: wallet.account.address, date: new Date().toISOString() }
        ]
      };

      // Create transaction record
      const newTransaction = {
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        type: 'mint' as const,
        amount: 0.1,
        from: wallet.account.address,
        to: 'PromptOwn Contract',
        status: 'pending' as const,
        nftId: nftData.id,
        description: `Mint NFT: ${nftName}`
      };

      addTransaction(newTransaction);
      const txId = `tx-${Date.now()}`;
      setTransactionId(txId);

      // Deduct 5 coins for minting
      const coinsDeducted = deductCoins(5);
      if (!coinsDeducted) {
        throw new Error('Failed to deduct coins');
      }

      // Simulate blockchain transaction process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update transaction status to confirmed
      updateTransactionStatus(txId, 'confirmed');
      setTransactionStatus('confirmed');

      // Add to profile NFTs
      addToProfile(nftData);

      // Clear localStorage
      localStorage.removeItem('mintImageData');

      setMintSuccess(true);

      // Redirect to profile after successful mint
      setTimeout(() => {
        router.push('/profile');
      }, 3000);

    } catch (error) {
      console.error('Minting error:', error);
      if (transactionId) {
        updateTransactionStatus(transactionId, 'failed');
        setTransactionStatus('failed');
      }
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!imageData) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎨</div>
          <h2 className="text-2xl font-bold text-white">No Image Data Found</h2>
          <p className="text-gray-400">Please generate an image first before minting.</p>
          <button
            onClick={() => router.push('/generate')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-purple-700 transition-all"
          >
            Go to Generate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Generate</span>
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">Mint NFT</h1>
          <p className="text-gray-400 text-lg">Transform your AI art into a unique NFT</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass rounded-xl border-cyan-400/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
              <div className="relative group">
                {imageData.url.startsWith('linear-gradient') ? (
                  <div
                    className="w-full rounded-lg aspect-square"
                    style={{
                      background: imageData.url,
                    }}
                  />
                ) : (
                  <img
                    src={imageData.url}
                    alt="NFT Preview"
                    className="w-full rounded-lg aspect-square object-cover"
                  />
                )}
                <div className="absolute top-2 right-2 bg-cyan-400/90 text-[#0a0e1f] px-2 py-1 rounded text-xs font-semibold">
                  PREVIEW
                </div>
              </div>
              
              {/* Prompt Display */}
              <div className="mt-4 p-3 bg-cyan-400/10 rounded-lg border border-cyan-400/20">
                <p className="text-sm text-cyan-400 font-medium">Original Prompt:</p>
                <p className="text-white mt-1">"{imageData.prompt}"</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Mint Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* NFT Details */}
            <div className="glass rounded-xl border-cyan-400/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">NFT Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    NFT Name *
                  </label>
                  <input
                    type="text"
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                    placeholder="Enter NFT name..."
                    className="w-full px-4 py-3 rounded-lg glass border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your NFT..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg glass border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none resize-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    <Crown size={16} className="inline mr-2" />
                    Royalty Percentage
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={royalty}
                      onChange={(e) => setRoyalty(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-cyan-400 font-bold text-lg w-12 text-center">
                      {royalty}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    You'll receive {royalty}% of all secondary sales
                  </p>
                </div>
              </div>
            </div>

            {/* Coins Info */}
            <div className="glass rounded-xl border-cyan-400/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Minting Cost</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Your Balance:</span>
                  <span className="text-yellow-400 font-semibold">{coins} Coins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Mint Cost:</span>
                  <span className="text-red-400 font-semibold">5 Coins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Remaining After Mint:</span>
                  <span className="text-cyan-400 font-semibold">{coins - 5} Coins</span>
                </div>
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="glass rounded-xl border-cyan-400/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Blockchain Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Network:</span>
                  <span className="text-cyan-400 font-semibold">TON Blockchain</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Mint Cost:</span>
                  <span className="text-green-400 font-semibold">~0.1 TON</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Gas Fees:</span>
                  <span className="text-yellow-400 font-semibold">~0.01 TON</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Wallet:</span>
                  <span className="text-cyan-400 font-semibold">
                    {wallet ? `${wallet.account.address.slice(0, 6)}...${wallet.account.address.slice(-4)}` : 'Not Connected'}
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction Status */}
            {isMinting && transactionId && (
              <div className="glass rounded-xl border-cyan-400/20 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Transaction Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {transactionStatus === 'pending' && (
                      <>
                        <div className="animate-spin">
                          <AlertCircle size={20} className="text-yellow-400" />
                        </div>
                        <span className="text-yellow-400 font-semibold">Transaction Pending...</span>
                      </>
                    )}
                    {transactionStatus === 'confirmed' && (
                      <>
                        <CheckCircle size={20} className="text-green-400" />
                        <span className="text-green-400 font-semibold">Transaction Confirmed!</span>
                      </>
                    )}
                    {transactionStatus === 'failed' && (
                      <>
                        <AlertCircle size={20} className="text-red-400" />
                        <span className="text-red-400 font-semibold">Transaction Failed</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    Transaction ID: {transactionId}
                  </div>
                  <div className="text-sm text-gray-400">
                    Please confirm the transaction in your mobile wallet app
                  </div>
                </div>
              </div>
            )}

            {/* Mint Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMint}
              disabled={isMinting || mintSuccess}
              className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                isMinting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'btn-primary-neon neon-glow'
              }`}
            >
              {mintSuccess ? (
                <>
                  <span className="text-2xl">5 Coins deducted!</span>
                  <span>NFT Minted Successfully!</span>
                </>
              ) : isMinting ? (
                <>
                  <div className="animate-spin">
                    <Sparkles size={20} />
                  </div>
                  <span>Minting on Blockchain...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Mint NFT</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
