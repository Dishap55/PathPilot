import React, { useState } from 'react';

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded shadow whitespace-nowrap z-30">
          {text}
        </div>
      )}
    </div>
  );
}
