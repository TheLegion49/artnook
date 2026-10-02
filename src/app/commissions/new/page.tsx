'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Sparkles, Upload, Info } from 'lucide-react';

const COMMISSION_TYPES = [
  { id: 'flower', label: 'Flower Preservation', icon: '🌸', desc: 'Wedding bouquets, anniversaries & memorials' },
  { id: 'namesign', label: 'Name Sign or Monogram', icon: '🔤', desc: 'Personalised letters for walls, desks or nurseries' },
  { id: 'wallart', label: 'Geode or Abstract Wall Art', icon: '🖼️', desc: 'Statement resin panels tailored to your room' },
  { id: 'coasters', label: 'Coaster or Tray Set', icon: '☕', desc: 'Custom colorways, gilded rims, matching sets' },
  { id: 'jewellery', label: 'Keepsake Jewellery', icon: '✨', desc: 'Petals, hair or ashes cast into pendants & earrings' },
  { id: 'other', label: 'Something Truly Custom', icon: '💡', desc: 'Clocks, river tables, lamps, unique molds' },
];

export default function NewCommissionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [selectedType, setSelectedType] = useState('flower');
  const [sizePreference, setSizePreference] = useState('A3 (30 × 42 cm)');
  const [selectedColours, setSelectedColours] = useState<string[]>(['Ocean Blues', 'Gold Leaf']);
  const [customColourNotes, setCustomColourNotes] = useState('');
  const [wordsToInclude, setWordsToInclude] = useState('');
  const [flowerNotes, setFlowerNotes] = useState('');
  const [neededByDate, setNeededByDate] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹6,000 – ₹10,000');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleColour = (col: string) => {
    setSelectedColours((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate random commission tracking ID
    const newId = `COM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      router.push(`/commissions/${newId}?submitted=true`);
    }, 1200);
  };

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Navigation back */}
        <Link
          href="/commissions"
          className="inline-flex items-center gap-2 text-xs font-label uppercase font-bold text-ink/60 hover:text-ink mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Commissions</span>
        </Link>

        {/* Card shell */}
        <div className="bg-paper-deep/70 border-2 border-ink rounded-3xl p-6 md:p-10 sticker-shadow">
          
          {/* Header & Step progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-label uppercase font-bold text-ink/60 mb-2">
              <span>Step {step} of 5</span>
              <span>{Math.round((step / 5) * 100)}% Complete</span>
            </div>

            {/* Drip-style progress bar */}
            <div className="w-full bg-paper border border-ink/30 rounded-full h-3 p-0.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orchid via-teal to-marigold h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* STEP 1: What are you dreaming of? */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
                    What are you dreaming of?
                  </h2>
                  <p className="font-body text-xs md:text-sm text-ink/75 mt-1">
                    Select the type of handmade resin piece you'd like us to create for you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COMMISSION_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedType(t.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        selectedType === t.id
                          ? 'border-ink bg-marigold shadow-[4px_4px_0px_#2B1B3D]'
                          : 'border-ink/30 bg-paper hover:border-ink hover:bg-paper-deep'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{t.icon}</span>
                        {selectedType === t.id && (
                          <span className="w-5 h-5 rounded-full bg-ink text-paper flex items-center justify-center text-xs">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-base text-ink mb-1">{t.label}</h3>
                      <p className="font-body text-xs text-ink/75 leading-relaxed">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Details & Palette */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
                    Let's talk details
                  </h2>
                  <p className="font-body text-xs md:text-sm text-ink/75 mt-1">
                    Dimensions, hues, names or the flowers you want preserved.
                  </p>
                </div>

                {/* Size Preference */}
                <div>
                  <label className="block text-xs font-label uppercase font-bold text-ink mb-2">
                    Size / Approximate Dimensions
                  </label>
                  <input
                    type="text"
                    value={sizePreference}
                    onChange={(e) => setSizePreference(e.target.value)}
                    placeholder="E.g. A4 frame, 12-inch coaster set, 30x40cm canvas..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-body text-sm focus:outline-teal"
                  />
                </div>

                {/* Palette Pickers */}
                <div>
                  <label className="block text-xs font-label uppercase font-bold text-ink mb-2">
                    Colour Palette Preferences (Pick one or more)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      'Ocean Blues',
                      'Sunset Coral & Pink',
                      'Deep Geode Purple',
                      'Eucalyptus & Forest',
                      'Gold Leaf Veins',
                      'Crystal Clear Dome',
                      'Smoky Charcoal & Silver',
                    ].map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => toggleColour(col)}
                        className={`px-3 py-1.5 rounded-full border-2 text-xs font-body font-bold transition-all ${
                          selectedColours.includes(col)
                            ? 'border-ink bg-teal text-paper shadow-xs'
                            : 'border-ink/30 bg-paper text-ink hover:border-ink'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={customColourNotes}
                    onChange={(e) => setCustomColourNotes(e.target.value)}
                    placeholder="Any specific hex or tone? E.g. match our living room sage sofa..."
                    className="w-full px-4 py-2 rounded-xl border border-ink/30 bg-paper text-ink font-body text-xs focus:outline-teal"
                  />
                </div>

                {/* Words or Inscriptions */}
                <div>
                  <label className="block text-xs font-label uppercase font-bold text-ink mb-2">
                    Words, Dates or Names to Embed (Optional)
                  </label>
                  <input
                    type="text"
                    value={wordsToInclude}
                    onChange={(e) => setWordsToInclude(e.target.value)}
                    placeholder="E.g. Priya & Arjun • 24.11.2026 or Baby Liam"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-body text-sm focus:outline-teal"
                  />
                </div>

                {/* Specifics for flower preservation */}
                {selectedType === 'flower' && (
                  <div className="p-4 rounded-2xl bg-rose/20 border border-ink/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-label uppercase font-bold text-coral">
                      <Info className="w-4 h-4" />
                      <span>About your flowers</span>
                    </div>
                    <textarea
                      rows={2}
                      value={flowerNotes}
                      onChange={(e) => setFlowerNotes(e.target.value)}
                      placeholder="What kind of flowers? (e.g. Red roses, hydrangeas). Are they fresh, or already dried?"
                      className="w-full px-3 py-2 rounded-xl border border-ink/30 bg-paper text-ink font-body text-xs focus:outline-teal"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Timeline & Needed By Date */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
                    When do you need this by?
                  </h2>
                  <p className="font-body text-xs md:text-sm text-ink/75 mt-1">
                    Resin art is a slow craft. Layers take 24–72 hours to cure properly.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-mint/25 border-2 border-ink space-y-2">
                  <div className="flex items-center gap-2 font-display font-bold text-sm text-ink">
                    <Sparkles className="w-4 h-4 text-teal" />
                    <span>Typical Studio Turnaround: 2 to 4 weeks</span>
                  </div>
                  <p className="font-body text-xs text-ink/80 leading-relaxed">
                    Flower preservation projects take approximately 3–4 weeks to account for thorough silica drying so petals never brown inside the resin.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-label uppercase font-bold text-ink mb-2">
                    Target Delivery Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={neededByDate}
                    onChange={(e) => setNeededByDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-body text-sm focus:outline-teal"
                  />
                  <p className="text-[11px] font-hand text-ink/70 mt-1">
                    If this is for an anniversary or birthday, please give us at least 3 weeks of buffer!
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4: Budget & Contact Details */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
                    Budget & Contact
                  </h2>
                  <p className="font-body text-xs md:text-sm text-ink/75 mt-1">
                    So we can prepare a quote that fits your expectations.
                  </p>
                </div>

                {/* Budget selection */}
                <div>
                  <label className="block text-xs font-label uppercase font-bold text-ink mb-2">
                    Estimated Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['Under ₹3,000', '₹3,000 – ₹6,000', '₹6,000 – ₹10,000', 'Not sure / Guide me'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudgetRange(b)}
                        className={`p-3 rounded-xl border-2 text-xs font-body font-bold text-center transition-all ${
                          budgetRange === b
                            ? 'border-ink bg-marigold shadow-xs text-ink'
                            : 'border-ink/30 bg-paper text-ink hover:border-ink'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-ink mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Priya Nair"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-body text-sm focus:outline-teal"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-label uppercase font-bold text-ink mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="priya@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-body text-sm focus:outline-teal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-label uppercase font-bold text-ink mb-1">
                        WhatsApp / Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-body text-sm focus:outline-teal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-ink mb-1">
                      Any other special requests or stories?
                    </label>
                    <textarea
                      rows={3}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="Tell us what this piece means to you, or describe any special layout you had in mind..."
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-body text-sm focus:outline-teal"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Review & Submit */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
                    Review your request
                  </h2>
                  <p className="font-body text-xs md:text-sm text-ink/75 mt-1">
                    Take a quick look before sending it over to our studio bench.
                  </p>
                </div>

                <div className="bg-paper border-2 border-ink rounded-2xl p-5 space-y-3 divide-y divide-ink/10 text-sm">
                  <div className="flex justify-between py-1.5">
                    <span className="font-label text-xs uppercase font-bold text-ink/60">Type</span>
                    <span className="font-bold text-ink capitalize">{selectedType}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-label text-xs uppercase font-bold text-ink/60">Size</span>
                    <span className="font-bold text-ink">{sizePreference || 'Standard'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-label text-xs uppercase font-bold text-ink/60">Palette</span>
                    <span className="font-bold text-ink">{selectedColours.join(', ')}</span>
                  </div>
                  {wordsToInclude && (
                    <div className="flex justify-between py-1.5">
                      <span className="font-label text-xs uppercase font-bold text-ink/60">Inscriptions</span>
                      <span className="font-bold text-ink font-hand text-base">{wordsToInclude}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5">
                    <span className="font-label text-xs uppercase font-bold text-ink/60">Target Date</span>
                    <span className="font-bold text-ink">{neededByDate || 'Flexible'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-label text-xs uppercase font-bold text-ink/60">Budget</span>
                    <span className="font-bold text-ink">{budgetRange}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-label text-xs uppercase font-bold text-ink/60">Contact</span>
                    <span className="font-bold text-ink">{customerName || 'Friend'} ({customerEmail})</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-orchid/15 border border-orchid/30 text-xs font-body text-ink space-y-1">
                  <p className="font-bold text-orchid">What happens after you submit?</p>
                  <p>
                    We review your specifications within 24–48 hours, confirm flower shipping guidelines if applicable, and prepare a personalized quote and timeline on your private commission tracking page.
                  </p>
                </div>
              </div>
            )}

            {/* Step navigation buttons */}
            <div className="pt-8 border-t border-ink/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="px-5 py-2.5 rounded-xl border-2 border-ink bg-paper text-ink font-bold text-sm hover:bg-paper-deep transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 4 && (!customerName || !customerEmail)) {
                      alert('Please provide your name and email so we can reach you!');
                      return;
                    }
                    setStep((s) => s + 1);
                  }}
                  className="px-6 py-2.5 rounded-xl border-2 border-ink bg-marigold text-ink font-bold text-sm sticker-shadow hover:bg-marigold/90 flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-2xl border-2 border-ink bg-marigold text-ink font-bold text-base sticker-shadow hover:bg-marigold/90 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending to studio...</span>
                  ) : (
                    <>
                      <span>Send to the Studio</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
