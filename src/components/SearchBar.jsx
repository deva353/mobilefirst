import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar">
      <Search
        size={17}
        className="search-bar__icon"
        aria-hidden="true"
      />
      <input
        type="search"
        className="search-bar__input"
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search tasks by title"
      />
      {searchQuery && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onSearchChange('')}
          aria-label="Clear search query"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}