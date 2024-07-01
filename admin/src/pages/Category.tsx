import React, { useState } from "react";

import { IoIosSend } from "react-icons/io";

import { ApiError, ApiResponse } from "../types/apiType";

import { useMutation } from "@tanstack/react-query";
// import {
//   CategoryDelet,
//   CategoryDeletObject,
//   DeletCategoryData,
//   DeletCategoryResponse,
//   DeletElementData,
// } from "../types/contentType";

import { toast } from "react-toastify";
import {
  CategoryDelet,
  DeletElementData,
  UniDelet,
} from "../types/contentType";
import { apiRequest } from "../api/adminApi";
import { useCategories } from "../hooks/useCategories";
import CreatCategory from "./CreatCategory";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";

const Category = () => {
  // const [categorysData, setCategoryData] = useState([{ name: "Electronic", _id:"0991" }]);

  // const categoryDataLatest = useSelector(
  //   (state) => state.category.categoryData
  // );

  const [isCategoryForm, setCategoryForm] = useState({
    creat: false,
    updateId: "",
    updateData: "",
  });
  const [isDeletModal, setDeletModal] = useState({
    delet: false,
    deletElementId: "",
  });

  const [updateData, setUpdateDate] = useState({
    name: "",
  });

  const categoryHeading = ["Category Name", "Setting", "View"];

  const handlingCategory = () => {
    setCategoryForm((prev) => ({
      ...prev,
      creat: !prev.creat,
    }));
  };

  //   {
  //     "data": {
  //         "success": true,
  //         "message": "Category deleted successfully"
  //     }
  // }

  const { isPending, isError, data, error, refetch } = useCategories();

  console.log(data, error, "category");

  const categoryApiData = data?.data?.data;

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
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
    },
  });

  const deletCategory = (id) => {
    setDeletModal((prev) => ({
      ...prev,
      delet: true,
      deletElementId: id,
    }));
  };
  const updateCategory = (category) => {
    setCategoryForm((prev) => ({
      ...prev,
      updateId: category._id,
      updateData: category.name,
    }));
  };

  const handlingNavigate = (id) => {
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
    const deleteObj: CategoryDelet = {
      path: `/api/admin/category/${isDeletModal?.deletElementId}`,
    };

    console.log(deleteObj);

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

            <div className=" h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[600px] bg-[#252525]">
              {
                isPending ? (
                  <p className="flex items-center justify-center w-full h-full text-center text-emerald-600">
                    loading...
                  </p>
                ) : isError ? (
                  <p className="flex items-center justify-center w-full h-full font-medium text-center text-rose-800">
                    Check Internet connection or Contact to Admin
                  </p>
                ) : (
                  categoryApiData?.map((category, i) => (
                    <section
                      key={i}
                      className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 text-[#DEE1E2] border-[#1A1A1A] grid-cols-customeCategory group hover:bg-[#2c2c2c]"
                    >
                      <span>{i + 1}</span>

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
                          onClick={() => handlingNavigate(category?._id)}
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
          {/* <Pagination
        paginationInfo={pagination}
        paginationUpdateds={(value) => setCurrentPage(value)}
        currentPage={currentPage}
        pageNumbers={pageArray}
      /> */}
        </section>
      </section>
    </>
  );
};
export default Category;
