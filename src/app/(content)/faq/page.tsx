'use client';

import { useState } from 'react';

const faqData = [
  {
    category: 'Orders',
    questions: [
      { q: 'Can I change my order after placing it?', a: 'Because we try to process orders quickly, we only allow changes within 2 hours of placing the order. Please email us ASAP with your order number.' },
      { q: 'Do you restock sold out items?', a: 'Some items are part of our core collection and will be restocked. Unique pieces (marked "One of a kind") cannot be exactly replicated, but we may make similar pieces in the future.' }
    ]
  },
  {
    category: 'Shipping',
    questions: [
      { q: 'How long does shipping take?', a: 'Ready-to-ship items go out in 1-2 business days. Delivery typically takes 5-7 business days across India. Made-to-order items require 7-10 days to create before shipping.' },
      { q: 'Do you ship internationally?', a: 'Currently, we only ship within India. We hope to open international shipping in the future!' }
    ]
  },
  {
    category: 'Custom',
    questions: [
      { q: 'Can I request a custom piece?', a: 'Yes! We love custom orders. Head over to our Contact page and select "Custom Order" from the dropdown. Tell us your colors, vibe, and what kind of piece you want.' },
      { q: 'Do custom pieces cost more?', a: 'Custom pieces generally carry a 20% premium over our standard pieces due to the extra time spent on design and color matching.' }
    ]
  },
  {
    category: 'Care',
    questions: [
      { q: 'Is the resin food safe?', a: 'The resin we use is FDA approved for incidental food contact (like serving dry foods on a tray), but we do not recommend using it for hot foods, liquids, or as a cutting board.' },
      { q: 'How do I clean my pieces?', a: 'Wipe with a soft, damp cloth. Do not use harsh chemicals or abrasive sponges. Not dishwasher or microwave safe.' }
    ]
  }
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="font-fraunces text-5xl md:text-6xl text-ink mb-6">Frequently Asked Questions</h1>
        <p className="font-sans text-xl text-ink/80 max-w-2xl mx-auto mb-10">
          Everything you need to know about our process, shipping, and caring for your resin art.
        </p>
        
        <div className="max-w-md mx-auto relative">
          <input 
            type="text" 
            placeholder="Search questions..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-paper-deep border-2 border-ink rounded-full px-6 py-4 font-sans text-ink focus:outline-none focus:ring-2 focus:ring-teal pl-12"
          />
          <svg className="absolute left-4 top-4 w-6 h-6 text-ink/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="space-y-12">
        {faqData.map((group, idx) => {
          const filteredQs = group.questions.filter(item => 
            item.q.toLowerCase().includes(search.toLowerCase()) || 
            item.a.toLowerCase().includes(search.toLowerCase())
          );
          
          if (filteredQs.length === 0 && search) return null;

          return (
            <div key={idx} className="bg-paper border-2 border-ink rounded-[24px] p-6 md:p-10 shadow-[4px_4px_0px_#2B1B3D]">
              <h2 className="font-fraunces text-3xl text-ink mb-8 pb-4 border-b-2 border-ink/10">{group.category}</h2>
              <div className="space-y-4">
                {filteredQs.map((item, i) => (
                  <details key={i} className="group bg-paper-deep rounded-xl border-2 border-ink overflow-hidden">
                    <summary className="font-sans font-bold text-lg text-ink p-5 cursor-pointer list-none flex justify-between items-center hover:bg-ink/5 transition-colors">
                      {item.q}
                      <span className="transition group-open:rotate-45 text-2xl text-coral">+</span>
                    </summary>
                    <div className="p-5 pt-0 font-sans text-ink/80 leading-relaxed bg-paper-deep">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
