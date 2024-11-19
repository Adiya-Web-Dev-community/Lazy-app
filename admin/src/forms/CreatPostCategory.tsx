import React, { useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import { ApiError, ApiResponse } from "../types/apiType";
import {
  CreatPostCategoryProps,
  MutationObjectPostCategoryType,
  PostCategoryPostData,
  PostCategoryPostResponseType,
} from "../types/contentType";

const CreatPostCategory: React.FC<CreatPostCategoryProps> = ({
  isPostCategoryForm,
  setPostCategoryForm,
  refetch,
  clear,
}) => {
  const [categoryDataForm, setCategoryDataForm] = useState({
    categoryName: isPostCategoryForm.updateData
      ? isPostCategoryForm.updateData
      : "",
    type: "",
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryDataForm((prev) => ({
      ...prev,
      [e?.target?.name]:
        e?.target?.type === "checkbox" ? e?.target?.checked : e?.target?.value,
    }));
  };

  const mutation = useMutation<
    ApiResponse<PostCategoryPostResponseType>,
    ApiError,
    MutationObjectPostCategoryType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          PostCategoryPostData,
          PostCategoryPostResponseType
        >({
          url: path,
          method: condition === "creat" ? "post" : "put",
          data: data,
        });

        return response;
      } catch (error) {
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
      toast.dismiss();
      closeHandler();
      toast.success(
        `${
          isPostCategoryForm.creat ? "Creat Successfull" : "Update Successfull"
        }`
      );
      clear();
      setCategoryDataForm((prev) => ({
        ...prev,
        categoryName: "",
      }));
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
      closeHandler();
    },
  });

  const submiteHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(categoryDataForm);

    const categoryName: PostCategoryPostData = {
      name: categoryDataForm.categoryName,
    };

    if (categoryDataForm.categoryName !== "") {
      if (isPostCategoryForm.creat) {
        console.log("now creat");
        mutation.mutate({
          path: "api/admin/post/category",
          condition: "creat",
          data: categoryName,
        });
      }

      if (isPostCategoryForm.updateId) {
        console.log("update Id");
        mutation.mutate({
          path: `api/admin/post/category/${isPostCategoryForm.updateId}`,
          condition: "update",
          data: categoryName,
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
    clear();
    if (isPostCategoryForm.creat) {
      setPostCategoryForm((prev) => ({
        ...prev,
        creat: !prev.creat,
      }));
    } else {
      setPostCategoryForm((prev) => ({
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
                " font-medium outline-none w-full my-4 border h-10 bg-[#252525] border-transparent text-[#DEE1E2] rounded-md pl-4 focus-within:border-gray-800"
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
                {isPostCategoryForm.updateId ? "Update" : "Submite"}
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

export default CreatPostCategory;
