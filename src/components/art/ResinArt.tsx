'use client';

import React, { useMemo } from 'react';

export interface ResinArtProps {
  seed: number;
  palette: string[];
  variant?: string;
  size?: number | string;
  className?: string;
  showShimmer?: boolean;
  detail?: boolean;
}

// Deterministic Pseudo-Random Number Generator (Mulberry32)
function createPrng(seed: number) {
  let s = Math.floor(seed) >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ResinArt({
  seed,
  palette = ['#12A8A0', '#0B5C73', '#FFB627', '#FFF6E5'],
  variant = 'coaster',
  size = 300,
  className = '',
  showShimmer = true,
  detail = false,
}: ResinArtProps) {
  const filterId = `resin-noise-${seed}`;
  const shimmerGradId = `resin-shimmer-${seed}`;
  const clipId = `resin-clip-${seed}`;

  // Precompute all deterministic values
  const artData = useMemo(() => {
    const prng = createPrng(seed);

    const colors = palette.length > 0 ? palette : ['#12A8A0', '#0B5C73', '#FFB627', '#FFF6E5'];
    const baseColor = colors[0];
    const accent1 = colors[1] || colors[0];
    const accent2 = colors[2] || colors[1] || colors[0];
    const accent3 = colors[3] || colors[0];

    // Swirls and blobs
    const blobs = Array.from({ length: 6 }).map((_, i) => {
      const cx = 50 + (prng() - 0.5) * 60;
      const cy = 50 + (prng() - 0.5) * 60;
      const rx = 20 + prng() * 45;
      const ry = 15 + prng() * 35;
      const rotate = Math.floor(prng() * 360);
      const color = colors[i % colors.length];
      const opacity = 0.5 + prng() * 0.45;
      return { cx, cy, rx, ry, rotate, color, opacity };
    });

    // Gold leaf flecks
    const flecks = Array.from({ length: 18 }).map(() => {
      const x = 15 + prng() * 70;
      const y = 15 + prng() * 70;
      const s = 1.5 + prng() * 3.5;
      const r = Math.floor(prng() * 360);
      const opacity = 0.75 + prng() * 0.25;
      return { x, y, s, r, opacity };
    });

    // Glitter specks
    const glitters = Array.from({ length: 24 }).map(() => {
      const cx = 10 + prng() * 80;
      const cy = 10 + prng() * 80;
      const r = 0.6 + prng() * 1.4;
      const opacity = 0.6 + prng() * 0.4;
      return { cx, cy, r, opacity };
    });

    // Wave paths for ocean-wave or geode bands
    const wavePaths = Array.from({ length: 3 }).map((_, idx) => {
      const startY = 35 + idx * 18 + prng() * 8;
      const cp1X = 25 + prng() * 15;
      const cp1Y = startY - 15 - prng() * 10;
      const cp2X = 65 + prng() * 15;
      const cp2Y = startY + 12 + prng() * 10;
      const endY = startY + (prng() - 0.5) * 12;
      return `M 0,${startY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} 100,${endY} L 100,100 L 0,100 Z`;
    });

    return {
      colors,
      baseColor,
      accent1,
      accent2,
      accent3,
      blobs,
      flecks,
      glitters,
      wavePaths,
    };
  }, [seed, palette]);

  // Determine viewport & shape based on variant
  const normalizedVariant = variant.toLowerCase();

  return (
    <div
      className={`relative overflow-hidden inline-block select-none group ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={detail ? "20 20 60 60" : "0 0 100 100"}
        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Resin turbulence filter */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={detail ? "0.04" : "0.025"}
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="0.4" />
          </filter>

          {/* Shimmer gradient */}
          <linearGradient id={shimmerGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Clipping path depending on variant */}
          <clipPath id={clipId}>
            {normalizedVariant === 'coaster' && <circle cx="50" cy="50" r="46" />}
            {normalizedVariant === 'tray' && <rect x="8" y="18" width="84" height="64" rx="14" />}
            {normalizedVariant === 'wall-art' && <rect x="8" y="8" width="84" height="84" rx="6" />}
            {normalizedVariant === 'geode' && (
              <path d="M 50,6 C 75,5 92,20 94,46 C 96,72 80,92 52,94 C 24,96 6,80 6,52 C 6,24 25,7 50,6 Z" />
            )}
            {normalizedVariant === 'clock' && <circle cx="50" cy="50" r="46" />}
            {normalizedVariant === 'pendant' && (
              <path d="M 50,8 C 50,8 78,45 78,65 C 78,80 65,92 50,92 C 35,92 22,80 22,65 C 22,45 50,8 50,8 Z" />
            )}
            {normalizedVariant === 'earrings' && (
              <>
                <circle cx="34" cy="50" r="16" />
                <circle cx="66" cy="50" r="16" />
              </>
            )}
            {normalizedVariant === 'keychain' && <rect x="25" y="16" width="50" height="70" rx="12" />}
            {normalizedVariant === 'bookmark' && <rect x="28" y="6" width="44" height="88" rx="4" />}
            {normalizedVariant === 'flower-in-resin' && <circle cx="50" cy="50" r="46" />}
            {/* Fallback circle */}
            {!['coaster', 'tray', 'wall-art', 'geode', 'clock', 'pendant', 'earrings', 'keychain', 'bookmark', 'flower-in-resin'].includes(normalizedVariant) && (
              <circle cx="50" cy="50" r="46" />
            )}
          </clipPath>
        </defs>

        {/* Content clipped to the object's body */}
        <g clipPath={`url(#${clipId})`}>
          {/* Base gradient / fill */}
          <rect x="0" y="0" width="100" height="100" fill={artData.baseColor} />

          {/* Organic flow layers with noise filter */}
          <g filter={`url(#${filterId})`}>
            {artData.blobs.map((b, i) => (
              <ellipse
                key={i}
                cx={b.cx}
                cy={b.cy}
                rx={b.rx}
                ry={b.ry}
                fill={b.color}
                opacity={b.opacity}
                transform={`rotate(${b.rotate} ${b.cx} ${b.cy})`}
              />
            ))}

            {/* Ocean waves / Geode rings */}
            {(normalizedVariant === 'ocean-wave' || normalizedVariant.includes('ocean')) && (
              <>
                <path d={artData.wavePaths[0]} fill={artData.accent1} opacity="0.8" />
                <path d={artData.wavePaths[1]} fill={artData.accent2} opacity="0.85" />
                <path d={artData.wavePaths[2]} fill="#ffffff" opacity="0.75" />
              </>
            )}

            {normalizedVariant === 'geode' && (
              <>
                <circle cx="50" cy="50" r="32" fill="none" stroke={artData.accent1} strokeWidth="6" opacity="0.7" />
                <circle cx="50" cy="50" r="22" fill="none" stroke="#D4A63A" strokeWidth="3" opacity="0.85" />
                <circle cx="50" cy="50" r="14" fill={artData.accent2} opacity="0.9" />
                <circle cx="50" cy="50" r="6" fill="#FFF6E5" opacity="0.8" />
              </>
            )}
          </g>

          {/* Pressed flower details inside clear dome */}
          {(normalizedVariant === 'flower-in-resin' || normalizedVariant === 'pendant') && (
            <g transform="translate(50, 52) scale(0.65) translate(-50, -50)">
              {/* Petals */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <ellipse
                  key={deg}
                  cx="50"
                  cy="32"
                  rx="7"
                  ry="16"
                  fill={artData.accent1}
                  opacity="0.88"
                  transform={`rotate(${deg} 50 50)`}
                />
              ))}
              {/* Center pistil */}
              <circle cx="50" cy="50" r="8" fill="#FFB627" />
              <circle cx="50" cy="50" r="5" fill="#D4A63A" />
            </g>
          )}

          {/* Gold leaf flecks */}
          <g>
            {artData.flecks.map((f, i) => (
              <polygon
                key={i}
                points={`${f.x},${f.y - f.s} ${f.x + f.s},${f.y} ${f.x},${f.y + f.s} ${f.x - f.s * 0.8},${f.y + f.s * 0.3}`}
                fill="#D4A63A"
                opacity={f.opacity}
                transform={`rotate(${f.r} ${f.x} ${f.y})`}
              />
            ))}
          </g>

          {/* Holographic / glitter dots */}
          <g>
            {artData.glitters.map((g, i) => (
              <circle key={i} cx={g.cx} cy={g.cy} r={g.r} fill="#FFFFFF" opacity={g.opacity} />
            ))}
          </g>

          {/* Glossy curved highlight arc */}
          <path
            d="M 12,24 C 26,12 74,12 88,24 C 74,18 26,18 12,24 Z"
            fill="#FFFFFF"
            opacity="0.4"
          />

          {/* Shimmer overlay sweep */}
          {showShimmer && (
            <rect
              x="-50"
              y="-50"
              width="200"
              height="200"
              fill={`url(#${shimmerGradId})`}
              className="pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
            />
          )}
        </g>

        {/* Outer details & fixtures depending on variant */}
        {normalizedVariant === 'coaster' && (
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#D4A63A"
            strokeWidth="1.8"
            strokeDasharray="4 2 8 2"
            opacity="0.85"
          />
        )}

        {normalizedVariant === 'tray' && (
          <>
            {/* Tray outer rim */}
            <rect
              x="8"
              y="18"
              width="84"
              height="64"
              rx="14"
              fill="none"
              stroke="#D4A63A"
              strokeWidth="2.5"
            />
            {/* Left handle */}
            <path d="M 4,40 C 2,44 2,56 4,60" fill="none" stroke="#2B1B3D" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right handle */}
            <path d="M 96,40 C 98,44 98,56 96,60" fill="none" stroke="#2B1B3D" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {normalizedVariant === 'clock' && (
          <g>
            <circle cx="50" cy="50" r="46" fill="none" stroke="#2B1B3D" strokeWidth="2" />
            {/* Hour dots */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <circle
                key={deg}
                cx="50"
                cy="12"
                r={deg % 90 === 0 ? "1.8" : "1"}
                fill="#D4A63A"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Clock hands */}
            <line x1="50" y1="50" x2="50" y2="26" stroke="#2B1B3D" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="50" x2="68" y2="50" stroke="#2B1B3D" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="2.5" fill="#D4A63A" />
          </g>
        )}

        {normalizedVariant === 'bookmark' && (
          <g>
            {/* Tassel cord at bottom */}
            <path d="M 50,94 C 50,96 48,99 46,102" fill="none" stroke="#D4A63A" strokeWidth="1.5" />
            <circle cx="45" cy="102" r="2" fill="#D4A63A" />
            <line x1="45" y1="102" x2="43" y2="108" stroke="#D4A63A" strokeWidth="1" />
            <line x1="45" y1="102" x2="45" y2="109" stroke="#D4A63A" strokeWidth="1" />
            <line x1="45" y1="102" x2="47" y2="108" stroke="#D4A63A" strokeWidth="1" />
          </g>
        )}

        {normalizedVariant === 'keychain' && (
          <g>
            {/* Keyring hole and ring */}
            <circle cx="50" cy="12" r="6" fill="none" stroke="#D4A63A" strokeWidth="2" />
            <circle cx="50" cy="22" r="2.5" fill="#2B1B3D" />
          </g>
        )}
      </svg>
    </div>
  );
}
export default ResinArt;
