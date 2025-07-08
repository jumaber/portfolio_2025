
export function LoadingScreen() {
  const src =
    "https://res.cloudinary.com/jumaber/image/upload/v1751271023/loading_bsosp7.svg";
    
  return (
    <div className="bg-[var(--color-cream)] flex flex-col w-screen h-screen items-center justify-center px-4 md:px-8 lg:px-48 max-w-full overflow-x-hidden">
      <div className="w-full flex flex-col items-center justify-center align-middle">
        {/* directly inlined image */}
        <img src={src} alt="Loading…" className="w-50" />

        {/* loader text */}
        <p className="w-full text-center text-h4 py-4 text-[var(--color-gray)] loading-pulse">
          Loading ...
        </p>
      </div>
    </div>
  );
}

