'use client';

import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const popularTags = ['ocean', 'coasters', 'floral', 'tray', 'green', 'earrings'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Mock search delay
    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl min-h-[70vh]">
      <form onSubmit={handleSearch} className="mb-12 relative max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for pieces, colors, or vibes..."
          className="w-full bg-paper-deep border-b-4 border-ink text-2xl md:text-4xl font-fraunces text-ink py-4 pl-14 pr-4 placeholder:text-ink/30 focus:outline-none focus:border-teal bg-transparent rounded-none"
          autoFocus
        />
        <svg className="absolute left-2 top-6 w-8 h-8 text-ink/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </form>

      {!query && (
        <div className="text-center">
          <p className="font-sans text-ink/60 mb-4">Popular right now</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map(tag => (
              <button 
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-2 bg-paper border-2 border-ink rounded-full font-sans text-ink hover:bg-paper-deep hover:-translate-y-1 hover:shadow-[2px_2px_0px_#2B1B3D] transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && !isSearching && (
        <div className="text-center py-20 bg-paper-deep rounded-[24px] border-2 border-ink border-dashed">
          <h2 className="font-fraunces text-2xl text-ink mb-4">
            We couldn’t find anything for "{query}"
          </h2>
          <p className="font-sans text-ink mb-8">
            Want something custom? Tell us your idea.
          </p>
          <a href="/contact" className="inline-block bg-teal text-paper px-8 py-3 rounded-full font-bold border-2 border-ink shadow-[4px_4px_0px_#2B1B3D] hover:translate-y-1 hover:shadow-[2px_2px_0px_#2B1B3D] transition-all">
            Request Custom Order
          </a>
        </div>
      )}
      
      {isSearching && (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-ink border-t-teal rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
