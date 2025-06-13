// src/components/Learnings.jsx
export function Learnings({ learnings }) {
  return (
    <div className="flex flex-col items-center w-full h-full py-20 px-4">
      <div className="max-w-[800px]">
        <div className="text-h2 blue pb-2">Learnings</div>
        {learnings.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-4 lg:gap-10 lg:pb-4 items-start"
          >
            <div className="text-h3 blue pt-0.5 w-[32px]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="paragraph">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
