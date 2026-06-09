const services = [
  {
    title: "House Removals",
    description:
      "Trusted experts in home and office furniture collection and timely delivery.",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b",
  },
  {
    title: "Office Relocation",
    description:
      "Seamless moves that minimize downtime and keep your business running smoothly.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
  {
    title: "Man & Van Services",
    description:
      "Flexible transport solutions for small or large moves at short notice.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
  },
];

const Services = () => {
  return (
    <section className="bg-[#f8f8f8] py-24 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Text */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
          <div>
            <h2 className="text-6xl font-serif text-[#111827] leading-tight">
              What we offer at
            </h2>

            <h2 className="text-6xl font-serif text-blue-600 mt-4">
              Fokoremovals
            </h2>

            <p className="mt-10 text-2xl text-slate-500 max-w-xl leading-relaxed">
              Trusted experts in home and office relocations,
              furniture collection and timely delivery.
            </p>
          </div>

          <div className="max-w-md">
            <p className="text-2xl text-slate-500 leading-relaxed">
              More than 100 homes, offices, and companies
              have used our services throughout the years.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-blue-100"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[420px] object-cover"
              />

              <div className="p-8">
                <h3 className="text-3xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;