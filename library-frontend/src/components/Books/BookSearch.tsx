import React, { useState } from "react";

export default function BookSearch({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [q, setQ] = useState("");
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search books..."
      />
      <button onClick={() => onSearch(q)}>Search</button>
    </div>
  );
}
