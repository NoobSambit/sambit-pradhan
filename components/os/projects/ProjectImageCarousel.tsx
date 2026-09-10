"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectUiIcon } from "@/components/os/projects/ProjectUiIcon";

export type ProjectBanner = {
  alt: string;
  label: string;
  src: string;
};

const ROTATION_INTERVAL_MS = 5000;

function CarouselIcon({
  type,
}: {
  type: "close" | "expand" | "next" | "pause" | "play" | "previous";
}) {
  if (type === "previous")
    return <ProjectUiIcon name="chevron-left" size="sm" className="armyverse-carousel-icon" />;
  if (type === "next")
    return <ProjectUiIcon name="chevron-right" size="sm" className="armyverse-carousel-icon" />;
  if (type === "pause")
    return <ProjectUiIcon name="pause" size="sm" className="armyverse-carousel-icon" />;
  if (type === "play")
    return <ProjectUiIcon name="play" size="sm" className="armyverse-carousel-icon" />;
  if (type === "expand")
    return <ProjectUiIcon name="expand" size="sm" className="armyverse-carousel-icon" />;
  return <ProjectUiIcon name="close" size="sm" className="armyverse-carousel-icon" />;
}

export function ProjectImageCarousel({
  banners,
  projectName,
}: {
  banners: readonly ProjectBanner[];
  projectName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const activeBanner = banners[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const nextBanner = banners[(activeIndex + 1) % banners.length];
    const preload = new window.Image();
    preload.src = nextBanner.src;
  }, [activeIndex, banners]);

  useEffect(() => {
    if (isPaused || isPointerOver || isViewerOpen || reducedMotion) return;
    const timer = window.setTimeout(
      () => setActiveIndex((index) => (index + 1) % banners.length),
      ROTATION_INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [banners.length, isPaused, isPointerOver, isViewerOpen, reducedMotion]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isViewerOpen && !dialog.open) dialog.showModal();
    if (!isViewerOpen && dialog.open) dialog.close();
  }, [isViewerOpen]);

  const showPrevious = () =>
    setActiveIndex((index) => (index - 1 + banners.length) % banners.length);
  const showNext = () =>
    setActiveIndex((index) => (index + 1) % banners.length);
  const closeViewer = () => {
    setIsViewerOpen(false);
    window.requestAnimationFrame(() => expandButtonRef.current?.focus());
  };

  return (
    <>
      <figure
        aria-label={`${projectName} product posters`}
        aria-roledescription="carousel"
        className="armyverse-product-preview armyverse-screen-carousel"
        onFocus={() => setIsPointerOver(true)}
        onMouseEnter={() => setIsPointerOver(true)}
        onMouseLeave={() => setIsPointerOver(false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsPointerOver(false);
          }
        }}
      >
        <img
          alt={activeBanner.alt}
          className="armyverse-carousel-image"
          decoding="async"
          height={941}
          key={activeBanner.src}
          loading="eager"
          src={activeBanner.src}
          width={1672}
        />
        <div aria-hidden="true" className="armyverse-carousel-scrim" />
        <nav
          aria-label={`${projectName} image controls`}
          className="armyverse-carousel-controls"
        >
          <button
            aria-label={`Show previous ${projectName} poster`}
            onClick={showPrevious}
            type="button"
          >
            <CarouselIcon type="previous" />
          </button>
          <span className="armyverse-carousel-label">
            <small>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(banners.length).padStart(2, "0")}
            </small>
            <b>{activeBanner.label}</b>
          </span>
          <button
            aria-label={`Show next ${projectName} poster`}
            onClick={showNext}
            type="button"
          >
            <CarouselIcon type="next" />
          </button>
          <button
            aria-label={`Expand ${activeBanner.label} image`}
            className="armyverse-carousel-expand"
            onClick={() => setIsViewerOpen(true)}
            ref={expandButtonRef}
            type="button"
          >
            <CarouselIcon type="expand" />
          </button>
          <button
            aria-label={
              isPaused ? "Resume automatic posters" : "Pause automatic posters"
            }
            aria-pressed={isPaused}
            className="armyverse-carousel-autoplay"
            onClick={() => setIsPaused((paused) => !paused)}
            type="button"
          >
            <CarouselIcon type={isPaused ? "play" : "pause"} />
          </button>
          <span
            aria-label={`${activeIndex + 1} of ${banners.length} posters`}
            className="armyverse-carousel-dots"
          >
            {banners.map((banner, index) => (
              <button
                aria-label={`Show ${banner.label}`}
                aria-pressed={index === activeIndex}
                className={index === activeIndex ? "active" : ""}
                key={banner.src}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </span>
        </nav>
      </figure>
      <dialog
        aria-label={`${activeBanner.label} image viewer`}
        className="armyverse-image-dialog"
        onCancel={(event) => {
          event.preventDefault();
          closeViewer();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeViewer();
        }}
        onClose={closeViewer}
        ref={dialogRef}
      >
        <section className="armyverse-image-viewer">
          <header>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(banners.length).padStart(2, "0")}
            </span>
            <b>{activeBanner.label}</b>
            <button
              aria-label="Close image viewer"
              autoFocus={isViewerOpen}
              onClick={closeViewer}
              type="button"
            >
              <CarouselIcon type="close" />
            </button>
          </header>
          <div className="armyverse-image-viewer-frame">
            <img
              alt={activeBanner.alt}
              height={941}
              src={activeBanner.src}
              width={1672}
            />
          </div>
          <footer aria-label="Image viewer controls">
            <button
              aria-label={`Show previous ${projectName} poster`}
              onClick={showPrevious}
              type="button"
            >
              <CarouselIcon type="previous" />
            </button>
            <span className="armyverse-carousel-dots">
              {banners.map((banner, index) => (
                <button
                  aria-label={`Show ${banner.label}`}
                  aria-pressed={index === activeIndex}
                  className={index === activeIndex ? "active" : ""}
                  key={banner.src}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              ))}
            </span>
            <button
              aria-label={`Show next ${projectName} poster`}
              onClick={showNext}
              type="button"
            >
              <CarouselIcon type="next" />
            </button>
          </footer>
        </section>
      </dialog>
    </>
  );
}
