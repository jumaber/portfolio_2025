import { ButtonDrag } from "./ButtonDrag";
import { Switch } from "./Switch";
import { ButtonSmall } from "./ButtonSmall";

export function ListItem({
  title = "Lens Configuration",
  image = "/src/assets/image-1.png",
  slug,
  to, 
  showDrag = true,
  showSwitch = true,
}) {
  // Determine the base path
  let basePath = to || `/project/${slug}`;

  // Trim trailing slash if it's not the root
  if (basePath.endsWith("/") && basePath !== "/") {
    basePath = basePath.slice(0, -1);
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 justify-between bg-white p-2 rounded-md w-full hover:bg-[#e8eaf1] transition-colors duration-200">
      <div className="flex items-center gap-4">
        <img src={image} className="w-16 h-auto rounded-lg" />
        <div className="font-semibold text-[16px] text-[#333]">{title}</div>
      </div>

      <div className="flex items-center gap-4">
        {showDrag && <ButtonDrag />}
        {showSwitch && <Switch />}
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
