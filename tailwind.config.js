/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './App.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',
        primaryLight: '#22C55E',
        navy: '#0F172A',
        bg: '#F8FAFC',
        card: '#FFFFFF',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
        border: '#E5E7EB',
        danger: '#EF4444',
      },
      borderRadius: {
        xl2: '16px',
      },
      boxShadow: {
        soft: '0 6px 20px rgba(15,23,42,0.07)',
      },
    },
  },
  plugins: [],
};
