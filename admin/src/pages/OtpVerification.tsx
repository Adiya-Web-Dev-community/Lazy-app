import React, { useState, useRef } from "react";
// import { useVerifyOtpMutation } from "../../services/post";
import forgetImg from "../assets/Secure login.svg";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect } from "react";
import { useVerifyOtpMutation } from "../service/admin";
import { FiMail } from "react-icons/fi";
import { BiMessageDots } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import {
  OtpData,
  OtpVerificationData,
  OtpVerificationResponse,
} from "../types/authType";
import { ApiError, ApiResponse } from "../types/apiType";

import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";

const OtpVerification = () => {
  const [userOtp, setUserDetails] = useState({
    email: "",
    otp: 0,
  });

  //data for email varification
  //   {
  //     "data": {
  //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2YTg5YTNhNTFmOGViYmE0YmVkNjkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTkwNTM0MDYsImV4cCI6MTcxOTEzOTgwNn0.9Pp4a9fo_igpoSgApKs3A-4XfcrT6Db1EKJGtimJM2E",
  //         "success": true,
  //         "message": "Email verified successfully"
  //     }
  // }

  const mutation = useMutation<
    ApiResponse<OtpVerificationResponse>,
    ApiError,
    OtpVerificationData
  >({
    mutationFn: async (data) => {
      toast.loading("Checking OTP");
      try {
        const response = await apiRequest<OtpVerificationResponse>({
          url: "user/verify-otp",
          method: "put",
          data,
        });

        // Assuming apiRequest returns an object with `data`, `status`, etc.
        return { data: response.data }; // Wrap response.data in ApiResponse structure
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during login"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: ApiResponse<OtpVerificationResponse>) => {
      console.log("Let's Sign In:", data);
      toast.dismiss();
      toast.success(`Let's Sign In`);
      navigate("/login");
      // Handle success (e.g., redirect to dashboard)
    },
    onError: (error: ApiError) => {
      console.error("check", error);
      console.log("check:", error);
      toast.dismiss();
      toast.error(`Check OTP and Email`);
      // Handle error (e.g., show error message)
    },
  });

  const navigate = useNavigate();

  const handlingUserDetails = (e) => {
    const { value, id, name } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    mutation.mutate(userOtp);
    console.log(userOtp);
  };

  return (
    // <section className="flex md:px-4 max-w-[1200px] mx-auto font-lato">
    //   <Link
    //     to={"/"}
    //     className="fixed top-0 flex items-center gap-1 pt-4  group right-[58px]"
    //   >
    //     <span className="group-hover:text-rose-600">Back to home</span>
    //     <IoMdArrowRoundBack className="transition-all duration-700 rotate-180 group-hover:translate-x-1 group-hover:text-rose-600" />
    //   </Link>
    //  </section>
    <>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img src={forgetImg} alt="Email otp image" className="w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-6 mx-auto md:w-1/2">
        <div className="w-full ">
          <h4 className="text-[24px] md:text-3xl lg:text-4xl font-bold text-gray-600">
            Received OTP on Email!
          </h4>
          <p className="pt-1 text-gray-600 md:pt-2">
            Please put OTP Which received on email!
          </p>
        </div>
        <form onSubmit={handleVerifyOTP} className="w-full">
          <div className="flex flex-col items-center justify-center py-8 ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative w-full mt-1">
                <FiMail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
                <input
                  className="w-full py-2 transition-all duration-200 border-2 rounded-md outline-none pl-9 placeholder:text-gray-400 focus:border-blue-300"
                  id="email"
                  type="email"
                  placeholder="Enter your e-mail"
                  name="email"
                  value={userOtp?.email}
                  onChange={handlingUserDetails}
                  required
                />
              </div>
              <div className="relative w-full mt-1">
                <BiMessageDots className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 top-1/2 left-2" />
                <input
                  className="w-full py-2 transition-all duration-200 border-2 rounded-md outline-none pl-9 placeholder:text-gray-400 focus:border-blue-300"
                  type="number"
                  id="otp"
                  name="otp"
                  placeholder="Enter your OTP"
                  value={userOtp?.otp || ""}
                  onChange={handlingUserDetails}
                  required
                />
              </div>
            </div>
            <button
              className="w-full px-4 py-2 mt-6 text-white bg-blue-400 rounded focus:outline-none"
              // onClick={() => alert(`Entered OTP: ${otp.join("")}`)}
              type="submit"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OtpVerification;
