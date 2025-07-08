export function Outcome({ outcomes }) {
  if (!outcomes || outcomes.length === 0) return null; // Don't render if empty

  return (
    <div className="flex flex-col items-center w-screen h-full pt-20 px-4">
      <div className="max-w-[800px]">
        <div className="text-h2 blue pb-2">Outcome</div>
        {outcomes.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-4 lg:gap-10 lg:pb-4 items-start"
          >
            <div className="text-h3 blue pt-1 w-[32px]">👏</div>
            <div className="paragraph">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
