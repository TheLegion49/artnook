'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

type FilterProps = {
  categories: { id: string; name: string }[];
  colours: { id: string; name: string; hex: string }[];
  occasions: { id: string; name: string }[];
};

export default function ShopFilters({ categories, colours, occasions }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.getAll(name);
      if (current.includes(value)) {
        params.delete(name);
        current.filter((v) => v !== value).forEach((v) => params.append(name, v));
      } else {
        params.append(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push(`?${createQueryString(name, value)}`, { scroll: false });
  };

  const isChecked = (name: string, value: string) => {
    return searchParams.getAll(name).includes(value);
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-3 bg-paper-deep text-ink border-2 border-ink rounded-full font-bold shadow-[4px_4px_0px_#2B1B3D] active:shadow-[0px_0px_0px_#2B1B3D] active:translate-y-1 transition-all"
        >
          {isOpen ? 'Close Filters' : 'Filters'}
        </button>
      </div>

      <div className={`md:block ${isOpen ? 'block' : 'hidden'} space-y-8`}>
        {/* Categories */}
        <div className="space-y-4">
          <h3 className="font-fraunces text-xl text-ink">Categories</h3>
          <div className="space-y-2">
            {categories.map((c) => (
              <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border-2 border-ink flex items-center justify-center ${isChecked('category', c.id) ? 'bg-teal' : 'bg-paper group-hover:bg-paper-deep'}`}>
                  {isChecked('category', c.id) && <svg className="w-3 h-3 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked('category', c.id)}
                  onChange={() => handleFilterChange('category', c.id)}
                />
                <span className="text-ink font-sans">{c.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colours */}
        <div className="space-y-4">
          <h3 className="font-fraunces text-xl text-ink">Colours</h3>
          <div className="flex flex-wrap gap-2">
            {colours.map((c) => (
              <button
                key={c.id}
                onClick={() => handleFilterChange('colour', c.id)}
                className={`w-8 h-8 rounded-full border-2 ${isChecked('colour', c.id) ? 'border-ink shadow-[2px_2px_0px_#2B1B3D]' : 'border-transparent hover:border-ink/50'}`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
        
        {/* Occasions */}
        <div className="space-y-4">
          <h3 className="font-fraunces text-xl text-ink">Occasion</h3>
          <div className="space-y-2">
            {occasions.map((o) => (
              <label key={o.id} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border-2 border-ink flex items-center justify-center ${isChecked('occasion', o.id) ? 'bg-coral' : 'bg-paper group-hover:bg-paper-deep'}`}>
                  {isChecked('occasion', o.id) && <svg className="w-3 h-3 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked('occasion', o.id)}
                  onChange={() => handleFilterChange('occasion', o.id)}
                />
                <span className="text-ink font-sans">{o.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {Array.from(searchParams.keys()).length > 0 && (
          <button
            onClick={() => router.push('/shop', { scroll: false })}
            className="text-coral font-bold underline hover:text-ink transition-colors font-sans"
          >
            Clear all filters
          </button>
        )}
      </div>
    </>
  );
}
