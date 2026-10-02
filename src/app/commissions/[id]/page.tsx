'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sampleCommissions, Commission } from '@/data/commissions';
import { ResinArt } from '@/components/art/ResinArt';
import { formatPrice } from '@/lib/utils';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  Check,
} from 'lucide-react';

export default function CommissionTrackerPage({ params }: { params: { id: string } }) {
  // Try finding in sample data, or create a mock live object
  const existing = sampleCommissions.find((c) => c.id === params.id);
  const [commission, setCommission] = useState<Commission>(
    existing || {
      id: params.id,
      customerName: 'Art Enthusiast',
      customerEmail: 'customer@example.com',
      type: 'Custom Studio Pour',
      details: {
        size: 'A3 (30 × 42 cm)',
        colours: ['Teal Lagoon', 'Gold Leaf Veins', 'Pure White'],
        wordsOrNames: 'Custom Keepsake',
      },
      neededByDate: '2026-11-20',
      budgetRange: '₹6,000 – ₹10,000',
      status: 'QUOTED',
      quoteAmountPaise: 749900, // ₹7,499
      depositPaid: false,
      balancePaid: false,
      messages: [
        {
          id: 'msg_init',
          sender: 'maker',
          text: 'Hi there! We reviewed your custom pour specifications. We can definitely create this with high-clarity casting resin, teal mica ribbons, and genuine gold leaf. We have submitted your official quote below!',
          createdAt: new Date().toISOString(),
        },
      ],
      milestones: [
        {
          id: 'ms_1',
          title: 'Color Mixing & Base Casting',
          description: 'Pigments tested and first resin layer poured.',
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [newMessage, setNewMessage] = useState('');
  const [paymentSuccessNotice, setPaymentSuccessNotice] = useState<string | null>(null);

  const quoteTotal = commission.quoteAmountPaise || 749900;
  const depositAmount = Math.round(quoteTotal * 0.5);
  const balanceAmount = quoteTotal - depositAmount;

  const handlePayDeposit = () => {
    setCommission((prev) => ({
      ...prev,
      status: 'ACCEPTED_DEPOSIT_PAID',
      depositPaid: true,
      messages: [
        ...prev.messages,
        {
          id: `msg_${Date.now()}`,
          sender: 'maker',
          text: 'Thank you! Deposit received. Your studio slot is officially reserved. We are beginning mold preparation and pigment blending!',
          createdAt: new Date().toISOString(),
        },
      ],
    }));
    setPaymentSuccessNotice('50% Deposit Paid Successfully! Studio work initiated.');
    setTimeout(() => setPaymentSuccessNotice(null), 4000);
  };

  const handlePayBalance = () => {
    setCommission((prev) => ({
      ...prev,
      status: 'BALANCE_PAID',
      balancePaid: true,
      messages: [
        ...prev.messages,
        {
          id: `msg_${Date.now()}`,
          sender: 'maker',
          text: 'Balance received! Your piece is now headed for final packaging and padded dispatch.',
          createdAt: new Date().toISOString(),
        },
      ],
    }));
    setPaymentSuccessNotice('Balance Paid! Your artwork is being packaged with love.');
    setTimeout(() => setPaymentSuccessNotice(null), 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      id: `msg_${Date.now()}`,
      sender: 'customer' as const,
      text: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    setCommission((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
    }));
    setNewMessage('');

    // Simulate maker quick reply
    setTimeout(() => {
      setCommission((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: `msg_reply_${Date.now()}`,
            sender: 'maker',
            text: 'Got your message! We will make sure to keep this in mind during the next pour phase. 🎨',
            createdAt: new Date().toISOString(),
          },
        ],
      }));
    }, 1500);
  };

  const stepsList = [
    { key: 'SUBMITTED', label: 'Request Submitted' },
    { key: 'QUOTED', label: 'Quote Prepared' },
    { key: 'ACCEPTED_DEPOSIT_PAID', label: 'Deposit Paid' },
    { key: 'IN_PROGRESS', label: 'In Studio Pour' },
    { key: 'PREVIEW_SENT', label: 'Preview Approved' },
    { key: 'BALANCE_PAID', label: 'Balance Paid' },
    { key: 'SHIPPED', label: 'Dispatched' },
  ];

  const currentStepIndex = stepsList.findIndex((s) => s.key === commission.status) !== -1
    ? stepsList.findIndex((s) => s.key === commission.status)
    : 1;

  return (
    <div className="bg-paper min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Top bar info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label text-xs uppercase font-bold text-ink/60">
                Custom Commission Tracker
              </span>
              <span className="px-2 py-0.5 rounded-full border border-ink bg-orchid/20 text-ink font-label text-xs font-bold">
                {commission.status.replace(/_/g, ' ')}
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink">
              {commission.id}
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <span className="font-label text-xs text-ink/60 block">Craft Type</span>
            <span className="font-display font-bold text-lg text-ink">{commission.type}</span>
          </div>
        </div>

        {paymentSuccessNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-mint border-2 border-ink text-ink font-bold text-sm flex items-center gap-2 sticker-shadow animate-in fade-in">
            <Check className="w-5 h-5" />
            <span>{paymentSuccessNotice}</span>
          </div>
        )}

        {/* Status Pipeline Timeline */}
        <div className="bg-paper-deep border-2 border-ink rounded-3xl p-6 md:p-8 mb-10 sticker-shadow">
          <h2 className="font-display font-bold text-xl text-ink mb-6">
            Production Progress
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {stepsList.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={step.key}
                  className={`p-3 rounded-xl border-2 flex flex-col justify-between text-xs transition-all ${
                    isCurrent
                      ? 'border-ink bg-marigold text-ink shadow-xs font-bold scale-102'
                      : isPast
                      ? 'border-teal bg-teal/15 text-ink'
                      : 'border-ink/20 bg-paper/60 text-ink/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label font-bold text-[10px]">{`0${idx + 1}`}</span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-teal" />}
                    {isCurrent && <Clock className="w-3.5 h-3.5 text-ink animate-pulse" />}
                  </div>
                  <span className="font-body leading-tight">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main 2-column layout: Left details & quotes, Right conversation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Quote & Milestones */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Quote Box */}
            <div className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow">
              <div className="flex items-center justify-between border-b border-ink/15 pb-4 mb-4">
                <div>
                  <span className="font-label text-xs uppercase font-bold text-teal block">
                    Official Studio Quote
                  </span>
                  <h3 className="font-display font-bold text-2xl text-ink">
                    Total: {formatPrice(quoteTotal)}
                  </h3>
                </div>
                <div className="text-right text-xs font-body text-ink/75">
                  <span>Target Date: {commission.neededByDate || 'Flexible'}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm font-body mb-6">
                <div className="flex justify-between text-ink/80">
                  <span>50% Studio Reservation Deposit</span>
                  <span className="font-bold text-ink">{formatPrice(depositAmount)}</span>
                </div>
                <div className="flex justify-between text-ink/80">
                  <span>50% Completion Balance</span>
                  <span className="font-bold text-ink">{formatPrice(balanceAmount)}</span>
                </div>
                <div className="text-xs text-ink/60 bg-paper-deep p-3 rounded-xl border border-ink/10">
                  <p>
                    <strong>Note:</strong> Deposit covers custom materials, pigment blends, and initial pours. It is non-refundable once casting begins.
                  </p>
                </div>
              </div>

              {/* Deposit Payment Action */}
              {!commission.depositPaid ? (
                <div className="space-y-3">
                  <button
                    onClick={handlePayDeposit}
                    className="w-full py-3.5 px-6 rounded-2xl border-2 border-ink bg-marigold text-ink font-bold text-base sticker-shadow hover:bg-marigold/90 flex items-center justify-center gap-2 active:translate-y-0.5 active:translate-x-0.5"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Pay 50% Deposit ({formatPrice(depositAmount)})</span>
                  </button>
                  <p className="text-[11px] font-label text-ink/60 text-center">
                    Simulates test payment gateway • Instantly approves project
                  </p>
                </div>
              ) : !commission.balancePaid ? (
                <div className="space-y-3">
                  <div className="p-3 bg-mint/20 border border-mint rounded-xl text-xs text-ink font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal" />
                    <span>Deposit paid! Studio work in progress.</span>
                  </div>
                  <button
                    onClick={handlePayBalance}
                    className="w-full py-3 px-6 rounded-2xl border-2 border-ink bg-teal text-paper font-bold text-sm sticker-shadow hover:bg-teal/90 flex items-center justify-center gap-2"
                  >
                    <span>Pay Completion Balance ({formatPrice(balanceAmount)})</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-mint/30 border-2 border-ink rounded-2xl text-center font-display font-bold text-ink">
                  🎉 All payments complete! Preparing dispatch.
                </div>
              )}
            </div>

            {/* Studio Milestones */}
            <div className="bg-paper border-2 border-ink rounded-3xl p-6 md:p-8 sticker-shadow">
              <h3 className="font-display font-bold text-xl text-ink mb-4">
                Studio Milestones & Photos
              </h3>

              <div className="space-y-4">
                {commission.milestones.map((ms) => (
                  <div
                    key={ms.id}
                    className="p-4 rounded-2xl border-2 border-ink bg-paper-deep/40 flex flex-col sm:flex-row gap-4 items-start"
                  >
                    {ms.imageSeed && (
                      <div className="w-24 h-24 rounded-xl border-2 border-ink bg-paper shrink-0 overflow-hidden flex items-center justify-center p-1">
                        <ResinArt
                          seed={ms.imageSeed}
                          palette={ms.palette || ['#12A8A0', '#FFB627']}
                          variant="flower-in-resin"
                          size={88}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-display font-bold text-base text-ink">{ms.title}</h4>
                        <span className="text-[10px] font-label uppercase px-2 py-0.5 rounded-full border border-ink bg-paper font-bold">
                          {ms.status}
                        </span>
                      </div>
                      <p className="font-body text-xs text-ink/75 leading-relaxed">
                        {ms.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Studio Chat */}
          <div className="lg:col-span-5">
            <div className="bg-paper border-2 border-ink rounded-3xl p-6 flex flex-col h-[640px] sticker-shadow">
              <div className="flex items-center gap-2 pb-4 border-b border-ink/15 mb-4">
                <MessageCircle className="w-5 h-5 text-teal" />
                <h3 className="font-display font-bold text-lg text-ink">Studio Chat</h3>
              </div>

              {/* Messages feed */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {commission.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'customer' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl border-2 border-ink text-xs font-body leading-relaxed ${
                        m.sender === 'customer'
                          ? 'bg-marigold text-ink rounded-tr-xs'
                          : 'bg-paper-deep text-ink rounded-tl-xs'
                      }`}
                    >
                      <p>{m.text}</p>
                    </div>
                    <span className="text-[10px] font-label text-ink/40 mt-1 px-1">
                      {m.sender === 'customer' ? 'You' : 'The Studio Maker'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="pt-4 border-t border-ink/15 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question or suggest tweaks..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-ink/30 bg-paper text-ink font-body text-xs focus:outline-teal"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl border-2 border-ink bg-teal text-paper hover:bg-teal/90 active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
