import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";

import { useNavigate, useParams } from "react-router-dom";

import {
  MutationObjectProsConsType,
  ProductPostResponseDataType,
  ProsConsPostResponseType,
  ProsConsPostType,
} from "../types/contentType";

import { useProduct, useProsConsSingle } from "../api/querys";
import { ApiError, ApiResponse } from "../types/apiType";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../api/adminApi";

interface ProsConsType {
  pros: string[];
  cons: string[];
}

export interface ProsConsFormType {
  productId: string;
  title: string;
  prosCons: ProsConsType;
}

const ProsConsForm: React.FC = () => {
  const [prosConsData, setProsConsData] = useState<ProsConsFormType>({
    productId: "",
    title: "",
    prosCons: { pros: [""], cons: [""] },
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useProduct();
  const { isError: singleProsConsIsError, data: singleProsCons } =
    useProsConsSingle(id ?? "0");
  const productApiData = data?.data;
  const singleProsConsData = singleProsCons?.data?.data[0];

  const isUpdate = Object.keys(singleProsConsData || {}).length !== 0;

  useEffect(() => {
    if (isUpdate && !singleProsConsIsError) {
      setProsConsData((prev) => ({
        ...prev,
        productId: singleProsConsData?.productId || "",
        title: singleProsConsData?.title || "",
        prosCons: {
          pros: singleProsConsData?.pros || [""],
          cons: singleProsConsData?.cons || [""],
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate, singleProsConsIsError]);

  const [isOpen, setOpen] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProsConsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProsConsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    type: "pros" | "cons"
  ) => {
    const { value } = e.target;
    const updatedArray = prosConsData.prosCons[type].map((item, i) =>
      i === index ? value : item
    );
    setProsConsData((prev) => ({
      ...prev,
      prosCons: { ...prev.prosCons, [type]: updatedArray },
    }));
  };

  const addItem = (type: "pros" | "cons") => {
    setProsConsData((prev) => ({
      ...prev,
      prosCons: {
        ...prev.prosCons,
        [type]: [...prev.prosCons[type], ""],
      },
    }));
  };

  const removeItem = (index: number, type: "pros" | "cons") => {
    const updatedArray = prosConsData.prosCons[type].filter(
      (_, i) => i !== index
    );
    setProsConsData((prev) => ({
      ...prev,
      prosCons: { ...prev.prosCons, [type]: updatedArray },
    }));
  };

  const selectOption = (productId: string) => {
    setProsConsData((prev) => ({
      ...prev,
      productId,
    }));
    setOpen(false);
  };

  const mutation = useMutation<
    ApiResponse<ProsConsPostResponseType>,
    ApiError,
    MutationObjectProsConsType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          ProsConsPostType,
          ProsConsPostResponseType
        >({
          url: path,
          method: condition === "creat" ? "post" : "put",
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
      console.log(data, "Blog created");
      toast.dismiss();
      clearHandler();
      toast.success(
        `${isUpdate ? "Update Successfull" : "Create Successfull"}`
      );
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(prosConsData);

    const payloade = {
      productId: prosConsData.productId,
      title: prosConsData.title,
      pros: prosConsData.prosCons.pros,
      cons: prosConsData.prosCons.cons,
    };

    if (!isUpdate) {
      console.log("now create");
      mutation.mutate({
        path: "api/proscons",
        condition: "creat",
        data: payloade,
      });
    } else {
      console.log("update Id");
      mutation.mutate({
        path: `api/proscons/${singleProsConsData?._id}`,
        condition: "update",
        data: payloade,
      });
    }
  };

  const clearHandler = () => {
    setProsConsData({
      productId: "",
      title: "",
      prosCons: { pros: [""], cons: [""] },
    });
    navigate("/proscons");
  };

  return (
    <div className="px-4 pt-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex-1 h-full p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-[#DEE1E2]">
              Pros & Cons Form
            </h2>
            <div onClick={clearHandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </div>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 md:pr-0 text-[#DEE1E2] [&::-webkit-scrollbar]:hidden">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={prosConsData?.title}
                type="text"
                onChange={handleChange}
                name="title"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
                placeholder="Title"
                required
              />
              <div className="relative">
                <div
                  className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                  onClick={() => setOpen(!isOpen)}
                >
                  {prosConsData?.productId !== ""
                    ? productApiData?.find(
                        (p: ProductPostResponseDataType) =>
                          p._id === prosConsData.productId
                      )?.name
                    : "Select Product"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-60 text-[#DEE1E2] overflow-y-scroll [&::-webkit-scrollbar]:hidden bg-[#1A1A1A] shadow-lg absolute z-10 ${
                    isOpen ? "max-h-60" : "hidden"
                  } custom-scrollbar`}
                >
                  {productApiData?.map(
                    (product: ProductPostResponseDataType) => (
                      <li
                        key={product._id}
                        className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                          prosConsData?.productId === product._id
                            ? "bg-rose-600"
                            : ""
                        }`}
                        onClick={() => selectOption(product._id ?? "")}
                      >
                        <span>{product.name}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="md:col-span-2">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold">Pros</h3>
                    {prosConsData.prosCons.pros.map((pro, index) => (
                      <div key={index} className="flex items-start gap-4 py-4">
                        <input
                          value={pro}
                          type="text"
                          onChange={(e) =>
                            handleProsConsChange(e, index, "pros")
                          }
                          className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
                          placeholder="Pros"
                          required
                        />
                        {prosConsData.prosCons.pros.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index, "pros")}
                            className="px-2 py-1 text-sm font-bold rounded bg-rose-800 hover:bg-rose-700 focus:outline-none"
                          >
                            <MdOutlineDelete className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addItem("pros")}
                      className="flex items-center p-2 bg-teal-800 rounded"
                    >
                      <MdAdd className="w-5 h-5" />
                      <span className="text-sm font-medium">Add Pro</span>
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Cons</h3>
                    {prosConsData.prosCons.cons.map((con, index) => (
                      <div key={index} className="flex items-start gap-4 py-4">
                        <input
                          value={con}
                          type="text"
                          onChange={(e) =>
                            handleProsConsChange(e, index, "cons")
                          }
                          className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
                          placeholder="Cons"
                          required
                        />
                        {prosConsData.prosCons.cons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index, "cons")}
                            className="px-2 py-1 text-sm font-bold rounded bg-rose-800 hover:bg-rose-700 focus:outline-none"
                          >
                            <MdOutlineDelete className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addItem("cons")}
                      className="flex items-center p-2 bg-teal-800 rounded"
                    >
                      <MdAdd className="w-5 h-5" />
                      <span className="text-sm font-medium">Add Con</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                className="px-4 py-2 text-white rounded-md bg-emerald-800 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                type="submit"
                disabled={
                  !prosConsData.title ||
                  !prosConsData.productId ||
                  prosConsData.prosCons.cons.length === 0 ||
                  prosConsData.prosCons.pros.length === 0
                }
              >
                {isUpdate ? "Update" : "Submit"}
              </button>
              <button
                className="px-4 py-2 ml-8 text-white rounded-md bg-rose-800 hover:bg-rose-700"
                type="button"
                onClick={clearHandler}
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

export default ProsConsForm;
