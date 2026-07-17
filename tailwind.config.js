/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Flexo Soft Medium"', 'system-ui', 'sans-serif'],
        mono: ['"Flexo Soft Medium"', 'system-ui', 'sans-serif'],
        script: ['Scriptina', 'cursive'],
        heading: ["'Instrument Serif'", 'serif'],
        body: ["'Barlow'", 'sans-serif'],
        inter: ["'Inter'", 'sans-serif'],
      },
      colors: {
        landing: {
          surface: 'rgba(255,255,255,0.10)',
          'surface-hover': 'rgba(255,255,255,0.16)',
        },
        border: 'rgba(255,255,255,0.10)',
        foreground: 'hsl(0 0% 100%)',
        background: '#000000',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
