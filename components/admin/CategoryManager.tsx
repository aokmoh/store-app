import React, { useState } from 'react';
import { db } from '../../services/db';

const CategoryManager = () => {
  const [cats, setCats] = useState(db.getCategories());
  const [name, setName] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">إدارة الفئات</h2>
      <div className="flex gap-4">
        <input value={name} onChange={e=>setName(e.target.value)} className="flex-1 p-3 border rounded-lg" placeholder="اسم الفئة الجديدة" />
        <button onClick={()=>{if(name){db.saveCategory({id:'', name}); setCats(db.getCategories()); setName('')}}} className="bg-indigo-600 text-white px-6 rounded-lg">إضافة</button>
      </div>
      <div className="grid gap-2">
        {cats.map(c => (
          <div key={c.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
            <span>{c.name}</span>
            <button onClick={()=>{db.deleteCategory(c.id); setCats(db.getCategories())}} className="text-red-500">حذف</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryManager;