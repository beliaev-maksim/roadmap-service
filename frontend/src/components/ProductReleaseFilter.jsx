import React from 'react';
export default function ProductReleaseFilter({ products, releases, selectedProduct, selectedRelease, onProductChange, onReleaseChange }) {
  return (
    <div>
      <label>Product: </label>
      <select value={selectedProduct || ''} onChange={e => onProductChange(e.target.value)}>
        <option value=''>All</option>
        {products.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <label>Release: </label>
      <select value={selectedRelease || ''} onChange={e => onReleaseChange(e.target.value)}>
        <option value=''>All</option>
        {releases.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
    </div>
  );
}
