'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MarketplaceStyled as Marketplace } from '@/components/marketplace-styled';
import { Notifications } from '@/components/notifications';
import { CartSidebar } from '@/components/shopping-cart';

export default function MarketplaceRoute() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="dark bg-background text-foreground flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Marketplace />
      </div>
      <Footer />
      <Notifications />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
