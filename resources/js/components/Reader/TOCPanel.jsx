import React from 'react';

export default function TOCPanel({ toc, onSelect, isOpen, onClose }) {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-neutral-900 shadow-xl
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Daftar Isi</h2>
        <button onClick={onClose} className="text-sm">Close</button>
      </div>

      <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-60px)]">
        {toc.map((item) => (
          <button
            key={item.href}
            onClick={() => onSelect(item.href)}
            className="text-left block w-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded"
          >
            {item.label || item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
