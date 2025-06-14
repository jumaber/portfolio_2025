import { Link } from "react-router-dom";

export function ButtonSmall({
  text = "Visit",
  to = "/",
  ariaLabel = "Visit link",
  image = "/src/assets/link.svg",
  className = "",
}) {
  const isExternal = to.startsWith("http");

  const baseClasses =
    "inline-flex items-center gap-1 rounded-3xl bg-[#F5F5F5] px-2 py-1 w-fit font-semibold text-[#333] text-[13px] " +
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

  return (
    <Link to={to} aria-label={ariaLabel} className={baseClasses}>
      <span>{text}</span>
      {image && <img src={image} alt="" />}
    </Link>
  );
}

// How to use

// Internal Use
// <ButtonSmall text="Edit Project" to="/project/edit" />

// External Use
// <ButtonSmall text="GitHub" to="https://github.com/jumaber" />

// No Icon
// <ButtonSmall text="Edit" to="/edit" image={null} />
