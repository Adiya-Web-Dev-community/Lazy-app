import { TransactionGet } from "../types/contentType";

import { useState } from "react";
import Pagination from "../components/pagination/Pagination";
import CategoryLoading from "../components/loading-elemnts/CategoryLoading";
import { useTransaction } from "../api/querys";

import { useNavigate } from "react-router-dom";

const Transaction: React.FC = () => {
  const navigate = useNavigate();

  const transactionHeading = [
    "User",
    "Type",
    "Status",
    "Payment Type",
    "Payment Mode",
    "Transaction Id",
    "Remarks",
    "Amount",
    "Action",
  ];

  //   const handlingCategory = () => {
  //     setPostCategoryForm((prev) => ({
  //       ...prev,
  //       creat: !prev.creat,
  //     }));
  //   };

  const { isPending, isError, data, error } = useTransaction();

  const transactionApiData = data?.data?.data;
  //   const categoryApiData = data?.data?.data;

  console.log(data, transactionApiData, error, "transaction");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentTransaction = transactionApiData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // console.log(currentCategory, "pagination");

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const updateCategory = (value: TransactionGet) => {
    navigate(`/transaction/${value._id}`);
  };

  return (
    <>
      <section
        className={`md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={` md:p-8 p-6 h-full border-gray-200 rounded-md  font-philosopher max-w-full w-full shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
              Transaction
            </h1>
          </div>
          <div className="flex justify-between mb-4">
            <div className={`flex items-center   `}>
              <input
                type="search"
                placeholder={`Search`}
                className={` p-2 text-sm md:text-base  sm:px-4 py-1 border-[2px] border-transparent 
             bg-[#252525] focus:border-gray-800
          shadow-inner rounded-[0.26rem] outline-none `}
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                // onFocus={() => setCurrentPage(1)}
              />
            </div>
          </div>
          <section
            className={`w-full overflow-auto  border-2  [&::-webkit-scrollbar]:hidden rounded-lg border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
          >
            <section className="grid gap-4 p-2 pb-2 min-w-[1200px] font-medium  grid-cols-customePostTransaction text-[#DEE1E2] md:font-semibold bg-[#1A1A1A]">
              <p className="pl-2 md:text-lg">SrNo.</p>

              {transactionHeading.map((heading, index) => (
                <p
                  key={index}
                  className={`   md:text-lg ${
                    index !== 0 ? "justify-self-center" : "ml-6"
                  }`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </p>
              ))}
            </section>

            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] bg-[#252525]">
              {
                isPending ? (
                  <CategoryLoading />
                ) : isError ? (
                  <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-rose-600">
                    Check Internet connection or Contact to Admin
                  </p>
                ) : (
                  currentTransaction?.map((transaction, i) => (
                    <section
                      key={i}
                      className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 text-[#DEE1E2] border-[#1A1A1A] grid-cols-customePostTransaction group hover:bg-[#2c2c2c]"
                    >
                      <span>{i + 1}</span>

                      {/* <div className="flex items-center justify-center">
                        {category?.image ? (
                          <img
                            src={category?.image}
                            alt="user Image"
                            className="object-contain w-24 h-24 rounded-lg"
                          />
                        ) : (
                          <span className="flex items-center w-24 h-24 text-sm font-bold text-gray-400">
                            No Image
                          </span>
                        )}
                      </div> */}

                      <span className="flex ml-2 text-sm font-semibold md:text-base">
                        {transaction?.userId.name}
                      </span>
                      <span className="flex text-sm font-semibold md:text-base">
                        {transaction?.type}
                      </span>
                      <span className="flex text-sm font-semibold md:text-base">
                        {transaction?.status}
                      </span>
                      <span className="flex ml-2 text-sm font-semibold md:text-base">
                        {transaction?.paymenttype}
                      </span>
                      <span className="flex ml-2 text-sm font-semibold md:text-base">
                        {transaction?.paymentMode}
                      </span>
                      <span className="flex ml-2 text-sm font-semibold md:text-base">
                        {transaction?.transactionId}
                      </span>
                      <span className="flex ml-2 text-sm font-semibold md:text-base">
                        {transaction?.remarks}
                      </span>
                      <span className="flex justify-center text-sm font-semibold md:text-base">
                        {transaction?.amount}
                      </span>

                      <div className="grid gap-4 ">
                        <button
                          className="px-3 py-2 text-sm font-semibold rounded-md bg-emerald-800 hover:bg-emerald-700 "
                          onClick={() => updateCategory(transaction)}
                        >
                          Edit
                        </button>
                      </div>
                    </section>
                  ))
                )
                // )
              }
            </div>
          </section>

          <Pagination
            currentPage={currentPage}
            apiData={transactionApiData ?? []}
            itemsPerPage={itemsPerPage}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};
export default Transaction;
