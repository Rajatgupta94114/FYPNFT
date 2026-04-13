'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const { hasAccount } = useStore();

  useEffect(() => {
    // Check if user already has an account
    if (hasAccount()) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      // Redirect to account creation page
      router.push('/create-account');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, hasAccount]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center dark bg-gradient-to-b from-[#0a0e1f] via-[#1a1f3a] to-[#0a0e1f]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-96 h-96 rounded-full"
          style={{
            top: '-200px',
            right: '-200px',
            background: 'radial-gradient(circle, rgba(0,217,255,0.2) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-80 h-80 rounded-full"
          style={{
            bottom: '-150px',
            left: '-150px',
            background: 'radial-gradient(circle, rgba(184,0,255,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="flex items-center justify-center w-32 h-32"
          >
            <div className="relative w-full h-full">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: '#00d9ff',
                  borderRightColor: '#b800ff',
                  borderBottomColor: '#ff006e',
                  borderLeftColor: '#00d9ff',
                }}
              />

              {/* Inner circle with logo */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#00d9ff] via-[#b800ff] to-[#ff006e] p-1">
                <div className="w-full h-full rounded-full bg-[#1a1f3a] flex items-center justify-center">
                  <span className="text-4xl font-black gradient-text">P</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Glow effect */}
          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 40px rgba(0, 217, 255, 0.4), 0 0 80px rgba(184, 0, 255, 0.2)',
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-3 text-center"
        >
          <h1 className="text-3xl font-bold text-white">PromptOwn</h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg text-cyan-400 font-medium"
          >
            Generating AI Art...
          </motion.p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-48 h-1 rounded-full bg-[#2a2f4a] overflow-hidden"
        >
          <motion.div
            animate={{
              x: ['0%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-full w-1/2 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #00d9ff, transparent)',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
