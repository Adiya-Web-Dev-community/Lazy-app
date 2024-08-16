// Sidebar.js

import { NavLink } from "react-router-dom";

import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCategory, MdOutlineReviews } from "react-icons/md";

import { RiBuilding2Line } from "react-icons/ri";

import { GiBatMask } from "react-icons/gi";
import { AiOutlineProduct } from "react-icons/ai";
import { SideBarPropsType } from "../../types/contentType";
import { BiLogoBlogger } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { TbIcons, TbMessageQuestion } from "react-icons/tb";

const SideBar: React.FC<SideBarPropsType> = ({
  isOpen,
  onToggleSidebarLarge,
  onToggleSidebarSmall,
}) => {
  return (
    <section
      className={` h-screen  ${
        isOpen.small
          ? "fixed inset-0 bg-black/70 flex  z-30 "
          : ` md:inline-block hidden pr-4 transition-all duration-500 ${
              isOpen.large ? "w-24" : "w-64"
            }`
      }  transition-all duration-500   cursor-pointer`}
    >
      <section
        className={`
    cursor-default h-full bg-[#1A1A1A] shadow-md overflow-clip   ${
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

          <div className={`w-full ml-4 ${isOpen.large ? "hidden" : ""}`}>
            <p className="flex items-center text-2xl font-semibold text-gray-600 font-montserrat">
              Laz<span className="text-emerald-500">y</span>{" "}
              <GiBatMask className="text-emerald-600" />{" "}
              <span className="text-emerald-700">B</span>at
            </p>
          </div>
        </div>

        <div
          className={`w-full h-[calc(100vh-6rem)] mt-2 ${
            isOpen.large ? "p-4" : "  p-2 pt-4 pl-4 "
          }  overflow-y-auto  [&::-webkit-scrollbar]:hidden `}
        >
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
          >
            <MdOutlineCategory className="w-6 h-6" />
            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Category
            </span>
          </NavLink>

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
          <NavLink
            to={"/blog-category"}
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
          >
            <MdOutlineCategory className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Blog-Category
            </span>
          </NavLink>
          <NavLink
            to={"/blog"}
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
          >
            <BiLogoBlogger className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Blog
            </span>
          </NavLink>
          <NavLink
            to={"/blog-review"}
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
          >
            <MdOutlineReviews className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Blog Review
            </span>
          </NavLink>
          <NavLink
            to={"/info-guide"}
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
          >
            <FaBook className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Info Guide
            </span>
          </NavLink>
          <NavLink
            to={"/faq"}
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
          >
            <TbMessageQuestion className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              FAQ
            </span>
          </NavLink>
          <NavLink
            to={"/proscons"}
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
          >
            <TbIcons className="w-6 h-6" />

            <span
              className={`mx-1 p-1  text-[15px] font-montserrat ${
                isOpen.large ? "hidden" : ""
              } `}
            >
              Pros & Cons
            </span>
          </NavLink>
        </div>
      </section>
      <button
        onClick={onToggleSidebarSmall}
        className={`absolute top-6 right-4 z-50 text-gray-200 ${
          isOpen.small ? "" : "hidden"
        }`}
      >
        <RxCross1 className="w-6 h-6 " />
      </button>
    </section>
  );
};

export default SideBar;
