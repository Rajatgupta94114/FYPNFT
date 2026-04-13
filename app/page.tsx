'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { LoadingScreen } from '@/components/loading-screen';
import { Landing } from '@/components/landing';
import { Footer } from '@/components/footer';
import { Notifications } from '@/components/notifications';
import { CartSidebar } from '@/components/shopping-cart';
import { useStore } from '@/lib/store';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addActivity } = useStore();

  useEffect(() => {
    // Add initial activities
    addActivity({
      type: 'mint',
      user: 'Luna Digital',
      nft: 'Cosmic Horizon',
      amount: 2.5,
      timestamp: new Date().toISOString(),
      icon: '⚡',
    });
  }, []);

  return (
    <div className="dark bg-background text-foreground">
      <LoadingScreen />
      <Navbar />
      <Landing />
      <Footer />
      <Notifications />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
