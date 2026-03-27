"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CustomCursor } from "@/components/ui/CustomCursor";

type CursorContextValue = {
  setCursorDisabled: (disabled: boolean) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursorOptional() {
  return useContext(CursorContext);
}

type Props = {
  children: React.ReactNode;
};

export function CursorProvider({ children }: Props) {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      setDisabled(!mq.matches || motion.matches);
    };

    apply();
    mq.addEventListener("change", apply);
    motion.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      motion.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      document.body.classList.remove("custom-cursor-active");
    } else {
      document.body.classList.add("custom-cursor-active");
    }
    return () => document.body.classList.remove("custom-cursor-active");
  }, [disabled]);

  const setCursorDisabled = useCallback((value: boolean) => {
    setDisabled(value);
  }, []);

  const value = useMemo(
    () => ({ setCursorDisabled }),
    [setCursorDisabled],
  );

  return (
    <CursorContext.Provider value={value}>
      {!disabled && <CustomCursor />}
      {children}
    </CursorContext.Provider>
  );
}
