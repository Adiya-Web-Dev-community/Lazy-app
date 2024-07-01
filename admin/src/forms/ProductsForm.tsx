import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import { ApiError } from "../types/apiType";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaCaretDown } from "react-icons/fa6";
import useCompanies from "../hooks/useCompanies";
import { useCategories } from "../hooks/useCategories";
import uploadeImage from "../components/firebase_image/image.js";
import { FormProductTypes, ProductUni } from "../types/contentType.js";

const ProductsForm = () => {
  const [productData, setProductData] = useState<FormProductTypes>({
    description: "",
    imageSrc: "",
    image: "",

    name: "",
    // price: 0,
    company: {
      name: "",
      id: "",
    },
    category: {
      name: "",
      id: "",
    },
    available: false,
    status: "",
  });

  const [isOpen, setOpen] = useState({
    company: false,
    category: false,
    status: false,
  });

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
      toast.dismiss();
      clearhandler();
      toast.success(
        `${
          data?.statusText === "OK" ? "Update Successfull" : "Creat Successfull"
        }`
      );
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
    },
  });

  // const [imageUrl, setImage] = useState("");
  const [progressStatus, setProgressStatus] = useState("");

  const {
    isPending: categoryIsPending,
    isError: categoryIsError,
    data: category,
    error: categoryError,
  } = useCategories();
  const {
    isPending: companyisPending,
    isError: companyIsError,
    data: company,
    error: companyError,
  } = useCompanies();

  const categories = category?.data?.data || [];
  const companies = company?.data?.data || [];

  // console.log(categories);

  //for text Data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //for Image Data

  const handleImageChange = async (event: React.ChangeEvent) => {
    // const selectedFile = event.target.files[0];

    const selectedFile = event.target?.files?.[0];

    if (selectedFile) {
      const imageUrl = await uploadeImage(
        event.target.files[0].name,

        event.target.files[0],
        setProgressStatus
      );

      console.log(imageUrl, selectedFile, "<<frommodal?>>");
      setProductData((prev) => ({
        ...prev,
        image: imageUrl,
        imageSrc: selectedFile.name,
      }));
    }
  };

  const selectOption = (field: string, value: ProductUni) => {
    console.log(value);
    setProductData((prev) => ({
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

    // const productPostObject = {
    //   companyId: productData.company.id,
    //   name: productData.name,
    //   image: productData.image,
    //   description: productData.description,
    //   price: Number(productData.price),
    //   category: productData.category.id,

    //   available: productData.available,
    // };

    // console.log(productPostObject);
    console.log(productData);

    // if (Object.keys(dishUpdateData)?.length === 0) {
    //   console.log("now creat");
    //   mutation.mutate({
    //     // path: "/menus",
    //     condition: "creat",
    //     data: productPostObject,
    //   });
    // } else {
    //   console.log("update Id");
    //   mutation.mutate({
    //     // path: `/menus/${dishUpdateData?._id}`,
    //     condition: "update",
    //     data: productPostObject,
    //   });
    // }
  };

  const clearhandler = () => {
    // dispatch(clearDishData());
    setProductData({
      description: "",
      imageSrc: "",
      image: "",

      name: "",
      // price: 0,
      company: {
        name: "",
        id: "",
      },
      category: {
        name: "",
        id: "",
      },
      available: false,
      status: "",
    });

    navigate("/dishes");
  };

  const LoadingFormListElement = () => {
    return (
      <div className="w-full max-w-sm p-4 mx-auto border rounded-md shadow focus:border-gray-800">
        <div className="flex space-x-4 animate-pulse">
          <div className="flex-1 py-1 space-y-6">
            <div className="h-2 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>
    );
  };

  const statusData = ["Active", "in-Active", "Pending"];

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
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 md:pr-0 text-[#DEE1E2]">
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

              <div className="relative w-full h-full">
                {/* <input
                  // value={userDetails?.image}
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className={`px-2 py-[5px] ${
                    progressStatus ? "pb-2" : ""
                  }  w-full text-sm  bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md text-gray-400  outline-none`}
                  placeholder="Image URL"
                  required
                /> */}
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`px-4 py-2 pl-24 relative ${
                    progressStatus ? "pb-2" : ""
                  } w-full text-base bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md text-gray-400 cursor-pointer flex items-center justify-between`}
                >
                  {productData?.imageSrc || "Choose a file"}
                  <span className="text-gray-400 absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-2 font-medium bg-[#1A1A1A]">
                    Browse
                  </span>
                </label>
                {progressStatus !== null && progressStatus !== "" && (
                  <>
                    <div className="absolute inset-0 z-10 flex items-end">
                      <div
                        className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                        style={{ width: `${progressStatus}%` }}
                        // style={{ width: `${100}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
              <input
                value={productData.price || ""}
                type="number"
                onChange={handleChange}
                name="price"
                className="w-full h-10 pl-4 font-medium  rounded-md outline-none bg-[#252525] focus:border-[#DEE1E2] border-transparent border  "
                placeholder="Price"
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
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-28 text-[#DEE1E2] bg-[#1A1A1A] shadow-lg absolute z-10 ${
                    isOpen.status ? "max-h-60" : "hidden"
                  } custom-scrollbar`}
                >
                  {statusData.map((state, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        productData.status === state ? "bg-rose-600" : ""
                      }`}
                      onClick={() => selectOption("state", state)}
                    >
                      <span>{state}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 pl-4 font-medium border rounded-md cursor-pointer text-gray-400 bg-[#252525] focus:border-[#DEE1E2]  border-transparent  "
                  onClick={() =>
                    setOpen({
                      ...isOpen,
                      company: !isOpen.company,
                    })
                  }
                >
                  {productData?.company?.name !== ""
                    ? productData?.company?.name
                    : "Select Company"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-48 overflow-y-scroll text-[#DEE1E2] bg-[#1A1A1A] shadow-lg absolute z-10 ${
                    isOpen.company ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {companies?.map((company, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        productData?.company?.name === company?.name
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() =>
                        selectOption("company", {
                          name: company?.name,
                          id: company?._id,
                        })
                      }
                    >
                      <span>{company?.name}</span>
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
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-48 overflow-y-scroll text-[#DEE1E2] bg-[#1A1A1A] shadow-lg absolute z-10 ${
                    isOpen.category ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {
                    // categoryIsPending
                    //   ? [0, 1].map((el) => <LoadingFormListElement />)
                    //   :
                    categories?.map((category, i) => (
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
                    ))
                  }
                </ul>
              </div>

              <textarea
                value={productData.description}
                onChange={handleChange}
                name="description"
                className="w-full h-24 py-4 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border  rounded-md outline-none  md:col-span-2 "
                placeholder="Description"
                required
              />

              <div className="flex items-center pl-1">
                <input
                  type="checkbox"
                  name="available"
                  checked={productData.available}
                  onChange={handleChange}
                  className="w-4 h-4 bg-[#252525] focus:border-[#DEE1E2] border-transparent border "
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
