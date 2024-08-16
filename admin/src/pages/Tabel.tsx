import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categoryProductHeadings } from "../components/content_data/contentData";
import { BsEye } from "react-icons/bs";
import Pagination from "../components/pagination/Pagination";

import { TiArrowBackOutline } from "react-icons/ti";

import CategoryTypeProductsLoading from "../components/loading-elemnts/CategoryTypeProductsLoading";
import { useSingleCategories } from "../api/querys";

const Tabel = () => {
  const { id } = useParams();

  const { isPending, isError, error, data } = useSingleCategories(id ?? "0");

  console.log(id, data, isError, error);

  const categoryTypeData = data?.data;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCategoryTypeProducts = categoryTypeData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section
      className={`  md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
    >
      <section
        className={` md:p-8 p-6
  
h-full
        border-gray-200 
    rounded-md  font-philosopher max-w-full w-full shadow-md`}
      >
        <div className="flex items-center mb-2 md:mb-6">
          <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
            {id}
          </h1>
          <Link to={"/category"}>
            <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
          </Link>
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
          className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
        >
          <section className="grid grid-cols-customCategorySingleProduct pb-2 p-2  gap-4 text-[#DEE1E2]   min-w-[1200px] font-medium md:font-semibold bg-[#1A1A1A]">
            <p className="pl-2 md:text-lg">SrNo.</p>

            {categoryProductHeadings.map((heading, index) => (
              <p
                key={index}
                className={`md:text-lg ${
                  index !== 0 && index !== 1 ? "justify-self-center" : "ml-10"
                }`}
              >
                {heading.charAt(0).toUpperCase() + heading.slice(1)}
              </p>
            ))}
          </section>
          <div className=" h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] bg-[#252525]">
            {isPending ? (
              <CategoryTypeProductsLoading />
            ) : isError ? (
              <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-rose-600">
                Check Internet connection or Contact to Admin or Add Products
              </p>
            ) : (
              currentCategoryTypeProducts?.map((product, i) => (
                <section
                  key={i}
                  className="grid  items-center gap-6 py-2 pl-6 pr-4 border-t-2  grid-cols-customCategorySingleProduct group text-[#DEE1E2] border-[#1A1A1A] hover:bg-[#2c2c2c]"
                >
                  <span>{i + 1}</span>

                  <span className="text-sm font-semibold md:text-base">
                    {product?.name}
                  </span>

                  <span className="flex text-sm font-semibold ">
                    {product?.company?.length !== 0
                      ? product?.company?.map((icon) => (
                          <img
                            key={icon?.image}
                            src={icon?.image}
                            alt={`${icon?.name}`}
                            className="w-10 h-10 ml-2 rounded-full"
                          />
                        ))
                      : "----"}
                  </span>
                  <span className="flex justify-center ml-2 text-sm font-semibold ">
                    {product?.category}
                  </span>

                  <span className="flex justify-center ml-2 text-sm font-semibold ">
                    {product?.status}
                  </span>
                  <span className="flex justify-center ml-2 text-sm font-semibold ">
                    {product?.createdAt?.split("T")[0]}
                  </span>
                  <div className="flex items-center justify-center">
                    <Link
                      to={`/products/${product?._id}`}
                      className="flex justify-center px-4 py-2 ml-2 text-sm font-semibold bg-teal-800 rounded-md hover:bg-emerald-700"
                    >
                      <BsEye className="w-4 h-4" />
                    </Link>
                  </div>
                </section>
              ))
            )}
          </div>
        </section>
        <Pagination
          currentPage={currentPage}
          apiData={categoryTypeData ?? []}
          itemsPerPage={itemsPerPage}
          handleClick={handleClick}
        />
      </section>
    </section>
  );
};

export default Tabel;
