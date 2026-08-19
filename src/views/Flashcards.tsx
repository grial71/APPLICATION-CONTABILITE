import { useMemo, useState } from "react";
import { CARDS, XP, type Card } from "../data/content";
import { useProgress } from "../lib/store";
import { Bar, Reveal } from "../components/ui";
import { IconCards, IconCheck, IconRefresh, IconSpark } from "../components/icons";

const CATS = ["Tout", "Comptes", "Mécanismes", "Fiscal & social"] as const;

export default function Flashcards() {
  const { progress, markCard, unmarkCard } = useProgress();
  const [cat, setCat] = useState<(typeof CATS)[number]>("Tout");
  const [flipped, setFlipped] = useState(false);
  const [sessionKnown, setSessionKnown] = useState(0);
  const [sessionAgain, setSessionAgain] = useState(0);

  const deck: Card[] = useMemo(
    () => CARDS.filter((c) => cat === "Tout" || c.cat === cat),
    [cat]
  );
  const knownInDeck = deck.filter((c) => progress.cardsKnown.includes(c.id)).length;
  const allKnown = knownInDeck === deck.length && deck.length > 0;

  /* Carte courante : première non sue, sinon première du deck */
  const current = useMemo(() => {
    const unknown = deck.filter((c) => !progress.cardsKnown.includes(c.id));
    if (unknown.length > 0) return unknown[0];
    return deck[0];
  }, [deck, progress.cardsKnown]);

  const choose = (known: boolean) => {
    if (!current) return;
    if (known) {
      markCard(current.id);
      setSessionKnown((s) => s + 1);
    } else {
      unmarkCard(current.id);
      setSessionAgain((s) => s + 1);
    }
    setFlipped(false);
  };

  const resetSession = () => {
    setSessionKnown(0);
    setSessionAgain(0);
    setFlipped(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-pine">Mémorisation</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Les cartes du métier
            </h1>
            <p className="mt-2 max-w-lg text-ink-soft">
              Comptes, mécanismes, fiscal & social. Retournez la carte, décidez honnêtement :
              « Je savais » crédite +{XP.card} XP, « À revoir » la renvoie en bas de la pile.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-card px-4 py-3 shadow-sm">
            <p className="tnum font-mono text-sm font-bold text-pine">
              {knownInDeck}/{deck.length}
            </p>
            <p className="text-xs text-ink-soft">cartes sues</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCat(c);
                setFlipped(false);
              }}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                cat === c
                  ? "border-berry bg-berry text-paper shadow-sm"
                  : "border-line bg-card text-ink-soft hover:border-berry hover:text-berry"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto">
            <Bar value={deck.length ? knownInDeck / deck.length : 0} color="var(--color-berry)" />
          </span>
        </div>
      </Reveal>

      {/* La carte */}
      <Reveal delay={120}>
        <div className="mt-6">
          {allKnown ? (
            <div className="pop-in rounded-xl border border-line bg-card p-10 text-center shadow-md">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pine text-paper">
                <IconCheck size={26} />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold">Pile maîtrisée !</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
                Toutes les cartes « {cat === "Tout" ? "du programme" : cat} » sont passées en
                mémoire. Session : {sessionKnown} sues · {sessionAgain} à revoir. Rejouez dans deux
                jours pour ancrer.
              </p>
              <button
                onClick={resetSession}
                className="mx-auto mt-5 flex items-center gap-2 rounded-lg bg-pine px-6 py-2.5 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-pine-deep"
              >
                <IconRefresh size={15} /> Nouvelle session
              </button>
            </div>
          ) : current ? (
            <>
              <div className="flip-scene h-[300px] cursor-pointer select-none sm:h-[320px]" onClick={() => setFlipped((f) => !f)}>
                <div className={`flip-inner ${flipped ? "flipped" : ""}`}>
                  {/* Recto */}
                  <div className="flip-face margin-rule seyes flex flex-col rounded-xl border border-line bg-card shadow-md">
                    <div className="flex items-center justify-between border-b border-line px-6 py-3">
                      <span className="rounded-md bg-berry/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-berry">
                        {current.cat}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                        Recto · cliquez
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-center px-10 text-center">
                      <p className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                        {current.front}
                      </p>
                    </div>
                    <p className="border-t border-line px-6 py-3 text-center font-mono text-[11px] text-ink-soft">
                      {knownInDeck}/{deck.length} sues · session : {sessionKnown} ✓ / {sessionAgain} ✗
                    </p>
                  </div>
                  {/* Verso */}
                  <div className="flip-back flip-face flex flex-col rounded-xl border border-pine-deep/40 bg-pine-night text-paper shadow-md">
                    <div className="flex items-center justify-between border-b border-paper/15 px-6 py-3">
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                        <IconSpark size={13} /> Verso · définition
                      </span>
                      <span className="font-mono text-[10px] text-paper/50">{current.front}</span>
                    </div>
                    <div className="seyes-dark flex flex-1 items-center px-7">
                      <p className="text-[15px] leading-relaxed text-paper/90">{current.back}</p>
                    </div>
                    <p className="border-t border-paper/15 px-6 py-3 text-center font-mono text-[11px] text-paper/50">
                      Alors… vous la saviez ?
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={() => choose(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-credit/50 bg-credit-soft py-3.5 font-semibold text-credit transition-all hover:-translate-y-0.5 hover:bg-credit hover:text-paper active:translate-y-0"
                >
                  <IconRefresh size={16} /> À revoir
                </button>
                <button
                  onClick={() => choose(true)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-pine py-3.5 font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-md active:translate-y-0"
                >
                  <IconCheck size={16} /> Je savais
                </button>
              </div>
            </>
          ) : null}
        </div>
      </Reveal>

      {/* Liste des cartes */}
      <Reveal delay={180}>
        <div className="mt-8 rounded-xl border border-line bg-card shadow-sm">
          <p className="border-b border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            Inventaire de la pile — {deck.length} cartes
          </p>
          <ul className="grid gap-px sm:grid-cols-2">
            {deck.map((c) => {
              const known = progress.cardsKnown.includes(c.id);
              return (
                <li
                  key={c.id}
                  className={`flex items-center gap-3 px-5 py-3 ${known ? "text-ink-soft" : ""}`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      known ? "border-berry bg-berry text-paper" : "border-line"
                    }`}
                  >
                    {known && <IconCheck size={11} />}
                  </span>
                  <span className={`truncate text-sm font-medium ${known ? "line-through decoration-berry/40" : ""}`}>
                    {c.front}
                  </span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-wide text-ink-soft/70">
                    {c.cat === "Fiscal & social" ? "Fiscal" : c.cat}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="flex items-center gap-2 border-t border-line px-5 py-3 text-xs text-ink-soft">
            <IconCards size={14} className="text-berry" />
            Astuce : revoyez une carte 1 jour, 3 jours puis 7 jours après l'avoir marquée « sue » —
            c'est le calendrier de la mémoire.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
