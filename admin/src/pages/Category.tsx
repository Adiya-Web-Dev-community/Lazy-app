import { IoIosSend } from "react-icons/io";

import { ApiError, ApiResponse } from "../types/apiType";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import {
  CategoryStateType,
  DeletElementData,
  ProductDeleteStateType,
  UniDelet,
  UpdateCatgeoryData,
} from "../types/contentType";
import { apiRequest } from "../api/adminApi";
import { useCategories } from "../hooks/useCategories";
import CreatCategory from "./CreatCategory";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { useState } from "react";
import Pagination from "../components/pagination/Pagination";
import CategoryLoading from "../components/loading-elemnts/CategoryLoading";

const Category: React.FC = () => {
  const [isCategoryForm, setCategoryForm] = useState<CategoryStateType>({
    creat: false,
    updateId: "",
    updateData: "",
    updateImage: "",
  });
  const [isDeletModal, setDeletModal] = useState<ProductDeleteStateType>({
    delet: false,
    deletElementId: "",
  });

  const categoryHeading = ["Image", "Category Name", "Setting", "View"];

  const handlingCategory = () => {
    setCategoryForm((prev) => ({
      ...prev,
      creat: !prev.creat,
    }));
  };

  const { isPending, isError, data, error, refetch } = useCategories();

  console.log(data, error, "category");

  const categoryApiData = data?.data?.data;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCategory = categoryApiData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // console.log(currentCategory, "pagination");

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const mutation = useMutation<
    ApiResponse<DeletElementData>,
    ApiError,
    UniDelet
  >({
    mutationFn: async (deletObj) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<UniDelet, DeletElementData>({
          url: deletObj.path,
          method: "delete",
        });

        // return { data: response.data };
        return response as ApiResponse<DeletElementData>;
      } catch (error) {
        console.log(error);
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
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
    },
  });

  const deletCategory = (id: string) => {
    setDeletModal((prev) => ({
      ...prev,
      delet: true,
      deletElementId: id,
    }));
  };
  const updateCategory = (category: UpdateCatgeoryData) => {
    setCategoryForm((prev) => ({
      ...prev,
      updateId: category._id,
      updateData: category.name,
      updateImage: category?.image,
    }));
  };

  const handlingNavigate = (id: string) => {
    navigate(`/category/${id}`);
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
      path: `/api/admin/category/${isDeletModal?.deletElementId}`,
    };

    // Proceed with the deletion
    mutation.mutate(deleteObj);
  };

  return (
    <>
      {(isCategoryForm.creat || isCategoryForm.updateId) && (
        <CreatCategory
          isCategoryForm={isCategoryForm}
          setCategoryForm={setCategoryForm}
          refetch={refetch}
        />
      )}
      {isDeletModal?.delet && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={confirmhandler} />
      )}
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
              Category
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
                     bg-emerald-800  hover:bg-emerald-700 text-[#DEE1E2] font-semibold
                }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
                onClick={handlingCategory}
              >
                <span className="hidden md:inline-block">Creat Category</span>

                <IoIosSend className="w-6 h-6 md:hidden" />
              </button>
            </div>
          </div>
          <section
            className={`w-full overflow-auto  border-2  [&::-webkit-scrollbar]:hidden rounded-lg border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
          >
            <section className="grid gap-4 p-2 pb-2 min-w-[600px] font-medium  grid-cols-customeCategory text-[#DEE1E2] md:font-semibold bg-[#1A1A1A]">
              <p className="pl-2 md:text-lg">SrNo.</p>

              {categoryHeading.map((heading, index) => (
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

            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[600px] bg-[#252525]">
              {
                isPending ? (
                  <CategoryLoading />
                ) : isError ? (
                  <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-rose-600">
                    Check Internet connection or Contact to Admin
                  </p>
                ) : (
                  currentCategory?.map((category, i) => (
                    <section
                      key={i}
                      className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 text-[#DEE1E2] border-[#1A1A1A] grid-cols-customeCategory group hover:bg-[#2c2c2c]"
                    >
                      <span>{i + 1}</span>

                      <div className="flex items-center justify-center">
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
                      </div>

                      <span className="ml-2 text-sm font-semibold md:text-base">
                        {category?.name}
                      </span>

                      <div className="flex justify-center gap-4">
                        <button
                          className="px-3 py-2 text-sm font-semibold rounded-md bg-emerald-800 hover:bg-emerald-700 "
                          onClick={() => updateCategory(category)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-2 text-sm font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
                          onClick={() => deletCategory(category?._id)}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid justify-center gap-2">
                        <button
                          className="px-2 py-2 text-sm rounded-md bg-sky-800 hover:bg-sky-700"
                          onClick={() => handlingNavigate(category?.name)}
                        >
                          <FiEye className="w-6 h-4" />
                        </button>
                      </div>
                    </section>
                  ))
                )
                // )
              }
            </div>
          </section>
          {/* <div className="flex items-center justify-center w-full mt-4">
            <div className="flex justify-start w-full">
              <p className="text-[#DEE1E2] text-sm font-medium">
                <span>Total Item: </span>{" "}
                <span>0{currentCategory?.length}</span>
              </p>
            </div>
            <div className="flex justify-start w-full">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`mx-1 px-3 py-1  rounded  ${
                    currentPage === index + 1
                      ? "bg-emerald-800 text-[#DEE1E2]"
                      : "bg-gray-400"
                  }`}
                  onClick={() => handleClick(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div> */}
          <Pagination
            currentPage={currentPage}
            apiData={categoryApiData ?? []}
            itemsPerPage={itemsPerPage}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};
export default Category;
