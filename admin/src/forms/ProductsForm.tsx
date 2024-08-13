import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import { ApiError, ApiResponse } from "../types/apiType";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaCaretDown } from "react-icons/fa6";

import {
  FormProductKeys,
  FormProductTypes,
  MutationObjectType,
  OptionValue,
  ProductPostResponseType,
  ProductSendingPostType,
  ProductUni,
  StateOpenCloseType,
} from "../types/contentType.js";
import { IoMdArrowRoundDown } from "react-icons/io";
import DynamicInputFields from "../components/DynamicInputFiled.js";

import FileUploadForm from "../components/multiple_imag/MultipleImageUploadeForm.js";
import TextEditor from "../components/textEditor/TextEditor.js";
import { useCategories, useCompanies } from "../api/querys.js";

const ProductsForm: React.FC = () => {
  const [isOpen, setOpen] = useState<StateOpenCloseType>({
    company: false,
    category: false,
    status: false,
  });

  const [productData, setProductData] = useState<FormProductTypes>({
    description: "",
    imageSrc: "",
    image: [],

    name: "",

    company: [],

    category: {
      name: "",
      id: "",
    },
    feature: "",

    available: false,
    status: "",
    productsLink: [],
  });

  const mutation = useMutation<
    ApiResponse<ProductPostResponseType>,
    ApiError,
    MutationObjectType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          ProductSendingPostType,
          ProductPostResponseType
        >({
          url: path,
          method: method,
          data: data,
        });

        // return { data: response.data };
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

    onSuccess: () => {
      // console.log(data, data?.statusText);
      toast.dismiss();
      clearhandler();
      toast.success(`${"Creat Successfull"}`);
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const { data: category } = useCategories();
  const { data: company } = useCompanies();

  const categories = category?.data?.data || [];
  const companies = company?.data?.data || [];

  console.log(categories, companies, "return category , company");

  //for text Data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let checked: boolean | undefined;

    if (e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectOption = (field: string, value: OptionValue) => {
    // console.log(field, value);
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const selectMultipleOption = (field: FormProductKeys, value: ProductUni) => {
    setProductData((prev) => ({
      ...prev,
      [field]: (prev[field] as ProductUni[]).some(
        (item) => item._id === value._id
      )
        ? (prev[field] as ProductUni[]).filter((item) => item._id !== value._id)
        : [...(prev[field] as ProductUni[]), value],
    }));
    setOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const navigate = useNavigate();

  console.log(productData, companies);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const companyNameIcon = productData?.company?.map((comp) => {
      return { name: comp.name, image: comp.image };
    });

    const productArray = productData?.productsLink?.map((proLink) => {
      return {
        url: proLink.url,
        company: proLink.company?.name,
        image: proLink.company?.image,
      };
    });

    const productPostObject: ProductSendingPostType = {
      name: productData.name,
      images: productData.image,
      status: productData.status,
      company: companyNameIcon,
      description: productData.description,
      category: productData.category?.name,
      productsLink: productArray,
      feature: productData.feature,
      available: productData.available,
    };

    console.log(productPostObject, companyNameIcon, productArray);

    console.log("now creat");
    mutation.mutate({
      path: "api/product/create",
      method: "post",
      data: productPostObject,
    });
  };

  const clearhandler = () => {
    setProductData({
      description: "",
      imageSrc: "",
      image: [],

      name: "",

      company: [],
      category: {
        name: "",
        id: "",
      },
      feature: "",
      available: false,
      status: "",
      productsLink: [],
    });

    navigate("/products");
  };

  const handlingDrop = (name: string, value: string) => {
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const statusData = ["Active", "Draft"];

  return (
    <div className="px-4 pt-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden  rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex-1 h-full p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-[#DEE1E2]">
              Product Form
            </h2>
            <Link to={"/products"} onClick={clearhandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </Link>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden pr-4 md:pr-0 text-[#DEE1E2]">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={productData.name}
                type="text"
                onChange={handleChange}
                name="name"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Product Name"
                required
              />

              {/* Status Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                  onClick={() => setOpen({ ...isOpen, status: !isOpen.status })}
                >
                  {productData?.status !== ""
                    ? productData.status
                    : "Select Status"}
                  <FaCaretDown
                    className={`m-1 transition-all duration-500 ${
                      isOpen.status ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-28 text-[#DEE1E2] bg-[#1A1A1A] shadow-lg absolute z-10 ${
                    isOpen.status ? "max-h-60" : "hidden"
                  } `}
                >
                  {statusData.map((state, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        productData.status === state ? "bg-rose-600" : ""
                      }`}
                      onClick={() => selectOption("status", state)}
                    >
                      <span>{state}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Dropdown */}
              <div className="relative">
                <div
                  className="flex relative justify-between p-2 pl-4 font-medium border rounded-md cursor-pointer text-gray-400 bg-[#252525] focus:border-[#DEE1E2]  border-transparent  "
                  onClick={() =>
                    setOpen({
                      ...isOpen,
                      company: !isOpen.company,
                    })
                  }
                >
                  {productData.company && productData.company.length > 0 ? (
                    <div className="w-full  h-6 gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                      {productData.company.map((comp, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <img
                            src={comp.image}
                            alt="company logo"
                            className="object-contain w-8 h-6 rounded-full"
                          />
                          <span className="font-medium">{comp.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "Select Company"
                  )}
                  {productData.company && productData.company.length > 1 && (
                    <IoMdArrowRoundDown className="absolute w-6 h-6 right-8 top-2 animate-bounce" />
                  )}
                  <FaCaretDown
                    className={`m-1 transition-all duration-500 ${
                      isOpen.company ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </div>
                <ul
                  className={` p-2 rounded-md w-48 overflow-y-scroll text-[#DEE1E2] [&::-webkit-scrollbar]:hidden bg-[#1A1A1A] shadow-lg absolute  ${
                    isOpen.company ? "max-h-40 z-20" : "hidden"
                  } `}
                >
                  {companies?.map((company, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 flex gap-2 items-center text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        productData?.company?.find(
                          (com) => com?._id === company?._id
                        )
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() =>
                        selectMultipleOption("company", {
                          name: company?.name,
                          _id: company?._id,
                          image: company?.image,
                        })
                      }
                    >
                      <img
                        src={company?.image}
                        alt="company logo"
                        className="object-contain w-10 h-10 rounded-full"
                      />
                      <span className="font-medium">{company?.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2  border text-gray-400 font-medium pl-4 rounded-md cursor-pointer bg-[#252525] focus:border-[#DEE1E2] border-transparent"
                  onClick={() =>
                    setOpen({ ...isOpen, category: !isOpen.category })
                  }
                >
                  {productData?.category?.name !== ""
                    ? productData?.category?.name
                    : "Select Category"}
                  <FaCaretDown
                    className={`m-1 transition-all duration-500 ${
                      isOpen.category ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-48 overflow-y-scroll  text-[#DEE1E2] [&::-webkit-scrollbar]:hidden bg-[#1A1A1A] shadow-lg absolute z-10 ${
                    isOpen.category ? "max-h-40" : "hidden"
                  } `}
                >
                  {categories?.map((category, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        productData?.category?.name === category?.name
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() =>
                        selectOption("category", {
                          name: category?.name,
                          id: category._id,
                        })
                      }
                    >
                      <span>{category?.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <FileUploadForm
                setImageData={setProductData}
                imge={productData?.image ?? []}
                productName={productData?.name ?? ""}
              />
              <div className="col-span-1 md:col-span-2">
                <p className="mb-2 text-sm font-bold text-[#DEE1E2]">
                  Features :
                </p>
                <TextEditor
                  height={400}
                  value={productData.feature}
                  OnChangeEditor={(e) => handlingDrop("feature", e)}
                />
              </div>

              <DynamicInputFields
                companies={companies}
                addingProductUrlData={setProductData}
              />

              <div className="col-span-1 md:col-span-2">
                <p className="mb-2 text-sm font-bold text-[#DEE1E2]">
                  Description :
                </p>
                <TextEditor
                  height={400}
                  value={productData.description}
                  OnChangeEditor={(e) => handlingDrop("description", e)}
                />
              </div>

              <div className="flex items-center pl-1">
                <input
                  type="checkbox"
                  name="available"
                  checked={productData.available}
                  onChange={handleChange}
                  className="w-4 h-4 bg-[#252525] focus:border-[#DEE1E2] border-transparent border cursor-pointer"
                />
                <label htmlFor="available" className="pl-4 text-sm ">
                  Available Product
                </label>
              </div>
            </div>

            <div className="flex">
              <button
                className="px-4 py-2 rounded-md bg-emerald-800 hover:bg-emerald-700"
                type="submit"
              >
                Submit
              </button>
              <button
                className="px-4 py-2 ml-8 rounded bg-rose-800 hover:bg-rose-700"
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

export default ProductsForm;
