'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';

interface TonConnectProviderProps {
  children: React.ReactNode;
}

export function TonConnectProvider({ children }: TonConnectProviderProps) {
  return (
    <TonConnectUIProvider 
      manifestUrl="https://fypfs.netlify.app/tonconnect-manifest.json"
    >
      {children}
    </TonConnectUIProvider>
  );
}
