import { createIntersectionObserver } from './animation';

export interface ScrollSpyOptions {
  rootMargin?: string;
  threshold?: number | number[];
  onEnter?: (element: Element) => void;
  onLeave?: (element: Element) => void;
}

export function createScrollSpy(
  selector: string,
  options: ScrollSpyOptions = {}
): IntersectionObserver | null {
  const { rootMargin = '0px 0px -50% 0px', threshold = 0, onEnter, onLeave } = options;

  const observer = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && onEnter) {
        onEnter(entry.target);
      } else if (!entry.isIntersecting && onLeave) {
        onLeave(entry.target);
      }
    });
  }, { rootMargin, threshold });

  if (observer) {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  }

  return observer;
}

export function smoothScrollTo(
  target: string | Element,
  offset = 0,
  duration = 500
): Promise<void> {
  return new Promise(resolve => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) {
      resolve();
      return;
    }

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutCubic(progress);
      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(animation);
  });
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function getScrollProgress(): number {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  return scrollHeight > 0 ? scrollTop / scrollHeight : 0;
}

export function isElementInViewport(
  element: Element,
  threshold = 0
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = (rect.top <= windowHeight * (1 - threshold)) && ((rect.top + rect.height) >= windowHeight * threshold);
  const horInView = (rect.left <= windowWidth * (1 - threshold)) && ((rect.left + rect.width) >= windowWidth * threshold);

  return vertInView && horInView;
}

export function getElementViewportProgress(element: Element): number {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const elementTop = rect.top;
  const elementBottom = rect.bottom;
  const elementHeight = rect.height;

  if (elementBottom <= 0) return 1;
  if (elementTop >= windowHeight) return 0;

  const visibleTop = Math.max(0, elementTop);
  const visibleBottom = Math.min(windowHeight, elementBottom);
  const visibleHeight = visibleBottom - visibleTop;

  return visibleHeight / elementHeight;
}

export function parallax(
  element: HTMLElement,
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
): () => void {
  let ticking = false;

  function update() {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distance = (elementCenter - viewportCenter) / windowHeight;
    const offset = distance * speed * 100;

    if (direction === 'vertical') {
      element.style.transform = `translate3d(0, ${offset}px, 0)`;
    } else {
      element.style.transform = `translate3d(${offset}px, 0, 0)`;
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  return () => window.removeEventListener('scroll', onScroll);
}

export function createScrollProgressIndicator(
  selector: string,
  onProgress: (progress: number) => void
): () => void {
  const element = document.querySelector(selector);
  if (!element) return () => {};

  let ticking = false;

  function update() {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const progress = getElementViewportProgress(element);
    onProgress(progress);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  return () => window.removeEventListener('scroll', onScroll);
}