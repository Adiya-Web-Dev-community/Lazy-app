// import { PaginationProps } from "../../types/contentType";

// const Pagination = <T,>({
//   currentPage,
//   apiData,
//   itemsPerPage,
//   handleClick,
// }: PaginationProps<T>) => {
//   const totalPages = Math.ceil(apiData?.length / itemsPerPage);
//   return (
//     <div className="flex items-center justify-center w-full mt-4">
//       <div className="flex justify-start w-[90%]">
//         <p className="text-[#DEE1E2] text-sm font-medium">
//           <span>Total Item: </span>{" "}
//           <span>
//             {apiData?.length > 9 ? apiData?.length : `0${apiData?.length}`}
//           </span>
//         </p>
//       </div>
//       <div className="flex justify-start w-full">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             className={`mx-1 px-3 py-1  rounded  ${
//               currentPage === index + 1
//                 ? "bg-emerald-800 text-[#DEE1E2]"
//                 : "bg-gray-400"
//             }`}
//             onClick={() => handleClick(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pagination;

import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { PaginationProps } from "../../types/contentType";

const Pagination = <T,>({
  currentPage,
  apiData,
  itemsPerPage,
  handleClick,
}: PaginationProps<T>) => {
  const totalPages = Math.ceil(apiData?.length / itemsPerPage);

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex justify-start w-[90%]">
        <p className="text-[#DEE1E2] text-sm font-medium">
          <span>Total Item: </span>
          <span>
            {apiData?.length > 9 ? apiData?.length : `0${apiData?.length}`}
          </span>
        </p>
      </div>
      <div className="flex justify-start w-full">
        {currentPage > 2 && (
          <button
            className="px-2 py-1 mx-1 bg-gray-400 rounded"
            onClick={() => handleClick(currentPage - 1)}
          >
            <IoChevronBack />
          </button>
        )}
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page
                ? "bg-emerald-800 text-[#DEE1E2]"
                : "bg-gray-400"
            }`}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages - 1 && (
          <button
            className="px-2 py-1 mx-1 bg-gray-400 rounded"
            onClick={() => handleClick(currentPage + 1)}
          >
            <IoChevronForward />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
