import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function MotionGraphicsPage() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-white px-4 py-8 text-zinc-900 dark:bg-black dark:text-zinc-50 sm:px-8 sm:py-10">
      <h1 className="font-[family-name:var(--font-bungee)] text-3xl font-normal tracking-tight sm:text-5xl">MotionGraphics</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300 sm:text-2xl">
        MotionGraphics page coming soon.
      </p>

      <ScrollToTopButton />
    </main>
  );
}
