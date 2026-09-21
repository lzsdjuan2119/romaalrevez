import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEDICATION_CONFIG } from '../config';

interface ActiveNote {
  id: string;
  text: string;
  top: number; // in %
  left: number; // in %
}

export const LoveNotes: React.FC = () => {
  const [activeNotes, setActiveNotes] = useState<ActiveNote[]>([]);

  useEffect(() => {
    const phrases = DEDICATION_CONFIG.floatingPhrases;
    if (!phrases || phrases.length === 0) return;

    let phraseIndex = 0;
    let counter = 0;

    const spawnNote = () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      // On mobile, use slots positioned away from the center title
      const mobileSlots = [
        { top: 18, left: 18 },
        { top: 76, left: 20 },
        { top: 22, left: 40 },
        { top: 72, left: 38 },
      ];
      const desktopSlots = [
        { top: 20, left: 10 },
        { top: 28, left: 72 },
        { top: 68, left: 12 },
        { top: 62, left: 74 },
        { top: 40, left: 8 },
        { top: 45, left: 76 },
      ];

      const slots = isMobile ? mobileSlots : desktopSlots;
      const slot = slots[Math.floor(Math.random() * slots.length)];

      const top = Math.min(84, Math.max(15, slot.top + (Math.random() * 6 - 3)));
      const left = Math.min(isMobile ? 55 : 78, Math.max(isMobile ? 12 : 6, slot.left + (Math.random() * 6 - 3)));

      const text = phrases[phraseIndex % phrases.length];
      phraseIndex++;

      const newNote: ActiveNote = {
        id: `note-${counter++}-${Date.now()}`,
        text,
        top,
        left,
      };

      setActiveNotes((prev) => {
        const maxConcurrent = isMobile ? 1 : 2;
        const updated = prev.length >= maxConcurrent ? prev.slice(1) : prev;
        return [...updated, newNote];
      });
    };

    // First note appears gently
    spawnNote();

    // Second note follows shortly
    const t1 = setTimeout(() => spawnNote(), 2200);

    // Periodic cycling every 4.8 seconds to display all phrases smoothly
    const interval = setInterval(() => {
      spawnNote();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
      <AnimatePresence>
        {activeNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.82, y: 15 }}
            animate={{
              opacity: [0, 0.96, 0.96, 0],
              scale: [0.85, 1, 1, 0.9],
              y: [15, 0, -10, -25],
            }}
            transition={{
              duration: 5.2,
              times: [0, 0.16, 0.84, 1],
              ease: "easeInOut",
            }}
            className="absolute max-w-[260px] sm:max-w-[300px] md:max-w-[360px] pointer-events-none"
            style={{
              top: `${note.top}%`,
              left: `${note.left}%`,
            }}
          >
            <div className="backdrop-blur-md bg-[#160f33]/85 border border-yellow-400/40 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 shadow-[0_4px_25px_rgba(245,158,11,0.25)] flex items-center gap-2 text-yellow-100 text-xs sm:text-sm font-sans tracking-wide">
              <span className="text-yellow-400 text-xs animate-pulse">✨</span>
              <span className="font-medium italic truncate">{note.text}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
