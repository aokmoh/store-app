import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Panel (Left side because RTL - actually physically Left) */}
      <div className={`fixed inset-y-0 left-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-r border-gray-100 dark:border-gray-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">سلة المشتريات</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-3">
              <ShoppingBag size={64} className="opacity-20" />
              <p>السلة فارغة حالياً</p>
              <button 
                onClick={onClose}
                className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl transition-colors">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 dark:text-white line-clamp-1">{item.name}</h4>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm" dir="ltr">{item.price.toLocaleString()} د.ع</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm h-8">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 h-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-r-lg transition-colors"
                      >-</button>
                      <span className="px-2 text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 h-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-l-lg transition-colors"
                      >+</button>
                    </div>
                    
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 dark:text-red-400 p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 dark:text-gray-400">المجموع الكلي</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white" dir="ltr">{total.toLocaleString()} د.ع</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98]"
            >
              إتمام الشراء
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;