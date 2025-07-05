export function About({
  aboutTitle,
  aboutDescription,
  aboutPortrait,
}) {
  return (
    <section id="about" className="flex flex-col w-full pt-20 md:pt-02 ">
      <div className="text-h2 blue pb-4 md:pb-6">{aboutTitle}</div>
      <div className="flex flex-col items-start w-full md:flex-row gap-10">
        <div className="paragraph lg:max-w-[600px]">
          {aboutDescription?.blocks?.map((block, index) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: block.data.text }}
                    className="paragraph pt-4"
                  />
                );
              case "header":
                return (
                  <h2 key={index} className="text-h2 pt-4">
                    {block.data.text}
                  </h2>
                );
              default:
                return null;
            }
          })}
        </div>
        <img
          src={aboutPortrait}
          alt="Julia Mari Bernaus"
          className="w-full md:max-w-2xs h-auto object-contain pt-7"
        />
      </div>
    </section>
  );
}
