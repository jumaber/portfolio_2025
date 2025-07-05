export function TextBlock({ data }) {
  if (!data?.blocks) return null;

  return (
    <div className="w-screen flex flex-col py-20 px-4 md:px-8 items-center">
        <div className="flex flex-col items-start w-full lg:w-[800px]">
          {data.blocks.map((block, index) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: block.data.text }}
                    className="paragraph mb-4"
                  />
                );

              case "header": {
                const Tag = `h${block.data.level || 2}`;
                return (
                  <Tag key={index} className="text-h2 blue mb-2">
                    {block.data.text}
                  </Tag>
                );
              }

              default:
                return null;
            }
          })}
        </div>
      </div>
  );
}
