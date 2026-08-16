"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Observe one sensible UI group and resolve it once. The selector form keeps
 * the landing page's server-rendered section markup intact.
 */
export function useInViewOnce<T extends Element>(selector?: string) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = selector
      ? (document.querySelector(selector) as T | null)
      : ref.current;

    if (!target || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [selector]);

  return { ref, isVisible };
}
