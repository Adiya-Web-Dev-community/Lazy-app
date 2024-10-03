import React, { ChangeEvent, useState } from "react";

import { TiArrowBackOutline } from "react-icons/ti";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { apiRequest } from "../api/adminApi";
import { ApiError, ApiResponse } from "../types/apiType";
import {
  ClaimPostResponse,
  ClaimUpdate,
  MutationObjectClaimType,
} from "../types/contentType";

import { FaCaretDown } from "react-icons/fa";
import { UserClaimUpdateProps } from "../pages/UserClaim";

const UpdateUserClaim: React.FC<UserClaimUpdateProps> = ({
  isClaimForm,
  refetch,
  clear,
}) => {
  const [claimDataForm, setClaimData] = useState({
    status: isClaimForm.updatedata.status || "",
    orderamount: isClaimForm.updatedata.orderamount || "",
  });

  const [isOpen, setOpen] = useState({
    status: false,
  });

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setClaimData((prev) => ({
  //       ...prev,
  //       [e?.target?.name]:
  //         e?.target?.type === "checkbox" ? e?.target?.checked : e?.target?.value,
  //     }));
  //   };

  const statusHeading = ["confirm", "cancel"];

  const mutation = useMutation<
    ApiResponse<ClaimPostResponse>,
    ApiError,
    MutationObjectClaimType
  >({
    mutationFn: async ({ path, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<ClaimUpdate, ClaimPostResponse>({
          url: path,
          method: "patch",
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
      //   closeHandler();
      toast.success("Update Successfull");
      clear();
      setClaimData((prev) => ({
        ...prev,
        categoryName: "",
      }));
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
      clear();
    },
  });

  const selectOption = (field: string, value: string) => {
    console.log(value);
    setClaimData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const submiteHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(claimDataForm);

    // const categoryName: PostCategoryPostData = {
    //   name: claimDataForm.categoryName,
    // };

    if (isClaimForm.updateId) {
      console.log("update Id");
      mutation.mutate({
        path: `api/claim/${isClaimForm.updateId}`,
        data: claimDataForm,
      });
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setClaimData({ ...claimDataForm, orderamount: e.target.value });

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center px-4 sm:px-0 bg-black/60"
      onClick={clear}
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
                Claim Update Form
              </h2>
              <button onClick={clear}>
                <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
              </button>
            </div>

            {/* Status Dropdown */}
            <div className="relative mb-4">
              <label
                htmlFor="Status"
                className="block text-[#DEE1E2] font-semibold mb-2"
              >
                Status
              </label>
              <div
                id="status"
                className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                onClick={() => setOpen({ ...isOpen, status: !isOpen.status })}
              >
                {claimDataForm?.status !== ""
                  ? claimDataForm?.status
                  : "Select Status"}
                <FaCaretDown className="m-1" />
              </div>
              <ul
                className={`mt-2 p-2 rounded-md w-64 text-[#DEE1E2] bg-[#1A1A1A] overflow-auto shadow-lg absolute z-10 ${
                  isOpen.status ? "max-h-36" : "hidden"
                } custom-scrollbar`}
              >
                {statusHeading?.map((status, i) => (
                  <li
                    key={i}
                    className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                      claimDataForm?.status === status ? "bg-rose-600" : ""
                    }`}
                    onClick={() => selectOption("status", status)}
                  >
                    <span>{status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <label
                htmlFor="orderamount"
                className="block text-[#DEE1E2] font-semibold mb-2"
              >
                Order Amount
                {claimDataForm.status === "cancel" ? (
                  <span className="ml-4 text-sm font-semibold text-rose-400">
                    Disabel
                  </span>
                ) : (
                  ""
                )}
              </label>

              <input
                id="orderamount"
                name="orderamount"
                type="number"
                className="w-full p-2 rounded-md bg-[#252525] text-gray-400 focus:outline-none focus:border-[#DEE1E2] disabled:bg-[#202020] disabled:cursor-not-allowed"
                placeholder="Write your remark here..."
                value={claimDataForm?.orderamount || ""}
                onChange={changeHandler}
                disabled={claimDataForm.status === "cancel"}
              />
            </div>

            <div className="flex text-[#DEE1E2]">
              <button
                className="px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-700"
                type="submit"
              >
                {/* Save Changes */}
                Update
              </button>
              <button
                className="px-4 py-2 ml-8 rounded bg-rose-800 hover:bg-rose-700"
                onClick={clear}
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

export default UpdateUserClaim;
