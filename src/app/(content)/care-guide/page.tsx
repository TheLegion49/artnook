export const metadata = {
  title: 'Care Guide | The ArtNook',
  description: 'How to take care of your handmade resin art pieces.',
};

export default function CareGuidePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="font-fraunces text-5xl md:text-6xl text-ink mb-6">Care Guide</h1>
        <p className="font-sans text-xl text-ink/80 max-w-2xl mx-auto">
          Resin art is durable, but a little love goes a long way to keep it looking shiny and new forever.
        </p>
      </div>

      {/* General Tips */}
      <div className="bg-paper-deep border-2 border-ink rounded-[32px] p-8 md:p-12 mb-16 shadow-[8px_8px_0px_#2B1B3D]">
        <h2 className="font-fraunces text-3xl text-ink mb-8 text-center">General Rules of Thumb</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-teal text-xl mt-1">✓</span>
              <span className="font-sans text-ink"><strong>Wipe it down:</strong> Use a soft, damp microfiber cloth to clean smudges.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal text-xl mt-1">✓</span>
              <span className="font-sans text-ink"><strong>Keep it cool:</strong> Room temperature is resin's happy place.</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-coral text-xl mt-1">✗</span>
              <span className="font-sans text-ink"><strong>No harsh chemicals:</strong> Avoid alcohol, bleach, or abrasive cleaners. They dull the shine.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-coral text-xl mt-1">✗</span>
              <span className="font-sans text-ink"><strong>No direct sun:</strong> Prolonged UV exposure can cause yellowing over time (even with UV resistant resin).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Specific categories */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 bg-mint/30 rounded-full border-2 border-ink flex items-center justify-center shrink-0">
            <span className="text-4xl">☕</span>
          </div>
          <div>
            <h3 className="font-fraunces text-2xl text-ink mb-3">Coasters & Trays</h3>
            <p className="font-sans text-ink/80 mb-2">
              Our resin is heat resistant up to <span className="bg-coral/20 px-1 font-bold">[owner to confirm temp]</span>°C, making it safe for warm coffee mugs.
            </p>
            <p className="font-sans text-ink/80">
              However, extremely hot items (like a pot straight from the stove) will leave a permanent ring or indentation. Never put these in the dishwasher or microwave.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 bg-marigold/30 rounded-full border-2 border-ink flex items-center justify-center shrink-0">
            <span className="text-4xl">🖼️</span>
          </div>
          <div>
            <h3 className="font-fraunces text-2xl text-ink mb-3">Wall Art</h3>
            <p className="font-sans text-ink/80">
              Hang pieces away from direct sunlight and heat sources like radiators. Dust gently with a dry microfiber cloth or a soft duster.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 bg-orchid/30 rounded-full border-2 border-ink flex items-center justify-center shrink-0">
            <span className="text-4xl">✨</span>
          </div>
          <div>
            <h3 className="font-fraunces text-2xl text-ink mb-3">Jewellery</h3>
            <p className="font-sans text-ink/80">
              Keep away from perfumes, lotions, and hairspray as the chemicals can interact with the resin. Remove before showering or swimming. Store in a cool, dark place when not wearing.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center bg-paper p-8 rounded-2xl border-2 border-ink border-dashed">
        <p className="font-caveat text-3xl text-ink mb-2">Still have questions?</p>
        <p className="font-sans text-ink/80 mb-6">If you're unsure about how to care for a specific piece, just ask.</p>
        <a href="/contact" className="text-teal font-bold underline font-sans">Contact us</a>
      </div>
    </div>
  );
}
