import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart } from 'lucide-react';

interface ShareToastProps {
  isVisible: boolean;
  message?: string;
}

export const ShareToast: React.FC<ShareToastProps> = ({
  isVisible,
  message = '¡Enlace copiado! Ya puedes enviarlo a esa persona especial 💛',
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-night-950 rounded-2xl shadow-[0_10px_35px_rgba(245,158,11,0.5)] border border-yellow-200 flex items-center gap-3 font-sans font-semibold text-xs sm:text-sm select-none"
        >
          <div className="w-6 h-6 rounded-full bg-night-950 text-yellow-300 flex items-center justify-center">
            <Check size={14} strokeWidth={3} />
          </div>
          <span>{message}</span>
          <Heart size={15} className="fill-night-950 text-night-950" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
