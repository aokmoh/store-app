import React, { useState } from 'react';
import { db } from '../../services/db';
import { Banner } from '../../types';

const BannerManager = () => {
  const [banners, setBanners] = useState(db.getBanners());
  const [form, setForm] = useState<Partial<Banner>>({active:true});

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">إدارة الإعلانات</h2>
      <div className="bg-white p-6 rounded-xl space-y-4">
         <input placeholder="العنوان" className="w-full p-2 border rounded" value={form.title||''} onChange={e=>setForm({...form, title:e.target.value})} />
         <input placeholder="رابط الصورة" className="w-full p-2 border rounded" value={form.image||''} onChange={e=>setForm({...form, image:e.target.value})} />
         <button onClick={()=>{if(form.title){db.saveBanner(form as Banner); setBanners(db.getBanners()); setForm({active:true})}}} className="bg-indigo-600 text-white px-6 py-2 rounded">حفظ</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {banners.map(b => (
          <div key={b.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <img src={b.image} className="h-32 w-full object-cover" alt=""/>
            <div className="p-4 flex justify-between">
              <h3 className="font-bold">{b.title}</h3>
              <button onClick={()=>{db.deleteBanner(b.id); setBanners(db.getBanners())}} className="text-red-500">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BannerManager;