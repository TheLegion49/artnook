import Link from 'next/link';

export const metadata = {
  title: 'About The Maker | The ArtNook',
  description: 'The story behind the resin and the maker.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      {/* Intro */}
      <div className="text-center mb-24">
        <h1 className="font-fraunces text-5xl md:text-7xl text-ink mb-8 relative inline-block">
          The Maker's Story
          <svg className="absolute -bottom-6 right-0 w-32 text-coral" viewBox="0 0 200 20" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
             <path d="M5 15C50 5 150 5 195 15" />
          </svg>
        </h1>
        <div className="font-sans text-xl text-ink/80 leading-relaxed text-left space-y-6 mt-16 max-w-2xl mx-auto">
          <p>
            It started with a YouTube video and too much free time during lockdown. I mixed my first batch of resin on the kitchen table (sorry, mom) and was instantly mesmerized by how it moved, blended, and eventually froze time.
          </p>
          <p>
            What was meant to be a weekend hobby quickly took over my dining room, then a spare bedroom, and finally evolved into The ArtNook—a dedicated studio space where I get to create tiny, functional pieces of magic every day.
          </p>
          <p>
            Every piece you see here was poured by me. There are no factories, no assembly lines. Just me, some high-grade epoxy, a ton of pigment, and usually a true crime podcast playing in the background.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-32">
        <h2 className="font-fraunces text-4xl text-center text-ink mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-paper-deep p-8 rounded-[24px] border-2 border-ink text-center transform rotate-1 hover:rotate-0 transition-transform">
            <div className="w-16 h-16 mx-auto bg-marigold rounded-full border-2 border-ink flex items-center justify-center mb-6">
              <span className="text-2xl">🤲</span>
            </div>
            <h3 className="font-fraunces text-2xl text-ink mb-3">Small Batch</h3>
            <p className="font-sans text-ink/80">Every piece is poured by hand in extremely small batches. No mass production here.</p>
          </div>
          <div className="bg-paper p-8 rounded-[24px] border-2 border-ink text-center transform -rotate-1 hover:rotate-0 transition-transform mt-4 md:mt-0">
            <div className="w-16 h-16 mx-auto bg-mint rounded-full border-2 border-ink flex items-center justify-center mb-6">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="font-fraunces text-2xl text-ink mb-3">Thoughtful Materials</h3>
            <p className="font-sans text-ink/80">We pick what goes in carefully. Non-toxic, VOC-free resin and high-quality pigments.</p>
          </div>
          <div className="bg-paper-deep p-8 rounded-[24px] border-2 border-ink text-center transform rotate-1 hover:rotate-0 transition-transform mt-4 md:mt-0">
            <div className="w-16 h-16 mx-auto bg-coral rounded-full border-2 border-ink flex items-center justify-center mb-6">
              <span className="text-2xl">⏳</span>
            </div>
            <h3 className="font-fraunces text-2xl text-ink mb-3">Made with Care</h3>
            <p className="font-sans text-ink/80">Resin demands patience. Each piece takes 24-72 hours to cure properly before sanding.</p>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="mb-32">
        <h2 className="font-fraunces text-4xl text-center text-ink mb-12">The Pour-to-Parcel Process</h2>
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-ink">
          {[
            { title: 'The Mix', desc: 'Measuring resin and hardener perfectly. One gram off and it won\'t cure.', emoji: '🧪' },
            { title: 'The Color', desc: 'Adding micas, inks, and sometimes actual magic (glitter).', emoji: '🎨' },
            { title: 'The Pour', desc: 'Getting it into the mould and torching all the bubbles away.', emoji: '🔥' },
            { title: 'The Wait', desc: '24-48 hours of trying very hard not to poke it to see if it\'s dry.', emoji: '⏳' },
            { title: 'The Polish', desc: 'Demoulding, sanding the edges, and sometimes adding a gold leaf trim.', emoji: '✨' },
            { title: 'The Journey', desc: 'Packed safely in eco-friendly wrap and sent off to its new home.', emoji: '📦' }
          ].map((step, idx) => (
            <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-paper bg-ink text-paper font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-lg">
                {step.emoji}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border-2 border-ink bg-paper shadow-[4px_4px_0px_#2B1B3D]">
                <h3 className="font-fraunces text-xl text-ink mb-1">{step.title}</h3>
                <p className="font-sans text-ink/80 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Tour */}
      <div className="mb-32">
        <h2 className="font-fraunces text-4xl text-center text-ink mb-12">Studio Tour</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-teal/20 border-2 border-ink rounded-[24px] flex items-center justify-center relative">
            <span className="font-fraunces text-teal">Desk</span>
          </div>
          <div className="aspect-square bg-marigold/20 border-2 border-ink rounded-[24px] flex items-center justify-center relative">
            <span className="font-fraunces text-marigold">Moulds</span>
          </div>
          <div className="aspect-square bg-coral/20 border-2 border-ink rounded-[24px] flex items-center justify-center relative">
            <span className="font-fraunces text-coral">Pigment Shelf</span>
          </div>
          <div className="aspect-square bg-orchid/20 border-2 border-ink rounded-[24px] flex items-center justify-center relative">
            <span className="font-fraunces text-orchid">Curing Shelf</span>
          </div>
        </div>
      </div>

      {/* Love Wall */}
      <div>
        <h2 className="font-fraunces text-4xl text-center text-ink mb-12">Love Wall</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: "Even prettier in person. The colors shift in the sunlight beautifully.", n: "Sarah M." },
            { q: "Bought this as a gift and ended up keeping it for myself. Oops.", n: "Priya K." },
            { q: "The attention to detail is insane. The edges are perfectly smooth.", n: "Alex T." },
            { q: "Packaging was like receiving a gift from a friend.", n: "Emma W." }
          ].map((quote, i) => (
            <div key={i} className="bg-paper p-6 rounded-2xl border-2 border-ink">
              <p className="font-caveat text-2xl text-ink mb-4">"{quote.q}"</p>
              <p className="font-sans text-sm font-bold text-ink/60">— {quote.n}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
