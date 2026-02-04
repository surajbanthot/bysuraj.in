import IstClock from "@/components/IstClock";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100svh-var(--app-chrome,0px))] flex-col overflow-hidden bg-zinc-50 dark:bg-black">
      <header className="flex w-full flex-col gap-2 px-4 pt-2 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:pt-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-normal leading-none tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Suraj here
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 sm:text-2xl">
            Design engineer (tech.)
          </p>
        </div>
        <IstClock
          id="hero-clock"
          className="text-base text-zinc-600 transition-opacity duration-200 dark:text-zinc-400 sm:text-xl"
        />
      </header>
      <main className="flex w-full flex-1 items-center justify-center bg-white px-4 pb-4 dark:bg-black sm:px-8">
        <div className="flex w-full max-w-3xl flex-col items-center gap-4">
          <p className="text-center text-xl leading-relaxed text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Portfolio will be back{" "}
            <span className="text-red-600">before</span> Avengers DOOMSDAY
          </p>
          <div className="w-full max-w-[min(90vw,720px)]">
            <div className="relative aspect-video w-full max-h-[50vh] overflow-hidden rounded-md shadow-lg sm:rounded-lg">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/f17J3AXVK5w?si=gH8AxaVHj4xwkmu5&autoplay=1&mute=0&playsinline=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </main>
      <ScrollToTopButton />
    </div>
  );
}
