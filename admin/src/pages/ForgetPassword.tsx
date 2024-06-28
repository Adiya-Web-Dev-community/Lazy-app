/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import forgetImg from "../assets/Forgot password.svg";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";
import { FiMail, FiUser } from "react-icons/fi";

import { setUserToken } from "../store/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../types/apiType";
import { ForgotPasswordData, ForgotPasswordResponse } from "../types/authType";
import { apiRequest } from "../api/adminApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  //reset passsword response data
  //   {
  //     "data": {
  //         "success": true,
  //         "message": "Reset password link sent to your email"
  //     }
  // }

  const mutation = useMutation<
    ApiResponse<ForgotPasswordResponse>,
    ApiError,
    ForgotPasswordData
  >({
    mutationFn: async (data) => {
      toast.loading("Checking Email");
      try {
        const response = await apiRequest<ForgotPasswordResponse>({
          url: "user/forgot-password",
          method: "post",
          data,
        });

        // Assuming apiRequest returns an object with `data`, `status`, etc.
        return { data: response.data }; // Wrap response.data in ApiResponse structure
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during login"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: ApiResponse<ForgotPasswordResponse>) => {
      console.log("successfully recived your email:", data);
      toast.dismiss();
      toast.success(`Check your Email`);
    },
    onError: (error: ApiError) => {
      // Handle error (e.g., show error message)
      console.error("Login error:", error);
      console.log("Login error:", error);
      toast.dismiss();
      toast.error("Please put correct Email");
    },
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalObj = {
      email: email,
    };
    mutation.mutate(finalObj);
    console.log(finalObj);

    setEmail("");
  };

  return (
    <>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img
          src={forgetImg}
          alt="forget password image"
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-6 mx-auto w-[100%] sm:w-[80%]  lg:w-[40%]">
        <div className="w-full">
          <h4 className="text-[24px] md:text-4xl font-bold text-gray-600">
            Reset Password!
          </h4>
          <p className="pt-1 text-sm text-gray-600 md:pt-2 md:text-base">
            Don't worry, we've got you covered!
          </p>
        </div>

        <form
          className="flex flex-col items-center justify-center w-full py-4 md:pr-8 "
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <FiMail className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full py-[6px] mb-4 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300 bg-blue-50"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center w-full ">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
