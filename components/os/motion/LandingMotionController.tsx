"use client";

import { useEffect, useRef } from "react";
import { useInViewOnce } from "./useInViewOnce";

const bootSessionKey = "sambit-os-boot-complete";

export function LandingMotionController() {
  const { isVisible } = useInViewOnce<HTMLElement>(".portfolio-shell");
  const bootStarted = useRef(false);

  useEffect(() => {
    if (!isVisible) return;

    const shell = document.querySelector<HTMLElement>(".portfolio-shell");
    if (!shell) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMotionPreference = () => {
      shell.dataset.motionReduced = String(reducedMotion.matches);
      if (reducedMotion.matches) {
        shell.dataset.motionBoot = "settled";
        shell
          .querySelectorAll<HTMLElement>("[data-motion-section]")
          .forEach((section) => {
            section.dataset.motionVisible = "true";
          });
      }
    };

    if (!bootStarted.current) {
      let sessionComplete = false;
      try {
        sessionComplete =
          window.sessionStorage.getItem(bootSessionKey) === "1";
      } catch {
        sessionComplete = false;
      }
      shell.dataset.motionBoot = sessionComplete ? "settled" : "active";
      if (!sessionComplete && !reducedMotion.matches) {
        try {
          window.sessionStorage.setItem(bootSessionKey, "1");
        } catch {
          // Motion remains an enhancement when storage is unavailable.
        }
      }
      bootStarted.current = true;
    }
    applyMotionPreference();

    const sections = Array.from(
      shell.querySelectorAll<HTMLElement>("[data-motion-section]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.motionVisible = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 },
    );

    if (reducedMotion.matches) {
      sections.forEach((section) => {
        section.dataset.motionVisible = "true";
      });
    } else {
      sections.forEach((section) => observer.observe(section));
    }

    reducedMotion.addEventListener("change", applyMotionPreference);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", applyMotionPreference);
    };
  }, [isVisible]);

  return null;
}
