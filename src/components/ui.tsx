import { useEffect, useRef, useState, type ReactNode } from "react";
import { useProgress } from "../lib/store";
import { IconBolt, IconCheck } from "./icons";

/* ---------- Révélation au scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Compteur animé ---------- */
export function useCountUp(target: number, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/* ---------- Anneau de progression ---------- */
export function ProgressRing({
  value,
  size = 56,
  stroke = 5,
  color = "#0e5a3c",
  children,
}: {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  color?: string;
  children?: ReactNode;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = window.setTimeout(() => setV(value), 60);
    return () => window.clearTimeout(t);
  }, [value]);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(1, Math.max(0, v)))}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.3,0.8,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* ---------- Toasts ---------- */
export function Toasts() {
  const { toasts } = useProgress();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[80] flex flex-col items-center gap-2 px-4 lg:bottom-6 lg:items-end lg:pr-8">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast-in flex items-center gap-3 rounded-lg border border-pine-deep/40 bg-pine-night px-4 py-3 text-paper shadow-xl shadow-pine-night/30"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pine text-paper">
            <IconCheck size={14} />
          </span>
          <span className="text-sm font-medium">{t.text}</span>
          {t.xp !== undefined && (
            <span className="flex items-center gap-1 rounded-md bg-gold/20 px-2 py-0.5 font-mono text-xs font-semibold text-gold">
              <IconBolt size={12} /> +{t.xp} XP
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Barre de progression linéaire ---------- */
export function Bar({ value, color = "var(--color-pine)" }: { value: number; color?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = window.setTimeout(() => setV(value), 60);
    return () => window.clearTimeout(t);
  }, [value]);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/70">
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.min(100, Math.max(0, v * 100))}%`,
          background: color,
          transition: "width 0.9s cubic-bezier(0.3,0.8,0.3,1)",
        }}
      />
    </div>
  );
}
