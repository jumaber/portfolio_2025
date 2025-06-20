import { Link } from "react-router-dom";

export function ButtonSmall({
  text = "Visit",
  to = "/",
  ariaLabel = "Visit link",
  image = "/src/assets/link.svg",
  className = "",
  onClick = null,
  newTab = false,
}) {
  // External link
  const isExternal = to.startsWith("http");

  const baseClasses =
    "inline-flex items-center gap-1 rounded-3xl px-2 py-1 w-fit font-semibold text-[13px] " +
    className;

  if (isExternal) {
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

  // Internal link = open in same tab or new tab
  if (newTab) {
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

  // Use Link for internal navigation
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={baseClasses}
      onClick={onClick}
    >
      <span>{text}</span>
      {image && <img src={image} alt="" />}
    </Link>
  );
}
