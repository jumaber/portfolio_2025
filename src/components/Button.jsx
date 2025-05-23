import { Link } from "react-router-dom"

export function Button({
  text = "Contact me!",
  to = "mailto:hi@juliamaribernaus.com",
  ariaLabel = "Get in touch",
}) {
  const isExternal = to.startsWith("http") || to.startsWith("mailto:");

  if (isExternal) {
    return (
      <a href={to} aria-label={ariaLabel}>
        <div className="rounded-sm bg-[var(--color-blue)] text-h4 text-white px-4 py-3 max-w-fit">{text}</div>
      </a>
    );
  }

  return (
    <Link to={to} aria-label={ariaLabel}>
      {text}
    </Link>
  );
}
