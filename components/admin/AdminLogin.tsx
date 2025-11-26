import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@store.com' && pass === 'admin123') {
      localStorage.setItem('admin_token', 'valid');
      navigate('/admin/dashboard');
    } else setErr('بيانات خاطئة');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="text-center mb-6">
          <Lock className="mx-auto mb-2 text-indigo-600" size={32} />
          <h1 className="text-2xl font-bold">دخول المدير</h1>
        </div>
        {err && <p className="text-red-500 text-sm mb-4 text-center">{err}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="البريد" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <input type="password" placeholder="كلمة المرور" value={pass} onChange={e=>setPass(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold">دخول</button>
        </form>
        <p className="text-xs text-gray-400 mt-4 text-center">admin@store.com / admin123</p>
      </div>
    </div>
  );
};
export default AdminLogin;