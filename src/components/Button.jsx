import { Link } from "react-router-dom"

export function Button({
  text = "Contact me!",
  to = "mailto:hi@juliamaribernaus.com",
  ariaLabel = "Get in touch",
}) {
  const isExternal = to.startsWith("http") || to.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={to}
        aria-label={ariaLabel}
        onClick={() => {
          if (window.gtag) {
            window.gtag("event", "contact_click", {
              method: "mailto",
              label: text,
              location: "Home",
            });
          }
        }}
      >
        <div className="rounded-sm bg-[var(--color-blue)] text-h4 text-white px-4 py-3 max-w-fit transition-all duration-200 ease-in-out shadow-none hover:shadow-[8px_8px_0_0_var(--color-pink)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
          {text}
        </div>
      </a>
    );
  }

  
  return (
    <Link to={to} aria-label={ariaLabel}>
      {text}
    </Link>
  );
}
