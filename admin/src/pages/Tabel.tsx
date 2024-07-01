import React from "react";

import { IoIosSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { DeletElementData, UniDelet } from "../types/contentType";
import { ApiError, ApiResponse } from "../types/apiType";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import {
  productHeadings,
  productsData,
} from "../components/content_data/contentData";

const Tabel = () => {
  const navigate = useNavigate();

  // const { isPending, isError, data, error, refetch } = useQuery<
  //   ApiResponse<MenuDataResponse>,
  //   ApiError
  // >({
  //   queryKey: ["menus"],
  //   queryFn: async () => {
  //     return await apiRequest<MenuDataResponse>({
  //       url: "/menus",
  //       method: "get",
  //     });
  //   },
  // });

  const mutation = useMutation<
    ApiResponse<DeletElementData>,
    ApiError,
    UniDelet
  >({
    mutationFn: async (deletObj) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<DeletElementData>({
          url: deletObj.path,
          method: "delete",
        });

        // return { data: response.data };
        return response as ApiResponse<DeletElementData>;
      } catch (error) {
        const apiError = {
          message: error?.response?.data?.message || "An error occurred",
          status: error?.response?.status || 500,
        };
        throw apiError;
      }
    },
    onSuccess: (data: ApiResponse<DeletElementData>) => {
      console.log(data);
      // refetch();
      toast.dismiss();
      toast.success(`${data?.data?.message}`);
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.error(`${error.message}`);
    },
  });

  const deletProduct = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Dish?"
    );

    if (isConfirmed) {
      console.log(id, "delet");

      const deleteObj: DishDelet = {
        path: `/menus/${id}`,
      };

      console.log(deleteObj);

      // Proceed with the deletion
      mutation.mutate(deleteObj);
    } else {
      // Deletion canceled by the user
      console.log("Deletion canceled");
    }
  };

  const updateProduct = (dishData) => {
    // dispatch(addDishData(dishData));
    navigate("/product/form");
  };

  // console.log(data, error, "menus");

  // if (isPending) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  // const productData = data?.data?.data;

  // console.log(menueData?.[30].ingredient.split(","));

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
            Electronics
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
          {/* <div className="relative flex items-center self-end ">
            <button
              className={` px-2 py-1 
                   bg-emerald-800  hover:bg-emerald-700 text-[#DEE1E2]
              }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
            >
              
              <Link to={"/products/form"}>
                <span className="hidden md:inline-block">Add Product</span>

                <IoIosSend className="w-6 h-6 md:hidden" />
              </Link>
            </button>
          </div> */}
        </div>
        <section
          className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
        >
          <section className="grid grid-cols-customProduct pb-2 p-2  gap-4 text-[#DEE1E2]   min-w-[1200px] font-medium md:font-semibold bg-[#1A1A1A]">
            <p className="pl-2 md:text-lg">SrNo.</p>

            {productHeadings.map((heading, index) => (
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
            {productsData?.map((product, i) => (
              <section
                key={i}
                className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2  grid-cols-customProduct group text-[#DEE1E2] border-[#1A1A1A] hover:bg-[#2c2c2c]"
              >
                <span>{i + 1}</span>

                {/* <span
                  className={` text-xs font-bold  text-center rounded-full   ${
                    product?.dietry?.toLowerCase() === "veg"
                      ? "text-green-600 bg-green-100 p-2 text-center"
                      : product?.dietry?.toLowerCase() === "non-veg"
                      ? "text-rose-500 bg-rose-100 p-2 text-center"
                      : ""
                  }`}
                >
                  {product?.dietry ? product?.dietry : "-- --"}
                </span> */}
                {/* <span
                  className={` text-sm font-semibold text-center  rounded-full p-2  `}
                >
                  {product?.label}
                </span> */}
                {/* <div className="flex items-center justify-center">
                  {product?.image ? (
                    <img
                      src={product?.image}
                      alt="user Image"
                      className="w-24 h-10 rounded-lg"
                    />
                  ) : (
                    <span className="text-sm font-bold text-gray-400">
                      No Image
                    </span>
                  )}
                </div> */}
                <span className="text-sm font-semibold md:text-base">
                  {product?.productName}
                </span>

                <span className="flex justify-center text-sm font-semibold ">
                  {product?.companyName}
                </span>
                <span className="flex justify-center ml-2 text-sm font-semibold ">
                  {product?.category}
                </span>

                {/* <div className="flex justify-center text-sm font-semibold md:text-base">
                  
                  {product?.ingredient ? (
                    <span className="flex text-xs font-semibold break-words break-all text-ellipsis md:text-sm">
                      {product?.ingredient},
                    </span>
                  ) : (
                    <span className="flex justify-center text-sm font-bold text-gray-400">
                      Empty
                    </span>
                  )}
                </div> */}
                <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                  {product?.feature}
                </span>
                {/* <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                  ₹ {product?.price}
                </span> */}
                <span className="flex justify-center ml-2 text-sm font-semibold ">
                  {product?.stockQuantity}
                </span>
                <span className="flex justify-center ml-2 text-sm font-semibold ">
                  {product?.sku}
                </span>
                <span className="flex justify-center ml-2 text-sm font-semibold ">
                  {product?.status}
                </span>
                <span className="flex justify-center ml-2 text-sm font-semibold ">
                  {product?.dateAdded}
                </span>
                <div className="grid justify-center gap-2">
                  <button
                    className="px-3 py-2 text-sm rounded-md bg-emerald-800 hover:bg-emerald-700"
                    // onClick={() => updateProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-2 text-sm rounded-md bg-rose-800 hover:bg-rose-700"
                    // onClick={() => deletProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </section>
            ))}
          </div>
        </section>
        {/* <Pagination
      paginationInfo={pagination}
      paginationUpdateds={(value) => setCurrentPage(value)}
      currentPage={currentPage}
      pageNumbers={pageArray}
    /> */}
      </section>
    </section>
  );
};

export default Tabel;
