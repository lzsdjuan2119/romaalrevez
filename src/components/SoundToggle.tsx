import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { soundController, AudioState } from '../utils/audio';

export const SoundToggle: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioState>(soundController.getState());
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = soundController.subscribe((state) => {
      setAudioState(state);
      if (state.isPlaying) {
        setShowPrompt(false);
      }
    });

    // Show prompt only if autoplay was blocked by browser after 3.8s
    const promptTimer = window.setTimeout(() => {
      if (!soundController.getState().isPlaying) {
        setShowPrompt(true);
      }
    }, 3800);

    return () => {
      unsubscribe();
      window.clearTimeout(promptTimer);
    };
  }, []);

  const handleTogglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrompt(false);
    await soundController.togglePlay();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrompt(false);
    soundController.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    soundController.setVolume(val);
    if (audioState.isMuted && val > 0) {
      soundController.setMuted(false);
    }
  };

  const isActuallyPlaying = audioState.isPlaying && !audioState.isMuted;

  return (
    <div
      className="fixed top-4 left-4 z-40 flex items-center gap-2 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Music Player Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`group flex items-center gap-2.5 px-3 py-2 rounded-full backdrop-blur-xl border shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          isActuallyPlaying
            ? 'bg-[#18103c]/90 border-yellow-400/50 shadow-[0_0_25px_rgba(250,204,21,0.25)]'
            : 'bg-[#140d2e]/80 border-amber-500/30 hover:border-yellow-400/50'
        }`}
      >
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${
            isActuallyPlaying
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-night-950 shadow-[0_0_15px_rgba(250,204,21,0.5)]'
              : 'bg-yellow-400/15 hover:bg-yellow-400/30 text-yellow-300 border border-yellow-400/30'
          }`}
          title={isActuallyPlaying ? 'Pausar música' : 'Reproducir música'}
          aria-label={isActuallyPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isActuallyPlaying ? (
            <Pause size={15} className="fill-night-950 stroke-[2.5]" />
          ) : (
            <Play size={15} className="fill-yellow-300 ml-0.5 stroke-[2.5]" />
          )}
        </button>

        {/* Music Equalizer / Note & Track Info */}
        <div
          onClick={handleTogglePlay}
          className="flex items-center gap-2 cursor-pointer pr-1"
        >
          {/* Animated Equalizer Bars when playing, or static Music Note when paused */}
          <div className="w-5 h-5 flex items-center justify-center">
            {isActuallyPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-4 w-4">
                <span className="w-1 bg-yellow-400 rounded-full animate-eq-1" />
                <span className="w-1 bg-yellow-300 rounded-full animate-eq-2" />
                <span className="w-1 bg-amber-400 rounded-full animate-eq-3" />
              </div>
            ) : (
              <Music size={15} className="text-yellow-400/60 group-hover:text-yellow-300 transition-colors" />
            )}
          </div>

          {/* Song Info */}
          <div className="flex flex-col text-left leading-tight">
            <span className="text-xs sm:text-sm font-semibold text-yellow-100 flex items-center gap-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {audioState.songTitle}
              {isActuallyPlaying && (
                <Sparkles size={11} className="text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
              )}
            </span>
            <span className="text-[10px] sm:text-[11px] text-amber-200/65 font-sans font-medium">
              {audioState.artist}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-yellow-500/20" />

        {/* Mute/Unmute Quick Toggle Button */}
        <button
          onClick={handleToggleMute}
          className="p-1.5 rounded-full text-yellow-300/80 hover:text-yellow-200 hover:bg-yellow-400/10 transition-colors cursor-pointer"
          title={audioState.isMuted ? 'Activar sonido' : 'Silenciar'}
          aria-label={audioState.isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {audioState.isMuted ? (
            <VolumeX size={16} className="text-yellow-400/40" />
          ) : (
            <Volume2 size={16} className="text-yellow-400" />
          )}
        </button>

        {/* Subtle Volume Slider (appears on hover on desktop) */}
        <div
          className={`hidden sm:flex items-center overflow-hidden transition-all duration-300 ease-out ${
            isHovered ? 'w-16 opacity-100 pr-1' : 'w-0 opacity-0'
          }`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={audioState.isMuted ? 0 : audioState.volume}
            onChange={handleVolumeChange}
            className="w-14 h-1.5 bg-yellow-950/60 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            title={`Volumen: ${Math.round((audioState.isMuted ? 0 : audioState.volume) * 100)}%`}
          />
        </div>
      </motion.div>

      {/* Floating Prompt Toast for Autoplay Policy (inviting the user to tap to listen) */}
      <AnimatePresence>
        {showPrompt && !audioState.isPlaying && (
          <motion.button
            onClick={handleTogglePlay}
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/25 to-amber-500/25 border border-yellow-400/45 text-yellow-200 text-xs font-medium backdrop-blur-md shadow-[0_4px_20px_rgba(250,204,21,0.25)] hover:border-yellow-300 hover:text-yellow-100 transition-all cursor-pointer animate-pulse"
          >
            <span>🎵 Toca para activar la música</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
