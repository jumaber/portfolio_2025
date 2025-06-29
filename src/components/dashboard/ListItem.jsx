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
      className={`flex flex-col md:flex-row items-center gap-4 justify-between bg-white px-2 py-4 w-full hover:bg-[#e8eaf1] transition-colors duration-200 ${
        showBorder ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <img src={image} className="w-16 h-auto rounded-lg" />
        <div className="font-semibold text-[16px] text-[#333]">{title}</div>
      </div>

      <div className="flex items-center gap-4">
        {showDrag && <ButtonDrag />}
        {showSwitch && (
          <Switch checked={featured} onChange={onToggleFeatured} />
        )}
        <ButtonSmall
          text="Edit"
          image={null}
          to={basePath === "/" ? "/edit" : `${basePath}/edit`}
          className="bg-[#f5f5f5]"
        />
        <ButtonSmall
          text="Visit"
          image="/src/assets/link.svg"
          to={basePath}
          className="bg-[#f5f5f5]"
          newTab={basePath !== "/"}
        />
      </div>
    </div>
  );
}
