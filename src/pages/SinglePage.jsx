export function SinglePage({
  title = "Redesigning the Lens Configuration Page",
  subtitle = "Mister Spex",
  location = "Berlin, Germany", 
  period = "2022/2023",
}) {
  return (
    <>
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
      <div>
        <div>{location}</div>
        –
        <div>{period}</div>
      </div>
    </>
  );
}
