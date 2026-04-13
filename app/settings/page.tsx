'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, CreditCard, HelpCircle, LogOut, Moon, Sun, Volume2, Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function SettingsPage() {
  const router = useRouter();
  const { addNotification } = useStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const settingsSections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleSave = () => {
    addNotification({
      type: 'success',
      message: 'Settings saved successfully!',
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      addNotification({
        type: 'info',
        message: 'Logged out successfully',
      });
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
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
            <span>Back to Profile</span>
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">Settings</h1>
          <p className="text-gray-400 text-lg">Manage your account preferences and settings</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-xl border-cyan-400/20 p-4">
              <nav className="space-y-2">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-400'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="mt-8 pt-4 border-t border-gray-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-xl border-cyan-400/20 p-8">
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Username</label>
                      <input
                        type="text"
                        defaultValue="ArtCreator99"
                        className="w-full px-4 py-3 rounded-lg glass border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="user@example.com"
                        className="w-full px-4 py-3 rounded-lg glass border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Bio</label>
                      <textarea
                        rows={3}
                        defaultValue="Creating unique AI art and minting NFTs"
                        className="w-full px-4 py-3 rounded-lg glass border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none resize-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Website</label>
                      <input
                        type="url"
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-3 rounded-lg glass border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 glass rounded-lg border border-cyan-400/20">
                      <div>
                        <h3 className="text-white font-medium">Push Notifications</h3>
                        <p className="text-gray-400 text-sm">Receive notifications about your NFTs</p>
                      </div>
                      <button
                        onClick={() => setNotifications(!notifications)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 glass rounded-lg border border-cyan-400/20">
                      <div>
                        <h3 className="text-white font-medium">Sound Effects</h3>
                        <p className="text-gray-400 text-sm">Play sounds for actions</p>
                      </div>
                      <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          soundEnabled ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          soundEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 glass rounded-lg border border-cyan-400/20">
                      <div>
                        <h3 className="text-white font-medium">Auto-play Videos</h3>
                        <p className="text-gray-400 text-sm">Automatically play video NFTs</p>
                      </div>
                      <button
                        onClick={() => setAutoPlay(!autoPlay)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          autoPlay ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          autoPlay ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & Security */}
              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Privacy & Security</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 pr-12 rounded-lg glass border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 rounded-lg glass border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Two-Factor Authentication</label>
                      <button className="w-full px-4 py-3 glass rounded-lg border border-cyan-400/20 text-cyan-400 hover:border-cyan-400/40 transition-all">
                        Enable 2FA
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Privacy Level</label>
                      <select className="w-full px-4 py-3 rounded-lg glass border border-cyan-400/20 text-white focus:border-cyan-400/50 focus:outline-none transition-all">
                        <option>Public</option>
                        <option>Friends Only</option>
                        <option>Private</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance */}
              {activeSection === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 glass rounded-lg border border-cyan-400/20">
                      <div>
                        <h3 className="text-white font-medium">Dark Mode</h3>
                        <p className="text-gray-400 text-sm">Use dark theme across the app</p>
                      </div>
                      <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          isDarkMode ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          isDarkMode ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Theme Color</label>
                      <div className="grid grid-cols-6 gap-3">
                        {['bg-cyan-400', 'bg-purple-600', 'bg-pink-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500'].map((color) => (
                          <button
                            key={color}
                            className={`w-12 h-12 rounded-lg ${color} border-2 border-transparent hover:border-white/50 transition-all`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for other sections */}
              {activeSection !== 'profile' && activeSection !== 'notifications' && activeSection !== 'privacy' && activeSection !== 'appearance' && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">{
                    activeSection === 'language' ? 'Globe' :
                    activeSection === 'payment' ? 'CreditCard' :
                    activeSection === 'help' ? 'HelpCircle' : 'Settings'
                  }</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
                  <p className="text-gray-400">This section is under development</p>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-purple-700 transition-all neon-glow"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
