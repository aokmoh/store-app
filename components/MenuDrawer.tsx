import React from 'react';
import { X, Moon, Sun, User, Box, Home, Settings, Heart, Phone, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onShowFavorites: () => void;
  onGoHome: () => void;
  onContactClick: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  toggleTheme,
  onShowFavorites,
  onGoHome,
  onContactClick
}) => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed inset-y-0 right-0 w-[280px] sm:w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-100 dark:border-gray-800 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">القائمة</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 dark:text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* User Profile Stub */}
        <div className="p-5 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center border border-indigo-200 dark:border-indigo-900">
            <User size={24} />
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white">زائر</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">مرحباً بك في المتجر الذكي</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
             <button 
               onClick={onGoHome}
               className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors text-right"
             >
               <Home size={20} className="text-gray-400 dark:text-gray-500" />
               <span className="font-medium">الرئيسية</span>
             </button>
             
             <button 
               onClick={onShowFavorites}
               className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors text-right"
             >
               <Heart size={20} className="text-gray-400 dark:text-gray-500" />
               <span className="font-medium">المفضلة</span>
             </button>

             <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors text-right">
               <Box size={20} className="text-gray-400 dark:text-gray-500" />
               <span className="font-medium">طلباتي</span>
             </button>
             
              <button 
                onClick={onContactClick}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors text-right"
              >
               <Phone size={20} className="text-gray-400 dark:text-gray-500" />
               <span className="font-medium">اتصل بنا</span>
             </button>

             <div className="my-2 border-t border-gray-100 dark:border-gray-800/50 mx-4"></div>

             <button 
               onClick={handleAdminClick}
               className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-right"
             >
               <Lock size={20} className="text-gray-400 dark:text-gray-500" />
               <span className="font-medium">لوحة التحكم</span>
             </button>
          </nav>

          <div className="mt-6 px-4">
             <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-2">المظهر</div>
             <div 
               onClick={toggleTheme}
               className="cursor-pointer w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors"
             >
               <div className="flex items-center gap-3">
                 {isDarkMode ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-amber-500" />}
                 <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{isDarkMode ? 'الوضع الليلي' : 'الوضع النهاري'}</span>
               </div>
               
               {/* Toggle Switch */}
               <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${isDarkMode ? 'left-1' : 'right-1'}`} />
               </div>
             </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-center text-gray-400">الإصدار 2.0.2</p>
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;