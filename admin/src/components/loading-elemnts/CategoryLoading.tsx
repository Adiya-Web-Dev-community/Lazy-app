const CategoryLoading: React.FC = () => {
  const categoryDummyData = [1, 2, 3];
  return categoryDummyData.map((_, index) => (
    // Loading element for the category table
    <section
      key={index}
      className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-[#1A1A1A] grid-cols-customeCategory group animate-pulse"
    >
      <span className="w-6 h-6 rounded bg-slate-700"></span>

      <span className="w-32 h-6 ml-2 rounded bg-slate-700"></span>

      <div className="flex justify-center gap-4">
        <div className="w-16 h-8 rounded-md bg-slate-700"></div>
        <div className="w-16 h-8 rounded-md bg-slate-700"></div>
      </div>

      <div className="grid justify-center gap-2">
        <div className="w-10 h-8 rounded-md bg-slate-700"></div>
      </div>
    </section>
  ));
};

export default CategoryLoading;
