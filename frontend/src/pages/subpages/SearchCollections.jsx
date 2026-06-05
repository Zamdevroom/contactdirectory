import React, { useState } from 'react';
import '../styles/SearchCollections.css';

const SearchCollections = ({ show, onClose, collections = [], onSelectCollection }) => {
  const [search, setSearch] = useState('');

  if (!show) return null;

  const filtered = collections.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content search-collections-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <h2>Search Collections</h2>
          <p className="modal-subtitle">Filter contacts by list name</p>
          <input
            type="search"
            className="search-input"
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="collections-list">
            <button
              className="collection-item collection-item-all"
              onClick={() => { onSelectCollection(''); onClose(); }}
            >
              <span>📂</span> All Contacts
            </button>
            {filtered.length === 0 ? (
              <p className="no-collections">No collections found. Add a list name to your contacts.</p>
            ) : (
              filtered.map((name) => (
                <button
                  key={name}
                  className="collection-item"
                  onClick={() => { onSelectCollection(name); onClose(); }}
                >
                  <span>📁</span> {name}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCollections;
