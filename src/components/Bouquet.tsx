import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GerberaFlower } from './GerberaFlower';
import { fireBouquetConfetti } from './ConfettiBurst';
import { soundController } from '../utils/audio';

interface BouquetProps {
  triggerReplay?: number;
  onBloomComplete?: () => void;
}

export const Bouquet: React.FC<BouquetProps> = ({
  triggerReplay = 0,
  onBloomComplete,
}) => {
  const [bloomKey, setBloomKey] = useState<number>(0);
  const [hasBloomed, setHasBloomed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBloomKey((prev) => prev + 1);
    setHasBloomed(false);

    // Blooming duration: Left flower (0.3s) -> Center flower (0.85s) -> Right flower (1.4s) -> Completes at ~2.35s
    const timer = setTimeout(() => {
      setHasBloomed(true);

      // Calculate relative vertical position of the bouquet for confetti center
      let originY = 0.42;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        originY = Math.max(0.2, Math.min(0.75, (rect.top + rect.height * 0.45) / window.innerHeight));
      }

      fireBouquetConfetti(originY);
      soundController.playBloomChord();

      if (onBloomComplete) {
        onBloomComplete();
      }
    }, 2350);

    return () => clearTimeout(timer);
  }, [triggerReplay, onBloomComplete]);

  return (
    <div
      ref={containerRef}
      key={bloomKey}
      className="relative flex flex-col items-center justify-center select-none pt-2 pb-4"
    >
      {/* Radiant ambient glow pool behind bouquet */}
      <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-400/25 to-transparent blur-3xl pointer-events-none -translate-y-8" />

      {/* ==========================================================
          MEDALLÓN CIRCULAR SUPERIOR CON ANILLO DORADO PULSANTE
      ========================================================== */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: -25 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-30 mb-1"
      >
        {/* Pulsating golden aura rings */}
        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 opacity-75 blur-md animate-pulse" />
        <div className="absolute -inset-1 rounded-full border-2 border-yellow-300/60 animate-ping opacity-35" style={{ animationDuration: '3s' }} />

        {/* Medallion Frame */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-b from-yellow-200 via-amber-400 to-yellow-600 shadow-[0_0_30px_rgba(250,204,21,0.55)] flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#1a113d] via-[#120a28] to-[#25154d] flex flex-col items-center justify-center relative border border-yellow-200/60 shadow-inner">
            <span className="text-2xl sm:text-3xl filter drop-shadow-[0_2px_10px_rgba(250,204,21,0.8)] animate-bounce" style={{ animationDuration: '2.5s' }}>
              💛
            </span>
            <span className="text-[9px] sm:text-[10px] font-script tracking-widest text-amber-200 font-semibold uppercase mt-0.5">
              Para Siempre
            </span>
          </div>
        </div>

        {/* Sparkle badge */}
        <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-amber-500 to-yellow-300 text-night-950 text-[11px] rounded-full p-1 shadow-md">
          ✨
        </div>
      </motion.div>

      {/* ==========================================================
          RAMO DE 3 GERBERAS HIPERDETALLADAS CON TALLOS Y LAZO
      ========================================================== */}
      <div className="relative w-80 sm:w-[420px] h-[340px] sm:h-[390px] flex items-center justify-center">
        {/* SVG STEMS, LEAVES & LUXURIOUS RIBBON */}
        <svg
          viewBox="-180 -190 360 400"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10"
        >
          <defs>
            {/* Stem Gradients */}
            <linearGradient id="bouquetStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#65a30d" />
              <stop offset="45%" stopColor="#4d7c0f" />
              <stop offset="100%" stopColor="#2c440a" />
            </linearGradient>

            {/* Left Foliage Leaf */}
            <linearGradient id="bouquetLeafL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#84cc16" />
              <stop offset="50%" stopColor="#4d7c0f" />
              <stop offset="100%" stopColor="#1a3106" />
            </linearGradient>

            {/* Right Foliage Leaf */}
            <linearGradient id="bouquetLeafR" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#84cc16" />
              <stop offset="50%" stopColor="#4d7c0f" />
              <stop offset="100%" stopColor="#1a3106" />
            </linearGradient>

            {/* Luxurious Ribbon Gradient */}
            <linearGradient id="bouquetRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* BACK FOLIAGE / NATURAL GERBERA LEAVES */}
          <motion.g
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          >
            {/* Left Large Serrated Leaf */}
            <path
              d="M -30,25 C -90,-10 -140,-35 -155,-5 C -145,35 -90,55 -25,40 Z"
              fill="url(#bouquetLeafL)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
            />
            <path
              d="M -28,30 Q -85,15 -140,5"
              stroke="#bef264"
              strokeWidth="2.2"
              fill="none"
              opacity="0.6"
            />

            {/* Right Large Serrated Leaf */}
            <path
              d="M 30,25 C 90,-10 140,-35 155,-5 C 145,35 90,55 25,40 Z"
              fill="url(#bouquetLeafR)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
            />
            <path
              d="M 28,30 Q 85,15 140,5"
              stroke="#bef264"
              strokeWidth="2.2"
              fill="none"
              opacity="0.6"
            />

            {/* Central Upright Leaf */}
            <path
              d="M 0,-45 C -35,-125 0,-160 0,-160 C 0,-160 35,-125 0,-45 Z"
              fill="url(#bouquetLeafL)"
              opacity="0.85"
            />
            <path
              d="M 0,-45 L 0,-150"
              stroke="#bef264"
              strokeWidth="1.8"
              opacity="0.5"
            />
          </motion.g>

          {/* WELL-DEFINED GREEN STEMS (Bound into bouquet) */}
          <motion.g
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {/* Left Flower Stem */}
            <path
              d="M -60,0 Q -30,60 -8,125 L -14,185"
              stroke="url(#bouquetStemGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            {/* Center Flower Stem */}
            <path
              d="M 0,-50 Q 0,55 0,125 L 0,192"
              stroke="url(#bouquetStemGrad)"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Flower Stem */}
            <path
              d="M 60,0 Q 30,60 8,125 L 14,185"
              stroke="url(#bouquetStemGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* DECORATIVE RIBBON / BOW TIED AROUND STEMS */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            transform="translate(0, 125)"
          >
            {/* Ribbon Knot Shadow */}
            <circle cx="0" cy="0" r="18" fill="rgba(0,0,0,0.4)" filter="blur(4px)" />

            {/* Left Ribbon Loop */}
            <path
              d="M 0,0 C -35,-32 -70,-16 -65,12 C -60,35 -25,22 0,0 Z"
              fill="url(#bouquetRibbonGrad)"
              stroke="#fde047"
              strokeWidth="1.8"
            />
            {/* Right Ribbon Loop */}
            <path
              d="M 0,0 C 35,-32 70,-16 65,12 C 60,35 25,22 0,0 Z"
              fill="url(#bouquetRibbonGrad)"
              stroke="#fde047"
              strokeWidth="1.8"
            />

            {/* Central Knot */}
            <circle
              cx="0"
              cy="0"
              r="13"
              fill="url(#bouquetRibbonGrad)"
              stroke="#fef08a"
              strokeWidth="2.2"
            />

            {/* Flowing Ribbon Tails */}
            <path
              d="M -7,8 Q -28,45 -40,82 Q -30,76 -18,82 Q -12,45 -3,10 Z"
              fill="url(#bouquetRibbonGrad)"
              opacity="0.95"
            />
            <path
              d="M 7,8 Q 28,45 40,82 Q 30,76 18,82 Q 12,45 3,10 Z"
              fill="url(#bouquetRibbonGrad)"
              opacity="0.95"
            />
          </motion.g>
        </svg>

        {/* ==========================================================
            EXACTAMENTE 3 GERBERAS HIPERDETALLADAS CON FLORECIMIENTO EN STAGGER
        ========================================================== */}

        {/* 1. GERBERA IZQUIERDA (Stagger 1: bloomDelay = 0.3s, rotación suave -16°) */}
        <motion.div
          className="absolute z-20"
          style={{
            top: '34%',
            left: '14%',
            transform: 'translate(-50%, -50%) rotate(-16deg)',
          }}
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="hover:scale-105 transition-transform duration-300">
            <GerberaFlower size={165} isBlooming={true} bloomDelay={0.3} />
          </div>
        </motion.div>

        {/* 2. GERBERA CENTRAL (Corona elevada, Stagger 2: bloomDelay = 0.85s, mayor tamaño) */}
        <motion.div
          className="absolute z-25"
          style={{
            top: '16%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="hover:scale-105 transition-transform duration-300">
            <GerberaFlower size={190} isBlooming={true} bloomDelay={0.85} />
          </div>
        </motion.div>

        {/* 3. GERBERA DERECHA (Stagger 3: bloomDelay = 1.4s, rotación suave +16°) */}
        <motion.div
          className="absolute z-20"
          style={{
            top: '34%',
            right: '14%',
            transform: 'translate(50%, -50%) rotate(16deg)',
          }}
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="hover:scale-105 transition-transform duration-300">
            <GerberaFlower size={165} isBlooming={true} bloomDelay={1.4} />
          </div>
        </motion.div>
      </div>

      {/* Floración completada: pequeña estrella indicadora */}
      {hasBloomed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-1 text-xs font-sans text-amber-200/90 flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-gerbera-warm animate-ping" />
          <span>¡Las 3 flores han florecido para ti!</span>
        </motion.div>
      )}
    </div>
  );
};
