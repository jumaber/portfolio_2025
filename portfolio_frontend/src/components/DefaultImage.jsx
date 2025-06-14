export default function DefaultImage({
  className = "w-full h-full",
  text = "Image coming soon",
}) {
  return (
    <div
      className={`bg-gray-200 flex items-center justify-center text-gray-300 text-sm font-mono italic rounded ${className}`}
    >
      {text}
    </div>
  );
}
