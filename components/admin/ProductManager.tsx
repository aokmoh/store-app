import React, { useState } from 'react';
import { db } from '../../services/db';
import { Product } from '../../types';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ProductManager = () => {
  const [products, setProducts] = useState(db.getProducts());
  const [form, setForm] = useState<Partial<Product>>({});
  
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if(form.name && form.price) {
      db.saveProduct(form as Product);
      setProducts(db.getProducts());
      setForm({});
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">إدارة المنتجات</h2>
      
      <form onSubmit={save} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm space-y-4 border border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">اسم المنتج</label>
            <input 
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
              value={form.name||''} 
              onChange={e=>setForm({...form, name:e.target.value})} 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">السعر (د.ع)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
              value={form.price||''} 
              onChange={e=>setForm({...form, price:Number(e.target.value)})} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">القسم</label>
            <input 
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
              value={form.category||''} 
              onChange={e=>setForm({...form, category:e.target.value})} 
              required 
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">صورة المنتج</label>
            <div className="flex gap-2">
              <input 
                placeholder="رابط الصورة (URL)" 
                className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                value={form.image||''} 
                onChange={e=>setForm({...form, image:e.target.value})} 
              />
              <label className="cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-200 p-2 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2 transition-colors min-w-[100px]">
                <Upload size={18} />
                <span className="text-sm font-bold">رفع</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الوصف</label>
          <textarea 
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none" 
            value={form.description||''} 
            onChange={e=>setForm({...form, description:e.target.value})} 
          />
        </div>

        {/* Image Preview */}
        {form.image && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-white">
              <img src={form.image} alt="Preview" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">معاينة الصورة</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 break-all line-clamp-1">{form.image.substring(0, 50)}...</p>
            </div>
            <button 
              type="button"
              onClick={() => setForm({...form, image: ''})}
              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
          حفظ المنتج
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-1">
        {products.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex justify-between items-center group hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors">
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                 <img src={p.image} className="w-full h-full object-cover" alt={p.name}/>
               </div>
               <div>
                 <h3 className="font-bold text-gray-800 dark:text-white text-lg">{p.name}</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                   <span className="font-semibold text-indigo-600 dark:text-indigo-400" dir="ltr">{p.price.toLocaleString()} د.ع</span>
                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                   <span>{p.category}</span>
                 </p>
               </div>
             </div>
             <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
               <button onClick={()=>setForm(p)} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">تعديل</button>
               <button onClick={()=>{if(window.confirm('حذف المنتج؟')) {db.deleteProduct(p.id); setProducts(db.getProducts())}}} className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">حذف</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductManager;