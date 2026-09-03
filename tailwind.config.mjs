/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        page: '#F7F8F5',
        surface: '#FFFFFF',
        'surface-subtle': '#F1F2EE',
        ink: '#17211B',
        'ink-secondary': '#536158',
        'ink-muted': '#8D9A94',
        border: '#DDE4DC',
        'border-subtle': '#EBEDE8',
        'accent-green': '#1F6B50',
        'accent-sage': '#A8C3AE',
        'accent-amber': '#D99A3D',
        'accent-amber-soft': '#F0E5C0',
        'dark-section': '#17352A',
        'dark-section-text': '#E8F0EC',
      },
      fontFamily: {
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3.5rem',
        '6xl': '4.5rem',
      },
      spacing: {
        '0.5': '0.125rem', '1': '0.25rem', '2': '0.5rem',
        '3': '0.75rem', '4': '1rem', '5': '1.25rem', '6': '1.5rem',
        '8': '2rem', '10': '2.5rem', '12': '3rem', '16': '4rem',
        '20': '5rem', '24': '6rem', '32': '8rem', '40': '10rem', '48': '12rem',
      },
      borderRadius: {
        'none': '0', 'sm': '4px', 'DEFAULT': '8px', 'md': '12px',
        'lg': '16px', 'xl': '24px', 'full': '9999px',
      },
      maxWidth: {
        'content': '1120px', 'wide': '1240px',
      },
    },
  },
  plugins: [],
};
