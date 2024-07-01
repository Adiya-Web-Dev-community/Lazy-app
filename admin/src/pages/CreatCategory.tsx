import { Input } from "postcss";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";

import { categoryType } from "../components/content_data/content_data";

import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
// import { SingleCategoryResponseData } from "../types/contentType";
import { apiRequest } from "../api/adminApi";
import { ApiError } from "../types/apiType";

interface CategoryState {
  creat: boolean;
  updateId: string;
  updateData: string;
}
interface CreatCategoryProps {
  setCategoryForm: (value: boolean | string) => void;
  isCategoryForm: CategoryState;
  refetch: () => void;
}

const CreatCategory: React.FC<CreatCategoryProps> = ({
  isCategoryForm,
  setCategoryForm,
  // singleCategory,
  refetch,
}) => {
  // const { isPending, isError, data, error } = useQuery<
  //   ApiResponse<SingleCategoryResponseData>,
  //   ApiError
  // >({
  //   queryKey: [`singlcategories-${isCategoryForm.updateId}`],
  //   queryFn: async () => {
  //     return await apiRequest<SingleCategoryResponseData>({
  //       url: `/categories/${isCategoryForm.updateId}`,
  //       method: "get",
  //     });
  //   },
  // });

  console.log(isCategoryForm);

  // const singleCategory = data?.data?.data;

  // console.log(singleCategory);

  const [categoryDataForm, setCategoryDataForm] = useState({
    categoryName: isCategoryForm.updateData ? isCategoryForm.updateData : "",
    type: "",
    error: "",
  });

  // const [isOpen, setOpen] = useState(false);

  const handleChange = (e) => {
    setCategoryDataForm((prev) => ({
      ...prev,
      [e?.target?.name]:
        e?.target?.type === "checkbox" ? e?.target?.checked : e?.target?.value,
    }));
  };

  // const selectType = (value) => {
  //   setOpen((prev) => !prev);
  //   setCategoryDataForm((prev) => ({
  //     ...prev,
  //     type: value,
  //   }));
  // };

  // const mutation = useMutation<
  //   ApiResponse<DeletCategoryData>,
  //   ApiError,
  //   CategoryDelet
  // >({
  const mutation = useMutation({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest({
          url: path,
          method: condition === "creat" ? "post" : "put",
          data: data,
        });

        // return { data: response.data };
        return response;
      } catch (error) {
        console.log(error);
        const apiError = {
          message: error?.response?.data?.message || "An error occurred",
          status: error?.response?.status || 500,
        };
        throw apiError;
      }
    },
    // onSuccess: (data: ApiResponse<DeletCategoryData>) => {
    onSuccess: (data) => {
      console.log(data, data?.statusText);
      refetch();
      toast.dismiss();
      closeHandler();
      toast.success(
        `${
          data?.statusText === "OK" ? "Update Successfull" : "Creat Successfull"
        }`
      );

      setCategoryDataForm((prev) => ({
        ...prev,
        categoryName: "",
      }));
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      closeHandler();
    },
  });

  const submiteHandler = (e) => {
    e.preventDefault();

    console.log(categoryDataForm);

    if (categoryDataForm.categoryName !== "") {
      console.log();

      if (isCategoryForm.creat) {
        console.log("now creat");
        mutation.mutate({
          path: "api/admin/category",
          condition: "creat",
          data: {
            name: categoryDataForm.categoryName,
          },
        });
      }

      if (isCategoryForm.updateId) {
        console.log("update Id");
        mutation.mutate({
          path: `api/admin/category/${isCategoryForm.updateId}`,
          condition: "update",
          data: {
            name: categoryDataForm.categoryName,
          },
        });
      }
    } else {
      setCategoryDataForm((prev) => ({
        ...prev,
        error: `Fill Type field first !!!`,
      }));
    }
  };

  const closeHandler = () => {
    if (isCategoryForm.creat) {
      setCategoryForm((prev) => ({
        ...prev,
        creat: !prev.creat,
      }));
    } else {
      setCategoryForm((prev) => ({
        ...prev,
        updateId: "",
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center px-4 sm:px-0 bg-black/60"
      onClick={closeHandler}
    >
      <div
        className="bg-[#1A1A1A] rounded-md w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="" onSubmit={submiteHandler}>
          {/* left section */}
          <div className="p-6 px-8 rounded font-montserrat">
            <div className="flex pb-2">
              <h2 className=" md:text-4xl text-[28px] font-bold text-[#DEE1E2]">
                Category Form
              </h2>
              <button onClick={closeHandler}>
                <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
              </button>
            </div>

            <input
              value={categoryDataForm?.categoryName}
              type="text"
              onChange={handleChange}
              name="categoryName"
              className={
                " font-medium outline-none w-full my-4 border h-10 bg-black/40 border-transparent text-[#DEE1E2] rounded-md pl-4 focus-within:border-gray-800"
              }
              placeholder={"Category Name"}
              required
            />

            <div className="flex text-[#DEE1E2]">
              <button
                className="px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-700"
                type="submit"
              >
                {/* Save Changes */}
                Submite
              </button>
              <button
                className="px-4 py-2 ml-8 rounded bg-rose-800 hover:bg-rose-700"
                onClick={closeHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatCategory;
