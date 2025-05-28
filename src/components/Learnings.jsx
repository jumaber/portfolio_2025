// src/components/Learnings.jsx
export function Learnings({ learnings }) {
  return (
    <div className="flex flex-col items-start p-4 md:p-8 lg:p-16 w-full h-full py-20 gap-6">
      <div className="text-h2 blue pb-2">Learnings</div>
      {learnings.map((item, index) => (
        <div key={index} className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="paragraph">{item}</div>
        </div>
      ))}
    </div>
  );
}
