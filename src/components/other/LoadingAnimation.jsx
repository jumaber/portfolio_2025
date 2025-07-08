export function LoadingAnimation({
  classNameImage = "w-48",
  classNameText = "w-full text-center text-h4 py-4 text-[var(--color-gray)] loading-pulse",
}) {
  const src =
    "https://res.cloudinary.com/jumaber/image/upload/v1751271023/loading_bsosp7.svg";

  return (
    <div className="w-full flex flex-col items-center justify-center align-middle ">
      <div className="loading-pulse">
        {/* directly inlined image */}
        <img src={src} alt="Loading…" className={classNameImage} />

        {/* loader text */}
        <p className={classNameText}>Loading ...</p>
      </div>
    </div>
  );
}
