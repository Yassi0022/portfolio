export interface CodeToken {
  text: string;
  type: 'keyword' | 'function' | 'string' | 'number' | 'comment' | 'type' | 'operator' | 'punctuation' | 'variable';
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fontSize: number;
}

const CODE_SNIPPETS = [
  `async function trainModel(data: Dataset): Promise<Model> {
  const pipeline = createPipeline()
    .extract(data)
    .transform(scaleFeatures)
    .validate(schema)
    .train(XGBoost, { n_estimators: 200, max_depth: 6 })
    .evaluate(metrics.r2_score)
    .register("housing-v1");
  return pipeline.execute();
}`,
  `@RestController
@RequestMapping("/api/matching")
public class MatchingController {
  @PostMapping("/find")
  public ResponseResult<MatchResult> findMatches(
      @RequestBody MatchRequest request) {
    return matchingService.findCompatibleUsers(
      request.getUserId(), request.getPreferences());
  }
}`,
  `with mlflow.start_run():
    mlflow.log_params(params)
    mlflow.log_metrics({"r2": 0.87, "rmse": 0.42})
    mlflow.xgboost.log_model(model, "model")
    mlflow.register_model(
      f"runs:/{mlflow.active_run().info.run_id}/model",
      "CaliforniaHousing"
    )`,
  `SELECT u.id, u.personality_traits,
       COUNT(DISTINCT m.id) as match_count
FROM users u
LEFT JOIN matches m ON u.id = m.user_id
WHERE u.active = true
GROUP BY u.id
HAVING match_count > 0
ORDER BY match_count DESC;`,
  `class FeatureStore:
    def get_features(self, entity_ids: List[str]) -> pd.DataFrame:
        return self.redis.mget([
            f"features:{eid}" for eid in entity_ids
        ])
    def compute_fresh(self, entity_id: str) -> Dict:
        return self.pipeline.transform(
            self.raw_data[entity_id]
        )`,
  `docker build -t mlops-pipeline:latest .
docker run -d --name api \
  -p 8000:8000 \
  -e MLFLOW_TRACKING_URI=$MLFLOW_URI \
  mlops-pipeline:latest`,
];

const TOKEN_PATTERNS = [
  { pattern: /\b(async|function|const|let|var|return|if|else|for|while|class|interface|type|import|export|from|as|public|private|protected|static|void|new|this|super|extends|implements)\b/g, type: 'keyword' as const },
  { pattern: /\b(trainModel|createPipeline|extract|transform|validate|train|evaluate|register|execute|findMatches|matchingService|log_params|log_metrics|log_model|register_model|get_features|compute_fresh|transform|pipeline)\b/g, type: 'function' as const },
  { pattern: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g, type: 'string' as const },
  { pattern: /\b\d+(\.\d+)?\b/g, type: 'number' as const },
  { pattern: /\/\/.*|\/\*[\s\S]*?\*\/|#.*/g, type: 'comment' as const },
  { pattern: /\b(Dataset|Model|Promise|MatchRequest|MatchResult|ResponseResult|List|Dict|DataFrame|pd\.DataFrame)\b/g, type: 'type' as const },
  { pattern: /[=+\-*/<>!&|^%?:.,;{}()[\]@]/g, type: 'operator' as const },
  { pattern: /\b(data|params|model|pipeline|request|userId|preferences|entity_ids|entity_id|schema|metrics|features|raw_data|mlflow|run|active_run|info|run_id)\b/g, type: 'variable' as const },
];

export class CodeRainEffect {
  private tokens: CodeToken[] = [];
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private lastTime: number = 0;
  private width: number = 0;
  private height: number = 0;
  private reducedMotion: boolean = false;
  private spawnInterval: ReturnType<typeof setInterval> | null = null;
  private charWidth: number = 0;
  private lineHeight: number = 0;

  constructor() {
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
    this.measureFont();
    this.setupEventListeners();

    if (!this.reducedMotion) {
      this.startSpawning();
      this.start();
    } else {
      this.renderStatic();
    }
  }

  private measureFont(): void {
    if (!this.ctx) return;
    this.ctx.font = '12px "JetBrains Mono", monospace';
    this.charWidth = this.ctx.measureText('A').width;
    this.lineHeight = 18;
  }

  private setupEventListeners(): void {
    const handleResize = () => this.resize();
    window.addEventListener('resize', handleResize);
    this.cleanup = () => window.removeEventListener('resize', handleResize);
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
    this.width = rect.width;
    this.height = rect.height;
    this.measureFont();
  }

  private tokenizeCode(code: string): { text: string; type: CodeToken['type'] }[] {
    const tokens: { text: string; type: CodeToken['type'] }[] = [];
    let remaining = code;
    let position = 0;

    while (remaining.length > 0) {
      let matched = false;
      let bestMatch: { match: RegExpMatchArray; type: CodeToken['type']; index: number } | null = null;

      for (const { pattern, type } of TOKEN_PATTERNS) {
        pattern.lastIndex = 0;
        const match = pattern.exec(remaining);
        if (match && match.index === 0) {
          if (!bestMatch || match[0].length > bestMatch.match[0].length) {
            bestMatch = { match, type, index: 0 };
          }
          matched = true;
        }
      }

      if (matched && bestMatch) {
        tokens.push({ text: bestMatch.match[0], type: bestMatch.type });
        remaining = remaining.slice(bestMatch.match[0].length);
      } else {
        const char = remaining[0];
        tokens.push({ text: char, type: 'punctuation' });
        remaining = remaining.slice(1);
      }
    }

    return tokens;
  }

  private spawnTokenLine(): void {
    if (this.tokens.length > 300) return;

    const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
    const tokenized = this.tokenizeCode(snippet);
    const startX = Math.random() * (this.width - 200) + 100;
    const startY = -50 - Math.random() * 200;
    const baseSpeed = 0.5 + Math.random() * 1.5;
    const fontSize = 11 + Math.random() * 3;

    let xOffset = 0;
    for (const { text, type } of tokenized) {
      if (text.trim() === '' && type !== 'string') continue;

      const tokenWidth = this.ctx?.measureText(text).width ?? text.length * this.charWidth;

      this.tokens.push({
        text,
        type,
        x: startX + xOffset,
        y: startY,
        speed: baseSpeed * (0.8 + Math.random() * 0.4),
        opacity: 0.1 + Math.random() * 0.3,
        fontSize,
      });

      xOffset += tokenWidth;
      if (xOffset > 600) break;
    }
  }

  private startSpawning(): void {
    this.spawnInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        this.spawnTokenLine();
      }
    }, 2000);
  }

  private updateTokens(deltaTime: number): void {
    const dt = deltaTime / 16.67;

    for (let i = this.tokens.length - 1; i >= 0; i--) {
      const token = this.tokens[i];
      token.y += token.speed * dt * 2;
      token.opacity = Math.max(0, token.opacity - 0.0005 * dt);

      if (token.y > this.height + 50 || token.opacity <= 0) {
        this.tokens.splice(i, 1);
      }
    }
  }

  private getTokenColor(type: CodeToken['type']): string {
    const colors: Record<CodeToken['type'], string> = {
      keyword: '#c586c0',
      function: '#dcdcaa',
      string: '#ce9178',
      number: '#b5cea8',
      comment: '#6a9955',
      type: '#4ec9b0',
      operator: '#d4d4d4',
      punctuation: '#808080',
      variable: '#9cdcfe',
    };
    return colors[type] || '#d4d4d4';
  }

  private render(): void {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.font = `${12}px "JetBrains Mono", monospace`;
    this.ctx.textBaseline = 'top';

    for (const token of this.tokens) {
      const color = this.getTokenColor(token.type);
      const alpha = Math.floor(token.opacity * 255).toString(16).padStart(2, '0');
      this.ctx.fillStyle = `${color}${alpha}`;
      this.ctx.font = `${token.fontSize}px "JetBrains Mono", monospace`;
      this.ctx.fillText(token.text, token.x, token.y);
    }
  }

  private renderStatic(): void {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.font = '12px "JetBrains Mono", monospace';
    this.ctx.textBaseline = 'top';

    for (let i = 0; i < 20; i++) {
      const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      const lines = snippet.split('\n');
      const startX = Math.random() * (this.width - 400) + 200;
      const startY = Math.random() * this.height;

      lines.forEach((line, lineIndex) => {
        const tokenized = this.tokenizeCode(line);
        let xOffset = 0;
        for (const { text, type } of tokenized) {
          if (text.trim() === '') continue;
          const color = this.getTokenColor(type);
          this.ctx!.fillStyle = `${color}30`;
          this.ctx!.fillText(text, startX + xOffset, startY + lineIndex * this.lineHeight);
          xOffset += this.ctx!.measureText(text).width;
        }
      });
    }
  }

  private animate(currentTime: number): void {
    if (!this.lastTime) this.lastTime = currentTime;
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.updateTokens(deltaTime);
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
    if (this.spawnInterval !== null) {
      clearInterval(this.spawnInterval);
      this.spawnInterval = null;
    }
  }

  destroy(): void {
    this.stop();
    this.cleanup();
    this.tokens = [];
    this.canvas = null;
    this.ctx = null;
  }

  setReducedMotion(reduced: boolean): void {
    this.reducedMotion = reduced;
    if (reduced) {
      this.stop();
      this.renderStatic();
    } else {
      this.startSpawning();
      this.start();
    }
  }
}

export function createCodeRainEffect(): CodeRainEffect {
  return new CodeRainEffect();
}