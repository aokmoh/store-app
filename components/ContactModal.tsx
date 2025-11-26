import React from 'react';
import { X, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
         <div className="bg-indigo-600 p-6 flex justify-between items-start">
           <div>
             <h2 className="text-2xl font-bold text-white mb-1">تواصل معنا</h2>
             <p className="text-indigo-100 text-sm">نحن هنا لمساعدتك على مدار الساعة</p>
           </div>
           <button 
             onClick={onClose} 
             className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
           >
             <X size={20} />
           </button>
         </div>

         {/* Content */}
         <div className="p-6 space-y-4 bg-white dark:bg-gray-900 max-h-[70vh] overflow-y-auto">
           
           {/* Location */}
           <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors">
             <div className="bg-indigo-100 dark:bg-indigo-900/50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400">
               <MapPin size={24} />
             </div>
             <div>
               <h3 className="font-bold text-gray-900 dark:text-white mb-1">المقر الرئيسي</h3>
               <p className="text-sm text-gray-600 dark:text-gray-300">بغداد، الكرادة</p>
               <p className="text-sm text-gray-500 dark:text-gray-400">العراق</p>
             </div>
           </div>

           {/* Phones */}
           <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-900 transition-colors">
             <div className="bg-green-100 dark:bg-green-900/50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-green-600 dark:text-green-400">
               <Phone size={24} />
             </div>
             <div className="flex-1">
               <h3 className="font-bold text-gray-900 dark:text-white mb-2">خدمة العملاء</h3>
               <div className="space-y-2" dir="ltr">
                 <a href="tel:+9647700000000" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span>+964 77 0000 0000</span>
                 </a>
                 <a href="tel:+9647800000000" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span>+964 78 0000 0000</span>
                 </a>
               </div>
             </div>
           </div>

           {/* Hours */}
           <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-amber-200 dark:hover:border-amber-900 transition-colors">
             <div className="bg-amber-100 dark:bg-amber-900/50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-600 dark:text-amber-400">
               <Clock size={24} />
             </div>
             <div>
               <h3 className="font-bold text-gray-900 dark:text-white mb-1">ساعات العمل</h3>
               <p className="text-sm text-gray-600 dark:text-gray-300 flex justify-between gap-4">
                 <span>السبت - الخميس:</span>
                 <span className="font-medium">9:00 ص - 11:00 م</span>
               </p>
               <p className="text-sm text-gray-600 dark:text-gray-300 flex justify-between gap-4 mt-1">
                 <span>الجمعة:</span>
                 <span className="font-medium">4:00 م - 11:00 م</span>
               </p>
             </div>
           </div>

           {/* Email */}
           <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
             <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
               <Mail size={24} />
             </div>
             <div>
               <h3 className="font-bold text-gray-900 dark:text-white mb-1">البريد الإلكتروني</h3>
               <a href="mailto:support@smartstore.iq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 break-all">
                 support@smartstore.iq
               </a>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default ContactModal;