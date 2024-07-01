import React, { useState } from "react";

import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";

import { ApiError } from "../types/apiType.js";
import { apiRequest } from "../api/adminApi.js";

interface CompaniesType {
  name: string;
  email: string;
  phone: string;
  address: string;
  webLink: string;
  status: string;
  products: number;
  joinDate: string;
}

const CompaniesForm = () => {
  const [companiesData, setCompaniesData] = useState<CompaniesType>({
    // description: "",
    // imageSrc: "",
    // image: "",
    // ingredients: [],
    // label: "",
    // dietaryRestriction: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    webLink: "",
    status: "",
    products: 0,
    joinDate: "",
    // price: "",

    // category: {
    //   name: "",
    //   id: "",
    // },
    // available: false,
  });

  const [isOpen, setOpen] = useState({
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

  //for text Data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setCompaniesData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectOption = (field: string, value: string) => {
    console.log(value);
    setCompaniesData((prev) => ({
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

    // const dishPostObject = {
    //   companyId: companiesData.,
    //   name: companiesData.name,
    //   image: companiesData.image,
    //   description: companiesData.description,
    //   price: Number(companiesData.price),
    //   category: companiesData.category.id,

    //   available: companiesData.available,
    // };

    // console.log(dishPostObject);

    // if (Object.keys(dishUpdateData)?.length === 0) {
    //   console.log("now creat");
    //   mutation.mutate({
    //     path: "/menus",
    //     condition: "creat",
    //     data: dishPostObject,
    //   });
    // } else {
    //   console.log("update Id");
    //   mutation.mutate({
    //     path: `/menus/${dishUpdateData?._id}`,
    //     condition: "update",
    //     data: dishPostObject,
    //   });
    // }
  };

  const clearhandler = () => {
    // dispatch(clearDishData());
    setCompaniesData({
      name: "",
      email: "",
      phone: "",
      address: "",
      webLink: "",
      status: "",
      products: 0,
      joinDate: "",
    });

    navigate("/dishes");
  };

  const LoadingFormListElement = () => {
    return (
      <div className="w-full max-w-sm p-4 mx-auto border border-blue-300 rounded-md shadow">
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
            <Link to={"/companies"} onClick={clearhandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </Link>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 md:pr-0 text-[#DEE1E2]">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={companiesData.name}
                type="text"
                onChange={handleChange}
                name="name"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Company Name"
                required
              />
              <input
                value={companiesData.email}
                type="email"
                onChange={handleChange}
                name="email"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Company Email"
                required
              />

              <input
                value={companiesData.products || ""}
                type="number"
                onChange={handleChange}
                name="prducts"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2]  border-transparent border   rounded-md outline-none "
                placeholder="No. Products"
                required
              />

              {/* Status Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                  onClick={() => setOpen({ ...isOpen, status: !isOpen.status })}
                >
                  {companiesData.status !== ""
                    ? companiesData.status
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
                        companiesData.status === state ? "bg-rose-600" : ""
                      }`}
                      onClick={() => selectOption("state", state)}
                    >
                      <span>{state}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <input
                value={companiesData.webLink}
                type="url"
                onChange={handleChange}
                name="webLink"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Company Web Link"
                required
              />
              <input
                value={companiesData.phone}
                type="url"
                onChange={handleChange}
                name="phone"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Company Phone No."
                required
              />
              <input
                value={companiesData.joinDate}
                type="date"
                onChange={handleChange}
                name="joinDate"
                className="w-full h-10 px-4 text-[#DEE1E2] font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none placeholder:text-gray-400"
                // placeholder="Company Join Date"
                required
              />

              <textarea
                value={companiesData.address}
                onChange={handleChange}
                name="address"
                className="w-full h-24 py-4 pl-4 font-medium  border-gray-400  md:col-span-2 bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Company Address"
                required
              />

              {/* <div className="flex items-center pl-1">
                <input
                  type="checkbox"
                  name="available"
                  checked={dishData.available}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label
                  htmlFor="available"
                  className="pl-4 text-sm text-gray-700"
                >
                  Available Dish
                </label>
              </div> */}
            </div>

            <div className="flex">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
                type="submit"
              >
                Submit
              </button>
              <button
                className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
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

export default CompaniesForm;
