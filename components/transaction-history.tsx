'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock, ExternalLink, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Transaction } from '@/lib/store';

interface TransactionHistoryProps {
  className?: string;
}

export function TransactionHistory({ className = '' }: TransactionHistoryProps) {
  const { transactions } = useStore();

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-400" />;
      case 'failed':
        return <AlertCircle size={16} className="text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'mint':
        return <ArrowUpRight size={16} className="text-cyan-400" />;
      case 'buy':
        return <ArrowDownRight size={16} className="text-green-400" />;
      case 'sell':
        return <ArrowUpRight size={16} className="text-red-400" />;
      default:
        return null;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 border-green-400/20';
      case 'pending':
        return 'text-yellow-400 border-yellow-400/20';
      case 'failed':
        return 'text-red-400 border-red-400/20';
      default:
        return 'text-gray-400 border-gray-400/20';
    }
  };

  if (transactions.length === 0) {
    return (
      <div className={`glass rounded-xl border-cyan-400/20 p-6 ${className}`}>
        <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">...</div>
          <p className="text-gray-400">No transactions yet</p>
          <p className="text-sm text-gray-500 mt-2">Your transaction history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass rounded-xl border-cyan-400/20 p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
      
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 rounded-lg border border-cyan-400/10 hover:border-cyan-400/20 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {getTypeIcon(transaction.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white font-medium capitalize">{transaction.type}</span>
                    <span className="text-gray-400 text-sm">·</span>
                    <span className="text-gray-400 text-sm">{formatDate(transaction.timestamp)}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{transaction.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>From: {formatAddress(transaction.from)}</span>
                    <span>To: {formatAddress(transaction.to)}</span>
                    <span>Amount: {transaction.amount} TON</span>
                  </div>
                  {transaction.hash && (
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-gray-500">
                        Hash: {transaction.hash.slice(0, 10)}...{transaction.hash.slice(-8)}
                      </span>
                      <ExternalLink size={12} className="text-gray-400 cursor-pointer hover:text-cyan-400 transition-colors" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(transaction.status)}
                <span className={`text-sm font-medium ${getStatusColor(transaction.status)}`}>
                  {getStatusText(transaction.status)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
