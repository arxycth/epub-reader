import React from 'react';

export default function SearchPanel({ isOpen, onClose, results, onSearch, onSelect }) {
  const [query, setQuery] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    console.log(query)
    onSearch(query);
  };

  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-72 bg-white dark:bg-neutral-900 shadow-xl
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Search</h2>
        <button onClick={onClose} className="text-sm">Close</button>
      </div>

      <form onSubmit={submit} className="p-4 border-b">
        <input
          type="text"
          placeholder="Search text..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded border"
        />
        <button className="mt-2 w-full p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-140px)]">
        {results.length === 0 && <p className="text-sm text-neutral-500">No results</p>}

        {results.map((res, idx) => (
          <button
            key={idx}
            className="w-full text-left p-2 bg-neutral-100 dark:bg-neutral-800 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
            onClick={() => onSelect(res.cfi)}
          >
            <p className="text-xs text-neutral-500 mb-1">{res.chapter}</p>
            <p className="text-sm line-clamp-2">{res.excerpt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
