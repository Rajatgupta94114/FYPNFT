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
   * Get real TON balance from wallet
   */
  async getBalance(walletAddress: string): Promise<number> {
    console.log('Getting balance for address:', walletAddress);
    
    try {
      // Method 1: Try TON Center API (mainnet)
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
        console.log('TON Center API result:', result);
        
        if (result.result) {
          const balance = Number(fromNano(result.result));
          console.log('TON Center balance:', balance);
          return balance;
        }
      }
    } catch (error) {
      console.error('TON Center API failed:', error);
    }

    try {
      // Method 2: Try TON Center API (testnet)
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
        
        if (result.result) {
          const balance = Number(fromNano(result.result));
          console.log('TON Center Testnet balance:', balance);
          return balance;
        }
      }
    } catch (error) {
      console.error('TON Center Testnet API failed:', error);
    }

    try {
      // Method 3: Try Tonscan API
      const response = await fetch(`https://tonscan.org/api/v2/blockchain/getAccountInformation?account_id=${walletAddress}`);
      if (response.ok) {
        const result = await response.json();
        console.log('Tonscan result:', result);
        
        if (result.balance) {
          const balance = Number(fromNano(result.balance));
          console.log('Tonscan balance:', balance);
          return balance;
        }
      }
    } catch (error) {
      console.error('Tonscan API failed:', error);
    }

    try {
      // Method 4: Try direct client method
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
      // Get wallet contract
      const address = Address.parse(walletAddress);
      
      // Calculate mint cost (0.1 TON base + royalty)
      const mintCost = toNano(0.1 + (nftData.royalty * 0.01));
      
      // Create transaction payload for NFT minting
      const payload = beginCell()
        .storeUint(1, 32) // operation: mint_nft
        .storeUint(0, 64) // query_id
        .storeCoins(mintCost) // mint cost
        .storeRef(this.createNFTMetadataCell(nftData))
        .endCell();

      // Create transaction
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        messages: [
          {
            address: address.toString(),
            amount: mintCost,
            payload: payload.toBoc().toString('base64'),
          },
        ],
      };

      // Send transaction via TonConnect
      const result = await tonConnectUI.sendTransaction(transaction);
      
      if (result.boc) {
        // Transaction was sent successfully
        return result.boc;
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw new Error('Failed to mint NFT on blockchain');
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
