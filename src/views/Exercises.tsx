import { useMemo, useState } from "react";
import { EXERCISES, XP, type Exercise } from "../data/content";
import { useProgress } from "../lib/store";
import { Reveal } from "../components/ui";
import {
  IconArrow,
  IconCheck,
  IconChevronL,
  IconClose,
  IconInfo,
  IconPen,
  IconRefresh,
  IconScale,
} from "../components/icons";

type Inputs = Record<number, { d: string; c: string }>;

export default function Exercises() {
  const { progress, completeExercise } = useProgress();
  const [openId, setOpenId] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Inputs>({});
  const [result, setResult] = useState<"ok" | "ko" | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const ex = useMemo(() => EXERCISES.find((e) => e.id === openId) ?? null, [openId]);

  const open = (e: Exercise) => {
    setOpenId(e.id);
    setInputs({});
    setResult(null);
    setShowSolution(false);
    setShowHint(false);
    window.scrollTo({ top: 0 });
  };

  const parse = (s: string) => {
    const n = parseFloat(s.replace(/\s/g, "").replace(",", "."));
    return isNaN(n) ? 0 : n;
  };

  const totals = useMemo(() => {
    if (!ex) return { d: 0, c: 0 };
    let d = 0;
    let c = 0;
    ex.rows.forEach((_, i) => {
      d += parse(inputs[i]?.d ?? "");
      c += parse(inputs[i]?.c ?? "");
    });
    return { d, c };
  }, [ex, inputs]);

  const balanced = Math.abs(totals.d - totals.c) < 0.005 && totals.d > 0;

  const check = () => {
    if (!ex) return;
    const ok = ex.rows.every((r, i) => {
      const d = parse(inputs[i]?.d ?? "");
      const c = parse(inputs[i]?.c ?? "");
      return Math.abs(d - (r.d ?? 0)) < 0.005 && Math.abs(c - (r.c ?? 0)) < 0.005;
    });
    setResult(ok ? "ok" : "ko");
    if (ok) completeExercise(ex.id);
  };

  const fmt = (n: number) =>
    n.toLocaleString("fr-FR", { minimumFractionDigits: 0 }) + " €";

  /* ---------- Détail d'un exercice ---------- */
  if (ex) {
    const done = progress.exercisesDone.includes(ex.id);
    return (
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => setOpenId(null)}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-pine"
        >
          <IconChevronL size={16} /> Tous les exercices
        </button>

        <Reveal className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-moss/15 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-moss">
              Exercice d'écriture
            </span>
            {done && (
              <span className="flex items-center gap-1 rounded-md bg-pine px-2.5 py-1 font-mono text-[11px] font-bold text-paper">
                <IconCheck size={12} /> Validé
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {ex.title}
          </h1>
        </Reveal>

        <Reveal delay={80} className="margin-rule seyes mt-5 rounded-xl border border-line bg-card p-6 shadow-sm sm:p-8 sm:pl-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            Pièce justificative
          </p>
          <p className="mt-2 text-lg leading-relaxed">{ex.event}</p>
          <button
            onClick={() => setShowHint((h) => !h)}
            className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-ink"
          >
            <IconInfo size={15} /> {showHint ? "Masquer l'indice" : "Voir l'indice"}
          </button>
          {showHint && (
            <p className="pop-in mt-2 rounded-lg border border-gold/40 bg-gold-soft/50 p-3 text-sm text-ink">
              {ex.hint}
            </p>
          )}
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-5 overflow-hidden rounded-xl border border-line bg-card shadow-sm">
            <div className="grid grid-cols-[1fr_110px_110px] items-center gap-2 border-b border-line bg-pine-night px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-paper sm:grid-cols-[1fr_130px_130px] sm:px-6">
              <span>Compte</span>
              <span className="text-right">Débit</span>
              <span className="text-right text-gold">Crédit</span>
            </div>
            <div className="divide-y divide-line">
              {ex.rows.map((r, i) => {
                const d = parse(inputs[i]?.d ?? "");
                const c = parse(inputs[i]?.c ?? "");
                const rowOk =
                  result !== null &&
                  Math.abs(d - (r.d ?? 0)) < 0.005 &&
                  Math.abs(c - (r.c ?? 0)) < 0.005;
                const rowKo =
                  result === "ko" &&
                  !(Math.abs(d - (r.d ?? 0)) < 0.005 && Math.abs(c - (r.c ?? 0)) < 0.005);
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-[1fr_110px_110px] items-center gap-2 px-4 py-3 transition-colors sm:grid-cols-[1fr_130px_130px] sm:px-6 ${
                      rowOk ? "bg-pine-soft/50" : rowKo ? "bg-credit-soft/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-14 shrink-0 rounded bg-paper px-1.5 py-1 text-center font-mono text-xs font-bold text-pine">
                        {r.account}
                      </span>
                      <span className="text-sm leading-tight">{r.label}</span>
                      {result && (
                        <span className={rowOk ? "text-pine" : "text-credit"}>
                          {rowOk ? <IconCheck size={16} /> : <IconClose size={16} />}
                        </span>
                      )}
                    </div>
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      placeholder="0"
                      value={inputs[i]?.d ?? ""}
                      disabled={result === "ok"}
                      onChange={(e) =>
                        setInputs((inp) => ({
                          ...inp,
                          [i]: { d: e.target.value, c: inp[i]?.c ?? "" },
                        }))
                      }
                      className="tnum w-full rounded-md border border-line bg-paper px-3 py-2 text-right font-mono text-sm outline-none transition-colors focus:border-pine"
                    />
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      placeholder="0"
                      value={inputs[i]?.c ?? ""}
                      disabled={result === "ok"}
                      onChange={(e) =>
                        setInputs((inp) => ({
                          ...inp,
                          [i]: { d: inp[i]?.d ?? "", c: e.target.value },
                        }))
                      }
                      className="tnum w-full rounded-md border border-line bg-paper px-3 py-2 text-right font-mono text-sm outline-none transition-colors focus:border-credit"
                    />
                  </div>
                );
              })}
            </div>
            {/* Totaux */}
            <div className="grid grid-cols-[1fr_110px_110px] items-center gap-2 border-t-2 border-ink/60 bg-paper px-4 py-3 sm:grid-cols-[1fr_130px_130px] sm:px-6">
              <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em]">
                <IconScale size={15} className={balanced ? "text-pine" : "text-ink-soft"} />
                Totaux
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                    balanced ? "bg-pine text-paper" : "bg-line/80 text-ink-soft"
                  }`}
                >
                  {balanced ? "Équilibrée" : "Δ " + fmt(Math.abs(totals.d - totals.c))}
                </span>
              </span>
              <span className="tnum text-right font-mono text-sm font-bold">{fmt(totals.d)}</span>
              <span className="tnum text-right font-mono text-sm font-bold text-credit">
                {fmt(totals.c)}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            {result !== "ok" && (
              <button
                onClick={check}
                disabled={!balanced}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-3.5 font-semibold transition-all ${
                  balanced
                    ? "bg-pine text-paper hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-md active:translate-y-0"
                    : "cursor-not-allowed bg-line/70 text-ink-soft/60"
                }`}
              >
                <IconCheck size={17} /> Vérifier l'écriture
              </button>
            )}
            <button
              onClick={() => open(ex)}
              className="flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-3.5 font-semibold text-ink-soft transition-colors hover:border-pine hover:text-pine"
            >
              <IconRefresh size={16} /> Réinitialiser
            </button>
          </div>

          {result === "ok" && (
            <div className="pop-in mt-4 flex items-center justify-between rounded-xl border border-pine/40 bg-pine-soft p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pine text-paper">
                  <IconCheck size={20} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-pine-deep">
                    Écriture exacte et équilibrée !
                  </p>
                  <p className="text-sm text-pine-deep/80">
                    {done ? "Déjà validée — la régularité avant tout." : `+${XP.exercise} XP crédités au grand livre.`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const idx = EXERCISES.findIndex((e) => e.id === ex.id);
                  const next = EXERCISES[idx + 1];
                  if (next) open(next);
                  else setOpenId(null);
                }}
                className="hidden shrink-0 items-center gap-2 rounded-lg bg-pine px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-deep sm:flex"
              >
                Exercice suivant <IconArrow size={15} />
              </button>
            </div>
          )}

          {result === "ko" && (
            <div className="pop-in mt-4 rounded-xl border border-credit/40 bg-credit-soft p-5">
              <p className="flex items-center gap-2 font-display text-lg font-bold text-credit">
                <IconClose size={20} /> Il y a {ex.rows.filter((r, i) => Math.abs(parse(inputs[i]?.d ?? "") - (r.d ?? 0)) > 0.005 || Math.abs(parse(inputs[i]?.c ?? "") - (r.c ?? 0)) > 0.005).length} ligne(s) à corriger.
              </p>
              <p className="mt-1 text-sm text-ink">
                Reprenez l'énoncé : qui est la ressource, qui est l'emploi ? Les totaux doivent
                cadrer au centime.
              </p>
              <button
                onClick={() => setShowSolution((s) => !s)}
                className="mt-3 text-sm font-semibold text-credit underline underline-offset-4 hover:text-ink"
              >
                {showSolution ? "Masquer la solution" : "Voir la solution corrigée"}
              </button>
            </div>
          )}

          {showSolution && (
            <div className="pop-in mt-4 overflow-hidden rounded-xl border border-line bg-card">
              <p className="border-b border-line bg-paper px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                Corrigé — journal
              </p>
              <ul className="divide-y divide-line">
                {ex.rows.map((r, i) => (
                  <li key={i} className="flex items-center gap-3 px-5 py-2.5 text-sm">
                    <span className="w-16 shrink-0 rounded bg-paper px-1.5 py-1 text-center font-mono text-xs font-bold text-pine">
                      {r.account}
                    </span>
                    <span className="flex-1">{r.label}</span>
                    <span className="tnum w-24 text-right font-mono font-semibold">
                      {r.d ? fmt(r.d) : ""}
                    </span>
                    <span className="tnum w-24 text-right font-mono font-semibold text-credit">
                      {r.c ? fmt(r.c) : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </div>
    );
  }

  /* ---------- Liste ---------- */
  const doneCount = progress.exercisesDone.length;
  return (
    <div>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-pine">Pratique</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Passez les écritures vous-même
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Cinq opérations du quotidien d'un cabinet. Complétez le journal : chaque ligne au bon
          montant, débit = crédit, puis vérifiez. Une écriture juste rapporte{" "}
          <span className="font-semibold text-gold">+{XP.exercise} XP</span>.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {EXERCISES.map((e, i) => {
          const done = progress.exercisesDone.includes(e.id);
          return (
            <Reveal key={e.id} delay={i * 60}>
              <button
                onClick={() => open(e)}
                className="group flex h-full w-full flex-col rounded-xl border border-line bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-pine/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-moss">
                    Exercice {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      done ? "bg-pine text-paper" : "border border-line text-ink-soft"
                    }`}
                  >
                    {done ? <IconCheck size={13} /> : <IconPen size={13} />}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-lg font-bold leading-snug group-hover:text-pine">
                  {e.title}
                </h2>
                <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-ink-soft">{e.event}</p>
                <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-pine">
                  Saisir l'écriture
                  <IconArrow size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          );
        })}
        <Reveal delay={EXERCISES.length * 60}>
          <div className="seyes flex h-full flex-col justify-center rounded-xl border border-dashed border-pine/40 bg-pine-soft/30 p-5">
            <p className="tnum font-display text-3xl font-bold text-pine">
              {doneCount}/{EXERCISES.length}
            </p>
            <p className="mt-1 text-sm text-pine-deep/80">
              écritures validées. La partie double n'a plus de secret ?{" "}
              {doneCount === EXERCISES.length
                ? "Parfait — rejouez-les pour entretenir le réflexe."
                : "Continuez : le réflexe vient par la répétition."}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
