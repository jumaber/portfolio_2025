export function LoadingAnimation() {
  const LoadingIcon =
    "https://res.cloudinary.com/jumaber/image/upload/v1751271023/loading_bsosp7.svg";

  return (
    <div className="bg-[var(--color-cream)] flex flex-col w-screen h-screen items-center justify-center px-4 md:px-8 lg:px-48 max-w-full overflow-x-hidden">
      <img src={LoadingIcon} className="w-[200px] loading-pulse" />
      <div className="text-h4 py-4 text-[var(--color-gray)] loading-pulse ">
        Loading ...
      </div>
    </div>
  );
}
