import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type ReviewState = {
  name: string;
  age: string;
  gender: string;
  selected_typography: string;
  selected_logo: string;
  color_feedback: string;
  colors_note: string;
  typography_note: string;
  logo_note: string;
  overall_feedback: string;
};

const empty: ReviewState = {
  name: "",
  age: "",
  gender: "",
  selected_typography: "",
  selected_logo: "",
  color_feedback: "",
  colors_note: "",
  typography_note: "",
  logo_note: "",
  overall_feedback: "",
};

const STORAGE_KEY = "cs-draft-01-review";

type Ctx = {
  review: ReviewState;
  set: <K extends keyof ReviewState>(key: K, value: ReviewState[K]) => void;
  reset: () => void;
};

const ReviewContext = createContext<Ctx>({ review: empty, set: () => {}, reset: () => {} });

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [review, setReview] = useState<ReviewState>(empty);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setReview({ ...empty, ...(JSON.parse(raw) as Partial<ReviewState>) });
    } catch {
      /* ignore */
    }
  }, []);

  const set = useCallback<Ctx["set"]>((key, value) => {
    setReview((prev) => {
      const next = { ...prev, [key]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setReview(empty);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return <ReviewContext.Provider value={{ review, set, reset }}>{children}</ReviewContext.Provider>;
}

export function useReview() {
  return useContext(ReviewContext);
}
