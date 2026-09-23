const services = [
  {
    title: "Custom Design",
    body: "A decor plan tailored to your home, your style, and the way your family celebrates.",
  },
  {
    title: "Full Installation",
    body: "Trees, garlands, mantels, tablescapes, and lighting — styled and set up for you.",
  },
  {
    title: "Takedown & Storage",
    body: "When the season wraps, we carefully pack everything away so it's ready for next year.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl font-semibold tracking-tight">
          Commodore Creations
        </span>
        <a
          href="#contact"
          className="rounded-full bg-cranberry-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-cranberry-600"
        >
          Book a Consultation
        </a>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-24 md:pt-28">
        <p className="mb-4 text-sm font-medium tracking-widest text-gold-500 uppercase">
          In-home holiday decor design &amp; setup
        </p>
        <h1 className="font-display max-w-3xl text-5xl leading-tight font-semibold md:text-7xl">
          Your home, dressed for the holidays.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-evergreen-700">
          We design, install, and take down your seasonal decor — so you can
          skip the ladders and tangled lights and simply enjoy the season.
        </p>
      </section>

      <section className="bg-evergreen-900 text-cream">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title}>
              <h2 className="font-display text-2xl text-gold-300">
                {service.title}
              </h2>
              <p className="mt-3 text-evergreen-100">{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer
        id="contact"
        className="mx-auto w-full max-w-6xl px-6 py-16 text-sm text-evergreen-700"
      >
        © {new Date().getFullYear()} Commodore Creations
      </footer>
    </main>
  );
}
