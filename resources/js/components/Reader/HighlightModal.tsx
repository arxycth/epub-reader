import React from "react";

interface HighlightModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { note: string; color: string }) => void;
  selectedText: string;
}

export default function HighlightModal({
  open,
  onClose,
  onSave,
  selectedText,
}: HighlightModalProps) {
  const [note, setNote] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("yellow");

  React.useEffect(() => {
    if (!open) {
      setNote("");
      setColor("yellow");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-70 w-full max-w-lg bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Simpan Highlight</h3>

        <div className="mb-2">
          <label className="text-sm text-neutral-600 block mb-1">Teks</label>
          <div className="p-2 border rounded bg-neutral-50 dark:bg-neutral-800 text-sm">
            {selectedText}
          </div>
        </div>

        <div className="mb-2">
          <label className="text-sm text-neutral-600 block mb-1">
            Catatan (opsional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border rounded h-24 bg-white dark:bg-neutral-900"
            placeholder="Tambahkan catatan untuk highlight..."
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm mr-2">Warna Kuning</label>
            <input type="text" hidden value='yellow'/>
            {/* <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="p-1 border rounded"
            >
              <option value="yellow">Kuning</option>
              <option value="green">Hijau</option>
              <option value="pink">Pink</option>
              <option value="blue">Biru</option>
            </select> */}
          </div>

          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1 rounded border">
              Batal
            </button>
            <button
              onClick={() => onSave({ note, color })}
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
