import DefaultImage from "/src/assets/placeholder.png";

export function Wireframes({ wireframes = [] }) {
  if (!wireframes.length) return null; // Don't render if there are no images

  return (
    <div className="flex flex-col items-start w-full h-full py-20 gap-6">
      <div className="text-h2 blue pb-2">Wireframes</div>
      <div className="flex flex-wrap w-full gap-4 lg:gap-10 items-center">
        {wireframes.map((src, index) => (
          <img
            key={index}
            src={src || DefaultImage}
            alt={`Wireframe ${index + 1}`}
            className="w-full sm:w-[47%] shadow-soft"
          />
        ))}
      </div>
    </div>
  );
}
