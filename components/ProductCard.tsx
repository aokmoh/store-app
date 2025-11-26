import React from 'react';
import { Plus, Star, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col group relative">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-sm z-10">
          {product.category}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors z-10 group-active:scale-90"
          aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} 
          />
        </button>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 text-lg">{product.name}</h3>
          <div className="flex items-center bg-amber-50 dark:bg-amber-900/30 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Star size={12} className="fill-current mr-1" />
            {product.rating}
          </div>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 dark:border-gray-700">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400" dir="ltr">
            {product.price.toLocaleString()} د.ع
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gray-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-colors duration-300 active:scale-95"
            aria-label="أضف للسلة"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;