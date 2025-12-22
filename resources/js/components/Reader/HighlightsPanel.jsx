import React from 'react';

export default function HighlightsPanel({ isOpen, onClose, highlights, onJump, onDelete }) {
  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-80 bg-white dark:bg-neutral-900 shadow-xl
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Highlights</h2>
        <button onClick={onClose} className="text-sm">Close</button>
      </div>

      <div className="p-3 overflow-y-auto h-[calc(100%-60px)] space-y-3">
        {highlights.length === 0 && <p className="text-sm text-neutral-500">Belum ada highlight</p>}

        {highlights.map(h => (
          <div key={h.id} className="p-2 border rounded bg-neutral-50 dark:bg-neutral-800">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-neutral-500 mb-1">#{h.id} • {new Date(h.created_at).toLocaleString()}</p>
                <p className="text-sm mb-1 line-clamp-3">{h.text}</p>
                {h.note && <p className="text-sm italic text-neutral-500">“{h.note}”</p>}
              </div>

              <div className="ml-2 flex flex-col gap-1">
                <button
                  onClick={() => onJump(h.cfi_range)}
                  className="px-2 py-1 text-xs border rounded"
                >
                  Go
                </button>
                <button
                  onClick={() => onDelete(h.id)}
                  className="px-2 py-1 text-xs border rounded text-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
