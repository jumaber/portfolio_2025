export function Card({
  img = "src/assets/GOP.png",
  title = "Lens Configuration Page",
  subtitle = "MisterSpex",
  tag=["UX/UI"],
  tech=[""]
}) {
  return (
    <>
      <div className="bg-white p-4 rounded-sm shadow-soft">
        <div className="pb-4">
          <img src={img} alt={title} />
          <div className="text-h3">{title}</div>
          <div className="subparagraph">{subtitle}</div>
        </div>
        <div className="flex flex-row flex-wrap gap-3 pb-4">
          <div className="tag blue">{tag}</div>
          <div className="tag blue">{tech}</div>
        </div>
        <div className="flex flex-row gap-4">
          <img src="src/assets/github_v2.svg" className="w-5 h-5" />
          <img src="src/assets/link.svg" className="w-5 h-5" />
        </div>
      </div>
    </>
  );
}
