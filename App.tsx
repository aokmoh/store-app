import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import MenuDrawer from './components/MenuDrawer';
import SmartAssistant from './components/SmartAssistant';
import ContactModal from './components/ContactModal';
import CheckoutModal from './components/CheckoutModal';
import HeroSlider from './components/HeroSlider';
import { db } from './services/db';
import { Product, CartItem } from './types';
import { Heart, CheckCircle } from 'lucide-react';

// Admin
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProductManager from './components/admin/ProductManager';
import CategoryManager from './components/admin/CategoryManager';
import BannerManager from './components/admin/BannerManager';
import OrderManager from './components/admin/OrderManager';

const StoreApp = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [showFavorites, setShowFavorites] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);
  
  useEffect(() => {
    const load = () => {
       setProducts(db.getProducts());
       setCategories(db.getCategories());
       setBanners(db.getBanners());
    };
    load();
    window.addEventListener('storage', load); // Sync with admin changes
    return () => window.removeEventListener('storage', load);
  }, []);

  const [favorites, setFavorites] = useState<number[]>(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);

  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term);
      if (showFavorites) return matchesSearch && favorites.includes(product.id);
      return matchesSearch && (selectedCategory === 'الكل' || product.category === selectedCategory);
    });
  }, [searchTerm, selectedCategory, showFavorites, favorites, products]);

  const showNotification = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      return ex ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`تم إضافة "${product.name}" للسلة`);
  };

  const handlePlaceOrder = (details: any) => {
    const order = db.createOrder({
      customerName: details.name, phone: details.phone, address: details.address,
      items: cartItems, total: cartItems.reduce((a, b) => a + b.price * b.quantity, 0)
    });
    setIsCheckoutOpen(false);
    setCartItems([]);
    showNotification(`تم استلام الطلب #${order.id.slice(-4)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans pb-20 transition-colors duration-300">
      <Header 
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMenuOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        favoritesCount={favorites.length}
        onFavoritesClick={() => { setShowFavorites(true); window.scrollTo({top:0, behavior:'smooth'}) }}
        onLogoClick={() => { setSelectedCategory('الكل'); setShowFavorites(false); }}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!showFavorites && selectedCategory === 'الكل' && !searchTerm && <HeroSlider banners={banners} />}
        
        {showFavorites && <div className="mb-8 flex items-center gap-2"><Heart className="text-red-500 fill-red-500" /><h2 className="text-2xl font-bold">المفضلة</h2></div>}

        <div className="mb-8 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => { setSelectedCategory(cat.name); setShowFavorites(false); }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.name && !showFavorites ? 'bg-gray-900 dark:bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 border'}`}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} isFavorite={favorites.includes(p.id)} 
              onToggleFavorite={(id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])} />
          ))}
        </div>
      </main>

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full flex gap-2 z-[70]"><CheckCircle />{toast.message}</div>}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} 
        onRemoveItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
        onUpdateQuantity={(id, d) => setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + d } : i))}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} />

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} 
        total={cartItems.reduce((a, b) => a + b.price * b.quantity, 0)} onSubmit={handlePlaceOrder} />

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)}
        onShowFavorites={() => { setShowFavorites(true); setIsMenuOpen(false); }}
        onGoHome={() => { setSelectedCategory('الكل'); setShowFavorites(false); setIsMenuOpen(false); }}
        onContactClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }} />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <SmartAssistant />
    </div>
  );
};

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<StoreApp />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<div className="text-center p-10">مرحباً في لوحة التحكم</div>} />
        <Route path="products" element={<ProductManager />} />
        <Route path="categories" element={<CategoryManager />} />
        <Route path="banners" element={<BannerManager />} />
        <Route path="orders" element={<OrderManager />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default App;