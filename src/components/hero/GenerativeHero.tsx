import { useEffect, useRef, useState, useCallback } from 'react';
import { ParticleSystem, createParticleSystem } from './ParticleSystem';
import { CodeRainEffect, createCodeRainEffect } from './CodeRainEffect';
import { useReducedMotion } from '@/utils/animation';

interface GenerativeHeroProps {
  className?: string;
}

export function GenerativeHero({ className = '' }: GenerativeHeroProps) {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const codeCanvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ReturnType<typeof createParticleSystem> | null>(null);
  const codeRainRef = useRef<ReturnType<typeof createCodeRainEffect> | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const prefersReduced = useReducedMotion();
    setReducedMotion(prefersReduced);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted || !isVisible) {
      particleSystemRef.current?.destroy();
      codeRainRef.current?.destroy();
      particleSystemRef.current = null;
      codeRainRef.current = null;
      return;
    }

    if (particleCanvasRef.current) {
      particleSystemRef.current = createParticleSystem();
      particleSystemRef.current.init(particleCanvasRef.current);
      if (reducedMotion) {
        particleSystemRef.current.setReducedMotion(true);
      }
    }

    if (codeCanvasRef.current) {
      codeRainRef.current = createCodeRainEffect();
      codeRainRef.current.init(codeCanvasRef.current);
      if (reducedMotion) {
        codeRainRef.current.setReducedMotion(true);
      }
    }

    return () => {
      particleSystemRef.current?.destroy();
      codeRainRef.current?.destroy();
      particleSystemRef.current = null;
      codeRainRef.current = null;
    };
  }, [mounted, reducedMotion, isVisible]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (particleSystemRef.current && !reducedMotion) {
      const rect = particleCanvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        particleSystemRef.current.setMousePosition(x, y);
      }
    }
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      aria-label="Hero section with data pipeline visualization"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <canvas
          ref={codeCanvasRef}
          className="absolute inset-0 w-full h-full opacity-20"
          aria-hidden="true"
        />
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27 opacity=%270.02%27/%3E%3C/svg%27')" />
      </div>

      <div className="relative z-10 container px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-left lg:pr-12">
              <div className="animate-fade-in animate-delay-100">
                <p className="font-mono text-accent-primary text-sm tracking-widest uppercase mb-4 animate-slide-up">
                  Yassine Hatouf — Data Scientist & Backend Developer
                </p>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up stagger-1">
                Building production
                <br />
                <span className="text-gradient">ML systems</span>
                {' '}
                & scalable backends
              </h1>

              <p className="text-body-lg text-text-secondary max-w-xl mb-8 animate-slide-up stagger-2 leading-relaxed">
                Computer Engineering student & Organizational Psychologist specializing in Machine Learning, Data Analytics, Python, and Scalable Backend Architectures.
              </p>

              <div className="flex flex-col sm:flex-row items-start justify-start gap-4 animate-slide-up stagger-3">
                <a
                  href="/portfolio#projects"
                  className="btn-primary group"
                >
                  View Work
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Yassi0022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 animate-slide-up stagger-4" role="list" aria-label="Focus areas">
                <div className="group">
                  <div className="text-xl sm:text-2xl font-display font-bold text-accent-primary mb-0.5 group-hover:text-accent-secondary transition-colors">
                    Machine Learning
                  </div>
                  <div className="text-text-muted font-mono text-xs">MLOps & Predictive Models</div>
                </div>
                <div className="w-px h-8 bg-border hidden sm:block" />
                <div className="group">
                  <div className="text-xl sm:text-2xl font-display font-bold text-accent-secondary mb-0.5 group-hover:text-accent-tertiary transition-colors">
                    Backend Engineering
                  </div>
                  <div className="text-text-muted font-mono text-xs">Python, FastAPI & Microservices</div>
                </div>
                <div className="w-px h-8 bg-border hidden sm:block" />
                <div className="group">
                  <div className="text-xl sm:text-2xl font-display font-bold text-accent-tertiary mb-0.5 group-hover:text-accent-primary transition-colors">
                    People Analytics
                  </div>
                  <div className="text-text-muted font-mono text-xs">Psychometrics & Data Insights</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in animate-delay-500 lg:animate-slide-up">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-tertiary/10 rounded-[24px] blur-3xl animate-pulse-soft" />
                <div className="relative bg-bg-card border border-border rounded-[24px] p-1 overflow-hidden">
                  <div className="bg-bg-tertiary rounded-[20px] p-6 min-h-[320px] flex flex-col items-center justify-center">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <div className="flex items-center gap-3 text-text-muted font-mono text-xs">
                        <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse-soft" />
                        <span>LIVE PIPELINE</span>
                        <span className="text-accent-primary">▶ RUNNING</span>
                      </div>
                      <div className="flex gap-3" style={{ perspective: '1000px' }}>
                        <PipelineStage name="INGEST" color="accent-primary" delay={0} />
                        <PipelineStage name="TRANSFORM" color="accent-secondary" delay={100} />
                        <PipelineStage name="TRAIN" color="accent-tertiary" delay={200} />
                        <PipelineStage name="SERVE" color="accent-warn" delay={300} />
                      </div>
                      <div className="grid grid-cols-4 gap-4 w-full max-w-xs mt-4">
                        <MetricBox label="ACCURACY" value="0.87" color="accent-primary" />
                        <MetricBox label="LATENCY" value="42ms" color="accent-secondary" />
                        <MetricBox label="THROUGHPUT" value="10M/day" color="accent-tertiary" />
                        <MetricBox label="COVERAGE" value="94%" color="accent-warn" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-accent-primary/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-bl from-accent-tertiary/20 to-transparent rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float" aria-hidden="true">
          <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function PipelineStage({ name, color, delay }: { name: string; color: string; delay: number }) {
  return (
    <div className="relative" style={{ animationDelay: `${delay}ms` }}>
      <div className={`w-24 h-24 rounded-xl border-2 border-${color}/30 bg-${color}/5 flex items-center justify-center transition-all duration-500 hover:border-${color} hover:bg-${color}/10 hover:scale-105`}>
        <span className="font-mono text-xs font-bold text-text-primary tracking-wider">{name}</span>
      </div>
      <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-transparent to-transparent" />
      {name !== 'SERVE' && (
        <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-1 h-4 border-r-2 border-dashed border-border animate-pulse-soft" />
      )}
    </div>
  );
}

function MetricBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`text-center p-3 bg-${color}/5 border border-${color}/10 rounded-xl hover:border-${color}/30 hover:bg-${color}/10 transition-all duration-300`}>
      <div className={`font-display text-lg font-bold text-${color}`}>{value}</div>
      <div className="font-mono text-[10px] text-text-muted tracking-wider mt-0.5">{label}</div>
    </div>
  );
}

export default GenerativeHero;