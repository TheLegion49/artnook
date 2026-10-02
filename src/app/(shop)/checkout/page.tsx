'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '', phone: '',
    name: '', address: '', city: '', state: '', pincode: '',
    payment: 'cod'
  });

  const handleNext = () => setStep(s => s + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    setTimeout(() => {
      router.push('/order/AN-2026-89421');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="font-fraunces text-4xl text-ink mb-12">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Forms */}
        <div className="flex-1 space-y-6">
          {/* Step 1: Contact */}
          <div className={`border-2 border-ink rounded-[24px] overflow-hidden ${step === 1 ? 'bg-paper shadow-[8px_8px_0px_#2B1B3D]' : 'bg-transparent'}`}>
            <div className="p-6 bg-paper-deep border-b-2 border-ink flex justify-between items-center cursor-pointer" onClick={() => setStep(1)}>
              <h2 className="font-fraunces text-2xl text-ink flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-sm font-sans">1</span>
                Contact
              </h2>
              {step > 1 && <span className="font-sans text-teal font-bold">Edit</span>}
            </div>
            {step === 1 && (
              <div className="p-6 space-y-4 bg-paper">
                <div>
                  <label className="block font-sans font-bold text-ink mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-2 border-ink rounded-xl px-4 py-3 font-sans focus:ring-2 focus:ring-teal" />
                </div>
                <div>
                  <label className="block font-sans font-bold text-ink mb-2">Phone</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border-2 border-ink rounded-xl px-4 py-3 font-sans focus:ring-2 focus:ring-teal" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-teal w-5 h-5" />
                  <span className="font-sans text-ink">Keep me updated on news and exclusive offers</span>
                </label>
                <button onClick={handleNext} className="mt-6 px-8 py-3 bg-ink text-paper rounded-full font-bold">Continue to Delivery</button>
              </div>
            )}
          </div>

          {/* Step 2: Delivery */}
          <div className={`border-2 border-ink rounded-[24px] overflow-hidden ${step === 2 ? 'bg-paper shadow-[8px_8px_0px_#2B1B3D]' : 'bg-transparent'}`}>
            <div className="p-6 bg-paper-deep border-b-2 border-ink flex justify-between items-center cursor-pointer" onClick={() => step > 2 ? setStep(2) : null}>
              <h2 className="font-fraunces text-2xl text-ink flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans ${step >= 2 ? 'bg-ink text-paper' : 'bg-ink/20 text-ink/50'}`}>2</span>
                Delivery
              </h2>
              {step > 2 && <span className="font-sans text-teal font-bold">Edit</span>}
            </div>
            {step === 2 && (
              <div className="p-6 space-y-4 bg-paper">
                <div>
                  <label className="block font-sans font-bold text-ink mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-2 border-ink rounded-xl px-4 py-3 font-sans focus:ring-2 focus:ring-teal" />
                </div>
                <div>
                  <label className="block font-sans font-bold text-ink mb-2">Address</label>
                  <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-transparent border-2 border-ink rounded-xl px-4 py-3 font-sans focus:ring-2 focus:ring-teal" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans font-bold text-ink mb-2">City</label>
                    <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-transparent border-2 border-ink rounded-xl px-4 py-3 font-sans focus:ring-2 focus:ring-teal" />
                  </div>
                  <div>
                    <label className="block font-sans font-bold text-ink mb-2">State</label>
                    <input type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-transparent border-2 border-ink rounded-xl px-4 py-3 font-sans focus:ring-2 focus:ring-teal" />
                  </div>
                </div>
                <div>
                  <label className="block font-sans font-bold text-ink mb-2">Pincode</label>
                  <input type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-transparent border-2 border-ink rounded-xl px-4 py-3 font-sans focus:ring-2 focus:ring-teal" />
                </div>
                <button onClick={handleNext} className="mt-6 px-8 py-3 bg-ink text-paper rounded-full font-bold">Continue to Payment</button>
              </div>
            )}
          </div>

          {/* Step 3: Payment */}
          <div className={`border-2 border-ink rounded-[24px] overflow-hidden ${step === 3 ? 'bg-paper shadow-[8px_8px_0px_#2B1B3D]' : 'bg-transparent'}`}>
            <div className="p-6 bg-paper-deep border-b-2 border-ink flex justify-between items-center">
              <h2 className="font-fraunces text-2xl text-ink flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans ${step >= 3 ? 'bg-ink text-paper' : 'bg-ink/20 text-ink/50'}`}>3</span>
                Payment
              </h2>
            </div>
            {step === 3 && (
              <div className="p-6 bg-paper">
                <div className="bg-coral/10 border-2 border-coral rounded-xl p-4 mb-6">
                  <p className="font-sans text-coral font-bold text-sm">TEST MODE: No real payments will be processed.</p>
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border-2 border-ink rounded-xl cursor-pointer hover:bg-paper-deep">
                    <input type="radio" name="payment" value="upi" checked={formData.payment === 'upi'} onChange={e => setFormData({...formData, payment: e.target.value})} className="accent-teal w-5 h-5" />
                    <span className="font-sans font-bold text-ink">UPI (GPay, PhonePe, Paytm)</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-ink rounded-xl cursor-pointer hover:bg-paper-deep">
                    <input type="radio" name="payment" value="card" checked={formData.payment === 'card'} onChange={e => setFormData({...formData, payment: e.target.value})} className="accent-teal w-5 h-5" />
                    <span className="font-sans font-bold text-ink">Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-ink rounded-xl cursor-pointer hover:bg-paper-deep">
                    <input type="radio" name="payment" value="cod" checked={formData.payment === 'cod'} onChange={e => setFormData({...formData, payment: e.target.value})} className="accent-teal w-5 h-5" />
                    <span className="font-sans font-bold text-ink">Cash on Delivery</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-paper-deep p-6 rounded-[24px] border-2 border-ink sticky top-24">
            <h2 className="font-fraunces text-2xl text-ink mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-teal/20 border-2 border-ink rounded-lg relative">
                  <span className="absolute -top-2 -right-2 bg-ink text-paper w-5 h-5 rounded-full flex items-center justify-center text-xs">1</span>
                </div>
                <div>
                  <p className="font-sans font-bold text-ink text-sm">Ocean Wave Coaster</p>
                  <p className="font-mono text-ink/70 text-sm">₹850</p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-ink pt-4 space-y-2 font-sans text-sm text-ink mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">₹850</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono">₹100</span>
              </div>
            </div>
            
            <div className="border-t-2 border-ink pt-4 mb-8 flex justify-between items-end">
              <span className="font-fraunces text-xl text-ink">Total</span>
              <span className="font-mono text-2xl font-bold text-ink">₹950</span>
            </div>

            {step === 3 && (
              <button onClick={handleSubmit} className="w-full py-4 bg-coral text-paper rounded-full font-bold text-lg border-2 border-ink shadow-[4px_4px_0px_#2B1B3D] hover:translate-y-1 hover:shadow-[2px_2px_0px_#2B1B3D] transition-all">
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
