import React, { useEffect, useState } from "react";

import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";

import { ApiError, ApiResponse } from "../types/apiType.js";
import { apiRequest } from "../api/adminApi.js";

import {
  MutationObjectTransactionType,
  TransactionPostResponseType,
  TransactionUpdatePost,
} from "../types/contentType.ts";

import { useSingleTransaction } from "../api/querys.ts";

export interface OpenStateType {
  status: boolean;
  paymenttype: boolean;
}

export interface TransactionStateType {
  type: string;
  status: string;
  paymenttype: string;
  paymentMode: string;
  //   transactionId: string;
  remarks: string;
  amount: number;
}

const TransactionForm: React.FC = () => {
  const { id } = useParams();

  const { data, isError } = useSingleTransaction(id ?? "");

  const singTransactionData = data?.data?.data;
  console.log(singTransactionData, data, "from form");

  const isUpdate = (Object.keys(singTransactionData ?? {}) ?? []).length !== 0;

  const statusHeading = ["pending", "cancel", "fail", "success"];
  const paymentTypeHeading = ["withdraw", "credit"];

  const [transactionData, setTransactionData] = useState<TransactionStateType>({
    type: "",
    status: "",
    paymenttype: "",
    paymentMode: "",
    remarks: "",
    amount: 0,
  });

  useEffect(() => {
    if (isUpdate && !isError) {
      setTransactionData((prev) => ({
        ...prev,
        type: singTransactionData?.type || "",
        status: singTransactionData?.status || "",
        paymenttype: singTransactionData?.paymenttype || "",
        paymentMode: singTransactionData?.paymentMode || "",
        remarks: singTransactionData?.remarks || "",
        amount: singTransactionData?.amount || 0,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate, singTransactionData]);

  const [isOpen, setOpen] = useState<OpenStateType>({
    status: false,
    paymenttype: false,
  });

  const mutation = useMutation<
    ApiResponse<TransactionPostResponseType>,
    ApiError,
    MutationObjectTransactionType
  >({
    mutationFn: async ({ path, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          TransactionUpdatePost,
          TransactionPostResponseType
        >({
          url: path,
          method: "put",
          data: data,
        });

        return response;
      } catch (error) {
        console.log(error);
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },

    onSuccess: (data) => {
      console.log(data, "Transaction update");
      toast.dismiss();
      clearhandler();
      toast.success("Update Successfull");
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error.message);
    },
  });

  //for text Data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let checked: boolean | undefined;

    if (e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }

    setTransactionData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectOption = (field: string, value: string) => {
    console.log(value);
    setTransactionData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const payloade = {
      userId: singTransactionData?.userId?._id ?? "",
      type: transactionData.type,
      status: transactionData.status,
      paymenttype: transactionData.paymenttype,
      paymentMode: transactionData.paymentMode,
      transactionId: singTransactionData?.transactionId ?? "",
      remarks: singTransactionData?.remarks ?? "",
      amount: +transactionData?.amount ?? 0,
    };

    console.log(transactionData, payloade);

    mutation.mutate({
      path: `api/transaction/${id}`,
      data: payloade,
    });
  };

  const clearhandler = () => {
    setTransactionData({
      type: "",
      status: "",
      paymenttype: "",
      paymentMode: "",
      remarks: "",
      amount: 0,
    });

    navigate("/transaction");
  };

  return (
    <div className="px-4 pt-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden  rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex-1 h-full p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-[#DEE1E2]">
              Transaction Form
            </h2>
            <div onClick={clearhandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </div>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden pr-4 md:pr-0 text-[#DEE1E2]">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={transactionData?.paymentMode}
                type="text"
                onChange={handleChange}
                name="paymentMode"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Enter Payment Mode"
                required
              />
              <input
                value={transactionData?.remarks}
                type="text"
                onChange={handleChange}
                name="remarks"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Enter Remarks"
                required
              />
              <input
                value={transactionData?.amount}
                type="number"
                onChange={handleChange}
                name="amount"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Enter Amount"
                required
              />

              {/* Status Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                  onClick={() => setOpen({ ...isOpen, status: !isOpen.status })}
                >
                  {transactionData?.status !== ""
                    ? transactionData?.status
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
                        transactionData?.status === status ? "bg-rose-600" : ""
                      }`}
                      onClick={() => selectOption("status", status)}
                    >
                      <span>{status}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Type */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                  onClick={() =>
                    setOpen({ ...isOpen, paymenttype: !isOpen.paymenttype })
                  }
                >
                  {transactionData?.paymenttype !== ""
                    ? transactionData?.paymenttype
                    : "Select Payment Type"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-64 text-[#DEE1E2] bg-[#1A1A1A] overflow-auto shadow-lg absolute z-10 ${
                    isOpen.paymenttype ? "max-h-36" : "hidden"
                  } custom-scrollbar`}
                >
                  {paymentTypeHeading?.map((payment, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        transactionData?.paymenttype === payment
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() => selectOption("payment", payment)}
                    >
                      <span>{payment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex">
              <button
                className="px-4 py-2 text-white rounded-md bg-emerald-800 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                type="submit"
              >
                {isUpdate ? "Update" : "Submit"}
              </button>
              <button
                className="px-4 py-2 ml-8 text-white rounded-md bg-rose-800 hover:bg-rose-700"
                type="button"
                onClick={clearhandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
