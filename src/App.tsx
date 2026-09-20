import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { NightSkyBackground } from './components/NightSkyBackground';
import { FlowerRain } from './components/FlowerRain';
import { LoveNotes } from './components/LoveNotes';
import { Bouquet } from './components/Bouquet';
import { SoundToggle } from './components/SoundToggle';
import { DEDICATION_CONFIG } from './config';
import { soundController } from './utils/audio';

export const App: React.FC = () => {
  const [replayCount, setReplayCount] = useState<number>(0);
  const bouquetSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToBouquet = () => {
    soundController.playSparkle();
    if (bouquetSectionRef.current) {
      bouquetSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    soundController.playSparkle();
    setReplayCount((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen text-amber-50 font-sans selection:bg-gerbera-warm selection:text-night-950 overflow-x-hidden">
      {/* Dynamic Night Sky Background with Stars & Moon */}
      <NightSkyBackground />

      {/* Floating Audio Mute/Unmute Control (for browser autoplay permissions) */}
      <SoundToggle />

      {/* ========================================================
          ESCENA 1 — "Lluvia de flores" (100vh, full screen)
          Arranque inmediato: nada de formularios ni bloqueos previos
      ======================================================== */}
      <section className="relative h-screen w-full flex flex-col items-center justify-between overflow-hidden z-10 pt-safe pb-safe px-4 select-none">
        {/* Falling Gerbera Flowers, Coral Hearts, Golden Sparkles */}
        <FlowerRain />

        {/* Floating Love Notes */}
        <LoveNotes />

        {/* Spacer for natural vertical balance */}
        <div className="h-8 sm:h-14" />

        {/* Central Romantic Title & Lyrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-20 text-center max-w-3xl mx-auto px-4"
        >
          {/* Glowing Romantic Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/35 text-yellow-300 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_25px_rgba(250,204,21,0.25)]"
          >
            <Sparkles size={14} className="text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Un regalo que florece hoy</span>
            <Sparkles size={14} className="text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
          </motion.div>

          {/* Main Title in Handwritten Script */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-script font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-300 to-amber-400 leading-tight drop-shadow-[0_4px_25px_rgba(250,204,21,0.4)]">
            {DEDICATION_CONFIG.scene1Title}
          </h1>

          {/* Song lyrics quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-amber-100/85 font-serifDisplay italic font-normal tracking-wide max-w-lg mx-auto leading-relaxed whitespace-pre-line"
          >
            {DEDICATION_CONFIG.scene1Quote}
          </motion.p>
        </motion.div>

        {/* Scroll Indicator Button to Scene 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="relative z-20 pb-5 text-center"
        >
          <button
            onClick={handleScrollToBouquet}
            className="group flex flex-col items-center gap-2 text-yellow-200/90 hover:text-yellow-100 transition-colors focus:outline-none cursor-pointer"
            aria-label="Descubrir ramo"
          >
            <span className="text-xs sm:text-sm font-sans tracking-widest uppercase font-semibold text-yellow-300/90 group-hover:tracking-[0.2em] transition-all">
              {DEDICATION_CONFIG.scrollPrompt}
            </span>
            <div className="w-11 h-11 rounded-full bg-yellow-400/10 border border-yellow-400/40 flex items-center justify-center group-hover:bg-yellow-400/25 group-hover:border-yellow-400/70 shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all animate-bounce">
              <ChevronDown size={22} className="text-yellow-300 group-hover:scale-110 transition-transform" />
            </div>
          </button>
        </motion.div>
      </section>

      {/* ========================================================
          ESCENA 2 — "El ramo" (Se revela al hacer scroll)
      ======================================================== */}
      <section
        ref={bouquetSectionRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 z-10 select-none pb-safe"
      >
        {/* Soft atmospheric backlight */}
        <div className="absolute inset-0 bg-radial-gradient from-[#1e1347]/50 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="mb-2"
          >
            <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-amber-300/80 font-medium">
              {DEDICATION_CONFIG.scene2Header}
            </span>
          </motion.div>

          {/* EXACTLY 3 HYPER-DETAILED GERBERAS BOUQUET WITH MEDALLION */}
          <Bouquet triggerReplay={replayCount} />

          {/* ROMANTIC FIXED MESSAGE IN LARGE HANDWRITTEN SCRIPT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative w-full backdrop-blur-xl bg-[#140d2e]/85 border border-amber-500/35 rounded-3xl p-6 sm:p-9 shadow-[0_12px_45px_rgba(0,0,0,0.6),0_0_30px_rgba(245,158,11,0.18)] text-left my-6"
          >
            {/* Romantic Card Header */}
            <div className="flex items-center justify-between mb-5 border-b border-yellow-500/20 pb-3">
              <div className="flex items-center gap-2 text-yellow-300/90 text-xs sm:text-sm font-serifDisplay italic tracking-wider">
                <Heart size={15} className="fill-yellow-400 text-yellow-400" />
                <span>Un detalle que nunca se marchita</span>
              </div>
              <div className="text-xs text-amber-200/60 font-mono">
                💛 21 de Septiembre
              </div>
            </div>

            {/* Romantic Message Content */}
            <div className="text-yellow-100 font-script text-2xl sm:text-3xl leading-relaxed whitespace-pre-line tracking-wide">
              {DEDICATION_CONFIG.romanticMessage}
            </div>

            {/* Signature */}
            <div className="mt-6 pt-4 border-t border-yellow-500/20 text-right">
              <span className="font-script text-3xl sm:text-4xl text-yellow-300 font-bold drop-shadow-[0_2px_10px_rgba(250,204,21,0.4)]">
                {DEDICATION_CONFIG.signature}
              </span>
            </div>
          </motion.div>

          {/* Action Button: "Ver de nuevo" */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center mt-2 w-full"
          >
            <button
              onClick={handleReplay}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-night-950 font-sans font-bold text-sm tracking-wide shadow-[0_4px_25px_rgba(245,158,11,0.45)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.6)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <RotateCcw size={18} className="text-night-950 stroke-[2.5]" />
              <span>Ver de nuevo</span>
            </button>
          </motion.div>

          {/* Footer note */}
          <div className="mt-14 text-center text-xs text-amber-200/45 font-sans flex items-center justify-center gap-1.5">
            <span>Flores Amarillas</span>
            <span>•</span>
            <span className="text-yellow-400/70">Trend de TikTok & Floricienta 🌼</span>
          </div>
        </div>
      </section>
    </div>
  );
};
