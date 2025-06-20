import { Link } from "react-router-dom";

export function ButtonSmall({
  text = "Visit",
  to = null,
  ariaLabel = "Visit link",
  image = "/src/assets/link.svg",
  className = "",
  onClick = null,
  newTab = false,
}) {
  const baseClasses =
    "inline-flex items-center gap-1 rounded-3xl px-2 py-1 w-fit font-semibold text-[13px] " +
    className;

  // Pure action button (no 'to' prop)
  if (!to && onClick) {
    return (
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={baseClasses}
        type="button"
      >
        <span>{text}</span>
        {image && <img src={image} alt="" />}
      </button>
    );
  }

  // External link
  if (to?.startsWith("http") || newTab) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={baseClasses}
      >
        <span>{text}</span>
        {image && <img src={image} alt="" />}
      </a>
    );
  }

  // Internal navigation
  return (
    <Link to={to || "/"} aria-label={ariaLabel} className={baseClasses}>
      <span>{text}</span>
      {image && <img src={image} alt="" />}
    </Link>
  );
}
