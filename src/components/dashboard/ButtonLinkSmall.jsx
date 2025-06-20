import { Link } from "react-router-dom";

export function ButtonLinkSmall({ text, to, image = null, className = "" }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-1 rounded-2xl text-sm ${className}`}
    >
      {image && <img src={image} alt="" className="w-4 h-4" />}
      {text}
    </Link>
  );
}
