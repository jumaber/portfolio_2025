export function useProjectClickTracker() {
  function track(slug, { title, subtitle } = {}) {
    window.gtag?.("event", "project_click", {
      project_slug: slug,
      project_title: title,
      project_subtitle: subtitle,
      page_location: window.location.pathname,
    });
  }
  return { track };
}
