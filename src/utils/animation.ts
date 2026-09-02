export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function usePrefersContrast(): 'more' | 'less' | 'no-preference' {
  if (typeof window === 'undefined') return 'no-preference';
  const mediaQuery = window.matchMedia('(prefers-contrast: more)');
  if (mediaQuery.matches) return 'more';
  const lessQuery = window.matchMedia('(prefers-contrast: less)');
  if (lessQuery.matches) return 'less';
  return 'no-preference';
}

export function staggerDelay(index: number, baseDelay = 100, maxDelay = 800): number {
  return Math.min(baseDelay * index, maxDelay);
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function easeSpring(t: number): number {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export interface AnimationFrameCallback {
  (time: number): void;
}

export function createAnimationLoop(
  callback: AnimationFrameCallback,
  targetFps = 60
): { start: () => void; stop: () => void } {
  let animationId: number | null = null;
  let lastTime = 0;
  const frameInterval = 1000 / targetFps;

  function loop(currentTime: number) {
    if (currentTime - lastTime >= frameInterval) {
      callback(currentTime);
      lastTime = currentTime;
    }
    animationId = requestAnimationFrame(loop);
  }

  return {
    start: () => {
      if (animationId === null) {
        animationId = requestAnimationFrame(loop);
      }
    },
    stop: () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
  };
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

export function observeElements(
  selector: string,
  onEnter: (element: Element) => void,
  onLeave?: (element: Element) => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  const observer = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onEnter(entry.target);
      } else if (onLeave) {
        onLeave(entry.target);
      }
    });
  }, options);

  if (observer) {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  }

  return observer;
}