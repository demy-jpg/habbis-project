const CTASection = () => {
  return (
    <div className="flex items-center justify-center bg-[#DCE5B8]">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <img
            src="/Student.jpg"
            alt="Language learner"
            className="h-[220px] w-[180px] rounded-[30px] object-cover shadow-lg"
          />
        </div>

        <h2 className="mx-auto max-w-md text-4xl font-medium text-gray-900">
          Master a new language with interactive online courses designed for
          real-world conversation
        </h2>

        <button className="mt-10 rounded-full bg-[#0B6A37] px-10 py-4 text-lg font-medium text-white transition hover:scale-105 hover:bg-[#09572d]">
          Explore Our Plans
        </button>
      </div>
    </div>
  );
};

export default CTASection;