import Link from 'next/link';

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <div className="text-center mb-16">
        <span className="text-6xl mb-6 block">🎉</span>
        <h1 className="font-fraunces text-4xl md:text-5xl text-ink mb-4">Yay! We’re pouring love into your order.</h1>
        <p className="font-sans text-xl text-ink/80">Order <span className="font-bold">{params.id}</span> is confirmed.</p>
        <p className="font-sans text-ink/60 mt-2">We've sent a confirmation email to jane@example.com</p>
      </div>

      {/* Timeline */}
      <div className="bg-paper p-8 md:p-12 rounded-[32px] border-2 border-ink shadow-[8px_8px_0px_#2B1B3D] mb-12">
        <h2 className="font-fraunces text-2xl text-ink mb-8">What happens next?</h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.35rem] before:h-full before:w-1 before:bg-ink/20">
          <div className="relative flex items-start gap-6 is-active">
            <div className="w-12 h-12 bg-teal rounded-full border-4 border-paper flex items-center justify-center shrink-0 z-10 text-paper shadow-sm">
              ✓
            </div>
            <div className="pt-2">
              <h3 className="font-sans font-bold text-ink text-lg">Order received</h3>
              <p className="font-sans text-ink/70">Oct 2, 2026</p>
            </div>
          </div>
          
          <div className="relative flex items-start gap-6">
            <div className="w-12 h-12 bg-paper rounded-full border-4 border-ink flex items-center justify-center shrink-0 z-10 text-ink text-xl">
              ⏳
            </div>
            <div className="pt-2">
              <h3 className="font-sans font-bold text-ink text-lg">Poured and curing</h3>
              <p className="font-sans text-ink/70">Usually takes 24-48 hours</p>
            </div>
          </div>

          <div className="relative flex items-start gap-6">
            <div className="w-12 h-12 bg-paper rounded-full border-4 border-ink flex items-center justify-center shrink-0 z-10 text-ink text-xl">
              ✨
            </div>
            <div className="pt-2">
              <h3 className="font-sans font-bold text-ink text-lg">Sanding and polishing</h3>
              <p className="font-sans text-ink/70">Making it perfectly smooth</p>
            </div>
          </div>

          <div className="relative flex items-start gap-6">
            <div className="w-12 h-12 bg-paper rounded-full border-4 border-ink flex items-center justify-center shrink-0 z-10 text-ink text-xl">
              📦
            </div>
            <div className="pt-2">
              <h3 className="font-sans font-bold text-ink text-lg">Packed with love</h3>
              <p className="font-sans text-ink/70">And dispatched</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-4 bg-paper text-ink border-2 border-ink rounded-full font-bold hover:bg-paper-deep transition-colors">
          Track Order
        </button>
        <Link href="/shop" className="px-8 py-4 bg-ink text-paper rounded-full font-bold hover:bg-ink/90 transition-colors text-center">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
