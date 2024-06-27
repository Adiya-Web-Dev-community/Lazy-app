/* eslint-disable no-unused-vars */
import { useState } from "react";

import loginImg from "../assets/Login.svg";

import { Link, useNavigate } from "react-router-dom";

// import { IoMdArrowRoundBack } from "react-icons/io";

// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";
// import { useCreateMutation, useResetMutation } from "../service/admin";
// import { toast } from "react-toastify";
// import { setUserToken } from "../store/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../types/apiType";

import { apiRequest } from "../api/adminApi";
import { LoginData, LoginResponse, LoginResponseData } from "../types/authType";

const Login = () => {
  const [loginObj, setLoginObj] = useState({
    email: "",
    password: "",
  });

  const [isVisible, setVisible] = useState(false);

  const navigate = useNavigate();

  //data fro login response
  //   {
  //     "data": {
  //         "success": true,
  //         "message": "Signin Successful",
  //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2YjIwMzNhNTFmOGViYmE0YmVkNzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTA1NTQ3NiwiZXhwIjoxNzE5MTQxODc2fQ.20_zhN1ypc97Io8e8NyrWsMSRHZN_NamWZ6TJZE2DmM",
  //         "role": "user"
  //     }
  // }

  const mutation = useMutation<ApiResponse<LoginResponse>, ApiError, LoginData>(
    {
      mutationFn: async (data) => {
        toast.loading("Checking Details");
        try {
          const response = await apiRequest<LoginResponse>({
            url: "user/signin-admin",
            method: "post",
            data,
          });

          console.log(response);
          //if response is sucess
          if (response?.data?.success) {
            localStorage.setItem("admin", response.data?.token);
          }
          return { data: response.data }; // Wrap response.data in ApiResponse structure
        } catch (error) {
          console.log(error);
          throw new Error("Error occurred during login"); // Handle specific errors if needed
        }
      },
      onSuccess: (data: ApiResponse<LoginResponse>) => {
        console.log("Login successful:", data);

        toast.dismiss();
        toast.success(`Login successful`);

        // Handle success (e.g., redirect to dashboard)
        navigate("/");
      },
      onError: (error: ApiError) => {
        console.error("Login error:", error);
        console.log("Login error:", error);
        toast.dismiss();
        toast.error(`${error}`);

        // Handle error (e.g., show error message)
      },
    }
  );

  const handleChange = (e) => {
    setLoginObj((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login ID:", loginObj.email);
    console.log("Password:", loginObj.password);
    // mutation.mutate(userDetails);

    mutation.mutate(loginObj);

    setLoginObj({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img src={loginImg} alt="login image" className="w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-4 mx-auto  w-[100%]  sm:w-[80%] md:w-[50%]  lg:w-[40%]">
        <div className="">
          <h4 className="text-[24px] md:text-3xl lg:text-4xl font-bold pb-2 text-gray-600">
            Log in to your Account
          </h4>
          <p className="text-sm font-medium text-gray-600 sm:text-base">
            Welcome back! Please Login to continue
          </p>
        </div>
        <form
          className="flex flex-col items-center justify-center w-full py-4 lg:p-8"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <FiUser className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full py-[6px] mb-4 transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              onChange={handleChange}
              value={loginObj.email}
              name="email"
              type="email"
              required
              placeholder="Email"
            />
          </div>
          <div className="relative w-full mb-4 lg:mb-6">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px]  bg-blue-50 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
              onChange={handleChange}
              value={loginObj.password}
              name="password"
              type={`${isVisible ? "text" : "password"}`}
              required
              placeholder="Password"
            />
            <button
              className="absolute text-gray-400 right-4 top-[10px]"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                setVisible((prev) => !prev);
              }}
            >
              {isVisible ? (
                <FiEye className="w-5 h-5 text-blue-400" />
              ) : (
                <FiEyeOff className="w-5 h-5 " />
              )}
            </button>
          </div>

          <div className="grid w-full pb-2">
            <p className="flex flex-col pb-4 lg:pb-8 justify-self-end">
              <Link
                to="/login/reset-password"
                className="text-blue-400 text-sm border-b border-transparent hover:border-blue-500 hover:text-blue-600 transition-all duration-500  w-[fit-content]"
              >
                Forgot Your Password ?
              </Link>
            </p>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-400 border rounded-md disabled:bg-gray-600 hover:bg-sky-400"
            >
              Login
            </button>
          </div>
          <div className="mt-2 text-sm ">
            <span className="text-gray-700">Don't have account ?</span>
            <Link
              to={"/login/register"}
              className="ml-2 text-blue-400  border-b border-transparent   hover:text-blue-600 transition-all duration-500  w-[fit-content]"
            >
              Create a Account
            </Link>
          </div>
        </form>
      </div>
    </>
    // </section>
  );
};

export default Login;
