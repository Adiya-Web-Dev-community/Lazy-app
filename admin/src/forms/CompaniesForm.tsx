import React, { useState } from "react";

import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";

import { ApiError, ApiResponse } from "../types/apiType.js";
import { apiRequest } from "../api/adminApi.js";
import { useDispatch, useSelector } from "react-redux";
import { removeData } from "../store/companies.js";
import uploadImage from "../components/firebase_image/image.ts";

import { RootState } from "../store/index.ts";
import {
  CompaniesType,
  CompanyPostResponseType,
  CompanySendingPostTyp,
  MutationObjectCompanyType,
} from "../types/contentType.ts";

interface OpenStateType {
  status: boolean;
}

const CompaniesForm: React.FC = () => {
  const companyUpdateData = useSelector(
    (state: RootState) => state?.company?.companyData
  );

  const [companiesData, setCompaniesData] = useState<CompaniesType>({
    name: companyUpdateData?.name || "",
    email: companyUpdateData?.email || "",
    phone: companyUpdateData?.phone || "",
    address: companyUpdateData?.address || "",
    webLink: companyUpdateData?.website || "",
    status: companyUpdateData?.status || "",
    products: companyUpdateData?.productcount || 0,

    imageSrc:
      companyUpdateData?.image?.slice(
        67,
        companyUpdateData?.image?.indexOf("%")
      ) || "",
    image: companyUpdateData?.image || "",
  });

  const isUpdate = Object.keys(companyUpdateData || []).length !== 0;

  console.log(companyUpdateData, "from company form");

  const [isOpen, setOpen] = useState<OpenStateType>({
    status: false,
  });

  const dispatch = useDispatch();
  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  const [isError, setIsError] = useState<boolean>(false);
  const pattern = new RegExp(/^\d{1,10}$/);

  const mutation = useMutation<
    ApiResponse<CompanyPostResponseType>,
    ApiError,
    MutationObjectCompanyType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          CompanySendingPostTyp,
          CompanyPostResponseType
        >({
          url: path,
          method: condition === "creat" ? "post" : "put",
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
    // onSuccess: (data: ApiResponse<DeletCategoryData>) => {
    onSuccess: (data) => {
      console.log(data, "company created");
      toast.dismiss();
      clearhandler();
      toast.success(`${isUpdate ? "Update Successfull" : "Creat Successfull"}`);
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

    setCompaniesData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "phone" && !pattern.test(value)) setIsError(true);
    else setIsError(false);
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

  //for Image Data
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // const selectedFile = event.target.files[0];

    const selectedFile = event.target?.files?.[0];
    const folderName = event?.target?.files?.[0].name ?? "";

    console.log(folderName, setProgressStatus, "from single image uploade");

    if (selectedFile) {
      const imageUrl = await uploadImage(
        folderName,
        selectedFile,
        setProgressStatus
      );

      // console.log(imageUrl, selectedFile, "<<frommodal?>>");
      setCompaniesData((prev) => ({
        ...prev,
        image: imageUrl,
        imageSrc: selectedFile.name,
      }));
    }
  };

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const companyPostObject: CompanySendingPostTyp = {
      name: companiesData.name,
      email: companiesData.email,
      phone: companiesData.phone,
      image: companiesData?.image ?? "",

      address: companiesData.address,
      website: companiesData.webLink,
      status: companiesData.status,
      productcount: companiesData.products,
    };

    console.log(companiesData);

    if (Object.keys(companyUpdateData || [])?.length === 0) {
      console.log("now create");
      mutation.mutate({
        path: "api/company/create",
        condition: "creat",
        data: companyPostObject,
      });
    } else {
      console.log("update Id");
      mutation.mutate({
        path: `api/company/update/${companyUpdateData?._id}`,
        condition: "update",
        data: companyPostObject,
      });
    }
  };

  const clearhandler = () => {
    dispatch(removeData());
    setCompaniesData({
      name: "",
      email: "",
      phone: "",
      address: "",
      webLink: "",
      status: "",
      products: 0,

      imageSrc: "",
      image: "",
    });

    navigate("/companies");
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
              Company Form
            </h2>
            <div onClick={clearhandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </div>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 md:pr-0 text-[#DEE1E2]">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={companiesData?.name}
                type="text"
                onChange={handleChange}
                name="name"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Company Name"
                required
              />
              <input
                value={companiesData?.email}
                type="email"
                onChange={handleChange}
                name="email"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Company Email"
                required
              />
              <div className="relative w-full h-full">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                />
                <label
                  htmlFor="image-upload"
                  className={`px-4 py-2 pl-24 relative ${
                    progressStatus ? "pb-2" : ""
                  } w-full text-base bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md text-gray-400 cursor-pointer flex items-center justify-between`}
                >
                  {companiesData?.imageSrc || "Choose a Image"}
                  <span className="text-gray-400 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 font-medium bg-[#1A1A1A]">
                    Browse
                  </span>
                </label>
                {progressStatus !== null && progressStatus !== 0 && (
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
                value={companiesData?.products || ""}
                type="number"
                onChange={handleChange}
                name="products"
                className="w-full h-10 px-4 font-medium bg-[#252525] focus:border-[#DEE1E2]  border-transparent border   rounded-md outline-none "
                placeholder="No. Products"
                required
              />

              {/* Status Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                  onClick={() => setOpen({ ...isOpen, status: !isOpen.status })}
                >
                  {companiesData?.status !== ""
                    ? companiesData?.status
                    : "Select Status"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-28 text-[#DEE1E2] bg-[#1A1A1A] shadow-lg absolute z-10 ${
                    isOpen.status ? "max-h-60" : "hidden"
                  } custom-scrollbar`}
                >
                  {statusData?.map((status, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        companiesData?.status === status ? "bg-rose-600" : ""
                      }`}
                      onClick={() => selectOption("status", status)}
                    >
                      <span>{status}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <input
                value={companiesData?.webLink}
                type="url"
                onChange={handleChange}
                name="webLink"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Company Web Link"
                required
              />
              <input
                value={companiesData?.phone}
                type="tel"
                onChange={handleChange}
                name="phone"
                className={`w-full h-10 pl-4 font-medium ${
                  isError
                    ? "bg-rose-600 focus:border-rose-800"
                    : "bg-[#252525] focus:border-[#DEE1E2]"
                }   border-transparent border   rounded-md outline-none`}
                placeholder="Company Phone No."
                required
              />
              {/* <input
                value={companiesData.joinDate}
                type="date"
                onChange={handleChange}
                name="joinDate"
                className="w-full h-10 px-4 text-[#DEE1E2] font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none placeholder:text-gray-400"
                // placeholder="Company Join Date"
                required
              /> */}

              <textarea
                value={companiesData?.address}
                onChange={handleChange}
                name="address"
                className="w-full h-24 py-4 pl-4 font-medium  border-gray-400  md:col-span-2 bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Company Address"
                required
              />
            </div>

            <div className="flex">
              <button
                className="px-4 py-2 text-white rounded-md bg-emerald-800 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                type="submit"
                disabled={
                  !companiesData.name ||
                  !companiesData.address ||
                  !companiesData.email ||
                  !companiesData.image ||
                  !companiesData.phone ||
                  !companiesData.products ||
                  !companiesData.status ||
                  !companiesData.webLink
                }
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

export default CompaniesForm;
