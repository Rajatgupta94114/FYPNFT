'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Palette, User } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/lib/store';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export function Landing() {
  const { userAccount, hasAccount } = useStore();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            top: '-200px',
            right: '-200px',
            background: 'radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            bottom: '-150px',
            left: '-150px',
            background: 'radial-gradient(circle, rgba(184,0,255,0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border-cyan-400/30 text-cyan-400 text-sm font-medium"
        >
          <Sparkles size={16} />
          <span>AI-Powered NFT Generation</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-center max-w-4xl mb-6 text-balance"
        >
          Turn Your Prompt Into
          <span className="block mt-2 gradient-text">Ownable AI Art</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mb-12"
        >
          Create stunning AI-generated artwork from your imagination and instantly mint them as valuable NFTs on the blockchain
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link href="/generate">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary-neon flex items-center space-x-2 group"
            >
              <span>Start Generating</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-neon"
          >
            <span>Connect Wallet</span>
          </motion.button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl"
        >
          {[
            { icon: Zap, label: 'Instant Generation' },
            { icon: Palette, label: 'Unlimited Creativity' },
            { icon: Shield, label: 'Blockchain Secured' },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass rounded-lg p-4 flex items-center space-x-3 hover:border-cyan-400/50 transition-all"
            >
              <feature.icon className="text-cyan-400 flex-shrink-0" size={24} />
              <span className="text-sm font-medium text-gray-300">{feature.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">How it Works</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three simple steps to create and own your AI art
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Write Your Prompt',
                description: 'Describe your creative vision in detail. The more specific, the better the results.',
                icon: '✨',
              },
              {
                step: 2,
                title: 'Generate AI Art',
                description: 'Our advanced AI models create stunning, unique artwork based on your prompt.',
                icon: '🎨',
              },
              {
                step: 3,
                title: 'Mint & Own',
                description: 'Instantly mint your creation as an NFT and own it forever on the blockchain.',
                icon: '🔐',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group"
              >
                <div className="relative">
                  {/* Card */}
                  <div className="glass rounded-xl p-8 h-full hover:border-purple-400/50 transition-all">
                    {/* Step number */}
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center text-2xl font-bold gradient-text">
                        {item.step}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>

                  {/* Connector line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 translate-x-full w-8 h-0.5 bg-gradient-to-r from-cyan-400/30 to-transparent" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4"
      >
        <div className="max-w-4xl mx-auto glass rounded-2xl border-cyan-400/20 p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to create your first NFT?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join thousands of artists transforming their ideas into ownable digital art
          </p>
          <Link href="/generate">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary-neon flex items-center space-x-2 mx-auto group"
            >
              <span>Get Started Now</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
