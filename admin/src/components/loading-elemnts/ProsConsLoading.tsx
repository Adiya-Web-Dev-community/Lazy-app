const ProsConsLoading: React.FC = () => {
  const prosConsDummyData = [1, 2, 3];
  return (
    <section
      className={`w-full overflow-auto border-2 rounded-lg border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
    >
      <section className="grid gap-4 p-2 pb-2 min-w-[600px] font-medium grid-cols-customeCategory text-[#DEE1E2] md:font-semibold bg-[#1A1A1A]">
        <p className="pl-2 md:text-lg">SrNo.</p>
        <p className="ml-6 md:text-lg">Title</p>
        <p className="justify-self-center md:text-lg">Pros</p>
        <p className="justify-self-center md:text-lg">Cons</p>
      </section>

      <div className="h-[380px] overflow-y-auto min-w-[600px] bg-[#252525]">
        {prosConsDummyData.map((_, index) => (
          <section
            key={index}
            className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-[#1A1A1A] grid-cols-customeCategory group animate-pulse"
          >
            <span className="w-6 h-6 text-transparent rounded bg-slate-700">
              {index + 1}
            </span>

            <span className="h-6 ml-2 rounded bg-slate-700"></span>
            <span className="h-6 ml-2 rounded bg-slate-700"></span>
            <span className="h-6 ml-2 rounded bg-slate-700"></span>

            <div className="flex justify-center gap-4">
              <div className="w-16 h-8 rounded-md bg-slate-700"></div>
              <div className="w-16 h-8 rounded-md bg-slate-700"></div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default ProsConsLoading;
