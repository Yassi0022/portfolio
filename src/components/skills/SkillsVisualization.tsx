import { useEffect, useRef, useState, useMemo } from 'react';
import { SKILLS, SKILL_CATEGORIES, getSkillsByCategory } from '@/data/skills';
import { useReducedMotion } from '@/utils/animation';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetX: number;
  targetY: number;
  color: string;
  connections: string[];
}

const CATEGORY_COLORS = {
  engineering: '#1F6B50',
  ml: '#D99A3D',
  data: '#536158',
};

const CATEGORY_POSITIONS = {
  engineering: { x: 0.25, y: 0.35 },
  ml: { x: 0.75, y: 0.35 },
  data: { x: 0.5, y: 0.75 },
};

export function SkillsVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const reducedMotion = useReducedMotion();
  const lastTimeRef = useRef(0);

  const initializeNodes = useMemo(() => {
    return SKILLS.map(skill => {
      const catPos = CATEGORY_POSITIONS[skill.category as keyof typeof CATEGORY_POSITIONS];
      const baseRadius = 18 + ((skill.proficiency ?? 75) / 100) * 28;
      return {
        ...skill,
        x: catPos.x * 800 + (Math.random() - 0.5) * 180,
        y: catPos.y * 600 + (Math.random() - 0.5) * 180,
        vx: 0,
        vy: 0,
        radius: baseRadius,
        targetX: catPos.x * 800 + (Math.random() - 0.5) * 180,
        targetY: catPos.y * 600 + (Math.random() - 0.5) * 180,
        color: CATEGORY_COLORS[skill.category as keyof typeof CATEGORY_COLORS],
        connections: skill.relatedSkills,
      };
    });
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setWidth(rect.width);
      setHeight(rect.height);
    }

    const handleResize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setWidth(rect.width);
        setHeight(rect.height);
        if (canvasRef.current) {
          const dpr = window.devicePixelRatio || 1;
          canvasRef.current.width = rect.width * dpr;
          canvasRef.current.height = rect.height * dpr;
          canvasRef.current.style.width = `${rect.width}px`;
          canvasRef.current.style.height = `${rect.height}px`;
          const ctx = canvasRef.current.getContext('2d');
          ctx?.scale(dpr, dpr);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setNodes(initializeNodes);
  }, [initializeNodes]);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTimeRef.current) / 16.67, 2);
      lastTimeRef.current = currentTime;

      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      const updatedNodes = nodes.map(node => {
        let newNode = { ...node };

        if (selectedCategory && node.category !== selectedCategory) {
          newNode.targetX = width / 2;
          newNode.targetY = height / 2;
          newNode.radius = Math.max(10, node.radius * 0.35);
        } else {
          const catPos = CATEGORY_POSITIONS[node.category as keyof typeof CATEGORY_POSITIONS];
          newNode.targetX = catPos.x * width + (Math.random() - 0.5) * 120;
          newNode.targetY = catPos.y * height + (Math.random() - 0.5) * 120;
          newNode.radius = 18 + (node.proficiency / 100) * 28;
        }

        const dx = newNode.targetX - newNode.x;
        const dy = newNode.targetY - newNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
          newNode.vx += (dx / dist) * 0.06 * dt;
          newNode.vy += (dy / dist) * 0.06 * dt;
        }

        if (hoveredNode === node.id) {
          const mdx = newNode.targetX - newNode.x;
          const mdy = newNode.targetY - newNode.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150 && mdist > 1) {
            const influence = (1 - mdist / 150) * 0.15 * dt;
            newNode.vx += (mdx / mdist) * influence;
            newNode.vy += (mdy / mdist) * influence;
          }
        }

        newNode.vx *= 0.88;
        newNode.vy *= 0.88;

        newNode.x += newNode.vx * dt;
        newNode.y += newNode.vy * dt;

        newNode.x = Math.max(newNode.radius + 10, Math.min(width - newNode.radius - 10, newNode.x));
        newNode.y = Math.max(newNode.radius + 10, Math.min(height - newNode.radius - 10, newNode.y));

        return newNode;
      });

      const nodeMap = new Map(updatedNodes.map(n => [n.id, n]));

      ctx.strokeStyle = 'rgba(0, 212, 170, 0.06)';
      ctx.lineWidth = 1;

      updatedNodes.forEach(node => {
        if (selectedCategory && node.category !== selectedCategory) return;
        node.connections.forEach(connId => {
          const connNode = nodeMap.get(connId);
          if (!connNode) return;
          if (selectedCategory && connNode.category !== selectedCategory) return;

          const dx = connNode.x - node.x;
          const dy = connNode.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 400) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connNode.x, connNode.y);
            const opacity = Math.max(0.02, 0.08 * (1 - dist / 400));
            ctx.strokeStyle = `rgba(0, 212, 170, ${opacity})`;
            ctx.stroke();
          }
        });
      });

      updatedNodes.forEach(node => {
        const alpha = selectedCategory && node.category !== selectedCategory ? 0.25 : 1;
        const isHovered = hoveredNode === node.id;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHovered ? 6 : 0), 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius
        );
        const baseAlpha = Math.floor(alpha * 180).toString(16).padStart(2, '0');
        const edgeAlpha = Math.floor(alpha * 40).toString(16).padStart(2, '0');
        gradient.addColorStop(0, `${node.color}${baseAlpha}`);
        gradient.addColorStop(0.7, `${node.color}${edgeAlpha}`);
        gradient.addColorStop(1, `${node.color}00`);

        ctx.fillStyle = gradient;
        ctx.fill();

        if (isHovered) {
          ctx.strokeStyle = `${node.color}60`;
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 10, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}20`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(250, 250, 250, ${alpha})`;
        const fontSize = Math.max(10, Math.min(13, node.radius * 0.55));
        ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x, node.y);

        if (isHovered) {
          ctx.fillStyle = `rgba(0, 212, 170, ${alpha})`;
          ctx.font = `500 ${Math.max(9, fontSize - 1)}px "JetBrains Mono", monospace`;
          ctx.fillText(`${node.proficiency}%`, node.x, node.y + node.radius + 16);
        }
      });

      setNodes(updatedNodes);
      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [nodes, width, height, hoveredNode, selectedCategory, reducedMotion, isVisible]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = null;
    for (const node of nodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      if (dx * dx + dy * dy < node.radius * node.radius) {
        found = node.id;
        break;
      }
    }
    setHoveredNode(found);
  };

  const handleMouseLeave = () => setHoveredNode(null);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const node of nodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      if (dx * dx + dy * dy < node.radius * node.radius) {
        const category = node.category;
        setSelectedCategory(selectedCategory === category ? null : category);
        break;
      }
    }
  };

  const hoveredNodeData = nodes.find(n => n.id === hoveredNode);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-[500px] lg:h-[550px] cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="img"
        aria-label="Interactive skills visualization — click nodes to filter by category, hover for details"
      />

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2">
        {SKILL_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          const catHex = CATEGORY_COLORS[cat.id as keyof typeof CATEGORY_COLORS] || '#00d4aa';
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
              className={`badge transition-all duration-300 ${isSelected ? 'font-bold scale-105' : 'hover:scale-105'} ${
                selectedCategory && !isSelected ? 'opacity-40 scale-95' : ''
              }`}
              style={{
                backgroundColor: isSelected ? catHex : `${catHex}15`,
                color: isSelected ? '#0b0f19' : catHex,
                borderColor: isSelected ? catHex : `${catHex}40`,
                boxShadow: isSelected ? `0 0 16px ${catHex}60` : 'none',
              }}
            >
              {cat.label}
            </button>
          );
        })}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 hover:bg-accent-primary/20"
          >
            Show All
          </button>
        )}
      </div>

      {hoveredNode && hoveredNodeData && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 animate-fade-in-fast pointer-events-none">
          <div className="card-glass px-5 py-3 min-w-[220px] text-center shadow-elevated-lg border-accent-primary/30">
            <div className="font-display text-sm font-bold text-text-primary">{hoveredNodeData.name}</div>
            <div className="text-text-secondary text-xs mt-0.5">{SKILL_CATEGORIES.find(c => c.id === hoveredNodeData.category)?.label}</div>
            <div className="text-accent-primary text-[10px] font-mono mt-1 tracking-wider">Proficiency: {hoveredNodeData.proficiency}%</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsVisualization;