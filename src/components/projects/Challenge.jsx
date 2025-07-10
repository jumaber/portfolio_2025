export function Challenge({ challenges }) {
  if (!challenges || challenges.length === 0) return null; // Don't render if empty

  return (
    <div className="flex flex-col items-center w-screen bg-[var(--color-cream)] h-full py-6 lg:pt-24 px-4">
      <div className="max-w-[800px]">
        <div className="text-h2 blue pb-2">Challenge</div>
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="flex flex-row gap-4 lg:gap-10 lg:pb-4 items-start"
          >
            <div className="text-h3 blue pt-0.5 w-[32px]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="paragraph lg:w-screen">{challenge}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
