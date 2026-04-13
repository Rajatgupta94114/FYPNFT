'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function NotFound() {
  return (
    <div className="dark bg-background text-foreground flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-2xl"
        >
          {/* Large 404 */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-9xl font-bold gradient-text"
          >
            404
          </motion.div>

          {/* Text */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Page Not Found
            </h1>
            <p className="text-gray-400 text-lg">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
            </p>
          </div>

          {/* Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center py-8">
            {[
              { icon: '🎨', label: 'Generate Art', href: '/generate' },
              { icon: '🛍️', label: 'Marketplace', href: '/marketplace' },
              { icon: '👤', label: 'Profile', href: '/profile' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <Link
                  href={item.href}
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary-neon flex items-center justify-center space-x-2 mx-auto group"
            >
              <span>Return Home</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
