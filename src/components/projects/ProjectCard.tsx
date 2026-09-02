import { useState, useRef, useEffect } from 'react';
import type { Project } from '@/data/projects';
import { useReducedMotion, staggerDelay } from '@/utils/animation';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseStudy: (project: Project) => void;
}

const TYPE_COLORS = {
  mlops: 'accent-ai',
  'data-science': 'accent-data',
  fullstack: 'accent-code',
} as const;

const TYPE_LABELS = {
  mlops: 'MLOps',
  'data-science': 'Data Science',
  fullstack: 'Full Stack',
} as const;

export function ProjectCard({ project, index, onOpenCaseStudy }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!reducedMotion) {
      const timer = setTimeout(() => {
        cardRef.current?.classList.add('animate-in');
      }, staggerDelay(index, 150, 600));
      return () => clearTimeout(timer);
    } else {
      cardRef.current?.classList.add('animate-in');
    }
  }, [index, reducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenCaseStudy(project);
    }
  };

  const typeColor = TYPE_COLORS[project.type];
  const typeLabel = TYPE_LABELS[project.type];

  return (
    <article
      ref={cardRef}
      className={`
        relative group card overflow-hidden
        ${isHovered || isFocused ? 'shadow-[0_0_40px_-5px_rgba(86,156,214,0.3)]' : ''}
        transition-all duration-500 ease-out
        opacity-0 translate-y-8
        animate-in:animate-[fadeIn_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={() => onOpenCaseStudy(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
    >
      <div
        className={`absolute inset-0 border-2 transition-opacity duration-500 ${
          isHovered || isFocused ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className={`absolute inset-0 bg-gradient-to-br from-${typeColor}/20 to-transparent`} />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span
            className={`badge badge-${project.type} transform transition-all duration-300 group-hover:scale-105`}
          >
            {typeLabel}
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="p-2 text-text-muted hover:text-text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
              }}
              aria-label={`View ${project.title} on GitHub`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-code transition-colors">
          {project.title}
        </h3>

        <p className="text-text-secondary mb-6 leading-relaxed">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Tech stack">
          {project.stack.slice(0, 6).map((tech, i) => (
            <span
              key={tech}
              className="badge bg-bg-tertiary text-text-secondary border-border text-xs"
              role="listitem"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="badge bg-bg-tertiary text-text-muted border-border text-xs">
              +{project.stack.length - 6} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {project.keyMetrics[0]?.value || '—'}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {project.keyMetrics[1]?.value || '—'}
            </span>
          </div>

          <span className="font-mono text-xs text-accent-code group-hover:translate-x-1 transition-transform">
            Case Study →
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;