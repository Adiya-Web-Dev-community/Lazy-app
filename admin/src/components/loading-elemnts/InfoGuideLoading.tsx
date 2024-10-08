const InfoGuideLoading: React.FC = () => {
  const infoDummyData = [1, 2, 3];
  return infoDummyData.map((_, index) => (
    <section
      key={index}
      className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-[#1A1A1A] grid-cols-customInfoGuide group animate-pulse"
    >
      <span className="w-6 h-6 text-transparent rounded bg-slate-700">
        {index + 1}
      </span>

      <span className="h-6 ml-2 rounded bg-slate-700"></span>

      <div className="flex items-center justify-center">
        <div className="w-24 h-24 rounded-lg bg-slate-700"></div>
      </div>

      <span className="h-6 ml-2 rounded bg-slate-700"></span>

      <div className="grid justify-center gap-4">
        <div className="w-16 h-8 rounded-md bg-slate-700"></div>
        <div className="w-16 h-8 rounded-md bg-slate-700"></div>
      </div>
    </section>
  ));
};

export default InfoGuideLoading;
