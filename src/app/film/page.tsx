import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function FilmPage() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-white px-4 py-8 text-zinc-900 dark:bg-black dark:text-zinc-50 sm:px-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 sm:gap-10">
        <header className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl font-normal tracking-tight sm:text-5xl">Film(Analogue)</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
            I am an analogue camera person. My main tool is the{" "}
            <a
              href="https://www.instagram.com/explore/tags/pentax67/"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-900 underline decoration-orange-400/70 underline-offset-4 transition hover:text-orange-500 dark:text-zinc-100"
            >
              Pentax 67II
            </a>
            , and I shoot medium format film to slow down, compose with intent,
            and embrace the physicality of the process.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-normal tracking-tight sm:text-3xl">
            Why Medium Format
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
            Medium format film uses a larger negative than 35mm, which gives you
            richer tonal transitions, cleaner detail, and a distinctive sense of
            depth. It is also a more deliberate workflow: fewer frames per roll,
            more intention per click, and a tangible connection to the image
            once it is developed.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3 rounded-md border border-zinc-200/70 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-black/40">
            <h3 className="text-xl font-normal tracking-tight sm:text-2xl">
              Camera: Pentax 67II
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
              A classic 6x7 system known for its balance of portability and
              image quality. It feels like a tank, but shoots like a large SLR.
            </p>
          </div>
          <div className="space-y-3 rounded-md border border-zinc-200/70 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-black/40">
            <h3 className="text-xl font-normal tracking-tight sm:text-2xl">
              Process & Practice
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
              I meter carefully, compose patiently, and keep notes for each
              roll. The goal is consistency and character, not speed.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-normal tracking-tight sm:text-3xl">
            What I Look For
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
            Quiet light, strong geometry, and subjects that benefit from
            texture. Film rewards subtlety, so I chase moments that feel honest
            and tactile.
          </p>
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-normal tracking-tight sm:text-3xl">
              Medium Format Film Enquiry
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 sm:text-xl">
              If you would like to hire me for medium format film photos, share
              a few details below and I will get back to you.
            </p>
          </div>
          <form className="grid gap-4 rounded-md border border-zinc-200/70 bg-zinc-50/60 p-5 text-lg text-zinc-700 dark:border-zinc-800 dark:bg-black/40 dark:text-zinc-200 sm:grid-cols-2 sm:text-xl">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-base text-zinc-500 sm:text-lg">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base text-zinc-500 sm:text-lg">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="project" className="text-base text-zinc-500 sm:text-lg">
                Project Type
              </label>
              <input
                id="project"
                name="project"
                type="text"
                placeholder="Portraits, editorial, product, etc."
                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-base text-zinc-500 sm:text-lg">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="City / Venue"
                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-base text-zinc-500 sm:text-lg">
                Shoot Date
              </label>
              <input
                id="date"
                name="date"
                type="text"
                placeholder="Preferred date"
                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-base text-zinc-500 sm:text-lg">
                Budget Range (Optional)
              </label>
              <input
                id="budget"
                name="budget"
                type="text"
                placeholder="Your budget range"
                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
              />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="message" className="text-base text-zinc-500 sm:text-lg">
                Project Notes
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell me about the concept, scope, and deliverables."
                className="rounded border border-zinc-300/70 bg-white/70 px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-orange-400/70 focus:outline-none dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-50"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="button"
                className="w-full rounded border border-orange-300/70 bg-orange-500/80 px-4 py-2 text-lg text-white shadow-[0_0_14px_rgba(251,146,60,0.5)] transition hover:bg-orange-500 dark:bg-orange-500/70 sm:text-xl"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </section>

      </div>
      <ScrollToTopButton />
    </main>
  );
}
