'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { X, Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateCartQuantity, clearCart, addNotification } = useStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      addNotification({
        type: 'warning',
        message: 'Cart is empty',
      });
      return;
    }
    addNotification({
      type: 'success',
      message: `Checkout: ${total.toFixed(2)} ETH for ${cart.length} item(s)!`,
    });
    clearCart();
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-[rgba(10,14,31,0.98)] to-[rgba(10,14,31,0.95)] border-l border-[rgba(0,217,255,0.1)] z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(0,217,255,0.1)]">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold">Cart</h2>
            {cart.length > 0 && (
              <span className="ml-2 px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full font-semibold">
                {cart.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgba(0,217,255,0.1)] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <ShoppingCart className="w-12 h-12 mb-4 opacity-50" />
              <p>Your cart is empty</p>
              <p className="text-sm mt-1">Add NFTs to get started</p>
            </div>
          ) : (
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="glass rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                      <p className="text-xs text-gray-400">{item.creator}</p>
                      <p className="text-cyan-400 font-bold mt-1">{item.price} ETH</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-red-400/10 text-red-400 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center space-x-2 bg-[rgba(0,217,255,0.05)] rounded-lg p-2">
                    <button
                      onClick={() =>
                        updateCartQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="p-1 hover:bg-[rgba(0,217,255,0.2)] rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 text-center bg-transparent text-white text-sm font-semibold"
                    />
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-[rgba(0,217,255,0.2)] rounded transition-colors ml-auto"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="flex justify-between text-sm pt-2 border-t border-[rgba(0,217,255,0.1)]">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-cyan-400 font-semibold">
                      {(item.price * item.quantity).toFixed(2)} ETH
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[rgba(0,217,255,0.1)] p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal:</span>
                <span>{total.toFixed(2)} ETH</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Gas Fee:</span>
                <span>~0.05 ETH</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-[rgba(0,217,255,0.1)]">
                <span>Total:</span>
                <span className="text-cyan-400">{(total + 0.05).toFixed(2)} ETH</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary-neon rounded-lg py-3 font-semibold hover:shadow-lg transition-all"
            >
              Checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full py-2 text-gray-400 hover:text-red-400 font-semibold transition-colors border border-[rgba(0,217,255,0.2)] rounded-lg hover:border-red-400"
            >
              Clear Cart
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
