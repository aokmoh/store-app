import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, CreditCard, CheckCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onSubmit: (details: { name: string; phone: string; address: string }) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, total, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setAddress('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, phone, address });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <CreditCard size={24} />
            <h2 className="text-xl font-bold">إتمام الطلب</h2>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Total Summary */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300 font-medium">المبلغ الإجمالي</span>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400" dir="ltr">{total.toLocaleString()} د.ع</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">الاسم الكامل</label>
              <div className="relative group">
                <User className="absolute right-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  required
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">رقم الهاتف</label>
              <div className="relative group">
                <Phone className="absolute right-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-right"
                  placeholder="07xxxxxxxx"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">العنوان بالتفصيل</label>
              <div className="relative group">
                <MapPin className="absolute right-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <textarea
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all h-24 resize-none"
                  placeholder="المدينة، الحي، الشارع، رقم المنزل..."
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
          >
            <span>تأكيد وإرسال الطلب</span>
            <CheckCircle size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;