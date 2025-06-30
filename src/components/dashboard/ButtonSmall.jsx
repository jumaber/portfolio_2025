import { Link } from "react-router-dom";

export function ButtonSmall({
  text = "Visit",
  to = null,
  ariaLabel = "Visit link",
  image = "",
  className = "",
  onClick = null,
  newTab = false,
  bgColor = "bg-[var(--color-blue)]",
  textColor = "text-white",
  hoverColor = "bg-[var(--color-pink)]",
  hoverTextColor = "text-white",
  paddingX = "px-2",
  paddingY = "py-1",
  textSize = "text-[13px]",
}) {
  const baseClasses = `
  inline-flex items-center gap-1 rounded-3xl w-fit h-fit font-bold ${textSize} ${paddingX} ${paddingY} 
  ${bgColor} ${textColor} hover:${hoverColor} hover:${hoverTextColor} ${className} 
`.trim();

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
