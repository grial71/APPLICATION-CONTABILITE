import { useMemo, useState } from "react";
import { MODULES, QUIZ, XP } from "../data/content";
import { useProgress } from "../lib/store";
import { Reveal } from "../components/ui";
import { IconArrow, IconCheck, IconClose, IconInfo, IconRefresh, IconTrend } from "../components/icons";

type Phase = "intro" | "run" | "done";

export default function Quiz() {
  const { progress, recordQuiz } = useProgress();
  const [phase, setPhase] = useState<Phase>("intro");
  const [theme, setTheme] = useState<string>("all");
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState<number[]>([]);

  const questions = useMemo(
    () => (theme === "all" ? QUIZ : QUIZ.filter((q) => q.module === theme)),
    [theme]
  );

  const start = () => {
    setI(0);
    setPicked(null);
    setCorrect(0);
    setMissed([]);
    setPhase("run");
  };

  const pick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    const good = idx === questions[i].answer;
    if (good) setCorrect((c) => c + 1);
    else setMissed((m) => [...m, i]);
  };

  const nextQ = () => {
    if (i + 1 < questions.length) {
      setI(i + 1);
      setPicked(null);
    } else {
      recordQuiz(correct, questions.length);
      setPhase("done");
    }
  };

  /* ---------- Intro ---------- */
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-pine">Entraînement</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Le quiz du grand livre
          </h1>
          <p className="mt-2 text-ink-soft">
            Questions à choix multiples tirées des six domaines. Chaque bonne réponse vaut{" "}
            <span className="font-semibold text-gold">+{XP.quizCorrect} XP</span>, avec l'explication
            immédiate — on apprend même en se trompant.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-6 rounded-xl border border-line bg-card p-6 shadow-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Choisir un domaine
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setTheme("all")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  theme === "all"
                    ? "border-pine bg-pine text-paper shadow-sm"
                    : "border-line bg-paper text-ink-soft hover:border-pine hover:text-pine"
                }`}
              >
                Tout le programme ({QUIZ.length})
              </button>
              {MODULES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setTheme(m.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    theme === m.id
                      ? "border-transparent text-paper shadow-sm"
                      : "border-line bg-paper text-ink-soft hover:border-pine hover:text-pine"
                  }`}
                  style={theme === m.id ? { background: m.color } : undefined}
                >
                  {m.title.split(" & ")[0]} ({QUIZ.filter((q) => q.module === m.id).length})
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
              <div>
                <p className="tnum font-display text-2xl font-bold text-pine">
                  {progress.quizPlayed}
                </p>
                <p className="text-xs text-ink-soft">quiz joués</p>
              </div>
              <div>
                <p className="tnum font-display text-2xl font-bold text-gold">
                  {progress.quizBest ? `${progress.quizBest} %` : "—"}
                </p>
                <p className="text-xs text-ink-soft">meilleur score</p>
              </div>
              <div>
                <p className="tnum font-display text-2xl font-bold text-credit">
                  {progress.quizTotal > 0
                    ? `${Math.round((progress.quizCorrect / progress.quizTotal) * 100)} %`
                    : "—"}
                </p>
                <p className="text-xs text-ink-soft">précision globale</p>
              </div>
            </div>

            <button
              onClick={start}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-pine py-3.5 font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-md active:translate-y-0"
            >
              Commencer — {questions.length} questions <IconArrow size={17} />
            </button>
          </div>
        </Reveal>
      </div>
    );
  }

  /* ---------- Résultats ---------- */
  if (phase === "done") {
    const pct = Math.round((correct / questions.length) * 100);
    const verdict =
      pct === 100
        ? "Sans faute. Le bilan cadre, le grand livre vous salue."
        : pct >= 75
        ? "Solide. Encore quelques révisions et c'est le sans-faute."
        : pct >= 50
        ? "Les bases sont là — reprenez les leçons des questions manquées."
        : "Pas de panique : le parcours est fait pour ça. On relit, on rejoue.";
    return (
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-line bg-card text-center shadow-md">
            <div className="seyes border-b border-line bg-paper px-6 py-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                Résultat du quiz
              </p>
              <p className="tnum mt-3 font-display text-6xl font-bold text-pine">
                {correct}
                <span className="text-ink-soft/50">/{questions.length}</span>
              </p>
              <p className="mt-2 font-mono text-sm font-semibold text-gold">
                +{correct * XP.quizCorrect} XP crédités
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft">{verdict}</p>
            </div>
            <div className="flex flex-col gap-3 p-6 sm:flex-row">
              <button
                onClick={start}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-pine py-3 font-semibold text-paper transition-all hover:bg-pine-deep"
              >
                <IconRefresh size={16} /> Rejouer
              </button>
              <button
                onClick={() => setPhase("intro")}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line py-3 font-semibold text-ink-soft transition-colors hover:border-pine hover:text-pine"
              >
                Changer de domaine
              </button>
            </div>
          </div>
        </Reveal>

        {missed.length > 0 && (
          <Reveal delay={100}>
            <div className="mt-6 rounded-xl border border-line bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <IconInfo size={18} className="text-credit" /> À réviser ({missed.length})
              </h2>
              <ul className="mt-4 space-y-4">
                {missed.map((mi2) => {
                  const q = questions[mi2];
                  const mod = MODULES.find((m) => m.id === q.module);
                  return (
                    <li key={mi2} className="rounded-lg border border-line bg-paper p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: mod?.color }}>
                        {mod?.title}
                      </p>
                      <p className="mt-1 text-sm font-semibold">{q.q}</p>
                      <p className="mt-2 flex items-start gap-1.5 text-sm text-pine-deep">
                        <IconCheck size={15} className="mt-0.5 shrink-0 text-pine" />
                        {q.options[q.answer]}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{q.explain}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    );
  }

  /* ---------- Question en cours ---------- */
  const q = questions[i];
  const mod = MODULES.find((m) => m.id === q.module);
  const answered = picked !== null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
          Question {i + 1} / {questions.length}
        </p>
        <span
          className="rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ background: mod?.soft, color: mod?.color }}
        >
          {mod?.title}
        </span>
      </div>

      {/* Pastilles de progression */}
      <div className="mt-3 flex gap-1.5">
        {questions.map((_, di) => (
          <span
            key={di}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              di < i ? "bg-pine" : di === i ? (answered ? (picked === q.answer ? "bg-pine" : "bg-credit") : "bg-gold") : "bg-line"
            }`}
          />
        ))}
      </div>

      <div key={q.id} className="pop-in mt-5 rounded-xl border border-line bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-gold">Niveau {q.level}/3</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <h2 className="mt-3 font-display text-xl font-bold leading-snug sm:text-2xl">{q.q}</h2>

        <div className="mt-6 space-y-2.5">
          {q.options.map((opt, oi) => {
            const isAnswer = oi === q.answer;
            const isPicked = oi === picked;
            let cls = "border-line bg-paper hover:border-pine hover:bg-pine-soft/40";
            if (answered) {
              if (isAnswer) cls = "border-pine bg-pine-soft text-pine-deep";
              else if (isPicked) cls = "border-credit bg-credit-soft text-credit";
              else cls = "border-line bg-paper opacity-50";
            }
            return (
              <button
                key={oi}
                onClick={() => pick(oi)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-lg border p-3.5 text-left text-sm font-medium transition-all duration-200 ${cls} ${
                  !answered ? "active:scale-[0.99]" : ""
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-bold ${
                    answered && isAnswer
                      ? "border-pine bg-pine text-paper"
                      : answered && isPicked
                      ? "border-credit bg-credit text-paper"
                      : "border-line text-ink-soft"
                  }`}
                >
                  {answered && isAnswer ? (
                    <IconCheck size={13} />
                  ) : answered && isPicked ? (
                    <IconClose size={13} />
                  ) : (
                    String.fromCharCode(65 + oi)
                  )}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className={`pop-in mt-5 rounded-lg border p-4 ${
              picked === q.answer
                ? "border-pine/40 bg-pine-soft/60"
                : "border-credit/40 bg-credit-soft/60"
            }`}
          >
            <p className={`flex items-center gap-2 text-sm font-bold ${picked === q.answer ? "text-pine-deep" : "text-credit"}`}>
              {picked === q.answer ? (
                <>
                  <IconCheck size={16} /> Exact ! +{XP.quizCorrect} XP en fin de quiz.
                </>
              ) : (
                <>
                  <IconClose size={16} /> Pas tout à fait…
                </>
              )}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink">{q.explain}</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="flex items-center gap-1.5 font-mono text-xs text-ink-soft">
            <IconTrend size={14} /> Score actuel : {correct}/{i + (answered ? 1 : 0)}
          </p>
          <button
            onClick={nextQ}
            disabled={!answered}
            className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
              answered
                ? "bg-pine text-paper hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-md"
                : "cursor-not-allowed bg-line/70 text-ink-soft/60"
            }`}
          >
            {i + 1 === questions.length ? "Voir le résultat" : "Question suivante"}
            <IconArrow size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
