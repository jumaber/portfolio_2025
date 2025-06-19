import { ButtonDrag } from "./ButtonDrag";
import { Switch } from "./Switch";
import { ButtonSmall } from "./ButtonSmall";

export function ListItem({ 
  title = "Lens Configuration",
  image = "/src/assets/image-1.png",
  slug = "lens-configuration" 

 }) {

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 justify-between bg-white p-2 rounded-md w-full hover:bg-[#e8eaf1] transition-colors duration-200">
      {/* Left: Image + Title */}
      <div className="flex items-center gap-4">
        {/* Placeholder Image */}
        <img src={image} className="w-16 h-auto rounded-lg" />
        {/* Title */}
        <div className="font-semibold text-[16px] text-[#333]">{title}</div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        <ButtonDrag />
        <Switch />
        <ButtonSmall text="Edit" image={null} to={`/project/${slug}/edit`} />
        <ButtonSmall
          text="Visit"
          image="/src/assets/link.svg"
          to={`/project/${slug}`}
        />
      </div>
    </div>
  );
}
