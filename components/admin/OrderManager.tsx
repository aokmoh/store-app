import React, { useState } from 'react';
import { db } from '../../services/db';

const OrderManager = () => {
  const [orders, setOrders] = useState(db.getOrders());

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o.id} className="bg-white p-6 rounded-xl shadow-sm space-y-2">
            <div className="flex justify-between font-bold">
               <span>{o.customerName} ({o.phone})</span>
               <span dir="ltr">{o.total.toLocaleString()} د.ع</span>
            </div>
            <p className="text-sm text-gray-500">{o.address}</p>
            <div className="flex gap-2 mt-4">
               {['pending','processing','completed','cancelled'].map(s => (
                 <button key={s} onClick={()=>{db.updateOrderStatus(o.id, s as any); setOrders(db.getOrders())}} 
                 className={`px-3 py-1 rounded text-sm ${o.status===s?'bg-indigo-600 text-white':'bg-gray-100'}`}>{s}</button>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderManager;