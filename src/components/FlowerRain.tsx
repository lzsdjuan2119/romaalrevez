import React, { useMemo } from 'react';
import { GerberaFlower } from './GerberaFlower';

interface RainItem {
  id: number;
  type: 'flower' | 'heart' | 'sparkle';
  left: number; // in %
  size: number;
  duration: number; // in seconds
  delay: number; // in seconds (can be negative for instant rain)
  swayDuration: number;
  rotation: number;
  opacity: number;
}

export const FlowerRain: React.FC = () => {
  // Generate random rain particles
  const particles: RainItem[] = useMemo(() => {
    const items: RainItem[] = [];
    const count = 28; // balanced for aesthetic beauty and high performance

    for (let i = 0; i < count; i++) {
      // 55% flowers, 25% hearts, 20% sparkles
      const rand = Math.random();
      const type: 'flower' | 'heart' | 'sparkle' =
        rand < 0.55 ? 'flower' : rand < 0.8 ? 'heart' : 'sparkle';

      let size: number;
      if (type === 'flower') {
        size = Math.random() * 26 + 32; // 32px to 58px
      } else if (type === 'heart') {
        size = Math.random() * 14 + 16; // 16px to 30px
      } else {
        size = Math.random() * 12 + 12; // 12px to 24px
      }

      items.push({
        id: i,
        type,
        left: Math.random() * 96 + 2, // 2% to 98%
        size,
        duration: Math.random() * 6 + 7, // 7s to 13s
        delay: -(Math.random() * 12), // negative delay so rain is already falling on load!
        swayDuration: Math.random() * 2.5 + 3, // 3s to 5.5s
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.25 + 0.75, // 0.75 to 1.0
      });
    }
    return items;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      <style>{`
        @keyframes fallAndRotate {
          0% {
            transform: translateY(-80px) rotate(0deg);
          }
          100% {
            transform: translateY(115vh) rotate(360deg);
          }
        }
        @keyframes pendulumSway {
          0% {
            transform: translateX(-24px) rotate(-15deg);
          }
          50% {
            transform: translateX(24px) rotate(15deg);
          }
          100% {
            transform: translateX(-24px) rotate(-15deg);
          }
        }
        .falling-container {
          animation-name: fallAndRotate;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .swaying-wrapper {
          animation-name: pendulumSway;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .falling-container, .swaying-wrapper {
            animation: none !important;
            transform: none !important;
            opacity: 0.4 !important;
          }
        }
      `}</style>

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 falling-container"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          <div
            className="swaying-wrapper"
            style={{
              animationDuration: `${p.swayDuration}s`,
            }}
          >
            {p.type === 'flower' && (
              <div className="glow-yellow transform hover:scale-125 transition-transform">
                <GerberaFlower size={p.size} />
              </div>
            )}

            {p.type === 'heart' && (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                className="glow-coral"
                style={{ transform: `rotate(${p.rotation}deg)` }}
              >
                <defs>
                  <linearGradient id={`heart-grad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fda4af" />
                    <stop offset="50%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={`url(#heart-grad-${p.id})`}
                  opacity="0.9"
                />
              </svg>
            )}

            {p.type === 'sparkle' && (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                className="drop-shadow-[0_0_8px_rgba(254,240,138,0.8)]"
              >
                <defs>
                  <radialGradient id={`sparkle-grad-${p.id}`}>
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#fde047" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </radialGradient>
                </defs>
                <path
                  d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                  fill={`url(#sparkle-grad-${p.id})`}
                />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
