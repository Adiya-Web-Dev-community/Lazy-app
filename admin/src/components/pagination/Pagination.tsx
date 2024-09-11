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

  const firstPage = currentPage === 1 ? 1 : currentPage - 1;
  const secondPage = currentPage === 1 ? 2 : currentPage;
  const thirdPage = currentPage === 1 ? 3 : currentPage + 1;

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

        {totalPages >= 1 && (
          <>
            <button
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === firstPage
                  ? "bg-emerald-800 text-[#DEE1E2]"
                  : "bg-gray-400"
              }`}
              onClick={() => handleClick(firstPage)}
            >
              {firstPage}
            </button>
            {totalPages >= 2 && (
              <button
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === secondPage
                    ? "bg-emerald-800 text-[#DEE1E2]"
                    : "bg-gray-400"
                }`}
                onClick={() => handleClick(secondPage)}
              >
                {secondPage}
              </button>
            )}
            {totalPages >= 3 && thirdPage <= totalPages && (
              <button
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === thirdPage
                    ? "bg-emerald-800 text-[#DEE1E2]"
                    : "bg-gray-400"
                }`}
                onClick={() => handleClick(thirdPage)}
              >
                {thirdPage}
              </button>
            )}
          </>
        )}
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
