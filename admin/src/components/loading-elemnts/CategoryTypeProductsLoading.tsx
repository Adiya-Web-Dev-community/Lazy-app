import React from "react";

const CategoryTypeProductsLoading: React.FC = () => {
  const categoryTypeProductsDummyData = [1, 2, 3];
  return categoryTypeProductsDummyData.map((_, index) => (
    <section
      key={index}
      className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-[#1A1A1A] grid-cols-customCategorySingleProduct group animate-pulse"
    >
      <span className="w-6 h-6 rounded bg-slate-700"></span>
      <span className="h-6 col-span-1 rounded bg-slate-700"></span>
      <span className="w-10 h-10 col-span-1 rounded-full bg-slate-700"></span>
      <span className="h-6 col-span-1 rounded bg-slate-700"></span>
      <span className="h-6 col-span-1 rounded bg-slate-700"></span>
      <span className="h-6 col-span-1 rounded bg-slate-700"></span>
      <div className="flex items-center justify-center">
        <div className="h-10 rounded-lg w-14 bg-slate-700"></div>
      </div>
    </section>
  ));
};

export default CategoryTypeProductsLoading;
