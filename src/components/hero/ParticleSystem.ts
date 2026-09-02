export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  stage: 0 | 1 | 2; // 0: ingestion, 1: transformation, 2: inference
  life: number;
  maxLife: number;
  trail: { x: number; y: number }[];
}

export interface PipelineConfig {
  width: number;
  height: number;
  particleCount: number;
  stages: {
    x: number;
    width: number;
    color: string;
    pullStrength: number;
    organizeStrength: number;
  }[];
}

export const DEFAULT_PIPELINE_CONFIG: PipelineConfig = {
  width: 1920,
  height: 600,
  particleCount: 2000,
  stages: [
    {
      x: 0.15,
      width: 0.25,
      color: '#4ec9b0', // Teal - data ingestion
      pullStrength: 0.02,
      organizeStrength: 0.005,
    },
    {
      x: 0.45,
      width: 0.25,
      color: '#569cd6', // Blue - transformation
      pullStrength: 0.05,
      organizeStrength: 0.02,
    },
    {
      x: 0.75,
      width: 0.2,
      color: '#c586c0', // Purple - inference
      pullStrength: 0.08,
      organizeStrength: 0.05,
    },
  ],
};

export class ParticleSystem {
  private particles: Particle[] = [];
  private config: PipelineConfig;
  private mouseX: number = -1;
  private mouseY: number = -1;
  private mouseInfluence: number = 0;
  private animationId: number | null = null;
  private lastTime: number = 0;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private worker: Worker | null = null;
  private useWorker: boolean = false;
  private reducedMotion: boolean = false;

  constructor(config: Partial<PipelineConfig> = {}) {
    this.config = { ...DEFAULT_PIPELINE_CONFIG, ...config };
    this.reducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });

    if (!this.ctx) {
      throw new Error('Could not get canvas context');
    }

    this.resize();
    this.createParticles();
    this.setupEventListeners();

    if (!this.reducedMotion) {
      this.start();
    } else {
      this.renderStatic();
    }
  }

  private createParticles(): void {
    const { width, height, particleCount, stages } = this.config;

    for (let i = 0; i < particleCount; i++) {
      const stageIndex = Math.floor(Math.random() * stages.length);
      const stage = stages[stageIndex];
      const stageX = stage.x * width;
      const stageWidth = stage.width * width;

      this.particles.push({
        x: stageX + Math.random() * stageWidth,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: stage.color,
        stage: stageIndex as 0 | 1 | 2,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 200,
        trail: [],
      });
    }
  }

  private setupEventListeners(): void {
    if (!this.canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = this.canvas!.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.mouseInfluence = 1;
    };

    const handleMouseLeave = () => {
      this.mouseInfluence = 0;
      this.mouseX = -1;
      this.mouseY = -1;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = this.canvas!.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      this.createBurst(clickX, clickY);
    };

    const handleResize = () => this.resize();

    this.canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    this.canvas.addEventListener('mouseleave', handleMouseLeave);
    this.canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    this.cleanup = () => {
      this.canvas?.removeEventListener('mousemove', handleMouseMove);
      this.canvas?.removeEventListener('mouseleave', handleMouseLeave);
      this.canvas?.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }

  private cleanup: () => void = () => {};

  private resize(): void {
    if (!this.canvas || !this.ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.ctx.scale(dpr, dpr);
    this.config.width = rect.width;
    this.config.height = rect.height;
  }

  private createBurst(x: number, y: number): void {
    const burstCount = 30;
    const { stages } = this.config;

    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount;
      const speed = Math.random() * 8 + 4;
      const stageIndex = Math.floor(Math.random() * stages.length);
      const stage = stages[stageIndex];

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 2,
        color: stage.color,
        stage: stageIndex as 0 | 1 | 2,
        life: 0,
        maxLife: 60,
        trail: [],
      });
    }

    if (this.particles.length > this.config.particleCount * 1.5) {
      this.particles = this.particles.slice(-this.config.particleCount);
    }
  }

  private updateParticles(deltaTime: number): void {
    const { width, height, stages } = this.config;
    const dt = deltaTime / 16.67;

    for (const particle of this.particles) {
      const stage = stages[particle.stage];
      const stageCenterX = stage.x * width + (stage.width * width) / 2;
      const stageCenterY = height / 2;

      particle.trail.unshift({ x: particle.x, y: particle.y });
      if (particle.trail.length > 8) particle.trail.pop();

      const dx = stageCenterX - particle.x;
      const dy = stageCenterY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 1) {
        particle.vx += (dx / distance) * stage.pullStrength * dt;
        particle.vy += (dy / distance) * stage.pullStrength * dt;
      }

      if (particle.stage === 0) {
        particle.vx += (Math.random() - 0.5) * 0.1 * dt;
        particle.vy += (Math.random() - 0.5) * 0.1 * dt;
      } else if (particle.stage === 1) {
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      } else {
        particle.vx *= 0.95;
        particle.vy *= 0.95;
      }

      if (this.mouseInfluence > 0 && this.mouseX >= 0) {
        const mdx = this.mouseX - particle.x;
        const mdy = this.mouseY - particle.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 200 && mdist > 1) {
          const influence = (1 - mdist / 200) * 0.3 * dt;
          particle.vx += (mdx / mdist) * influence;
          particle.vy += (mdy / mdist) * influence;
        }
      }

      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;

      particle.life++;

      if (particle.life > particle.maxLife) {
        this.resetParticle(particle);
      }

      if (particle.x < -50) particle.x = width + 50;
      if (particle.x > width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = height + 50;
      if (particle.y > height + 50) particle.y = -50;
    }
  }

  private resetParticle(particle: Particle): void {
    const { width, height, stages } = this.config;
    const stageIndex = Math.floor(Math.random() * stages.length);
    const stage = stages[stageIndex];
    const stageX = stage.x * width;
    const stageWidth = stage.width * width;

    particle.x = stageX + Math.random() * stageWidth;
    particle.y = Math.random() * height;
    particle.vx = (Math.random() - 0.5) * 0.5;
    particle.vy = (Math.random() - 0.5) * 0.5;
    particle.radius = Math.random() * 2 + 1;
    particle.color = stage.color;
    particle.stage = stageIndex as 0 | 1 | 2;
    particle.life = 0;
    particle.maxLife = 100 + Math.random() * 200;
    particle.trail = [];
  }

  private render(): void {
    if (!this.ctx || !this.canvas) return;

    const { width, height } = this.config;

    this.ctx.clearRect(0, 0, width, height);

    this.drawPipelineBackground();

    for (const particle of this.particles) {
      this.drawParticle(particle);
    }

    this.drawStageLabels();
  }

  private drawPipelineBackground(): void {
    if (!this.ctx) return;

    const { width, height, stages } = this.config;

    for (const stage of stages) {
      const x = stage.x * width;
      const w = stage.width * width;

      const gradient = this.ctx.createLinearGradient(x, 0, x + w, 0);
      gradient.addColorStop(0, `${stage.color}08`);
      gradient.addColorStop(0.5, `${stage.color}15`);
      gradient.addColorStop(1, `${stage.color}08`);

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(x, 0, w, height);

      this.ctx.strokeStyle = `${stage.color}30`;
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([10, 10]);
      this.ctx.beginPath();
      this.ctx.moveTo(x + w / 2, height * 0.15);
      this.ctx.lineTo(x + w / 2, height * 0.85);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }
  }

  private drawParticle(particle: Particle): void {
    if (!this.ctx) return;

    const alpha = 1 - particle.life / particle.maxLife;

    if (particle.trail.length > 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(particle.trail[particle.trail.length - 1].x, particle.trail[particle.trail.length - 1].y);
      for (let i = particle.trail.length - 2; i >= 0; i--) {
        this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
      }
      this.ctx.strokeStyle = `${particle.color}${Math.floor(alpha * 100).toString(16).padStart(2, '0')}`;
      this.ctx.lineWidth = particle.radius * 0.5;
      this.ctx.lineCap = 'round';
      this.ctx.stroke();
    }

    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
    this.ctx.fill();

    if (particle.stage === 2) {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
      this.ctx.fillStyle = `${particle.color}10`;
      this.ctx.fill();
    }
  }

  private drawStageLabels(): void {
    if (!this.ctx) return;

    const { width, height, stages } = this.config;
    const labels = ['INGEST', 'TRANSFORM', 'INFER'];

    this.ctx.font = '11px "JetBrains Mono", monospace';
    this.ctx.textAlign = 'center';

    stages.forEach((stage, i) => {
      const x = stage.x * width + (stage.width * width) / 2;
      const y = height * 0.08;

      this.ctx!.fillStyle = `${stage.color}CC`;
      this.ctx!.fillText(labels[i], x, y);

      this.ctx!.fillStyle = `${stage.color}60`;
      this.ctx!.font = '9px "JetBrains Mono", monospace';
      const desc = ['Raw Data', 'Processing', 'Prediction'][i];
      this.ctx!.fillText(desc, x, y + 14);
      this.ctx!.font = '11px "JetBrains Mono", monospace';
    });
  }

  private renderStatic(): void {
    if (!this.ctx || !this.canvas) return;

    const { width, height } = this.config;

    this.ctx.clearRect(0, 0, width, height);
    this.drawPipelineBackground();

    for (let i = 0; i < Math.min(200, this.particles.length); i++) {
      const particle = this.particles[i];
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${particle.color}80`;
      this.ctx.fill();
    }

    this.drawStageLabels();
  }

  private animate(currentTime: number): void {
    if (!this.lastTime) this.lastTime = currentTime;
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.updateParticles(deltaTime);
    this.render();

    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }

  start(): void {
    if (this.animationId === null && !this.reducedMotion) {
      this.lastTime = 0;
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  destroy(): void {
    this.stop();
    this.cleanup();
    this.particles = [];
    this.canvas = null;
    this.ctx = null;
  }

  setReducedMotion(reduced: boolean): void {
    this.reducedMotion = reduced;
    if (reduced) {
      this.stop();
      this.renderStatic();
    } else {
      this.start();
    }
  }

  setMousePosition(x: number, y: number): void {
    this.mouseX = x;
    this.mouseY = y;
    this.mouseInfluence = 1;
  }

  setParticleCount(count: number): void {
    const currentCount = this.particles.length;
    if (count > currentCount) {
      for (let i = currentCount; i < count; i++) {
        const { width, height, stages } = this.config;
        const stageIndex = Math.floor(Math.random() * stages.length);
        const stage = stages[stageIndex];
        const stageX = stage.x * width;
        const stageWidth = stage.width * width;

        this.particles.push({
          x: stageX + Math.random() * stageWidth,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          color: stage.color,
          stage: stageIndex as 0 | 1 | 2,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 200,
          trail: [],
        });
      }
    } else if (count < currentCount) {
      this.particles = this.particles.slice(0, count);
    }
  }
}

export function createParticleSystem(config?: Partial<PipelineConfig>): ParticleSystem {
  return new ParticleSystem(config);
}