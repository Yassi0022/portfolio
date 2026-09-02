import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/data/projects';
import { useReducedMotion } from '@/utils/animation';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

const METRIC_ICONS: Record<string, string> = {
  'Model Accuracy': 'chart-line',
  'API Latency': 'clock',
  'Training Time': 'timer',
  'Test Coverage': 'check-circle',
  'ROC-AUC': 'chart-area',
  'Precision': 'target',
  'Features Engineered': 'cogs',
  'Business Impact': 'dollar-sign',
  'API Response Time': 'clock',
  'Matching Algorithm': 'code',
  'Uptime': 'shield-check',
};

function getMetricIcon(label: string): string {
  for (const [key, icon] of Object.entries(METRIC_ICONS)) {
    if (label.includes(key)) return icon;
  }
  return 'chart-bar';
}

function MetricCard({ metric }: { metric: { label: string; value: string; description: string } }) {
  const icon = getMetricIcon(metric.label);
  return (
    <div className="card-elevated text-center group">
      <div className="text-3xl sm:text-4xl font-display font-bold text-accent-primary mb-2 group-hover:text-accent-secondary transition-colors">
        {metric.value}
      </div>
      <div className="font-medium text-text-primary mb-1">{metric.label}</div>
      <div className="text-text-muted text-sm">{metric.description}</div>
    </div>
  );
}

function PipelineStageCard({ stage, index }: { stage: any; index: number }) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary rounded-full" />
      <div className="relative">
        <div className="absolute left-0 top-0 w-4 h-4 rounded-full border-2 border-accent-primary bg-bg-primary z-10" />
        <div className="card-elevated p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge bg-accent-primary/15 text-accent-primary border-accent-primary/30 text-xs">{index + 1}</span>
            <h4 className="font-display font-bold text-text-primary">{stage.name}</h4>
          </div>
          <p className="text-text-secondary text-sm mb-4">{stage.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {stage.technologies.map((tech: string) => (
              <span key={tech} className="badge bg-bg-tertiary text-text-muted border-border text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CaseStudyModal({ project: initialProject, onClose }: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(initialProject);

  useEffect(() => {
    const handleOpenCaseStudy = (e: CustomEvent<Project>) => {
      const proj = e.detail;
      previousActiveElement.current = document.activeElement as HTMLElement;
      setProject(proj);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    };

    window.addEventListener('open-case-study', handleOpenCaseStudy as EventListener);
    return () => {
      window.removeEventListener('open-case-study', handleOpenCaseStudy as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setProject(null);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !project) return null;

  const typeConfig = {
    mlops: { label: 'MLOps', badge: 'badge-tertiary' },
    'data-science': { label: 'Data Science', badge: 'badge-secondary' },
    fullstack: { label: 'Full Stack', badge: 'badge-primary' },
  }[project.type];

  const modalContent = (
    <div
      className="fixed inset-0 z-[50] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-bg-card border border-border rounded-2xl shadow-[0_0_80px_-10px_rgba(0,0,0,0.6)] animate-scale-in"
      >
        <div className="sticky top-0 z-10 bg-bg-card/95 backdrop-blur-2xl border-b border-border flex items-center justify-between p-4 sm:p-6">
          <div>
            <span className={`${typeConfig.badge} mb-2`}>
              {typeConfig.label}
            </span>
            <h2 id="case-study-title" className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
              {project.title} — Case Study
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-all duration-fast"
            aria-label="Close case study"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-10">
          <section aria-labelledby="problem-heading">
            <h3 id="problem-heading" className="font-display text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-primary" />
              Problem & Context
            </h3>
            <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
              {project.longDescription}
            </div>
          </section>

          {project.architectureDiagram && (
            <section aria-labelledby="architecture-heading">
              <h3 id="architecture-heading" className="font-display text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-secondary" />
                System Architecture
              </h3>
              <div className="card-elevated p-6 overflow-x-auto">
                <pre className="font-mono text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {project.architectureDiagram}
                </pre>
                <p className="text-text-muted text-xs mt-4 text-center">
                  Mermaid diagram — render with Mermaid.js for visual diagram
                </p>
              </div>
            </section>
          )}

          <section aria-labelledby="metrics-heading">
            <h3 id="metrics-heading" className="font-display text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-tertiary" />
              Key Metrics & Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.keyMetrics.map((metric, i) => (
                <MetricCard key={i} metric={metric} />
              ))}
            </div>
          </section>

          {project.pipelines && project.pipelines.length > 0 && (
            <section aria-labelledby="pipeline-heading">
              <h3 id="pipeline-heading" className="font-display text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-warn" />
                Pipeline Stages
              </h3>
              <div className="space-y-0">
                {project.pipelines.map((stage, i) => (
                  <PipelineStageCard key={i} stage={stage} index={i} />
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="tech-heading">
            <h3 id="tech-heading" className="font-display text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-primary" />
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <span
                  key={tech}
                  className={`badge ${['badge-primary', 'badge-secondary', 'badge-tertiary'][i % 3]}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section aria-labelledby="links-heading">
            <h3 id="links-heading" className="font-display text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-secondary" />
              Links & Resources
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Live Demo
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default CaseStudyModal;