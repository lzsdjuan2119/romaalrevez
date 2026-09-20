import React, { useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface Bokeh {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

export const NightSkyBackground: React.FC = () => {
  // Generate random stars once on mount
  const stars: Star[] = useMemo(() => {
    return Array.from({ length: 65 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 95,
      size: Math.random() * 2.2 + 0.8,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  // Soft bokeh light orbs
  const bokehs: Bokeh[] = useMemo(() => [
    { id: 1, x: 15, y: 25, size: 280, color: 'rgba(234, 179, 8, 0.07)', duration: 16 },
    { id: 2, x: 80, y: 35, size: 340, color: 'rgba(251, 113, 133, 0.06)', duration: 20 },
    { id: 3, x: 50, y: 70, size: 300, color: 'rgba(147, 51, 234, 0.08)', duration: 18 },
    { id: 4, x: 75, y: 80, size: 260, color: 'rgba(245, 158, 11, 0.06)', duration: 14 },
    { id: 5, x: 20, y: 85, size: 220, color: 'rgba(253, 224, 71, 0.05)', duration: 15 },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Rich gradient sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070512] via-[#120c2e] via-[#19113d] to-[#0a071d]" />

      {/* Subtle stardust nebula glow */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(139, 92, 246, 0.15), transparent 70%)',
        }}
      />

      {/* Bokeh light spheres */}
      {bokehs.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full blur-3xl animate-bokeh pointer-events-none"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            backgroundColor: b.color,
            ['--bokeh-duration' as string]: `${b.duration}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-amber-50 animate-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(254, 240, 138, 0.8)`,
            ['--twinkle-duration' as string]: `${star.duration}s`,
            ['--twinkle-delay' as string]: `${star.delay}s`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Radiant Crescent Moon with Soft Golden-Silvery Glow */}
      <div className="absolute top-8 right-6 md:top-14 md:right-16 select-none opacity-90 transition-transform duration-700 hover:scale-105">
        {/* Outer Moon Glow */}
        <div className="absolute -inset-6 rounded-full bg-amber-200/10 blur-xl pointer-events-none" />
        <div className="absolute -inset-2 rounded-full bg-yellow-100/15 blur-md pointer-events-none" />

        <svg width="68" height="68" viewBox="0 0 100 100" className="relative drop-shadow-[0_0_16px_rgba(254,240,138,0.5)]">
          <defs>
            <linearGradient id="moonGrad" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
            <filter id="moonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Crescent Moon path */}
          <path
            d="M 50 10 A 40 40 0 1 0 90 50 A 32 32 0 1 1 50 10 Z"
            fill="url(#moonGrad)"
            filter="url(#moonGlow)"
          />

          {/* Tiny gentle spark near the moon */}
          <path
            d="M 28 32 Q 30 24 38 22 Q 30 20 28 12 Q 26 20 18 22 Q 26 24 28 32 Z"
            fill="#fff"
            opacity="0.75"
          />
        </svg>
      </div>
    </div>
  );
};
