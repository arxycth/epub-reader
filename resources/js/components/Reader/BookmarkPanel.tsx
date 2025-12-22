import React from "react";

interface Bookmark {
  id: number;
  cfi: string;
  label: string;
  created_at?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onJump: (cfi: string) => void;
  onDelete: (id: number) => void;
}

export default function BookmarkPanel({
  isOpen,
  onClose,
  bookmarks,
  onJump,
  onDelete,
}: Props) {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-72 bg-white dark:bg-neutral-900 shadow-xl
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">⭐ Bookmarks</h2>
        <button onClick={onClose} className="text-sm">
          Close
        </button>
      </div>

      <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-64px)]">
        {bookmarks.length === 0 && (
          <p className="text-sm text-neutral-500">No bookmarks</p>
        )}

        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="flex items-start gap-2 p-2 rounded bg-neutral-100 dark:bg-neutral-800"
          >
            <button
              className="flex-1 text-left"
              onClick={() => onJump(b.cfi)}
            >
              <p className="text-sm font-medium line-clamp-1">
                {b.label}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {b.cfi}
              </p>
            </button>

            <button
              onClick={() => onDelete(b.id)}
              className="text-red-500 text-xs hover:underline"
              title="Delete bookmark"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
