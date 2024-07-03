import React from "react";
import { useState } from "react";

// import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";

import update from "../assets/Update-Profile.svg";
import {
  FiEye,
  FiEyeOff,
  FiGlobe,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../types/apiType";
import {
  RegisterData,
  RegisterResponse,
  UpdateData,
  UpdateResponse,
} from "../types/authType";

import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import { BiImageAlt } from "react-icons/bi";

import uploadImage from "../components/firebase_image/image.js";

const UpdateProfile = () => {
  const navigate = useNavigate();

  //   const [isVisible, setVisible] = useState({
  //     enterPass: false,
  //     confPass: false,
  //   });

  const [phoneNumberError, setPhoneNumberError] = useState("");
  //   const [passwordError, setPassWordError] = useState("");
  const [progressStatus, setProgressStatus] = useState("");

  const [updateProfileObj, setUpdateObj] = useState({
    fullName: "",
    contact: "",
    email: "",
    image: "",
    imageSrc: "",
    // password: "",
    // confirmPassword: "",
    // accessptTermsAndCondition: "",
  });

  const handleChnage = (e) => {
    console.log(e.target.value, e.target.name);

    const { name, value } = e.target;

    // If the input is not a number or is longer than 10 characters, do not update state
    if (!isNaN(value) && value.length <= 10) {
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

    // if (name === "confirmPassword" && updateProfileObj.password === value) {
    //   setPassWordError("");
    // }
  };

  //response after sucessfully register user
  //   {
  //     "data": {
  //         "success": true,
  //         "message": "User created successfully",
  //         "data": {
  //             "name": "mansoor",
  //             "email": "khanman100698soor@gmail.com",
  //             "password": "$2b$10$qjFNI/SVIui4VS8Cr3.IjOEuavoffVMA1b9CoQL11nGVfOCYvQiFO",
  //             "mobile": "8828787878",
  //             "isVerified": false,
  //             "otp": "323365",
  //             "role": "admin",
  //             "_id": "6676a89a3a51f8ebba4bed69",
  //             "registrationDate": "2024-06-22T10:34:02.554Z",
  //             "__v": 0
  //         }
  //     }
  // }

  const mutation = useMutation({
    mutationFn: async (data) => {
      toast.loading("Creating account");
      try {
        const response = await apiRequest({
          url: "/api/admin/update-profile",
          method: "put",
          data,
        });

        // Assuming apiRequest returns an object with `data`, `status`, etc.
        return response; // Wrap response.data in ApiResponse structure
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during Update"); // Handle specific errors if needed
      }
    },
    onSuccess: (data) => {
      console.log("Update Profile successful:", data);
      toast.dismiss();
      console.log(data);
      toast.success(`${data?.data?.message}`);
      navigate("/");
      // Handle success (e.g., redirect to dashboard)
    },
    onError: (error: ApiError) => {
      console.error("Update Profile error:", error);
      console.log("Update Profile error:", error);
      toast.dismiss();
      toast.error(`${error}`);
      // Handle error (e.g., show error message)
    },
  });

  const handleSumbit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      //   updateProfileObj.confirmPassword !== updateProfileObj.password &&
      updateProfileObj.contact.length !== 10
    ) {
      //   setPassWordError("Passwords do not match");
      setPhoneNumberError("Phone number must be 10 digits");
      return;
    }

    // if (updateProfileObj.confirmPassword !== updateProfileObj.password) {
    //   setPassWordError("Password not Match");
    //   return;
    // }

    if (updateProfileObj.contact.length !== 10) {
      setPhoneNumberError("Phone number must be 10 digits");
      return;
    }
    // Handle form submission here if the phone number is exactly 10 digits
    console.log("Submitting form with phone number:", updateProfileObj);

    const finalObject = {
      name: updateProfileObj.fullName,
      //   password: updateProfileObj.password,
      image: updateProfileObj.image,
      //   email: updateProfileObj.email,
      mobile: updateProfileObj.contact,
    };

    mutation.mutate(finalObject);
    console.log(finalObject);

    setPhoneNumberError("");
    // setPassWordError("");
    setUpdateObj({
      fullName: "",
      contact: "",
      email: "",
      image: "",
      imageSrc: "",
      //   password: "",
      //   confirmPassword: "",
      //   accessptTermsAndCondition: "",
    });
  };

  const handleImageChange = async (event: React.ChangeEvent) => {
    // const selectedFile = event.target.files[0];

    const selectedFile = event.target?.files?.[0];

    if (selectedFile) {
      const imageUrl = await uploadImage(
        event.target.files[0].name,

        event.target.files[0],
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
                // onBlur={() => setPhoneNumberError("")}
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
                // errorMessage={phoneNumberError}
                // max={10}
                required
                className="w-full py-[6px]  transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              />
              {phoneNumberError && (
                <div className="pt-1 text-sm text-red-500 ">
                  {phoneNumberError} !
                </div>
              )}
            </div>

            {/* <div className="relative w-full">
              <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
              <input
                className="w-full px-8 py-[6px]  transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 bg-blue-50 pl-9 focus:border-blue-300"
                name="password"
                type={`${isVisible.enterPass ? "text" : "password"}`}
                placeholder="Enter Password"
                onChange={handleChnage}
                value={updateProfileObj.password}
                required
              />
              <button
                className="absolute text-gray-400 right-4 top-[10px]"
                role="button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default behavior of the button
                  setVisible((prev) => ({
                    ...prev,
                    enterPass: !prev.enterPass,
                  })); // Toggle password visibility
                }}
              >
                {isVisible.enterPass ? (
                  <FiEye className="w-5 h-5" />
                ) : (
                  <FiEyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="relative w-full">
              <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
              <input
                className="w-full px-8 py-[6px]  transition-all duration-200 border-2 text-green-800 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
                name="confirmPassword"
                type={`${isVisible.confPass ? "text" : "password"}`}
                placeholder="Confirm Password"
                onChange={handleChnage}
                value={updateProfileObj.confirmPassword}
                required
              />
              <button
                className="absolute text-gray-400 right-4 top-[10px]"
                role="button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default behavior of the button
                  setVisible((prev) => ({
                    ...prev,
                    confPass: !prev.confPass,
                  })); // Toggle password visibility
                }}
              >
                {isVisible.confPass ? (
                  <FiEye className="w-5 h-5" />
                ) : (
                  <FiEyeOff className="w-5 h-5" />
                )}
              </button>
              {passwordError && (
                <div className="pt-1 text-sm text-red-500 ">
                  {passwordError} !
                </div>
              )}
            </div> */}
            {/* <div className="relative w-full h-full">
              <input
                // value={userDetails?.image}
                type="file"
                name="image"
                onChange={handleImageChange}
                className={`px-2 py-[5px] ${
                  progressStatus ? "pb-2" : ""
                }  w-full text-sm  border border-gray-400  focus-within:border-sky-400 rounded-md placeholder:text-gray-500  outline-none`}
                placeholder="Image URL"
                required
              />
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
            </div> */}

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

            <div className="relative w-full">
              <FiMail className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
              <input
                type={"email"}
                required
                name={"email"}
                onChange={handleChnage}
                value={updateProfileObj.email}
                placeholder="Email"
                className="w-full py-[6px]  transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              />
            </div>
            {/* <div className="relative w-full">
              <FiGlobe className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
              <input
                label={"Country"}
                required
                name={"country"}
                onChange={handleChnage}
                value={updateProfileObj.country}
                placeholder="Country"
                className="w-full py-[6px]  transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              />
            </div> */}
          </div>
          {/* <div className="flex col-span-2 ">
            <input
              type="checkbox"
              className="items-start mx-2 cursor-pointer "
              name={"accessptTermsAndCondition"}
              onChange={handleChnage}
              checked={updateProfileObj.accessptTermsAndCondition}
            />
            <p className="text-sm font-montserrat">
              I have read and accept the terms of service and privacy policy.
            </p>
          </div> */}

          {/* <div className=""> */}
          <button className="col-span-2 px-4 py-2 mt-4 text-white bg-blue-400 border rounded-md disabled:bg-gray-600">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
