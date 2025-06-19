import { Button } from "../components/other/Button"

export function PageNotFound() {

  return (
    <div className="animate-fade-slide">
      <div className="flex flex-col items-center justify-center text-center p-4 lg:py-20 min-h-screen bg-[var(--color-cream)] animate-fade-slide">
        {/* GIF */}
        <div className="flex flex-row justify-center w-full pb-4 lg:pb-10">
          <div className="w-48">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-64 h-auto opacity-80 rounded-md"
            >
              <source src="https://res.cloudinary.com/jumaber/video/upload/v1750354300/404_nkynys.mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="title pink">Oh no.</h1>
        <h1 className="text-h1 blue mb-6">You weren’t supposed to see this.</h1>

        <p className="paragraph gray mb-6 lg:mb-16">
          It’s the digital equivalent of walking into the wrong Zoom room 😳
        </p>

        <Button text="Back to where it all makes sense" to="/" />
      </div>
    </div>
  );
}
