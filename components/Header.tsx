import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, Store, Heart, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  favoritesCount: number;
  onFavoritesClick: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onCartClick, 
  onMenuClick, 
  searchTerm, 
  onSearchChange,
  favoritesCount,
  onFavoritesClick,
  onLogoClick
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center justify-between">
          
          {/* Mobile Search Overlay */}
          <div 
            className={`absolute inset-0 z-30 bg-white dark:bg-gray-900 flex items-center gap-3 md:hidden transition-all duration-300 ${
              isSearchOpen 
                ? 'opacity-100 translate-y-0 visible' 
                : 'opacity-0 -translate-y-4 invisible pointer-events-none'
            }`}
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search size={18} className="text-indigo-500" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-4 pr-10 py-2 border-none bg-gray-100 dark:bg-gray-800 rounded-full text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 text-sm"
                placeholder="ابحث عن المنتجات..."
                autoFocus={isSearchOpen}
              />
            </div>
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <span className="text-sm font-bold">إلغاء</span>
            </button>
          </div>

          {/* Main Header Content */}
          <div className={`flex justify-between items-center w-full gap-4 transition-opacity duration-200 ${isSearchOpen ? 'opacity-0 invisible md:opacity-100 md:visible' : 'opacity-100 visible'}`}>
            
            {/* Logo */}
            <button onClick={onLogoClick} className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Store size={24} />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 hidden sm:block">
                المتجر الذكي
              </h1>
            </button>

            {/* Desktop Search Bar */}
            <div className="flex-1 max-w-lg hidden md:block">
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="block w-full pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  placeholder="ابحث عن المنتجات..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full md:hidden"
              >
                <Search size={22} />
              </button>

              <button 
                onClick={onFavoritesClick}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 rounded-full transition-colors hidden sm:block"
                title="المفضلة"
              >
                <Heart size={22} className={favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''} />
                {favoritesCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full min-w-[16px] h-[16px]">
                    {favoritesCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={onCartClick}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-colors"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full min-w-[18px] h-[18px]">
                    {cartCount}
                  </span>
                )}
              </button>

               <button 
                 onClick={onMenuClick}
                 className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
               >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;