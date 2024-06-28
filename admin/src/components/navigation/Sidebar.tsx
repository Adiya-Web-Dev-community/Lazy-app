/* eslint-disable react/prop-types */
// Sidebar.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Fudy.png";
import logoFirstWord from "../../assets/logo_single_word.svg";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import {
  MdFastfood,
  MdOutlineCategory,
  MdOutlineEqualizer,
  MdOutlineFoodBank,
  MdRestaurant,
} from "react-icons/md";
import { BsBarChart } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { BiDish } from "react-icons/bi";
import {
  RiArrowDropDownLine,
  RiBuilding2Line,
  RiRestaurantLine,
} from "react-icons/ri";
import { GrRestaurant } from "react-icons/gr";
import {
  FaBox,
  FaBoxesStacked,
  FaBuilding,
  FaCartFlatbed,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { ApiError, ApiResponse } from "../../types/apiType";
import { CategoryResponseData } from "../../types/contentType";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../api/userApi";
import { GiBatMask } from "react-icons/gi";
import { AiOutlineProduct } from "react-icons/ai";

const SideBar = ({ isOpen, onToggleSidebarLarge, onToggleSidebarSmall }) => {
  const [isCategory, setSidebarOpen] = useState(false);

  const handlingCategory = () => {
    setSidebarOpen((prev) => !prev);
  };

  //   const categoryData = useSelector((state) => state.category.categoryData);

  //   const { isPending, isError, data, error } = useQuery<
  //     ApiResponse<CategoryResponseData>,
  //     ApiError
  //   >({
  //     queryKey: ["categories"],
  //     queryFn: async () => {
  //       return await apiRequest<CategoryResponseData>({
  //         url: "/categories",
  //         method: "get",
  //       });
  //     },
  //   });

  // if (isPending) {
  //   return <span>Loading...</span>;
  // }

  //   if (isError) {
  //     return <span>Error: {error.message}</span>;
  //   }

  //   const categoryDataByApi = data?.data?.data;

  return (
    // <section className={` h-screen w-64   ${isOpen ? "block" : "hidden"}`}>
    <section
      className={` h-screen  ${
        isOpen.small
          ? "fixed inset-0 bg-black/20 flex  z-30 "
          : ` md:inline-block hidden pr-4 transition-all duration-500 ${
              isOpen.large ? "w-24" : "w-64"
            }`
      }  transition-all duration-500   `}
    >
      <section
        className={`
    cursor-pointer h-full bg-[#1A1A1A] shadow-md overflow-clip   ${
      isOpen.small ? "w-full sm:w-64" : ""
    }`}
      >
        <div
          className={` ${
            isOpen.large ? "justify-center" : isOpen.small ? "" : "pl-6"
          } flex w-full gap-2 px-3  pt-6 `}
        >
          <button
            onClick={onToggleSidebarLarge}
            className={`${isOpen.small ? "hidden" : ""}`}
          >
            {!isOpen.large ? (
              <RxHamburgerMenu className="w-6 h-6 text-gray-400" />
            ) : (
              <RxCross1 className="w-6 h-6 text-gray-400" />
            )}
          </button>
          {/* <div className={`w-full ml-12 ${isOpen.large ? "hidden" : ""}`}> */}
          <div className={`w-full ml-4 ${isOpen.large ? "hidden" : ""}`}>
            {/* <img
              src={logo}
              alt="Logo"
              className={`w-[2rem] ${isOpen.large ? "hidden" : ""}`}
              // className={`w-[10rem] `}
            /> */}

            <p className="flex items-center text-2xl font-semibold text-gray-600 font-montserrat">
              Laz<span className="text-emerald-500">y</span>{" "}
              <GiBatMask className="text-emerald-600" />{" "}
              <span className="text-emerald-700">B</span>at
            </p>
          </div>
          {/* <img
            src={logoFirstWord}
            alt="Logo"
            className={` ${isOpen ? "" : "hidden"}`}
          /> */}
        </div>

        <div
          className={`w-full h-[calc(100vh-6rem)] mt-2 ${
            isOpen.large ? "p-4" : "  p-2 pt-4 pl-4 "
          }  overflow-y-auto  [&::-webkit-scrollbar]:hidden `}
        >
          {/* <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                isActive
                  ? "bg-sky-400 text-white font-semibold"
                  : "hover:bg-sky-200 hover:text-black text-gray-400"
              }`
            }
            // onClick={() => handleDispatch()}
          >
            <LuUsers2 className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Users
            </span>
          </NavLink> */}
          <NavLink
            to={"/products"}
            className={({ isActive }) =>
              ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                isActive
                  ? "bg-gradient-to-r from-emerald-800 text-white font-semibold"
                  : "hover:from-emerald-700 hover:bg-gradient-to-r  hover:text-white text-gray-400"
              }`
            }
            // onClick={() => handleDispatch()}
          >
            <AiOutlineProduct className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Products
            </span>
          </NavLink>
          {/* <div
            className={` relative group rounded-md flex flex-col justify-center  font-medium 
                      `}
          > */}
          <NavLink
            to={"/category"}
            className={({ isActive }) =>
              ` relative group rounded-md flex  font-medium items-center
                      ${
                        isOpen.large ? "m-0 p-1 justify-center" : "m-1 p-2 "
                      } h-[2.7rem]   ${
                isActive
                  ? "bg-gradient-to-r from-emerald-800 text-white font-semibold"
                  : "hover:from-emerald-700 hover:bg-gradient-to-r  hover:text-white text-gray-400"
              }`
            }
            onClick={handlingCategory}
          >
            {/* <div className="flex items-center"> */}
            <MdOutlineCategory className="w-6 h-6" />
            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Category
            </span>
            {/* </div> */}
            {/* <RiArrowDropDownLine
                className={`${
                  isCategory ? "rotate-180" : ""
                } transition-all duration-300 w-6 h-6`}
              /> */}
          </NavLink>
          {/* </div> */}
          <NavLink
            to={"/companies"}
            className={({ isActive }) =>
              ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                isActive
                  ? " bg-gradient-to-r from-emerald-800 text-white font-semibold"
                  : "hover:from-emerald-700 hover:bg-gradient-to-r  hover:text-white text-gray-400"
              }`
            }
            // onClick={() => handleDispatch()}
          >
            <RiBuilding2Line className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Company
            </span>
          </NavLink>
          {/* <NavLink
            to={"/orders"}
            className={({ isActive }) =>
              ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                isActive
                  ? "bg-emerald-500 text-white font-semibold"
                  : "hover:bg-emerald-700 hover:text-white text-gray-400"
              }`
            }
            // onClick={() => handleDispatch()}
          >
            <FaCartFlatbed className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Orders
            </span>
          </NavLink> */}
        </div>
      </section>
      <button
        onClick={onToggleSidebarSmall}
        className={`absolute top-6 right-4 text-gray-400 ${
          isOpen.small ? "" : "hidden"
        }`}
      >
        <RxCross1 className="w-6 h-6 " />
      </button>
    </section>
  );
};

export default SideBar;