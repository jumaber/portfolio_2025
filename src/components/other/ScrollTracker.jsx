import { useEffect } from "react";

/**
 * Observes when specified sections enter the viewport
 * and fires a `section_view` GA4 event once per section.
 *
 * @param {{ sectionIds?: string[] }} props
 */
export function ScrollTracker({
  // default sections for Home.jsx
  sectionIds = ["work", "about", "experience", "contact"],
}) {
  useEffect(() => {
    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            seen.add(entry.target.id);
            window.gtag?.("event", "section_view", {
              section: entry.target.id,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return null;
}
