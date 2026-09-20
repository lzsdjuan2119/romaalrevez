import confetti from 'canvas-confetti';

/**
 * Fires a gorgeous celebratory burst of golden yellow floral confetti, coral hearts & sparkles
 * centered around the bouquet location.
 */
export function fireBouquetConfetti(originY: number = 0.48) {
  const count = 160;
  const defaults = {
    origin: { x: 0.5, y: originY },
    disableForReducedMotion: true,
  };

  const colors = [
    '#facc15', // Bright Gerbera Yellow
    '#fbbf24', // Golden Amber
    '#f59e0b', // Warm Honey
    '#fef08a', // Canary Yellow
    '#fb7185', // Soft Coral Rose
    '#fda4af', // Blossom Pink
    '#ffffff', // Diamond Stardust
  ];

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors,
    });
  }

  // 1. Immediate crisp central burst
  fire(0.25, {
    spread: 36,
    startVelocity: 45,
    scalar: 0.9,
  });

  // 2. Wide blooming petal spray
  fire(0.2, {
    spread: 70,
    startVelocity: 35,
    scalar: 1.1,
  });

  // 3. Floating high flutter
  fire(0.35, {
    spread: 110,
    decay: 0.91,
    scalar: 1.25,
  });

  // 4. Heavy golden drops
  fire(0.1, {
    spread: 130,
    startVelocity: 25,
    decay: 0.93,
    scalar: 1.4,
  });

  // 5. Final slow stardust
  fire(0.1, {
    spread: 140,
    startVelocity: 40,
    scalar: 0.75,
  });
}
