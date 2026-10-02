import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <div className="mb-8 text-coral animate-bounce">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 10, 10 30, 20 60 C30 90, 70 90, 80 60 C90 30, 70 10, 50 10 Z" />
          <circle cx="50" cy="50" r="20" fill="#FFF6E5" />
          <path d="M50 90 Q 60 110, 45 120" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M40 90 Q 30 105, 35 115" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
      </div>
      
      <h1 className="font-fraunces text-5xl md:text-7xl text-ink mb-6">This page dried up.</h1>
      <p className="font-sans text-xl text-ink/70 mb-12 max-w-md">
        Looks like the link you followed is broken, or the piece has been moved. 
      </p>

      <div className="w-full max-w-md relative mb-12">
        <input 
          type="text" 
          placeholder="Search for something else..." 
          className="w-full bg-paper border-2 border-ink rounded-full px-6 py-4 font-sans text-ink focus:outline-none focus:ring-2 focus:ring-teal pl-12 shadow-[4px_4px_0px_#2B1B3D]"
        />
        <svg className="absolute left-4 top-4 w-6 h-6 text-ink/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex gap-4 font-sans">
        <Link href="/shop" className="text-teal font-bold underline hover:text-ink">Shop All</Link>
        <span className="text-ink/30">•</span>
        <Link href="/contact" className="text-coral font-bold underline hover:text-ink">Contact Us</Link>
      </div>
    </div>
  );
}
