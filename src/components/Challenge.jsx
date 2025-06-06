export function Challenge({ challenges }) {
  return (
    <div className="flex flex-col items-center w-full h-full pt-20 px-4 md:px-8">
        <div className="max-w-[800px]">      
        <div className="text-h2 blue pb-2">Challenge</div>
      {challenges.map((challenge, index) => (
        <div key={index} className="flex flex-row gap-4 lg:gap-10 items-start">
          <div className="text-h3 blue pt-0.5">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="paragraph">{challenge}</div>
        </div>
      ))}
    </div>
    </div>
  );
}
