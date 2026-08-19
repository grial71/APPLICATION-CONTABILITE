import { useState } from "react";
import { MODULES, XP } from "../data/content";
import { useProgress } from "../lib/store";
import { Bar, ProgressRing, Reveal } from "../components/ui";
import {
  IconArrow,
  IconBook,
  IconCheck,
  IconChevronL,
  IconClock,
  IconSpark,
} from "../components/icons";

export default function Modules({
  lessonId,
  setLesson,
}: {
  lessonId: string | null;
  setLesson: (id: string | null) => void;
}) {
  const { progress, completeLesson } = useProgress();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checkedPoints, setCheckedPoints] = useState<Record<string, boolean>>({});

  const goToLesson = (id: string | null) => {
    setLesson(id);
    setCheckedPoints({});
    window.scrollTo({ top: 0 });
  };

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = MODULES.reduce(
    (a, m) => a + m.lessons.filter((l) => progress.completed.includes(l.id)).length,
    0
  );

  /* ---------- Vue leçon ---------- */
  const lesson = lessonId
    ? MODULES.flatMap((m) => m.lessons.map((l) => ({ m, l }))).find((x) => x.l.id === lessonId)
    : null;

  if (lesson) {
    const { m, l } = lesson;
    const isDone = progress.completed.includes(l.id);
    const flat = MODULES.flatMap((mm) => mm.lessons.map((ll) => ({ m: mm, l: ll })));
    const idx = flat.findIndex((x) => x.l.id === l.id);
    const next = flat[idx + 1] ?? null;

    return (
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => goToLesson(null)}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-pine"
        >
          <IconChevronL size={16} /> Retour au parcours
        </button>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-md px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ background: m.soft, color: m.color }}
            >
              {m.code} · {m.title}
            </span>
            <span className="flex items-center gap-1.5 rounded-md border border-line bg-card px-2.5 py-1 font-mono text-[11px] text-ink-soft">
              <IconClock size={12} /> {l.duration} min
            </span>
            {isDone && (
              <span className="flex items-center gap-1 rounded-md bg-pine px-2.5 py-1 font-mono text-[11px] font-bold text-paper">
                <IconCheck size={12} /> Terminée
              </span>
            )}
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {l.title}
          </h1>
          <p className="mt-3 border-l-4 border-gold pl-4 text-ink-soft italic">{l.intro}</p>
        </div>

        <div className="margin-rule seyes mt-6 rounded-xl border border-line bg-card p-6 shadow-sm sm:p-8 sm:pl-16 lg:pl-20">
          {l.sections.map((s, i) => (
            <section key={i} className={i > 0 ? "mt-7" : ""}>
              <h2 className="flex items-baseline gap-2.5 font-display text-xl font-bold">
                <span className="font-mono text-sm font-semibold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.h}
              </h2>
              <p className="mt-2.5 leading-relaxed text-ink-soft">{s.p}</p>
            </section>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-line bg-card p-6 shadow-sm">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold">
            <IconSpark size={18} className="text-gold" /> Points à retenir
          </h3>
          <p className="mt-1 text-xs text-ink-soft">
            Cochez chaque point une fois assimilé — c'est votre propre révision.
          </p>
          <ul className="mt-4 space-y-2">
            {l.points.map((pt, i) => {
              const key = `${l.id}-${i}`;
              const checked = !!checkedPoints[key];
              return (
                <li key={i}>
                  <button
                    onClick={() => setCheckedPoints((c) => ({ ...c, [key]: !checked }))}
                    className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition-all duration-200 ${
                      checked
                        ? "border-pine/40 bg-pine-soft/60 text-pine-deep"
                        : "border-line bg-paper hover:border-pine/40"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
                        checked ? "border-pine bg-pine text-paper" : "border-line bg-card"
                      }`}
                    >
                      {checked && <IconCheck size={12} />}
                    </span>
                    <span className={checked ? "line-through decoration-pine/50" : ""}>{pt}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-ink-soft">
              {isDone
                ? "Leçon validée — les XP sont déjà dans le grand livre."
                : `Terminer rapporte +${XP.lesson} XP.`}
            </p>
            <div className="flex gap-3">
              {!isDone && (
                <button
                  onClick={() => completeLesson(l.id)}
                  className="flex items-center gap-2 rounded-lg bg-pine px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-md active:translate-y-0"
                >
                  <IconCheck size={16} /> Terminer la leçon
                </button>
              )}
              {next && (
                <button
                  onClick={() => goToLesson(next.l.id)}
                  className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    isDone
                      ? "border-pine bg-pine text-paper hover:bg-pine-deep"
                      : "border-line text-pine hover:bg-pine-soft"
                  }`}
                >
                  Leçon suivante <IconArrow size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Vue liste ---------- */
  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-pine">
              Parcours de formation
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Le parcours, du PCG à la liasse
            </h1>
            <p className="mt-2 max-w-xl text-ink-soft">
              Six domaines, dix-huit leçons calibrées pour réviser un socle d'études comptables et
              le maintenir à niveau. Chaque leçon ≈ 10-20 minutes.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-sm">
            <ProgressRing value={doneLessons / totalLessons} size={48} stroke={5}>
              <span className="tnum font-mono text-[10px] font-bold">
                {Math.round((doneLessons / totalLessons) * 100)}%
              </span>
            </ProgressRing>
            <div>
              <p className="tnum font-mono text-sm font-bold">
                {doneLessons}/{totalLessons}
              </p>
              <p className="text-xs text-ink-soft">leçons terminées</p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-4">
        <Bar value={doneLessons / totalLessons} />
      </div>

      <div className="mt-8 space-y-4">
        {MODULES.map((m, mi) => {
          const done = m.lessons.filter((l) => progress.completed.includes(l.id)).length;
          const isOpen = expanded === m.id;
          return (
            <Reveal key={m.id} delay={mi * 60}>
              <section
                className={`overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 ${
                  isOpen ? "border-transparent shadow-lg" : "border-line hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : m.id)}
                  className="flex w-full items-center gap-4 p-5 text-left sm:gap-5"
                >
                  <span
                    className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold sm:flex"
                    style={{ background: m.soft, color: m.color }}
                  >
                    {String(mi + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: m.color }}
                    >
                      {m.code}
                    </span>
                    <span className="mt-0.5 block font-display text-lg font-bold leading-tight sm:text-xl">
                      {m.title}
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">{m.description}</span>
                    <span className="mt-2 block h-1.5 w-full max-w-[240px] overflow-hidden rounded-full bg-line/70">
                      <span
                        className="block h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(done / m.lessons.length) * 100}%`,
                          background: m.color,
                        }}
                      />
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="tnum font-mono text-sm font-bold">
                      {done}/{m.lessons.length}
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen ? "rotate-90 border-transparent text-paper" : "border-line text-ink-soft"
                      }`}
                      style={isOpen ? { background: m.color } : undefined}
                    >
                      <IconArrow size={15} />
                    </span>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="divide-y divide-line border-t border-line">
                      {m.lessons.map((l, li) => {
                        const lDone = progress.completed.includes(l.id);
                        return (
                          <li key={l.id}>
                            <button
                              onClick={() => goToLesson(l.id)}
                              className="group flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-paper"
                            >
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-all ${
                                  lDone
                                    ? "border-pine bg-pine text-paper"
                                    : "border-line bg-card text-ink-soft group-hover:border-pine group-hover:text-pine"
                                }`}
                              >
                                {lDone ? <IconCheck size={12} /> : li + 1}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span
                                  className={`block text-sm font-semibold ${
                                    lDone ? "text-ink-soft line-through decoration-pine/40" : ""
                                  } group-hover:text-pine`}
                                >
                                  {l.title}
                                </span>
                              </span>
                              <span className="hidden items-center gap-1 font-mono text-[11px] text-ink-soft sm:flex">
                                <IconClock size={12} /> {l.duration} min
                              </span>
                              <span className="hidden font-mono text-[11px] font-semibold text-gold sm:block">
                                +{XP.lesson} XP
                              </span>
                              <IconArrow
                                size={14}
                                className="text-ink-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-pine"
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={120}>
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-line bg-pine-soft/50 p-4 text-sm text-pine-deep">
          <IconBook size={18} className="shrink-0 text-pine" />
          Un domaine déjà solide ? Filez au quiz : chaque bonne réponse rapporte +{XP.quizCorrect}{" "}
          XP et valide vos acquis sans relire la théorie.
        </div>
      </Reveal>
    </div>
  );
}
