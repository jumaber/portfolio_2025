// src/components/Wireframes.jsx
export function Wireframes({ wireframes = [] }) {
  if (!wireframes.length) return null; // Don't render if there are no images

  return (
    <div className="flex flex-col items-start p-4 md:p-8 lg:p-16 w-screen h-full py-20 gap-6 bg-[#f5f5f5]">
      <div className="text-h2 blue pb-2">Wireframes</div>
      <div className="flex flex-wrap w-full gap-4 lg:gap-10 items-center">
        {wireframes.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Wireframe ${index + 1}`}
            className="w-full sm:w-[48%]"
          />
        ))}
      </div>
    </div>
  );
}
