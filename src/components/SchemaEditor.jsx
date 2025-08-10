import React, { useState, useEffect } from 'react';

export default function SchemaEditor({ value, onChange }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [error, setError] = useState(null);

  // Keep textarea in sync with parent schema changes
  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
  }, [value]);

  function handleApply() {
    try {
      const parsed = JSON.parse(text);
      setError(null);
      onChange(parsed); // Update parent schema
    } catch (e) {
      setError(e.message);
    }
  }

  function handleReset() {
    try {
      const raw = localStorage.getItem('dic:schema');
      if (raw) {
        const parsed = JSON.parse(raw);
        onChange(parsed);
        setText(JSON.stringify(parsed, null, 2));
        setError(null);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  function handleExport() {
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <textarea
        className="w-full h-72 p-2 border rounded text-sm font-mono"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <div className="text-red-600 mt-2">JSON error: {error}</div>}
      <div className="flex gap-2 mt-3">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded"
          onClick={handleApply}
        >
          Apply
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={handleExport}
        >
          Export JSON
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-3">
        Tip: Edit the schema JSON and press Apply.  
        Add an <code>onSubmit</code> string to form blocks to inject sandboxed logic.
      </div>
    </div>
  );
}
