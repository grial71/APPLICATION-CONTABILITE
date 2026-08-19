import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { XP } from "../data/content";

/* ------------------------------------------------------------------ */

export type Profile = { name: string; role: string } | null;

export type Progress = {
  xp: number;
  xpByDay: Record<string, number>;
  completed: string[];
  cardsKnown: string[];
  exercisesDone: string[];
  newsRead: string[];
  quizPlayed: number;
  quizBest: number; // best % score
  quizCorrect: number;
  quizTotal: number;
  streak: number;
  bestStreak: number;
  lastActive: string;
};

export type Toast = { id: number; text: string; xp?: number };

const KEY = "comptalia-progress-v2";
const PKEY = "comptalia-profile-v2";

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

const defaultProgress: Progress = {
  xp: 0,
  xpByDay: {},
  completed: [],
  cardsKnown: [],
  exercisesDone: [],
  newsRead: [],
  quizPlayed: 0,
  quizBest: 0,
  quizCorrect: 0,
  quizTotal: 0,
  streak: 0,
  bestStreak: 0,
  lastActive: "",
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(PKEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */

type Ctx = {
  progress: Progress;
  profile: Profile;
  setProfile: (p: Profile) => void;
  toasts: Toast[];
  award: (xp: number, label: string) => void;
  completeLesson: (id: string) => void;
  recordQuiz: (correct: number, total: number) => number;
  markCard: (id: string) => void;
  unmarkCard: (id: string) => void;
  completeExercise: (id: string) => void;
  markNews: (id: string) => void;
};

const ProgressCtx = createContext<Ctx | null>(null);

let toastId = 0;

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(() => load(KEY, defaultProgress));
  const [profile, setProfileState] = useState<Profile>(() => loadProfile());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const dailyGranted = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      /* storage plein : on ignore */
    }
  }, [progress]);

  const pushToast = useCallback((text: string, xp?: number) => {
    const id = ++toastId;
    setToasts((t) => [...t.slice(-2), { id, text, xp }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2800);
  }, []);

  /** Applique le gain d'XP + logique de série quotidienne. */
  const award = useCallback(
    (xp: number, label: string) => {
      setProgress((p) => {
        const today = todayKey();
        const firstToday = p.lastActive !== today;
        const streak = firstToday
          ? p.lastActive === yesterdayKey()
            ? p.streak + 1
            : 1
          : p.streak;
        return {
          ...p,
          xp: p.xp + xp,
          xpByDay: { ...p.xpByDay, [today]: (p.xpByDay[today] ?? 0) + xp },
          streak: Math.max(streak, p.streak),
          bestStreak: Math.max(streak, p.bestStreak),
          lastActive: today,
        };
      });
      pushToast(label, xp);
    },
    [pushToast]
  );

  /* Bonus quotidien à la première visite du jour */
  useEffect(() => {
    if (dailyGranted.current) return;
    dailyGranted.current = true;
    if (progress.lastActive !== todayKey() && progress.lastActive !== "") {
      award(XP.daily, "Bonus quotidien — série entretenue");
    } else if (progress.lastActive === "") {
      setProgress((p) => ({ ...p, lastActive: todayKey(), streak: Math.max(1, p.streak) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setProfile = useCallback((p: Profile) => {
    setProfileState(p);
    try {
      localStorage.setItem(PKEY, JSON.stringify(p));
    } catch {
      /* ignore */
    }
  }, []);

  const completeLesson = useCallback(
    (id: string) => {
      if (progress.completed.includes(id)) return;
      setProgress((p) =>
        p.completed.includes(id) ? p : { ...p, completed: [...p.completed, id] }
      );
      award(XP.lesson, "Leçon terminée");
    },
    [award, progress.completed]
  );

  const recordQuiz = useCallback(
    (correct: number, total: number) => {
      const pct = Math.round((correct / Math.max(1, total)) * 100);
      setProgress((p) => ({
        ...p,
        quizPlayed: p.quizPlayed + 1,
        quizBest: Math.max(p.quizBest, pct),
        quizCorrect: p.quizCorrect + correct,
        quizTotal: p.quizTotal + total,
      }));
      award(correct * XP.quizCorrect, `Quiz terminé — ${correct}/${total} bonnes réponses`);
      return pct;
    },
    [award]
  );

  const markCard = useCallback(
    (id: string) => {
      if (progress.cardsKnown.includes(id)) return;
      setProgress((p) =>
        p.cardsKnown.includes(id) ? p : { ...p, cardsKnown: [...p.cardsKnown, id] }
      );
      award(XP.card, "Carte mémorisée");
    },
    [award, progress.cardsKnown]
  );

  const unmarkCard = useCallback((id: string) => {
    setProgress((p) => ({
      ...p,
      cardsKnown: p.cardsKnown.filter((c) => c !== id),
    }));
  }, []);

  const completeExercise = useCallback(
    (id: string) => {
      if (progress.exercisesDone.includes(id)) return;
      setProgress((p) =>
        p.exercisesDone.includes(id) ? p : { ...p, exercisesDone: [...p.exercisesDone, id] }
      );
      award(XP.exercise, "Écriture équilibrée et exacte");
    },
    [award, progress.exercisesDone]
  );

  const markNews = useCallback(
    (id: string) => {
      if (progress.newsRead.includes(id)) return;
      setProgress((p) =>
        p.newsRead.includes(id) ? p : { ...p, newsRead: [...p.newsRead, id] }
      );
      award(XP.news, "Mise à jour lue");
    },
    [award, progress.newsRead]
  );

  return (
    <ProgressCtx.Provider
      value={{
        progress,
        profile,
        setProfile,
        toasts,
        award,
        completeLesson,
        recordQuiz,
        markCard,
        unmarkCard,
        completeExercise,
        markNews,
      }}
    >
      {children}
    </ProgressCtx.Provider>
  );
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error("useProgress doit être utilisé dans <ProgressProvider>");
  return ctx;
}
