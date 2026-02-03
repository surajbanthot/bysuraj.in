import Image from "next/image";
import IstClock from "@/components/IstClock";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="absolute left-6 top-6 z-10">
        <h1 className="text-xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Suraj here
        </h1>
      </div>
      <div className="absolute right-6 top-6 z-10 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        <IstClock />
      </div>
      <main className="min-h-screen w-full bg-white dark:bg-black" />
    </div>
  );
}
