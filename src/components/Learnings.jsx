// src/components/Learnings.jsx
export function Learnings({ learnings }) {
  return (
    <div className="flex flex-col items-start w-full h-full py-20 gap-6">
      <div className="text-h2 blue pb-2">Learnings</div>
      {learnings.map((item, index) => (
        <div key={index} className="flex flex-row gap-4 lg:gap-10 items-start">
          <div className="text-h3 blue pt-0.5">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="paragraph">{item}</div>
        </div>
      ))}
    </div>
  );
}
