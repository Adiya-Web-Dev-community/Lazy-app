import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import update from "../assets/Update-Profile.svg";
import { FiPhone, FiUser } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../types/apiType";
import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import { BiImageAlt } from "react-icons/bi";
import uploadImage from "../components/firebase_image/image.ts";
import {
  MutationObjectUPType,
  UpdatePutResponseType,
  UpdateSendingPostType,
} from "../types/authType.ts";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  const [updateProfileObj, setUpdateObj] = useState({
    fullName: "",
    contact: "",
    email: "",
    image: "",
    imageSrc: "",
  });

  const handleChnage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value, e.target.name);

    const { name, value } = e.target;

    // If the input is not a number or is longer than 10 characters, do not update state
    if (!isNaN(Number(value)) && value.length <= 10) {
      setUpdateObj((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // Reset error message
      setPhoneNumberError("");
    } else if (name !== "contact") {
      setUpdateObj((prev) => ({
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
    }
  };

  const mutation = useMutation<
    ApiResponse<UpdatePutResponseType>,
    ApiError,
    MutationObjectUPType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Creating account");
      try {
        const response = await apiRequest<
          UpdateSendingPostType,
          UpdatePutResponseType
        >({
          url: path,
          method: method,
          data: data,
        });

        return response;
      } catch (error) {
        console.log(error);
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError; // Handle specific errors if needed
      }
    },
    onSuccess: (data) => {
      console.log("Update Profile successful:", data);
      toast.dismiss();
      console.log(data);
      toast.success(`${data?.data?.message}`);
      // Handle success (e.g., redirect to dashboard)
      setTimeout(() => navigate("/products"), 1000);
    },
    onError: (error: ApiError) => {
      // Handle error (e.g., show error message)
      console.error("Update Profile error:", error);
      console.log("Update Profile error:", error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (updateProfileObj.contact.length !== 10) {
      setPhoneNumberError("Phone number must be 10 digits");
      return;
    }

    if (updateProfileObj.contact.length !== 10) {
      setPhoneNumberError("Phone number must be 10 digits");
      return;
    }

    const finalObject: UpdateSendingPostType = {
      name: updateProfileObj.fullName,
      image: updateProfileObj.image,
      mobile: updateProfileObj.contact,
    };

    mutation.mutate({
      path: "/api/admin/update-profile",
      method: "put",
      data: finalObject,
    });
    console.log(finalObject);

    setPhoneNumberError("");
    // setPassWordError("");
    setUpdateObj({
      fullName: "",
      contact: "",
      email: "",
      image: "",
      imageSrc: "",
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // const selectedFile = event.target.files[0];

    const selectedFile = event.target?.files?.[0];
    const folderName = event?.target?.files?.[0]?.name ?? "";

    if (selectedFile) {
      const imageUrl = await uploadImage(
        folderName,
        selectedFile,
        setProgressStatus
      );

      console.log(imageUrl, selectedFile, "<<frommodal?>>");
      setUpdateObj((prev) => ({
        ...prev,
        image: imageUrl,
        imageSrc: selectedFile.name,
      }));
    }
  };

  return (
    <>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img src={update} alt="login image" className="w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-4 mx-auto md:w-[70%] lg:w-[50%]">
        <div className="w-full mb-2 lg:pl-6 md:mb-4">
          <h4 className="text-[24px] md:text-3xl lg:text-4xl font-bold pb-1 text-gray-600">
            Manage Your Profile
          </h4>
          <p className="text-sm font-medium text-gray-500 sm:text-base">
            Keep your details current to enhance your experience with us!
          </p>
        </div>
        <form
          className="grid w-full grid-cols-1 gap-2 py-0 md:gap-4 lg:p-4 lg:px-6 md:grid-cols-2 "
          onSubmit={handleSumbit}
        >
          <div className="grid grid-cols-1 col-span-2 gap-4 md:gap-6 lg:grid-cols-2">
            <div className="relative w-full">
              <FiUser className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
              <input
                required
                className="w-full py-[6px]  transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
                name={"fullName"}
                placeholder="FullName"
                onChange={handleChnage}
                value={updateProfileObj.fullName}
              />
            </div>
            <div className="relative w-full">
              <FiPhone className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
              <input
                type="tel"
                name={"contact"}
                placeholder="Contact Number"
                onChange={handleChnage}
                value={updateProfileObj.contact}
                required
                className="w-full py-[6px]  transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              />
              {phoneNumberError && (
                <div className="pt-1 text-sm text-red-500 ">
                  {phoneNumberError} !
                </div>
              )}
            </div>

            <div className="relative w-full h-full">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`px-4  pl-10 relative ${
                  progressStatus ? "pb-2" : ""
                } w-full  bg-blue-50 text-gray-400 h-10  focus:border-blue-300  border-2 rounded-md placeholder:text-gray-400 cursor-pointer flex items-center justify-between`}
              >
                {updateProfileObj?.imageSrc || "Choose a file"}
                <span className="absolute top-0 left-0 flex items-center h-full px-2 font-medium text-gray-400 bg-transparent rounded-tl-md rounded-bl-md ">
                  <BiImageAlt className="w-6 h-6" />
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
          </div>

          <button className="col-span-2 px-4 py-2 mt-4 text-white bg-blue-400 border rounded-md disabled:bg-gray-600">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
