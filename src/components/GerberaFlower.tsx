import React, { useId, useMemo } from 'react';
import { motion } from 'framer-motion';

interface GerberaFlowerProps {
  size?: number;
  className?: string;
  isBlooming?: boolean;
  bloomDelay?: number;
  style?: React.CSSProperties;
}

export const GerberaFlower: React.FC<GerberaFlowerProps> = ({
  size = 180,
  className = '',
  isBlooming = false,
  bloomDelay = 0,
  style = {},
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const gradOuterPetal = `grad-outer-${id}`;
  const gradMiddlePetal = `grad-mid-${id}`;
  const gradInnerPetal = `grad-inner-${id}`;
  const gradDisc = `grad-disc-${id}`;
  const gradAura = `grad-aura-${id}`;
  const gradVein = `grad-vein-${id}`;
  const petalShadow = `petal-shadow-${id}`;

  // Layer 1: Outer Ray Florets (36 petals)
  const outerPetalCount = 36;
  const outerAngles = useMemo(() => {
    return Array.from({ length: outerPetalCount }, (_, i) => (i * 360) / outerPetalCount);
  }, []);

  // Layer 2: Middle Ray Florets (36 petals, offset by 5 degrees to interlace)
  const middlePetalCount = 36;
  const middleAngles = useMemo(() => {
    const offset = 360 / (middlePetalCount * 2);
    return Array.from({ length: middlePetalCount }, (_, i) => (i * 360) / middlePetalCount + offset);
  }, []);

  // Layer 3: Inner Transitional Trans-Florets (28 small petals hugging the disc)
  const innerPetalCount = 28;
  const innerAngles = useMemo(() => {
    return Array.from({ length: innerPetalCount }, (_, i) => (i * 360) / innerPetalCount + 6.4);
  }, []);

  // Botanical Fibonacci / Golden Angle Spiral for the Capitulum Disc Florets (~115 florets)
  const discFlorets = useMemo(() => {
    const florets = [];
    const goldenAngle = 137.507764 * (Math.PI / 180);
    const count = 115;
    const c = 2.4; // scaling factor for disc radius ~24px

    for (let n = 1; n <= count; n++) {
      const r = c * Math.sqrt(n);
      const theta = n * goldenAngle;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);

      // Color and size gradation from center outwards
      let color: string;
      let radius: number;
      let opacity: number;

      if (n < 25) {
        // Deep velvety dark chocolate center
        color = '#3b1706';
        radius = 0.95;
        opacity = 0.9;
      } else if (n < 60) {
        // Bronze, burnt umber and cinnamon mid-disk
        color = n % 2 === 0 ? '#78350f' : '#92400e';
        radius = 1.15;
        opacity = 0.95;
      } else if (n < 95) {
        // Golden amber floret rim
        color = n % 3 === 0 ? '#b45309' : '#d97706';
        radius = 1.35;
        opacity = 0.98;
      } else {
        // Outer pollen rim with bright yellow stamens
        color = n % 2 === 0 ? '#f59e0b' : '#fde047';
        radius = 1.45;
        opacity = 1;
      }

      florets.push({ id: n, x, y, r: radius, color, opacity });
    }
    return florets;
  }, []);

  return (
    <div
      className={`inline-block select-none relative ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <svg
        viewBox="-110 -110 220 220"
        width={size}
        height={size}
        className="overflow-visible"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(217, 119, 6, 0.35))' }}
      >
        <defs>
          {/* Subtle soft drop shadow for overlapping petals */}
          <filter id={petalShadow} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#451a03" floodOpacity="0.25" />
          </filter>

          {/* Outer Petal Gradient: Deep golden honey base to luminous warm yellow tip */}
          <linearGradient id={gradOuterPetal} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="18%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="82%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Middle Petal Gradient: Brighter sunny yellow with warm apricot center */}
          <linearGradient id={gradMiddlePetal} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#c2410c" />
            <stop offset="22%" stopColor="#ea580c" />
            <stop offset="55%" stopColor="#fbbf24" />
            <stop offset="85%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#fffbeb" />
          </linearGradient>

          {/* Inner Petal Gradient: Warm saffron to bright goldenrod */}
          <linearGradient id={gradInnerPetal} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="35%" stopColor="#d97706" />
            <stop offset="75%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Petal Central Crease / Vein Gradient */}
          <linearGradient id={gradVein} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#92400e" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.2" />
          </linearGradient>

          {/* Realistic Capitulum Disc Dome Gradient */}
          <radialGradient id={gradDisc} cx="42%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#3f1a07" />
            <stop offset="40%" stopColor="#5c260a" />
            <stop offset="70%" stopColor="#78350f" />
            <stop offset="88%" stopColor="#92400e" />
            <stop offset="97%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>

          {/* Golden luminous halo behind flower */}
          <radialGradient id={gradAura} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(254, 240, 138, 0.4)" />
            <stop offset="50%" stopColor="rgba(245, 158, 11, 0.2)" />
            <stop offset="85%" stopColor="rgba(217, 119, 6, 0.08)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="0" cy="0" r="105" fill={`url(#${gradAura})`} />

        {/* ==========================================================
            LAYER 1: OUTER RAY PETALS (36 long, elegant slender petals)
            Scales & unfurls first
        ========================================================== */}
        <motion.g
          id="layer-outer-petals"
          initial={isBlooming ? { scale: 0.12, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={isBlooming ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{
            duration: 0.95,
            delay: isBlooming ? bloomDelay : 0,
            ease: [0.34, 1.45, 0.64, 1], // natural spring blooming
          }}
        >
          {outerAngles.map((deg, i) => (
            <g key={`outer-petal-${i}`} transform={`rotate(${deg})`} filter={`url(#${petalShadow})`}>
              {/* Petal Blade */}
              <path
                d="M -5.2,-18 C -9,-48 -7.5,-82 0,-98 C 7.5,-82 9,-48 5.2,-18 Z"
                fill={`url(#${gradOuterPetal})`}
              />
              {/* Petal Central Longitudinal Vein */}
              <path
                d="M 0,-20 L 0,-94"
                stroke={`url(#${gradVein})`}
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              {/* Subtle Lateral Highlight Contour */}
              <path
                d="M 2.2,-25 Q 4.2,-60 0,-92"
                stroke="#fffbeb"
                strokeWidth="0.6"
                opacity="0.35"
                fill="none"
              />
            </g>
          ))}
        </motion.g>

        {/* ==========================================================
            LAYER 2: MIDDLE RAY PETALS (36 interlaced petals, slightly shorter)
            Unfurls with slight stagger delay after outer petals
        ========================================================== */}
        <motion.g
          id="layer-middle-petals"
          initial={isBlooming ? { scale: 0.08, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={isBlooming ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: isBlooming ? bloomDelay + 0.18 : 0,
            ease: [0.34, 1.45, 0.64, 1],
          }}
        >
          {middleAngles.map((deg, i) => (
            <g key={`mid-petal-${i}`} transform={`rotate(${deg})`} filter={`url(#${petalShadow})`}>
              {/* Middle Petal Blade */}
              <path
                d="M -4.8,-16 C -8,-44 -6.8,-74 0,-86 C 6.8,-74 8,-44 4.8,-16 Z"
                fill={`url(#${gradMiddlePetal})`}
              />
              {/* Middle Petal Vein */}
              <path
                d="M 0,-18 L 0,-82"
                stroke={`url(#${gradVein})`}
                strokeWidth="1.0"
                strokeLinecap="round"
              />
              {/* Sunny Tip Highlight */}
              <path
                d="M 1.8,-22 Q 3.5,-55 0,-81"
                stroke="#ffffff"
                strokeWidth="0.7"
                opacity="0.4"
                fill="none"
              />
            </g>
          ))}
        </motion.g>

        {/* ==========================================================
            LAYER 3: INNER TRANS-FLORETS (28 dense collar petals)
            Frames the central disc, opens right before the disc expands
        ========================================================== */}
        <motion.g
          id="layer-inner-trans-florets"
          initial={isBlooming ? { scale: 0.05, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={isBlooming ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{
            duration: 0.85,
            delay: isBlooming ? bloomDelay + 0.32 : 0,
            ease: [0.34, 1.5, 0.64, 1],
          }}
        >
          {innerAngles.map((deg, i) => (
            <g key={`inner-floret-${i}`} transform={`rotate(${deg})`}>
              {/* Inner Petal Blade */}
              <path
                d="M -3.8,-12 C -6.2,-28 -5,-46 0,-54 C 5,-46 6.2,-28 3.8,-12 Z"
                fill={`url(#${gradInnerPetal})`}
              />
              {/* Collar Accent */}
              <path
                d="M 0,-14 L 0,-50"
                stroke="#fef08a"
                strokeWidth="0.7"
                opacity="0.5"
                strokeLinecap="round"
              />
            </g>
          ))}
        </motion.g>

        {/* ==========================================================
            LAYER 4: CAPITULUM DISC FLORETS (Fibonacci Textured Center)
            Simulates the complex seed/floret disc of a real gerbera daisy
        ========================================================== */}
        <motion.g
          id="layer-capitulum-disc"
          initial={isBlooming ? { scale: 0.25, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={isBlooming ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: isBlooming ? bloomDelay + 0.1 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Base Disc Cushion Dome */}
          <circle cx="0" cy="0" r="26" fill={`url(#${gradDisc})`} />

          {/* Outer Velvet Disc Collar Ring */}
          <circle
            cx="0"
            cy="0"
            r="25.5"
            fill="none"
            stroke="#b45309"
            strokeWidth="1.2"
            strokeDasharray="1.5 2"
            opacity="0.85"
          />

          {/* Fibonacci Disc Florets Spiral (115 individually shaded florets) */}
          {discFlorets.map((floret) => (
            <circle
              key={`floret-${floret.id}`}
              cx={floret.x}
              cy={floret.y}
              r={floret.r}
              fill={floret.color}
              opacity={floret.opacity}
            />
          ))}

          {/* Golden Pollen Crown Ring around outer margin of disc */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x = 22.8 * Math.cos(rad);
            const y = 22.8 * Math.sin(rad);
            return (
              <circle
                key={`pollen-${i}`}
                cx={x}
                cy={y}
                r="1.1"
                fill="#fde047"
                opacity="0.9"
              />
            );
          })}

          {/* Specular Light Reflection (soft off-center organic sheen) */}
          <ellipse
            cx="-5"
            cy="-7"
            rx="6.5"
            ry="4"
            fill="#fef08a"
            opacity="0.22"
            transform="rotate(-28 -5 -7)"
          />
        </motion.g>
      </svg>
    </div>
  );
};
