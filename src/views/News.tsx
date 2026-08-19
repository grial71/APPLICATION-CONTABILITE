import { useState } from "react";
import { NEWS, XP, type NewsItem } from "../data/content";
import { useProgress } from "../lib/store";
import { Reveal } from "../components/ui";
import { IconArrow, IconCheck, IconInfo, IconNews } from "../components/icons";

const TAGS = ["Tout", "Facturation", "Fiscal", "Social", "Normes", "Contrôle"] as const;

const TAG_COLORS: Record<NewsItem["tag"], { fg: string; bg: string }> = {
  Facturation: { fg: "#17677a", bg: "#ddeae9" },
  Fiscal: { fg: "#557a3b", bg: "#e4ebd9" },
  Social: { fg: "#9c4a6c", bg: "#efdfe6" },
  Normes: { fg: "#5b6472", bg: "#e3e6e9" },
  Contrôle: { fg: "#b0432e", bg: "#f0ddd5" },
};

export default function News() {
  const { progress, markNews } = useProgress();
  const [tag, setTag] = useState<(typeof TAGS)[number]>("Tout");
  const [expanded, setExpanded] = useState<string | null>(null);

  const items = NEWS.filter((n) => tag === "Tout" || n.tag === tag);
  const readCount = progress.newsRead.length;

  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-pine">Veille métier</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Rester à jour, c'est aussi du métier
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Réforme de la facturation électronique, CSRD, paramètres sociaux : ce qui bouge dans le
          quotidien comptable. Chaque lecture rapporte +{XP.news} XP.
        </p>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                tag === t
                  ? "border-petrol bg-petrol text-paper shadow-sm"
                  : "border-line bg-card text-ink-soft hover:border-petrol hover:text-petrol"
              }`}
            >
              {t}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-ink-soft">
            {readCount}/{NEWS.length} lues
          </span>
        </div>
      </Reveal>

      {/* Timeline */}
      <div className="relative mt-8">
        <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line sm:left-[111px]" />
        <div className="space-y-5">
          {items.map((n, i) => {
            const read = progress.newsRead.includes(n.id);
            const isOpen = expanded === n.id;
            const col = TAG_COLORS[n.tag];
            return (
              <Reveal key={n.id} delay={i * 60}>
                <div className="relative flex gap-4 sm:gap-6">
                  <div className="flex shrink-0 flex-col items-center">
                    <span
                      className={`relative z-10 mt-5 h-[15px] w-[15px] rounded-full border-[3px] bg-card ${
                        read ? "border-pine" : "border-gold"
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[80px_1fr] sm:gap-5">
                    <p className="hidden pt-5 text-right font-mono text-[11px] leading-tight text-ink-soft sm:block">
                      {n.date}
                    </p>
                    <article
                      className={`flex-1 overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 ${
                        isOpen ? "border-pine/40 shadow-md" : "border-line hover:shadow-md"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setExpanded(isOpen ? null : n.id);
                          if (!read) markNews(n.id);
                        }}
                        className="w-full p-5 text-left"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
                            style={{ background: col.bg, color: col.fg }}
                          >
                            {n.tag}
                          </span>
                          <span className="font-mono text-[10px] text-ink-soft sm:hidden">
                            {n.date}
                          </span>
                          {read && (
                            <span className="ml-auto flex items-center gap-1 font-mono text-[10px] font-semibold text-pine">
                              <IconCheck size={11} /> Lu
                            </span>
                          )}
                        </div>
                        <h2 className="mt-2 font-display text-lg font-bold leading-snug">
                          {n.title}
                        </h2>
                        <div
                          className={`grid transition-all duration-400 ease-out ${
                            isOpen ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="border-l-2 border-gold pl-3 text-sm leading-relaxed text-ink-soft">
                              {n.body}
                            </p>
                            {n.verify && (
                              <p className="mt-2 flex items-start gap-1.5 rounded-md bg-gold-soft/50 p-2.5 text-xs text-ink">
                                <IconInfo size={14} className="mt-0.5 shrink-0 text-gold" />
                                Les chiffres exacts de cette entrée évoluent avec les lois de
                                finances et de financement : vérifiez le texte en vigueur avant de
                                paramétrer.
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-petrol">
                          {isOpen ? "Replier" : "Lire la synthèse"}
                          <IconArrow
                            size={13}
                            className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                          />
                        </span>
                      </button>
                    </article>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal delay={140}>
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-card p-5 shadow-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-petrol-soft text-petrol">
            <IconNews size={18} />
          </span>
          <div className="text-sm text-ink-soft">
            <p className="font-semibold text-ink">Méthode de veille du comptable</p>
            <p className="mt-1">
              Une source officielle (Légifrance, BOFiP, URSSAF), une source de doctrine (revues,
              ANC), un rituel mensuel de 30 minutes. Ce que vous lisez ici synthétise ; la source
              officielle tranche.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
