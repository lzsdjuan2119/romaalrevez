/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#070512',
          900: '#0c0822',
          850: '#120d2f',
          800: '#1a133e',
          700: '#261b55',
          600: '#35266e',
        },
        gerbera: {
          light: '#fef08a',
          DEFAULT: '#facc15',
          warm: '#f59e0b',
          deep: '#d97706',
          glow: '#fbbf24',
          core: '#78350f',
          darkcore: '#451a03',
        },
        coral: {
          light: '#fecdd3',
          DEFAULT: '#fb7185',
          deep: '#e11d48',
        },
        foliage: {
          light: '#84cc16',
          DEFAULT: '#4d7c0f',
          deep: '#365314',
        }
      },
      fontFamily: {
        script: ['"Caveat"', 'cursive'],
        serifDisplay: ['"Playfair Display"', 'serif'],
        sans: ['"Quicksand"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'twinkle-slow': 'twinkle 4s ease-in-out infinite',
        'twinkle-fast': 'twinkle 2.5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite alternate',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(250, 204, 21, 0.3)' },
          '50%': { boxShadow: '0 0 35px rgba(250, 204, 21, 0.7)' },
        },
        sway: {
          '0%': { transform: 'rotate(-4deg)' },
          '100%': { transform: 'rotate(4deg)' },
        }
      }
    },
  },
  plugins: [],
}
