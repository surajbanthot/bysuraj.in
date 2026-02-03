import IstClock from "@/components/IstClock";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="flex min-h-[calc(100svh-var(--app-chrome,0px))] flex-col overflow-hidden bg-zinc-50 font-sans dark:bg-black">
      <header className="flex w-full items-start justify-between px-4 pt-2 sm:px-8 sm:pt-3">
        <div className="flex flex-col gap-1">
          <h1
            className={`text-[clamp(20px,2.4vw,34px)] font-light leading-tight tracking-tight text-black dark:text-zinc-50 ${pressStart.className}`}
          >
            Suraj here
          </h1>
          <p
            className={`text-[clamp(9px,1vw,12px)] font-light text-zinc-600 dark:text-zinc-400 ${pressStart.className}`}
          >
            Design engineer (tech.)
          </p>
        </div>
        <IstClock
          id="hero-clock"
          className={`text-[clamp(9px,1vw,12px)] font-light text-zinc-600 transition-opacity duration-200 dark:text-zinc-400 ${pressStart.className}`}
        />
      </header>
      <main className="flex w-full flex-1 items-center justify-center bg-white px-4 pb-4 dark:bg-black sm:px-8">
        <div className="flex w-full max-w-3xl flex-col items-center gap-3">
          <p
            className={`text-center text-[clamp(11px,1.1vw,16px)] leading-relaxed text-zinc-900 dark:text-zinc-50 ${pressStart.className}`}
          >
            Portfolio will be back{" "}
            <span className="text-red-600">before</span> Avengers DOOMSDAY
          </p>
          <div className="w-full max-w-[min(80vw,720px)]">
            <div className="relative aspect-video w-full max-h-[40vh] overflow-hidden rounded-md shadow-lg sm:rounded-lg">
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
