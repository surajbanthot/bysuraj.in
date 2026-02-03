import IstClock from "@/components/IstClock";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="absolute left-6 top-6 z-10">
        <h1
          className={`text-[40px] font-normal tracking-tight text-black dark:text-zinc-50 ${pressStart.className}`}
        >
          Suraj here
        </h1>
      </div>
      <div className="absolute right-6 top-6 z-10 text-sm font-normal text-zinc-600 dark:text-zinc-400">
        <IstClock className={pressStart.className} />
      </div>
      <main className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-black">
        <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-6">
          <p
            className={`text-center text-lg text-zinc-900 dark:text-zinc-50 ${pressStart.className}`}
          >
            Portfolio will be back{" "}
            <span className="text-red-600">before</span> Avengers DOOMSDAY
          </p>
          <div className="w-full max-w-2xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
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
