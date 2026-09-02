if (typeof window === 'undefined') {
  // Server-side, do nothing
} else {
  if (!document.startViewTransition) {
    console.log('View Transitions API not supported');
  }

  document.addEventListener('astro:after-swap', () => {
    document.documentElement.classList.add('dark');
  });

  document.addEventListener('astro:page-load', () => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', isDark);
  });
}