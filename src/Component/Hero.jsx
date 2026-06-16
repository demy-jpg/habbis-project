import CTASection from "./CTASection";

const Hero = () => {
  return (
    <section className="grid min-h-[calc(100vh-40px)] grid-cols-1 lg:grid-cols-[48%_3%_49%]">
      {/* Left Side */}
      <div className="relative overflow-hidden">
        <img
          src="/Student 2.png"
          alt="Student learning language"
          className="h-full w-full object-cover"
        />

        <div className="absolute left-5 top-8 max-w-xl">
          <h1 className="text-[3rem] leading-[0.95] font-bold text-[#0b6b38]">
            Smile to a New World
            <br />
            of Learning and Knowledge
          </h1>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="hidden lg:flex flex-col">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="flex flex-1">
            <div className="w-1/2 bg-[#D9E3AA]" />
            <div className="w-1/2 bg-[#0E5A2A]" />
          </div>
        ))}
      </div>

      {/* Right Side */}
      <CTASection />
    </section>
  );
};

export default Hero;