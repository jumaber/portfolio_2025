import { useEffect } from "react";

export function ScrollTracker() {
  useEffect(() => {
    const sectionIds = ["work", "about", "experience", "contact"];
    const seen = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            const id = entry.target.id;
            seen.add(id);
            window.gtag?.("event", "section_view", {
              section: id,
            });
            // Stop tracking this section again
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // At least 50% of the section is visible
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
