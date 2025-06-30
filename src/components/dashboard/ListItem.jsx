import { ButtonDrag } from "./ButtonDrag";
import { Switch } from "./Switch";
import { ButtonSmall } from "./ButtonSmall";

export function ListItem({
  title = "",
  image = "/src/assets/image-1.png",
  slug,
  featured = false,
  to,
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
        <ButtonSmall
          text="Edit"
          image={null}
          to={basePath === "/" ? "/edit" : `${basePath}/edit`}
          bgColor="bg-[var(--color-lightgray)]"
          textColor="bg-[var(--color-gray)]"
        />
        <ButtonSmall
          text="Visit"
          image="/src/assets/link.svg"
          to={basePath}
          className="bg-[#f5f5f5] hover:"
          bgColor="bg-[var(--color-lightgray)]"
          textColor="bg-[var(--color-gray)]"
          hoverColor="bg-[var(--color-yellow)]"
          hoverTextColor="text-[var(--color-gray)]"
          newTab={basePath !== "/"}
        />
      </div>
    </div>
  );
}
