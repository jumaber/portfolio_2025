export function CustomHtml({ html }) {
  if (!html) return null;

  return (
    <div
      className="custom-html-block mt-12"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
