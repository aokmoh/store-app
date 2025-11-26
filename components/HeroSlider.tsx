import React, { useState, useEffect } from 'react';
import { Banner } from '../types';

const HeroSlider: React.FC<{ banners: Banner[] }> = ({ banners }) => {
  const [current, setCurrent] = useState(0);
  const activeBanners = banners.filter(b => b.active);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => setCurrent(p => (p + 1) % activeBanners.length), 5000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  return (
    <div className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl mb-10 group">
      {activeBanners.map((banner, index) => (
        <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}>
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 sm:px-12">
            <div className="text-white max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">{banner.title}</h2>
              <button className="bg-indigo-600 px-6 py-3 rounded-xl font-bold">اكتشف المزيد</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default HeroSlider;