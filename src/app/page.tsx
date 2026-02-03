import IstClock from "@/components/IstClock";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="flex w-full items-start justify-between px-4 pt-4 sm:px-8 sm:pt-6">
        <h1
          className={`text-[28px] font-normal leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-[40px] ${pressStart.className}`}
        >
          Suraj here
        </h1>
        <IstClock
          className={`text-[10px] font-normal text-zinc-600 dark:text-zinc-400 sm:text-sm ${pressStart.className}`}
        />
      </header>
      <main className="flex w-full flex-1 items-center justify-center bg-white px-4 pb-10 dark:bg-black sm:px-8">
        <div className="flex w-full max-w-3xl flex-col items-center gap-4 sm:gap-6">
          <p
            className={`text-center text-sm leading-relaxed text-zinc-900 dark:text-zinc-50 sm:text-lg sm:leading-normal ${pressStart.className}`}
          >
            Portfolio will be back{" "}
            <span className="text-red-600">before</span> Avengers DOOMSDAY
          </p>
          <div className="w-full max-w-lg sm:max-w-2xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-md shadow-lg sm:rounded-lg">
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
    </div>
  );
}
