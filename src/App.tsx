import { useState } from "react";
import { ProgressProvider, useProgress } from "./lib/store";
import { Shell, type View } from "./components/Shell";
import { Toasts } from "./components/ui";
import { IconArrow, LogoMark } from "./components/icons";
import Dashboard from "./views/Dashboard";
import Modules from "./views/Modules";
import Quiz from "./views/Quiz";
import Flashcards from "./views/Flashcards";
import Exercises from "./views/Exercises";
import News from "./views/News";

const ROLES = [
  { id: "Étudiant·e en comptabilité", desc: "BTS CG, DCG, DSCG : consolider le socle." },
  { id: "Collaborateur·rice en cabinet", desc: "Tenir, réviser, conseiller — sans lacune." },
  { id: "Comptable en entreprise", desc: "Garder la main sur sa propre comptabilité." },
  { id: "En reprise / reconversion", desc: "Rattraper et actualiser des acquis anciens." },
];

function Onboarding() {
  const { setProfile } = useProgress();
  const [name, setName] = useState("");
  const [role, setRole] = useState<string | null>(null);

  const submit = () => {
    if (!name.trim() || !role) return;
    setProfile({ name: name.trim(), role });
  };

  const ready = name.trim().length > 0 && role !== null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-pine-night/70 p-4 backdrop-blur-sm">
      <div className="pop-in w-full max-w-md overflow-hidden rounded-2xl border border-line bg-card shadow-2xl">
        <div className="seyes border-b border-line bg-paper px-7 pb-6 pt-7">
          <div className="flex items-center gap-3">
            <LogoMark size={38} />
            <div>
              <p className="font-display text-xl font-bold leading-none">Comptalia</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                Formation continue du comptable
              </p>
            </div>
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold leading-tight">
            Ouvrons votre grand livre.
          </h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            Deux lignes suffisent pour personnaliser votre tableau de bord.
          </p>
        </div>

        <div className="space-y-5 px-7 py-6">
          <div>
            <label htmlFor="onb-name" className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Prénom
            </label>
            <input
              id="onb-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Camille"
              className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm outline-none transition-colors focus:border-pine"
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Votre situation
            </p>
            <div className="mt-2 grid gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`rounded-lg border p-3 text-left transition-all ${
                    role === r.id
                      ? "border-pine bg-pine-soft shadow-sm"
                      : "border-line bg-paper hover:border-pine/50"
                  }`}
                >
                  <span className="block text-sm font-semibold">{r.id}</span>
                  <span className="block text-xs text-ink-soft">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={submit}
            disabled={!ready}
            className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all ${
              ready
                ? "bg-pine text-paper hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-md"
                : "cursor-not-allowed bg-line/70 text-ink-soft/60"
            }`}
          >
            Ouvrir mon tableau de bord <IconArrow size={16} />
          </button>
          <p className="text-center text-[11px] text-ink-soft">
            Progression, XP et série sont enregistrés sur cet appareil.
          </p>
        </div>
      </div>
    </div>
  );
}

function AppInner() {
  const { profile } = useProgress();
  const [view, setView] = useState<View>("home");
  const [lessonId, setLessonId] = useState<string | null>(null);

  const go = (v: View) => {
    setView(v);
    setLessonId(null);
    window.scrollTo({ top: 0 });
  };

  const openLesson = (id: string) => {
    setView("modules");
    setLessonId(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <div className="noise" />
      <Shell view={view} go={go}>
        <div key={view} className="pop-in">
          {view === "home" && <Dashboard go={go} openLesson={openLesson} />}
          {view === "modules" && <Modules lessonId={lessonId} setLesson={setLessonId} />}
          {view === "quiz" && <Quiz />}
          {view === "cards" && <Flashcards />}
          {view === "exercises" && <Exercises />}
          {view === "news" && <News />}
        </div>
      </Shell>
      <Toasts />
      {profile === null && <Onboarding />}
    </>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppInner />
    </ProgressProvider>
  );
}
