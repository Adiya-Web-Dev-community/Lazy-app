const BlogReviewLoading: React.FC = () => {
  const reviewsDummyData = [1, 2, 3];
  return reviewsDummyData.map((_, index) => (
    <section
      key={index}
      className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-[#1A1A1A] grid-cols-customReviewBlog group animate-pulse"
    >
      <span className="w-6 h-6 text-transparent rounded bg-slate-700">
        {index + 1}
      </span>

      <span className="h-6 rounded-full bg-slate-700"></span>

      <span className="h-6 rounded bg-slate-700"></span>

      <span className="h-6 rounded bg-slate-700"></span>

      <span className="h-6 px-6 py-2 rounded-md bg-slate-700"></span>

      <div className="grid justify-center gap-2">
        <div className="w-16 h-8 rounded-md bg-slate-700"></div>
      </div>
    </section>
  ));
};

export default BlogReviewLoading;
