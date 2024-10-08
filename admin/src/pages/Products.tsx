import { IoIosSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import {
  DeletElementData,
  ProductData,
  ProductDeleteStateType,
  UniDelet,
} from "../types/contentType";
import { ApiError, ApiResponse } from "../types/apiType";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import { productHeadings } from "../components/content_data/contentData";
import { useState } from "react";
import Pagination from "../components/pagination/Pagination";
import { BsEye } from "react-icons/bs";
import { FaStarOfLife } from "react-icons/fa";
import InformAleartModal from "../components/modal/InformAleartModal";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";

import ProductsLoading from "../components/loading-elemnts/ProductsLoading";
import { useProduct } from "../api/querys";

const Products: React.FC = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDeletModal, setDeletModal] = useState<ProductDeleteStateType>({
    delet: false,
    deletElementId: "",
  });

  const { data, refetch, isError, isPending } = useProduct();

  console.log(data, "product");

  const productData = data?.data;

  console.log(data);

  const [isInformModal, setInformModal] = useState<boolean>(false);
  const itemsPerPage = 5;
  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProduct = productData?.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const mutation = useMutation<
    ApiResponse<DeletElementData>,
    ApiError,
    UniDelet
  >({
    mutationFn: async (deletObj) => {
      toast.loading("Checking Details");
      try {
        const response = await apiRequest<UniDelet, DeletElementData>({
          url: deletObj.path,
          method: "delete",
        });

        return response as ApiResponse<DeletElementData>;
      } catch (error) {
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },
    onSuccess: (data: ApiResponse<DeletElementData>) => {
      console.log(data);
      refetch();
      toast.dismiss();
      toast.success(`${data?.data?.message}`);
      closehandler();
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });

  const deletProduct = (id: string) => {
    setDeletModal((prev) => ({
      ...prev,
      delet: true,
      deletElementId: id,
    }));
  };

  const updateProduct = (product: ProductData) => {
    navigate(`/products/form/${product?._id}`);
  };

  const handlinInfo = () => {
    setInformModal(true);
  };
  const cancelInfo = () => {
    setInformModal(false);
  };

  const closehandler = () => {
    setDeletModal((prev) => ({
      ...prev,
      delet: false,
      deletElementId: "",
    }));
  };

  const confirmhandler = () => {
    const deleteObj: UniDelet = {
      path: `/api/product/${isDeletModal?.deletElementId}`,
    };

    // Proceed with the deletion
    mutation.mutate(deleteObj);
  };

  return (
    <>
      {isDeletModal?.delet && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={confirmhandler} />
      )}
      {isInformModal && <InformAleartModal onClose={cancelInfo} />}
      <section
        className={`  md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={` md:p-8 p-6 h-full border-gray-200 
    rounded-md  font-philosopher max-w-full w-full shadow-md `}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
              Products
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
            <div className="relative flex items-center self-end ">
              <button
                className={` px-2 py-1 
                   bg-emerald-800  hover:bg-emerald-700 relative -z-6 text-[#DEE1E2]
                  rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
              >
                <Link to={"/products/form"}>
                  <span className="hidden md:inline-block">Add Product</span>

                  <IoIosSend className="w-6 h-6 md:hidden" />
                </Link>
              </button>
            </div>
          </div>
          <section
            className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
          >
            <section className="grid grid-cols-customProduct pb-2 p-2  gap-4 text-[#DEE1E2]   min-w-[1200px] font-medium md:font-semibold bg-[#1A1A1A]">
              <p className="pl-2 md:text-lg">SrNo.</p>

              {productHeadings.map((heading, index) => (
                <p
                  key={index}
                  className={`md:text-lg flex items-center ${
                    index !== 0 && index !== 1 ? "justify-self-center" : "ml-10"
                  }`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                  <span
                    className={`${
                      index === 5 ? "visible" : "hidden"
                    }   rounded-full ml-2 cursor-pointer`}
                    onClick={handlinInfo}
                  >
                    <FaStarOfLife
                      className={`w-3 h-3 text-gray-600 ${
                        isInformModal ? "text-rose-500" : "text-gray-600"
                      } hover:text-rose-600`}
                    />
                  </span>
                </p>
              ))}
            </section>
            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] bg-[#252525]">
              {isPending ? (
                <ProductsLoading />
              ) : isError ? (
                <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-rose-600">
                  Check Internet connection or Contact to Admin.
                </p>
              ) : (
                currentProduct?.map((product: ProductData, i: number) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2  grid-cols-customProduct group text-[#DEE1E2] border-[#1A1A1A] hover:bg-[#2c2c2c]"
                  >
                    <span>{i + 1}</span>

                    <span className="text-sm font-semibold md:text-base">
                      {product?.name}
                    </span>

                    <span className="flex text-sm font-semibold ">
                      {product?.company?.length !== 0
                        ? product.company?.map((icon) => (
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
                        to={`/products/${product._id}`}
                        className="flex justify-center px-4 py-2 ml-2 text-sm font-semibold bg-teal-800 rounded-md hover:bg-emerald-700"
                      >
                        <BsEye className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="grid justify-center gap-2">
                      <button
                        className="px-3 py-2 text-sm font-semibold rounded-md bg-emerald-800 hover:bg-emerald-700"
                        onClick={() => updateProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-2 text-sm font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
                        onClick={() => deletProduct(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </section>
                ))
              )}
            </div>
          </section>

          <Pagination
            currentPage={currentPage}
            apiData={productData ?? []}
            itemsPerPage={itemsPerPage}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};

export default Products;
