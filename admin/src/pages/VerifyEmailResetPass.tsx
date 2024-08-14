import { useState } from "react";
import { useNavigate } from "react-router-dom";
import resetImg from "../assets/Reset password.svg";

import { FiEye, FiEyeOff, FiInbox, FiLock, FiUser } from "react-icons/fi";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import {
  CheckingPassProp,
  MutationObjectResetPassType,
  PassVisibleProp,
  ResetPassResponse,
  ResetPasswordData,
  StateResteProp,
} from "../types/authType";
import { ApiError, ApiResponse } from "../types/apiType";

const VerifyEmailResetPass: React.FC = () => {
  const [resetPassword, setResetPassword] = useState<StateResteProp>({
    newPassword: "",
    confirmPassword: "",
    otp: "",
    email: "",
  });

  const [passwordError, setPassWordError] = useState<CheckingPassProp>({
    confirmPasswordMsg: "",
  });

  const [isVisible, setVisible] = useState<PassVisibleProp>({
    oldPass: false,
    enterPass: false,
    confPass: false,
  });

  const navigate = useNavigate();

  const mutation = useMutation<
    ApiResponse<ResetPassResponse>,
    ApiError,
    MutationObjectResetPassType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Checking Details");
      try {
        const response = await apiRequest<ResetPasswordData, ResetPassResponse>(
          {
            url: path,
            method: method,
            data: data,
          }
        );

        // Assuming apiRequest returns an object with `data`, `status`, etc.
        return response; // Wrap response.data in ApiResponse structure
      } catch (error) {
        console.log(error);
        throw new Error("Failed to reset check details"); // Handle specific errors if needed
      }
    },
    onSuccess: (data) => {
      console.log("Password Successfully Change:", data);
      toast.dismiss();
      toast.success(`Password Successfully Change`);
      setTimeout(() => navigate("/login"), 1000);
      //   returnToHome();
      // Handle success (e.g., redirect to dashboard)
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error);
      console.log("Login error:", error);
      toast.dismiss();
      toast.error(`${error.message}`);
      // Handle error (e.g., show error message)
    },
  });

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const confirmPassword =
      e.target.name === "confirmPassword" && e.target.value;

    setResetPassword((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

    if (confirmPassword === resetPassword.newPassword) {
      setPassWordError((prev) => ({
        ...prev,
        confirmPasswordMsg: "",
      }));
    }

    if (resetPassword.otp.length === 6) {
      setPassWordError((prev) => ({
        ...prev,
        otpMessage: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (resetPassword.confirmPassword !== resetPassword.newPassword) {
      setPassWordError({
        confirmPasswordMsg: "Password does not match",
      });
      return;
    }

    if (resetPassword.otp.length !== 6) {
      setPassWordError((prev) => ({
        ...prev,
        otpMessage: "OTP is not correct",
      }));
    }

    const resetPasswordObj: ResetPasswordData = {
      newPassword: resetPassword.newPassword,
      otp: resetPassword.otp,
      email: resetPassword.email,
    };

    mutation.mutate({
      path: "api/admin/forgot/verifyotp",
      method: "post",
      data: resetPasswordObj,
    });
  };

  return (
    <>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img
          src={resetImg}
          alt="reset password image"
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-4 mx-auto w-[100%]  sm:w-[80%]  lg:w-[50%]">
        <div className="w-full lg:pl-8">
          <h4 className="text-[24px] md:text-3xl lg:text-4xl font-bold text-gray-600">
            Reset Password!
          </h4>
          <p className="text-gray-600 md:pt-2">Create a new password!</p>
        </div>

        <form
          className="flex flex-col items-center justify-center w-full py-4 lg:p-8"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <FiUser className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px] mb-4 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 bg-blue-50 focus:border-blue-300"
              name="email"
              type={"text"}
              placeholder="Enter Email"
              value={resetPassword.email}
              onChange={handleChangePassword}
              required
            />
          </div>

          <div className="relative w-full">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px] mb-4 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 bg-blue-50 focus:border-blue-300"
              name="newPassword"
              type={`${isVisible.enterPass ? "text" : "password"}`}
              placeholder="Enter new password"
              value={resetPassword.newPassword}
              onChange={handleChangePassword}
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
                <FiEye className="w-5 h-5 text-blue-400" />
              ) : (
                <FiEyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative w-full mb-4">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px]  transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              name="confirmPassword"
              type={`${isVisible.confPass ? "text" : "password"}`}
              placeholder="Confirm new password"
              value={resetPassword.confirmPassword}
              onChange={handleChangePassword}
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
                <FiEye className="w-5 h-5 text-blue-400" />
              ) : (
                <FiEyeOff className="w-5 h-5" />
              )}
            </button>
            {passwordError.confirmPasswordMsg && (
              <div className="pt-1 text-sm text-red-500 ">
                {passwordError.confirmPasswordMsg} !
              </div>
            )}
          </div>
          <div className="relative w-full mb-8">
            <FiInbox className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              type="number"
              name="otp"
              className="w-full px-8 py-[6px]  transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              value={resetPassword.otp}
              onChange={handleChangePassword}
              placeholder="Place OTP here "
            />
            {/* {passwordError?.otpMessage && (
              <div className="pt-1 text-sm text-red-500 ">
                {passwordError?.otpMessage} !
              </div>
            )} */}
          </div>

          <div className="flex items-center justify-between w-full">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-400 rounded hover:bg-blue-500 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyEmailResetPass;
