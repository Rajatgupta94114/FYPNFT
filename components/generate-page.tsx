'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Download, Heart } from 'lucide-react';

const models = [
  { id: 'dalle3', name: 'DALL-E 3', desc: 'Highly detailed and accurate' },
  { id: 'midjourney', name: 'Midjourney', desc: 'Artistic and creative' },
  { id: 'sd', name: 'Stable Diffusion', desc: 'Fast and versatile' },
];

const aspectRatios = [
  { id: '1:1', label: '1:1 (Square)', width: 512, height: 512 },
  { id: '16:9', label: '16:9 (Landscape)', width: 768, height: 432 },
  { id: '9:16', label: '9:16 (Portrait)', width: 432, height: 768 },
];

export function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('dalle3');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          size: selectedRatio,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedImage(data.imageUrl);
      } else {
        if (data.isBillingError) {
          alert(`💳 Billing Error: ${data.error}\n\nPlease:\n1. Check your Stability AI account billing\n2. Add credits to your account\n3. Verify your API usage limits`);
        } else if (data.needsNewKey) {
          alert(`🔑 API Key Error: ${data.error}\n\nPlease:\n1. Check your Stability AI API key in .env file\n2. Ensure the key is valid and active`);
        } else {
          alert(`Error: ${data.error || 'Failed to generate image'}`);
        }
      }
    } catch (error) {
      console.error('Generation error:', error);
      const useDemo = confirm('Failed to connect to AI service. Would you like to try Demo Mode instead?');
      if (useDemo) {
        const colors = generateColorsFromPrompt(prompt);
        setGeneratedImage(`linear-gradient(135deg, ${colors[0]}, ${colors[1]})`);
        return;
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMintNFT = () => {
    if (!generatedImage) {
      alert('Please generate an image first');
      return;
    }

    // Save image data to localStorage for mint page
    const imageData = {
      url: generatedImage,
      prompt: prompt,
      aspectRatio: selectedRatio,
    };
    
    localStorage.setItem('mintImageData', JSON.stringify(imageData));
    
    // Navigate to mint page
    window.location.href = '/mint';
  };

  const generateColorsFromPrompt = (prompt: string): string[] => {
    // Generate colors based on prompt keywords
    const colorMap: { [key: string]: string[] } = {
      'dolphin': ['#00d9ff', '#0066cc'],
      'ocean': ['#006994', '#00d9ff'],
      'forest': ['#228b22', '#90ee90'],
      'sunset': ['#ff6b6b', '#ffd93d'],
      'space': ['#1a1a2e', '#16213e'],
      'fire': ['#ff4500', '#ffa500'],
      'nature': ['#2ecc71', '#27ae60'],
      'city': ['#34495e', '#2c3e50'],
      'abstract': ['#e74c3c', '#9b59b6'],
      'neon': ['#ff00ff', '#00ffff']
    };

    const lowerPrompt = prompt.toLowerCase();
    for (const [keyword, colors] of Object.entries(colorMap)) {
      if (lowerPrompt.includes(keyword)) {
        return colors;
      }
    }

    // Default colors if no keywords match
    return ['#00d9ff', '#b800ff'];
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    
    try {
      if (generatedImage.startsWith('linear-gradient')) {
        // Handle gradient download using canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1024;
        canvas.height = 1024;
        
        // Create gradient
        const gradient = ctx!.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, generatedImage.match(/#[0-9a-f]{6}/gi)?.[0] || '#00d9ff');
        gradient.addColorStop(1, generatedImage.match(/#[0-9a-f]{6}/gi)?.[1] || '#b800ff');
        
        ctx!.fillStyle = gradient;
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        
        // Download canvas as image
        canvas.toBlob((blob) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `promptown-demo-art-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }
        });
      } else {
        // Handle regular image download
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `promptown-ai-art-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download image');
    }
  };

  const handleCopy = async () => {
    if (!generatedImage) return;
    
    try {
      await navigator.clipboard.writeText(generatedImage);
      alert('Image URL copied to clipboard!');
    } catch (error) {
      console.error('Copy error:', error);
      alert('Failed to copy URL');
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
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">Generate AI Art</h1>
          <p className="text-gray-400 text-lg">Create your unique NFT with a simple text prompt</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Your Creative Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision... e.g., 'A serene digital landscape with floating islands and neon waterfalls under a starlit sky'"
                className="w-full h-32 px-4 py-3 rounded-lg glass border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none resize-none transition-all"
              />
              <p className="mt-2 text-sm text-gray-500">{prompt.length} / 500 characters</p>
            </div>

            {/* AI Model Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                AI Model
              </label>
              <div className="grid grid-cols-1 gap-3">
                {models.map((model) => (
                  <motion.button
                    key={model.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedModel === model.id
                        ? 'glass border-cyan-400/50 bg-cyan-400/10'
                        : 'glass border-cyan-400/20 hover:border-cyan-400/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-white">{model.name}</p>
                        <p className="text-sm text-gray-400">{model.desc}</p>
                      </div>
                      {selectedModel === model.id && (
                        <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#0a0e1f]" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-3">
                {aspectRatios.map((ratio) => (
                  <motion.button
                    key={ratio.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRatio(ratio.id)}
                    className={`p-3 rounded-lg text-center transition-all ${
                      selectedRatio === ratio.id
                        ? 'glass border-purple-400/50 bg-purple-400/10'
                        : 'glass border-cyan-400/20 hover:border-cyan-400/40'
                    }`}
                  >
                    <p className="text-sm font-medium text-white">{ratio.label}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                isGenerating
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'btn-primary-neon neon-glow'
              }`}
            >
              <Sparkles size={20} />
              <span>{isGenerating ? 'Generating...' : 'Generate Art'}</span>
            </motion.button>
          </motion.div>

          {/* Right Column - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Preview Box */}
            <div className="glass rounded-xl border-cyan-400/20 p-8 flex-1 flex items-center justify-center min-h-[400px] relative overflow-hidden group">
              {generatedImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  {generatedImage.startsWith('linear-gradient') ? (
                    <div
                      className="w-full h-full rounded-lg"
                      style={{
                        background: generatedImage,
                      }}
                    />
                  ) : (
                    <img
                      src={generatedImage}
                      alt="Generated AI art"
                      className="w-full h-full rounded-lg object-cover"
                    />
                  )}
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={handleDownload}
                      className="p-3 rounded-full bg-cyan-400 text-[#0a0e1f]"
                    >
                      <Download size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={handleCopy}
                      className="p-3 rounded-full bg-purple-600 text-white"
                    >
                      <Copy size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ rotate: isGenerating ? 360 : 0 }}
                    transition={{ duration: 2, repeat: isGenerating ? Infinity : 0 }}
                    className="flex justify-center"
                  >
                    <div className="text-6xl">✨</div>
                  </motion.div>
                  <p className="text-gray-400">
                    {isGenerating
                      ? 'Creating your masterpiece...'
                      : 'Your generated art will appear here'}
                  </p>
                </div>
              )}
            </div>

            {/* Mint Button */}
            {generatedImage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 flex gap-4"
              >
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="px-6 py-3 rounded-lg glass border border-cyan-400/30 text-cyan-400 hover:border-cyan-400/60 transition-all flex items-center space-x-2"
                >
                  <Heart
                    size={20}
                    fill={isFavorite ? 'currentColor' : 'none'}
                  />
                  <span className="text-sm font-medium">
                    {isFavorite ? 'Favorited' : 'Favorite'}
                  </span>
                </button>
                <button 
                  onClick={handleMintNFT}
                  className="flex-1 btn-primary-neon neon-glow flex items-center justify-center space-x-2"
                >
                  <span className="text-lg">🔐</span>
                  <span>Mint as NFT</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
