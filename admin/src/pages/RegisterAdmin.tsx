import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import register from "../assets/Sign up.svg";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../types/apiType";
import {
  MutationObjectRegisterType,
  RegisterData,
  RegisterResponse,
  RegisterStateType,
  VisiblePassType,
} from "../types/authType";

import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";

const RegisterAdmin: React.FC = () => {
  const navigate = useNavigate();

  const [isVisible, setVisible] = useState<VisiblePassType>({
    enterPass: false,
    confPass: false,
  });

  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [passwordError, setPassWordError] = useState<string>("");

  const [registorObj, setRegistorObj] = useState<RegisterStateType>({
    fullName: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChnage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value, e.target.name);

    const { name, value } = e.target;

    // If the input is not a number or is longer than 10 characters, do not update state
    if (!isNaN(Number(value)) && value.length <= 10) {
      setRegistorObj((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // Reset error message
      setPhoneNumberError("");
    } else if (name !== "contact") {
      setRegistorObj((prev) => ({
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
    }

    if (name === "confirmPassword" && registorObj.password === value) {
      setPassWordError("");
    }
  };

  const mutation = useMutation<
    ApiResponse<RegisterResponse>,
    ApiError,
    MutationObjectRegisterType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Creating account");
      try {
        const response = await apiRequest<RegisterData, RegisterResponse>({
          url: path,
          method: method,
          data: data,
        });

        return response;
      } catch (error) {
        console.log(error);
        throw new Error("Error occurred during Register"); // Handle specific errors if needed
      }
    },
    onSuccess: (data: ApiResponse<RegisterResponse>) => {
      console.log("Register successful:", data);
      toast.dismiss();
      clearField();
      console.log(data);
      toast.success(`${data?.message}`);
      navigate("/login");
      // Handle success (e.g., redirect to dashboard)
    },
    onError: (error: ApiError) => {
      console.error("Register error:", error);
      console.log("Register error:", error);
      toast.dismiss();
      toast.error(`${error.message}`);
      // Handle error (e.g., show error message)
    },
  });

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      registorObj.confirmPassword !== registorObj.password &&
      registorObj.contact.length !== 10
    ) {
      setPassWordError("Passwords do not match");
      setPhoneNumberError("Phone number must be 10 digits");
      return;
    }

    if (registorObj.confirmPassword !== registorObj.password) {
      setPassWordError("Password not Match");
      return;
    }

    if (registorObj.contact.length !== 10) {
      setPhoneNumberError("Phone number must be 10 digits");
      return;
    }
    // Handle form submission here if the phone number is exactly 10 digits
    console.log("Submitting form with phone number:", registorObj);

    const finalObject: RegisterData = {
      name: registorObj.fullName,
      password: registorObj.password,
      email: registorObj.email,
      mobile: registorObj.contact,
      role: "admin",
    };

    mutation.mutate({
      path: "/api/admin/register",
      method: "post",
      data: finalObject,
    });
    console.log(finalObject);

    setPhoneNumberError("");
    setPassWordError("");
  };

  const clearField = () => {
    setRegistorObj({
      fullName: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img src={register} alt="login image" className="w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen px-4 mx-auto md:w-[70%] lg:w-[50%]">
        <div className="w-full mb-2 lg:pl-6 md:mb-4">
          <h4 className="text-[24px] md:text-3xl lg:text-4xl font-bold pb-1 text-gray-600">
            Create Your Account
          </h4>
          <p className="text-sm font-medium text-gray-500 sm:text-base">
            Join our community today and unlock exclusive benefits!
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
                value={registorObj.fullName}
              />
            </div>
            <div className="relative w-full">
              <FiPhone className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
              <input
                type="tel"
                name={"contact"}
                placeholder="Contact Number"
                onChange={handleChnage}
                value={registorObj.contact}
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

            <div className="relative w-full">
              <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
              <input
                className="w-full px-8 py-[6px]  transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 bg-blue-50 pl-9 focus:border-blue-300"
                name="password"
                type={`${isVisible.enterPass ? "text" : "password"}`}
                placeholder="Enter Password"
                onChange={handleChnage}
                value={registorObj.password}
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
                value={registorObj.confirmPassword}
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
            </div>

            <div className="relative w-full">
              <FiMail className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
              <input
                type={"email"}
                required
                name={"email"}
                onChange={handleChnage}
                value={registorObj.email}
                placeholder="Email"
                className="w-full py-[6px]  transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              />
            </div>
          </div>

          {/* <div className=""> */}
          <button className="col-span-2 px-4 py-2 mt-4 text-white bg-blue-400 border rounded-md disabled:bg-gray-600">
            Register
          </button>
          <div className="w-full col-span-2 mt-2 text-sm text-center">
            <span className="text-gray-700">Don't have account ?</span>
            <Link
              to="/login"
              className="ml-2 text-blue-400 font-semibold border-b border-transparent   hover:text-blue-600 transition-all duration-500  w-[fit-content]"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterAdmin;
