import { ButtonDrag } from "./ButtonDrag";
import { Switch } from "./Switch";
import { ButtonSmall } from "./ButtonSmall";
import { Trash2, ExternalLink, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export function ListItem({
  title = "",
  image = "",
  slug = "",
  featured = false,
  to = "",
  showDrag = true,
  showSwitch = true,
  onToggleFeatured,
  showBorder = true,
}) {
  let basePath = to || `/project/${slug}`;
  if (basePath.endsWith("/") && basePath !== "/") {
    basePath = basePath.slice(0, -1);
  }

  return (
    <div
      className={`flex flex-col md:flex-row items-start lg:items-center gap-10 justify-between bg-white px-2 py-4 w-full hover:bg-[#e8eaf1] transition-colors duration-200 ${
        showBorder ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="flex items-center gap-4 w-full">
        <img src={image} className="w-16 h-auto rounded-lg" />
        <div className="font-semibold text-[16px] text-[#333]">{title}</div>
      </div>

      <div className="flex flex-row w-full justify-end items-center gap-4">
        {showDrag && <ButtonDrag />}
        {showSwitch && (
          <Switch checked={featured} onChange={onToggleFeatured} />
        )}

        {/* ✍️ Edit + 🔗 Preview Link */}
        <div className="flex flex-row gap-2">
          <Link to={basePath === "/" ? "/edit" : `${basePath}/edit`}>
            <Pencil className="w-9 h-9 p-2 cursor-pointer text-[var(--color-black)] hover:text-[var(--color-pink)]" />
          </Link>
          <a href={basePath} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-9 h-9 p-2 cursor-pointer text-[var(--color-black)] hover:text-[var(--color-pink)]" />
          </a>
        </div>
      </div>
    </div>
  );
}
