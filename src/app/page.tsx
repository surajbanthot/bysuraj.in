import IstClock from "@/components/IstClock";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import PixelatedVideoBackground from "@/components/PixelatedVideoBackground";

export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100svh-var(--app-chrome,0px))] flex-col overflow-hidden">
      {/* Pixelated Cityscape Video Background */}
      <PixelatedVideoBackground src="/4696050-uhd_3840_2160_24fps.mp4" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-1 flex-col">
        <header className="flex w-full flex-col gap-2 px-4 pt-2 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:pt-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-normal leading-none tracking-tight text-white drop-shadow-lg sm:text-5xl">
              Suraj here
            </h1>
            <p className="text-lg text-zinc-200 drop-shadow-md sm:text-2xl">
              Design engineer (tech.)
            </p>
          </div>
          <IstClock
            id="hero-clock"
            className="text-base text-zinc-200 drop-shadow-md transition-opacity duration-200 sm:text-xl"
          />
        </header>
        <main className="flex w-full flex-1 items-center justify-center px-4 pb-4 sm:px-8">
          <div className="flex w-full max-w-3xl flex-col items-center gap-4">
            {/* Content coming soon */}
          </div>
        </main>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
