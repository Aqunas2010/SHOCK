export interface UserProgressData {
  completedLessons: string[];
  bookmarkedLessons: string[];
  lastVisitedSlug: string;
  quizHighScore: number | null;
  quizLastScore: {
    score: number;
    total: number;
    date: string;
    percentage: number;
  } | null;
}

const STORAGE_KEY = "shock_platform_learning_progress_v1";

const DEFAULT_PROGRESS: UserProgressData = {
  completedLessons: [],
  bookmarkedLessons: [],
  lastVisitedSlug: "understanding-shock",
  quizHighScore: null,
  quizLastScore: null,
};

export function getStoredProgress(): UserProgressData {
  if (typeof window === "undefined") {
    return DEFAULT_PROGRESS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);

    return {
      completedLessons: Array.isArray(parsed?.completedLessons) ? parsed.completedLessons : [],
      bookmarkedLessons: Array.isArray(parsed?.bookmarkedLessons) ? parsed.bookmarkedLessons : [],
      lastVisitedSlug: typeof parsed?.lastVisitedSlug === "string" ? parsed.lastVisitedSlug : "understanding-shock",
      quizHighScore: typeof parsed?.quizHighScore === "number" ? parsed.quizHighScore : null,
      quizLastScore: parsed?.quizLastScore && typeof parsed.quizLastScore.score === "number" ? parsed.quizLastScore : null,
    };
  } catch (err) {
    console.warn("Could not read local learning progress from localStorage", err);
    return DEFAULT_PROGRESS;
  }
}

export function saveStoredProgress(data: Partial<UserProgressData>): UserProgressData {
  if (typeof window === "undefined") {
    return DEFAULT_PROGRESS;
  }

  try {
    const current = getStoredProgress();
    const updated: UserProgressData = {
      ...current,
      ...data,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn("Could not save learning progress to localStorage", err);
    return DEFAULT_PROGRESS;
  }
}

export function toggleLessonCompletion(slug: string): boolean {
  const current = getStoredProgress();
  const isCompleted = current.completedLessons.includes(slug);
  const updatedCompleted = isCompleted
    ? current.completedLessons.filter((s) => s !== slug)
    : [...current.completedLessons, slug];

  saveStoredProgress({ completedLessons: updatedCompleted });
  return !isCompleted;
}

export function toggleLessonBookmark(slug: string): boolean {
  const current = getStoredProgress();
  const isBookmarked = current.bookmarkedLessons.includes(slug);
  const updatedBookmarks = isBookmarked
    ? current.bookmarkedLessons.filter((s) => s !== slug)
    : [...current.bookmarkedLessons, slug];

  saveStoredProgress({ bookmarkedLessons: updatedBookmarks });
  return !isBookmarked;
}

export function recordQuizAttempt(score: number, total: number = 10) {
  const current = getStoredProgress();
  const percentage = Math.round((score / total) * 100);
  const newHigh = current.quizHighScore !== null ? Math.max(current.quizHighScore, score) : score;

  const result = {
    score,
    total,
    date: new Date().toISOString(),
    percentage,
  };

  saveStoredProgress({
    quizLastScore: result,
    quizHighScore: newHigh,
  });

  return result;
}
