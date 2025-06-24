export function About({
  aboutTitle,
  aboutDescription,
  aboutPortrait,
}) {
  return (
    <section id="about" className="flex flex-col w-full py-4 md:py-10 lg:py-20">
      <div className="text-h2 blue pb-4 md:pb-6">{aboutTitle}</div>
      <div className="flex flex-col items-start w-full md:flex-row gap-10">
        <div
          className="paragraph"
          dangerouslySetInnerHTML={{ __html: aboutDescription }}
        >
        </div>
        <img
          src={aboutPortrait}
          alt="Julia Mari Bernaus"
          className="w-full md:max-w-2xs h-auto object-contain"
        />
      </div>
    </section>
  );
}
