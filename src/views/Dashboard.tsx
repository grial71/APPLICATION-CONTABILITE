import { FACTS, MODULES, NEWS, TICKER, levelFor } from "../data/content";
import { useProgress } from "../lib/store";
import type { View } from "../components/Shell";
import { Bar, ProgressRing, Reveal, useCountUp } from "../components/ui";
import {
  IconArrow,
  IconBolt,
  IconCards,
  IconClock,
  IconFlame,
  IconNews,
  IconQuiz,
  IconScale,
  IconSpark,
  IconTarget,
  IconTrend,
} from "../components/icons";

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

export default function Dashboard({
  go,
  openLesson,
}: {
  go: (v: View, lesson?: string) => void;
  openLesson: (id: string) => void;
}) {
  const { progress, profile } = useProgress();
  const lvl = levelFor(progress.xp);
  const fact = FACTS[dayOfYear() % FACTS.length];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
  const dateStr = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* Balance du jour : une valeur qui « cadre » toujours */
  const balanceTarget = 8420 + ((dayOfYear() * 137) % 3200);
  const actif = useCountUp(balanceTarget, 1400);
  const passif = useCountUp(balanceTarget, 1400);

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = MODULES.reduce(
    (a, m) => a + m.lessons.filter((l) => progress.completed.includes(l.id)).length,
    0
  );

  const nextLesson = (() => {
    for (const m of MODULES)
      for (const l of m.lessons)
        if (!progress.completed.includes(l.id)) return { m, l };
    return null;
  })();

  /* 14 derniers jours d'activité */
  const days: { label: string; xp: number; isToday: boolean }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    days.push({
      label: d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
      xp: progress.xpByDay[key] ?? 0,
      isToday: i === 0,
    });
  }
  const maxXp = Math.max(40, ...days.map((d) => d.xp));

  const quizAccuracy =
    progress.quizTotal > 0 ? Math.round((progress.quizCorrect / progress.quizTotal) * 100) : null;

  const unreadNews = NEWS.length - progress.newsRead.length;

  return (
    <div className="space-y-8">
      {/* ============ En-tête : la balance cadre ============ */}
      <Reveal>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-pine">
              {dateStr}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
              {greeting}, {profile?.name ?? "comptable"}.
              <br />
              <span className="text-pine">La balance cadre.</span>
            </h1>
            <p className="mt-3 max-w-xl text-ink-soft">
              {doneLessons} leçon{doneLessons > 1 ? "s" : ""} terminée
              {doneLessons > 1 ? "s" : ""} sur {totalLessons} · {progress.xp} XP accumulés ·
              série de {progress.streak} jour{progress.streak > 1 ? "s" : ""}.
            </p>
          </div>

          {/* Balance du jour */}
          <div className="margin-rule seyes relative w-full max-w-md overflow-hidden rounded-xl border border-line bg-card shadow-sm lg:shrink-0">
            <div className="flex items-center justify-between border-b border-line px-6 py-3">
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                <IconScale size={15} className="text-pine" /> Balance du jour
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-pine">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-pine" />
                Équilibrée
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-line">
              <div className="py-5 pl-12 pr-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  Total débit
                </p>
                <p className="tnum mt-1 font-mono text-2xl font-semibold">
                  {actif.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                </p>
              </div>
              <div className="py-5 pl-12 pr-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  Total crédit
                </p>
                <p className="tnum mt-1 font-mono text-2xl font-semibold text-credit">
                  {passif.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                </p>
              </div>
            </div>
            <p className="border-t border-line bg-pine-soft/50 px-6 py-2.5 text-xs text-pine-deep">
              Δ Débit − Crédit = 0,00 € — vous pouvez continuer sereinement.
            </p>
          </div>
        </div>
      </Reveal>

      {/* ============ Ticker ============ */}
      <Reveal delay={80}>
        <div className="marquee overflow-hidden rounded-lg border border-pine-deep/60 bg-pine-night py-2.5 text-paper">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {TICKER.map((t, i) => (
                  <span key={i} className="flex items-center">
                    <span className="whitespace-nowrap px-5 font-mono text-xs tracking-wide text-paper/85">
                      {t}
                    </span>
                    <span className="text-gold">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* ============ Colonne principale ============ */}
        <div className="space-y-8">
          {/* Reprendre le parcours */}
          <Reveal>
            <section className="group relative overflow-hidden rounded-xl border border-line bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className="absolute inset-y-0 left-0 w-1.5 bg-pine" />
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:py-5 sm:pl-8">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                    <IconTarget size={14} className="text-pine" /> Prochaine étape du parcours
                  </p>
                  {nextLesson ? (
                    <>
                      <h2 className="mt-1.5 truncate font-display text-xl font-bold sm:text-2xl">
                        {nextLesson.l.title}
                      </h2>
                      <p className="mt-0.5 text-sm text-ink-soft">
                        {nextLesson.m.title} · {nextLesson.l.duration} min ·{" "}
                        <span className="font-semibold text-pine">+40 XP</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="mt-1.5 font-display text-xl font-bold sm:text-2xl">
                        Parcours terminé !
                      </h2>
                      <p className="mt-0.5 text-sm text-ink-soft">
                        Toutes les leçons sont validées — cap sur les quiz et les mises à jour.
                      </p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => (nextLesson ? openLesson(nextLesson.l.id) : go("quiz"))}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-pine px-5 py-3 text-sm font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-md active:translate-y-0"
                >
                  {nextLesson ? "Reprendre" : "S'entraîner"}
                  <IconArrow size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
              <div className="px-6 pb-4 sm:pl-8">
                <Bar value={doneLessons / totalLessons} />
                <p className="mt-1.5 font-mono text-[11px] text-ink-soft">
                  {Math.round((doneLessons / totalLessons) * 100)} % du parcours · {doneLessons}/{totalLessons} leçons
                </p>
              </div>
            </section>
          </Reveal>

          {/* Modules */}
          <Reveal delay={60}>
            <section>
              <div className="mb-4 flex items-end justify-between">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Vos six domaines
                </h2>
                <button
                  onClick={() => go("modules")}
                  className="flex items-center gap-1.5 text-sm font-semibold text-pine underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-pine-deep"
                >
                  Tout voir <IconArrow size={14} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {MODULES.map((m, i) => {
                  const done = m.lessons.filter((l) => progress.completed.includes(l.id)).length;
                  const pct = done / m.lessons.length;
                  return (
                    <button
                      key={m.id}
                      onClick={() => go("modules")}
                      className="group flex items-center gap-4 rounded-xl border border-line bg-card p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-lg"
                      style={{ transitionDelay: `${i * 20}ms` }}
                    >
                      <ProgressRing value={pct} size={52} stroke={5} color={m.color}>
                        <span className="tnum font-mono text-[11px] font-semibold">
                          {Math.round(pct * 100)}%
                        </span>
                      </ProgressRing>
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: m.color }}>
                          {m.code}
                        </span>
                        <span className="mt-0.5 block font-display text-[15px] font-bold leading-tight">
                          {m.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-soft">
                          {done}/{m.lessons.length} leçons ·{" "}
                          {m.lessons.reduce((a, l) => a + l.duration, 0)} min
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </Reveal>

          {/* Activité 14 jours */}
          <Reveal delay={100}>
            <section className="rounded-xl border border-line bg-card p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                  <IconTrend size={18} className="text-pine" /> Activité des 14 derniers jours
                </h2>
                <span className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 font-mono text-xs font-semibold text-credit">
                  <IconFlame size={13} /> {progress.streak} jour{progress.streak > 1 ? "s" : ""} de suite
                </span>
              </div>
              <div className="flex h-32 items-end gap-1.5 sm:gap-2">
                {days.map((d, i) => (
                  <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
                    <div className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-0.5 font-mono text-[10px] text-paper opacity-0 transition-opacity group-hover:opacity-100">
                      {d.xp} XP
                    </div>
                    <div
                      className={`bar-grow w-full rounded-t ${
                        d.xp === 0 ? "bg-line" : d.isToday ? "bg-gold" : "bg-pine"
                      } transition-colors group-hover:bg-pine-deep`}
                      style={{
                        height: d.xp === 0 ? "4px" : `${Math.max(10, (d.xp / maxXp) * 100)}%`,
                        animationDelay: `${i * 40}ms`,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-soft">
                <span>{days[0].label}</span>
                <span className="text-gold">aujourd'hui</span>
                <span>{days[days.length - 1].label}</span>
              </div>
            </section>
          </Reveal>
        </div>

        {/* ============ Colonne latérale ============ */}
        <div className="space-y-5">
          <Reveal delay={120}>
            <section className="seyes rounded-xl border border-line bg-card p-5 shadow-sm">
              <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                Niveau {lvl.idx + 1}/6
                <span className="flex items-center gap-1 text-gold">
                  <IconBolt size={12} /> {progress.xp} XP
                </span>
              </p>
              <h3 className="mt-2 font-display text-xl font-bold leading-tight">{lvl.name}</h3>
              <div className="mt-3">
                <Bar value={lvl.pct} color="var(--color-gold)" />
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                {lvl.next
                  ? `Encore ${lvl.remaining} XP pour devenir « ${lvl.next.name} ».`
                  : "Vous êtes au sommet du grand livre."}
              </p>
            </section>
          </Reveal>

          <Reveal delay={160}>
            <section className="overflow-hidden rounded-xl border border-line bg-card shadow-sm">
              <p className="border-b border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                Tableau des statistiques
              </p>
              <dl className="divide-y divide-line">
                {[
                  {
                    k: "Précision quiz",
                    v: quizAccuracy === null ? "—" : `${quizAccuracy} %`,
                    icon: <IconQuiz size={16} className="text-petrol" />,
                  },
                  {
                    k: "Cartes mémorisées",
                    v: `${progress.cardsKnown.length}/15`,
                    icon: <IconCards size={16} className="text-berry" />,
                  },
                  {
                    k: "Écritures réussies",
                    v: `${progress.exercisesDone.length}/5`,
                    icon: <IconTarget size={16} className="text-moss" />,
                  },
                  {
                    k: "Quiz joués",
                    v: `${progress.quizPlayed}`,
                    icon: <IconClock size={16} className="text-gold" />,
                  },
                ].map((s) => (
                  <div key={s.k} className="flex items-center justify-between px-5 py-3">
                    <dt className="flex items-center gap-2.5 text-sm text-ink-soft">
                      {s.icon} {s.k}
                    </dt>
                    <dd className="tnum font-mono text-sm font-semibold">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>

          <Reveal delay={200}>
            <section className="relative overflow-hidden rounded-xl bg-pine-night p-5 text-paper shadow-md">
              <div className="seyes-dark absolute inset-0" />
              <div className="relative">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                  <IconSpark size={14} /> Le chiffre du jour
                </p>
                <p className="tnum mt-3 font-display text-4xl font-bold">{fact.n}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{fact.t}</p>
              </div>
            </section>
          </Reveal>

          <Reveal delay={240}>
            <section className="rounded-xl border border-line bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-display text-base font-bold">
                  <IconNews size={17} className="text-pine" /> Rester à jour
                </h3>
                {unreadNews > 0 && (
                  <span className="rounded-full bg-gold-soft px-2 py-0.5 font-mono text-[11px] font-bold text-gold">
                    {unreadNews} non lues
                  </span>
                )}
              </div>
              <ul className="mt-3 space-y-2.5">
                {NEWS.slice(0, 2).map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => go("news")}
                      className="group w-full rounded-lg border border-transparent p-2.5 text-left transition-all hover:border-line hover:bg-paper"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                        {n.date} · {n.tag}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold leading-snug group-hover:text-pine">
                        {n.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => go("news")}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-line py-2 text-sm font-semibold text-pine transition-colors hover:bg-pine hover:text-paper"
              >
                Toutes les mises à jour <IconArrow size={14} />
              </button>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
