export const Hero = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 to-teal-800 px-4 py-20 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
        />
        <div className="container relative mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold drop-shadow-sm md:text-5xl">
            7 Days Life Changing Program
          </h1>
          <p className="text-lg opacity-90 md:text-xl">
            Transform your life with our comprehensive program designed to help
            you achieve your full potential
          </p>
        </div>
      </section>
    </>
  );
};
