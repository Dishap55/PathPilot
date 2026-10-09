import React from 'react';

export default function Avatar({ src, alt = 'Avatar', name = 'User', size = 'md' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  if (src) {
    return <img src={src} alt={alt} className={`rounded-full object-cover ${sizes[size]}`} />;
  }
  return (
    <div className={`rounded-full bg-sky-100 text-sky-700 font-semibold flex items-center justify-center ${sizes[size]}`}>
      {initials}
    </div>
  );
}
