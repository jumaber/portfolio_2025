// src/components/Outcome.jsx
export function Outcome({ outcomes }) {
  return (
    <div className="flex flex-col items-start w-full h-full py-20 gap-6 px-4 md:px-8 lg:px-48">
      <div className="text-h2 blue pb-2">Outcome</div>
      {outcomes.map((item, index) => (
        <div key={index} className="flex flex-row gap-4 lg:gap-10 items-start">
          <div className="text-h3 blue pt-1">👏</div>
          <div className="paragraph">{item}</div>
        </div>
      ))}
    </div>
  );
}
