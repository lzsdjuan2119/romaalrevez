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

  // Subtle floating slots at lateral margins so center title is always clear
  const noteSlots = [
    { top: 20, left: 10 },
    { top: 28, left: 72 },
    { top: 68, left: 12 },
    { top: 62, left: 74 },
    { top: 40, left: 8 },
    { top: 45, left: 76 },
  ];

  useEffect(() => {
    const phrases = DEDICATION_CONFIG.floatingPhrases;
    let counter = 0;

    const spawnNote = () => {
      const slot = noteSlots[Math.floor(Math.random() * noteSlots.length)];
      // Gentle random jitter
      const top = Math.min(82, Math.max(16, slot.top + (Math.random() * 8 - 4)));
      const left = Math.min(80, Math.max(6, slot.left + (Math.random() * 8 - 4)));
      const text = phrases[Math.floor(Math.random() * phrases.length)];

      const newNote: ActiveNote = {
        id: `note-${counter++}-${Date.now()}`,
        text,
        top,
        left,
      };

      setActiveNotes((prev) => {
        // Keep 2 notes active concurrently for an airy, elegant feel
        const updated = prev.length >= 2 ? prev.slice(1) : prev;
        return [...updated, newNote];
      });
    };

    // First note immediately
    spawnNote();

    // Second note shortly after
    const t1 = setTimeout(() => spawnNote(), 2200);

    // Periodic cycling every 5 seconds
    const interval = setInterval(() => {
      spawnNote();
    }, 5000);

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
              opacity: [0, 0.95, 0.95, 0],
              scale: [0.85, 1, 1, 0.9],
              y: [15, 0, -10, -25],
            }}
            transition={{
              duration: 5.0,
              times: [0, 0.16, 0.84, 1],
              ease: "easeInOut",
            }}
            className="absolute hidden sm:block max-w-[280px] md:max-w-[340px] pointer-events-none"
            style={{
              top: `${note.top}%`,
              left: `${note.left}%`,
            }}
          >
            <div className="backdrop-blur-md bg-[#160f33]/75 border border-yellow-400/35 rounded-full px-4 py-2 shadow-[0_4px_25px_rgba(245,158,11,0.2)] flex items-center gap-2.5 text-yellow-100/90 text-xs sm:text-sm font-sans tracking-wide">
              <span className="text-yellow-400 text-xs animate-pulse">✨</span>
              <span className="font-medium italic truncate">{note.text}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
