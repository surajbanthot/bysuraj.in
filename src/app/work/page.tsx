import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function WorkPage() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-white px-6 py-10 text-zinc-900 dark:bg-black dark:text-zinc-50 sm:px-8">
      <h1 className="text-4xl font-normal tracking-tight sm:text-5xl">Work</h1>
      <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-300 sm:text-2xl">
        Work page coming soon.
      </p>

      <ScrollToTopButton />
    </main>
  );
}
