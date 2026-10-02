import Link from 'next/link';

export default function JournalPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-12 border-b-2 border-ink/10 pb-12">
        <div className="flex items-center justify-center gap-4 mb-6 font-sans text-sm font-bold text-ink/60">
          <span className="bg-teal/10 text-teal px-3 py-1 rounded-full border-2 border-teal/20">
            Behind the Scenes
          </span>
          <span>•</span>
          <span>Oct 1, 2026</span>
          <span>•</span>
          <span>3 min read</span>
        </div>
        <h1 className="font-fraunces text-4xl md:text-6xl text-ink mb-6">The satisfying art of demoulding</h1>
      </div>

      {/* Content */}
      <div className="prose prose-lg prose-p:font-sans prose-headings:font-fraunces prose-a:text-coral mx-auto text-ink mb-16">
        <p>
          There is nothing quite like peeling back silicone to reveal a shiny new piece. After 24-48 hours of waiting, checking the temperature, and hoping no dust settled on the surface, the moment of truth arrives.
        </p>
        <p>
          The demoulding process is honestly the best part of the job. It's when a puddle of sticky liquid finally becomes a solid piece of art.
        </p>
        <h2>The Waiting Game</h2>
        <p>
          Patience is not my strong suit, which makes resin an ironic medium for me. The urge to poke the piece to see if it's cured is real. (Pro tip: always pour a little leftover resin into a tiny scrap mould to use as your "poke tester" so you don't ruin the main piece!)
        </p>
      </div>

      {/* Footer / Share */}
      <div className="border-t-2 border-ink pt-8 flex items-center justify-between mb-24">
        <p className="font-sans font-bold text-ink">Share this post</p>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full bg-paper border-2 border-ink flex items-center justify-center hover:bg-paper-deep transition-colors">
            X
          </button>
          <button className="w-10 h-10 rounded-full bg-paper border-2 border-ink flex items-center justify-center hover:bg-paper-deep transition-colors">
            in
          </button>
        </div>
      </div>

      {/* More */}
      <div>
        <h3 className="font-fraunces text-2xl text-ink mb-6 text-center">More from the journal</h3>
        <Link href="/journal/colour-mixing-101" className="block group">
          <div className="bg-paper p-6 rounded-[24px] border-2 border-ink transition-transform group-hover:-translate-y-2 group-hover:shadow-[4px_4px_0px_#2B1B3D]">
            <h4 className="font-fraunces text-xl text-ink mb-2">How I achieve the perfect ocean blue</h4>
            <p className="font-sans text-ink/70">It takes exactly three different pigments...</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
