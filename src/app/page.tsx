
import PixelatedVideoBackground from "@/components/PixelatedVideoBackground";
import IstClock from "@/components/IstClock";
import ScrollToTopButton from "@/components/ScrollToTopButton";


export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100svh-var(--app-chrome,0px))] flex-col overflow-hidden">
      <PixelatedVideoBackground src="/Pixel_Art_City_and_Mountain_Video.mp4" />
      {/* Content Layer */}
      <div className="relative z-10 flex flex-1 flex-col">
        <header className="hidden sm:flex w-full flex-col gap-2 px-4 pt-2 sm:flex-row sm:items-start sm:justify-end sm:px-8 sm:pt-3">
          <IstClock
            id="hero-clock"
            className="text-base text-zinc-200 drop-shadow-md transition-opacity duration-200 sm:text-xl"
          />
        </header>
        <main className="flex w-full flex-1 items-center justify-center px-4 pb-4 sm:px-8">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-start gap-2 rounded-[3rem] bg-black/5 px-8 py-6 backdrop-blur-[2px] sm:px-12 sm:py-8">
              <h1 className="font-normal leading-none tracking-tight text-orange-500 drop-shadow-xl">
                <span className="block text-3xl sm:text-5xl mb-1">hi</span>
                <span className="text-6xl sm:text-8xl">Suraj</span>
                <span className="text-3xl sm:text-5xl ml-2">here</span>
                <span className="text-3xl sm:text-5xl ml-1 inline-block">:)</span>
              </h1>
              <p className="-mt-1 text-2xl text-orange-200 drop-shadow-lg sm:text-4xl">
                Design engineer (tech.)
              </p>
            </div>
          </div>
        </main>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
