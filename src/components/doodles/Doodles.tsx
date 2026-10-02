'use client';

import React from 'react';
import { getRotation } from '@/lib/utils';

export function Star({ className = 'w-6 h-6', color = '#FFB627' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2.5 L14.2 8.3 C14.5 9 15.1 9.4 15.8 9.5 L21.9 9.9 L17.2 13.9 C16.7 14.3 16.5 15 16.7 15.7 L18.1 21.6 L12.8 18.2 C12.3 17.8 11.7 17.8 11.2 18.2 L5.9 21.6 L7.3 15.7 C7.5 15 7.3 14.3 6.8 13.9 L2.1 9.9 L8.2 9.5 C8.9 9.4 9.5 9 9.8 8.3 Z"
        fill={color}
        stroke="#2B1B3D"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Heart({ className = 'w-6 h-6', color = '#FF6B5E' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 20.5 C12 20.5 3 15 3 8.5 C3 5.5 5.5 3 8.5 3 C10.5 3 11.5 4 12 5 C12.5 4 13.5 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 15 12 20.5 12 20.5 Z"
        fill={color}
        stroke="#2B1B3D"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className = 'w-6 h-6', color = '#FFB627' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2 C12 7.5 16.5 12 22 12 C16.5 12 12 16.5 12 22 C12 16.5 7.5 12 2 12 C7.5 12 12 7.5 12 2 Z"
        fill={color}
        stroke="#2B1B3D"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function Squiggle({ className = 'w-16 h-4', color = '#12A8A0' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 20" className={className} fill="none" aria-hidden="true">
      <path
        d="M3 10 Q 15 2, 27 10 T 51 10 T 75 10 T 97 10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Arrow({ className = 'w-12 h-12', color = '#2B1B3D' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 50 50" className={className} fill="none" aria-hidden="true">
      <path
        d="M8 38 C 14 18, 30 14, 40 18 M 32 10 L 42 18 L 36 28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Drip({ className = 'w-6 h-10', color = '#12A8A0' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2 C 12 2 4 18 4 26 C 4 33 7.5 38 12 38 C 16.5 38 20 33 20 26 C 20 18 12 2 12 2 Z"
        fill={color}
        stroke="#2B1B3D"
        strokeWidth="1.5"
      />
      <circle cx="9" cy="24" r="2.5" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
}

export function CoffeeRing({ className = 'w-48 h-48', opacity = 0.15 }: { className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true" style={{ opacity }}>
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#8B5A2B"
        strokeWidth="5"
        strokeDasharray="40 8 15 4 60 12"
        strokeLinecap="round"
      />
      <circle
        cx="51"
        cy="49"
        r="38"
        stroke="#8B5A2B"
        strokeWidth="1.5"
        strokeDasharray="10 30 50 15"
      />
    </svg>
  );
}

export function WashiTape({
  className = '',
  color = '#8EE3C2',
  rotation = -3,
}: {
  className?: string;
  color?: string;
  rotation?: number;
}) {
  return (
    <div
      className={`absolute z-10 pointer-events-none select-none h-6 w-24 opacity-80 shadow-xs ${className}`}
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        clipPath: 'polygon(0% 10%, 4% 0%, 96% 0%, 100% 12%, 98% 88%, 94% 100%, 6% 100%, 0% 90%)',
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.4) 4px, rgba(255,255,255,0.4) 8px)',
      }}
      aria-hidden="true"
    />
  );
}

export function PolaroidFrame({
  children,
  caption,
  seed = 1,
  className = '',
}: {
  children: React.ReactNode;
  caption?: string;
  seed?: number | string;
  className?: string;
}) {
  const rot = getRotation(seed);
  return (
    <div
      className={`relative bg-paper border-2 border-ink p-3 pb-6 rounded-md sticker-shadow transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] ${className}`}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <WashiTape className="-top-3 left-1/2 -translate-x-1/2" rotation={rot > 0 ? -2 : 3} />
      <div className="overflow-hidden border border-ink/20 rounded-xs mb-3 bg-paper-deep">
        {children}
      </div>
      {caption && (
        <p className="font-hand text-ink text-center text-lg leading-tight select-none">
          {caption}
        </p>
      )}
    </div>
  );
}

export function StickyNote({
  children,
  color = '#FBE9C6',
  seed = 2,
  className = '',
}: {
  children: React.ReactNode;
  color?: string;
  seed?: number | string;
  className?: string;
}) {
  const rot = getRotation(seed);
  return (
    <div
      className={`relative p-5 border-2 border-ink rounded-lg sticker-shadow ${className}`}
      style={{
        backgroundColor: color,
        transform: `rotate(${rot}deg)`,
      }}
    >
      <div className="absolute -top-3 left-6 w-16 h-5 bg-gold-leaf/40 -rotate-2 pointer-events-none" />
      {children}
    </div>
  );
}

export function TornPaperDivider({
  className = '',
  fill = '#FFF6E5',
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 30"
        className="w-full h-6 md:h-8 block"
        preserveAspectRatio="none"
        style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
      >
        <path
          d="M 0,30 L 0,15 Q 35,5 70,18 T 140,12 T 210,22 T 280,8 T 350,19 T 420,11 T 490,20 T 560,7 T 630,17 T 700,9 T 770,22 T 840,13 T 910,21 T 980,10 T 1050,19 T 1120,8 L 1200,16 L 1200,30 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
