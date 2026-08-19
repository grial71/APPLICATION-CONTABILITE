import type { ReactNode } from "react";
import { useProgress } from "../lib/store";
import { levelFor } from "../data/content";
import { Bar } from "./ui";
import {
  IconBolt,
  IconBook,
  IconCards,
  IconFlame,
  IconHome,
  IconNews,
  IconPen,
  IconQuiz,
  LogoMark,
} from "./icons";

export type View = "home" | "modules" | "quiz" | "cards" | "exercises" | "news";

const NAV: { id: View; label: string; short: string; icon: (p: { size?: number }) => ReactNode }[] = [
  { id: "home", label: "Tableau de bord", short: "Accueil", icon: (p) => <IconHome {...p} /> },
  { id: "modules", label: "Parcours", short: "Cours", icon: (p) => <IconBook {...p} /> },
  { id: "quiz", label: "Quiz", short: "Quiz", icon: (p) => <IconQuiz {...p} /> },
  { id: "cards", label: "Flashcards", short: "Cartes", icon: (p) => <IconCards {...p} /> },
  { id: "exercises", label: "Écritures", short: "Exos", icon: (p) => <IconPen {...p} /> },
  { id: "news", label: "Mises à jour", short: "Actus", icon: (p) => <IconNews {...p} /> },
];

export function Shell({
  view,
  go,
  children,
}: {
  view: View;
  go: (v: View) => void;
  children: ReactNode;
}) {
  const { progress, profile } = useProgress();
  const lvl = levelFor(progress.xp);

  return (
    <div className="min-h-screen lg:flex">
      {/* ---------------- Sidebar (desktop) ---------------- */}
      <aside className="seyes-dark fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col bg-pine-night text-paper lg:flex">
        <button
          onClick={() => go("home")}
          className="group flex items-center gap-3 px-6 pb-5 pt-7 text-left"
        >
          <LogoMark size={34} className="transition-transform duration-300 group-hover:-rotate-6" />
          <span>
            <span className="block font-display text-lg font-bold leading-none tracking-tight">
              Comptalia
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
              Grand livre vivant
            </span>
          </span>
        </button>

        <div className="mx-6 dash-line opacity-60" />

        <nav className="mt-5 flex-1 space-y-1 px-3">
          {NAV.map((n) => {
            const active = view === n.id;
            return (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-paper text-pine-deep shadow-md shadow-black/20"
                    : "text-paper/70 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-gold transition-all duration-300 ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                  }`}
                />
                {n.icon({ size: 19 })}
                {n.label}
              </button>
            );
          })}
        </nav>

        {/* Niveau */}
        <div className="mx-4 mb-4 rounded-xl border border-paper/10 bg-paper/5 p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
              Niveau {lvl.idx + 1}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs font-semibold text-gold">
              <IconBolt size={12} /> {progress.xp} XP
            </span>
          </div>
          <p className="mt-1 font-display text-sm font-bold leading-tight">{lvl.name}</p>
          <div className="mt-2.5">
            <Bar value={lvl.pct} color="var(--color-gold)" />
          </div>
          <p className="mt-2 text-[11px] text-paper/50">
            {lvl.next ? `${lvl.remaining} XP avant « ${lvl.next.name} »` : "Niveau maximal atteint"}
          </p>
        </div>

        {profile && (
          <div className="flex items-center gap-3 border-t border-paper/10 px-6 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-pine-night">
              {profile.name.slice(0, 1).toUpperCase()}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{profile.name}</span>
              <span className="block truncate text-[11px] text-paper/50">{profile.role}</span>
            </span>
          </div>
        )}
      </aside>

      {/* ---------------- Zone principale ---------------- */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-[248px]">
        {/* Topbar mobile */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-paper/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <button onClick={() => go("home")} className="flex items-center gap-2.5">
            <LogoMark size={30} />
            <span className="font-display text-base font-bold tracking-tight">Comptalia</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-line bg-card px-2.5 py-1 font-mono text-xs font-semibold text-credit">
              <IconFlame size={13} /> {progress.streak}
            </span>
            <span className="flex items-center gap-1 rounded-full border border-line bg-card px-2.5 py-1 font-mono text-xs font-semibold text-pine">
              <IconBolt size={13} /> {progress.xp}
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1100px] flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-16 lg:pt-9">
          {children}
        </main>

        <footer className="hidden border-t border-line px-10 py-4 text-center font-mono text-[11px] text-ink-soft lg:block">
          Comptalia — plateforme pédagogique. Les chiffres réglementaires évoluent : vérifiez toujours
          les textes officiels en vigueur.
        </footer>

        {/* Nav basse (mobile) */}
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-pine-night/97 text-paper backdrop-blur lg:hidden">
          <div className="mx-auto grid max-w-lg grid-cols-6">
            {NAV.map((n) => {
              const active = view === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className={`relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                    active ? "text-gold" : "text-paper/60"
                  }`}
                >
                  <span
                    className={`absolute top-0 h-0.5 w-8 rounded-full bg-gold transition-all duration-300 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {n.icon({ size: 20 })}
                  {n.short}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
