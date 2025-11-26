import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, Image, ShoppingBag, LogOut, ArrowRight } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { if(!localStorage.getItem('admin_token')) navigate('/admin/login'); }, [navigate]);

  const navs = [
    { p: '/admin/dashboard', l: 'الرئيسية', i: <LayoutDashboard /> },
    { p: '/admin/products', l: 'المنتجات', i: <Package /> },
    { p: '/admin/categories', l: 'الفئات', i: <Tags /> },
    { p: '/admin/banners', l: 'الإعلانات', i: <Image /> },
    { p: '/admin/orders', l: 'الطلبات', i: <ShoppingBag /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row" dir="rtl">
      <aside className="w-full md:w-64 bg-white border-l h-auto md:h-screen p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-indigo-600">لوحة التحكم</h2>
          <button onClick={()=>navigate('/')}><ArrowRight size={20} /></button>
        </div>
        <nav className="space-y-2">
          {navs.map(n => (
            <NavLink key={n.p} to={n.p} className={({isActive})=>`flex items-center gap-3 p-3 rounded-lg ${isActive?'bg-indigo-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>
              {n.i}<span>{n.l}</span>
            </NavLink>
          ))}
          <button onClick={()=>{localStorage.removeItem('admin_token'); navigate('/admin/login');}} className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 mt-4">
            <LogOut /><span>خروج</span>
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto"><Outlet /></main>
    </div>
  );
};
export default AdminLayout;