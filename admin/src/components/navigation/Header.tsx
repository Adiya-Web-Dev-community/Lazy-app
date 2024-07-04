// Header.js
import React, { useState } from "react";
import { RxCross1, RxHamburgerMenu, RxUpdate } from "react-icons/rx";
import logo from "../../assets/Fudy.png";
import { MdFastfood, MdOutlineNotifications } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router";
import { GiBatMask } from "react-icons/gi";
import { BiLogOutCircle } from "react-icons/bi";
import { apiRequest } from "../../api/adminApi";
import { useQuery } from "@tanstack/react-query";
import LogOutModal from "../modal/LogoutModal";

const Header = ({ onToggleSidebarSmall, isOpen }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [isLogout, setLogoutModal] = useState(false);

  const profilePannelHanlder = () => {
    setShowProfile((prev) => !prev);
  };

  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["updateProfile"],
    queryFn: async () => {
      return await apiRequest({
        url: "api/admin/get-myself",
        method: "get",
      });
    },
  });

  const adminProfile = data?.data?.data;
  console.log(adminProfile, "profile");

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
    setLogoutModal(true);
    // localStorage.removeItem("admin");
    // navigate("/login");
  };

  const handleUpdatePassword = () => {
    navigate("/login/update-password");
  };
  const handleUpdateProfile = () => {
    navigate("/login/update-profile");
  };

  const getDateString = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-Us", { month: "long" });
    return `${day} ${month}`;
  };

  const getTimeString = (date) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-Us", options).format(date);
  };

  const date = new Date();

  const time = getTimeString(date);
  const dateMonth = getDateString(date);
  console.log(time, dateMonth);

  const cancelLogout = () => {
    setLogoutModal(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <>
      {isLogout && (
        <LogOutModal onClose={cancelLogout} onConfirm={confirmLogout} />
      )}
      <header
        className={`fixed top-0 flex items-center justify-between bg-black w-full  ${
          // !isOpen.large ? "lg:w-[calc(100%-15.4rem)]" : "lg:w-[calc(100%-5.4rem)]"
          !isOpen.large
            ? "md:w-[calc(100vw-15.4rem)]"
            : "lg:w-[calc(100%-5.4rem)]"
        } h-20  text-white z-10`}
      >
        <div className="grid w-full h-full grid-cols-2 mx-4 text-white border-b border-[#1E3F4A] md:grid-cols-1 md:mr-6 md:mx-0 ">
          {/* <nav className="flex h-full mx-4 text-gray-600 bg-white rounded-md shadow-sm md:mx-0 md:mr-4 font-montserrat"> */}
          <div className="flex items-center h-full gap-2 px-2 md:hidden">
            <button
              onClick={onToggleSidebarSmall}
              className="flex items-center"
            >
              {!isOpen.small ? (
                <RxHamburgerMenu className="w-6 h-5 text-gray-600" />
              ) : (
                <RxCross1 className="w-6 h-6 text-gray-600" />
              )}
            </button>
            {/* <img
            src={logo}
            alt="Logo"
            // className={`w-[10rem] ${isOpen ? "hidden" : ""}`}
            className={`w-[1.6rem] py-2`}
          /> */}
            <p className="flex items-center pb-1 text-2xl font-semibold text-gray-600">
              Laz<span className="text-emerald-500">y</span>{" "}
              <GiBatMask className="text-emerald-600" />{" "}
              <span className="text-emerald-700">B</span>at
            </p>
          </div>
          <div className="md:w-1/2 lg:w-[30%]  items-center justify-self-end flex gap-4 lg:gap-8 justify-end  relative">
            {/* clock */}
            <div className="flex items-center justify-start md:w-1/2 font-bold text-[#DEE1E2] font-lato">
              {/* time */}
              <div className="pr-2 text-xs border-r md:text-sm">{time}</div>
              {/* date and month */}
              <div className="pl-2 text-xs md:text-sm ">{dateMonth}</div>
            </div>
            {/* user Profile */}
            <div
              className={`flex items-center md:w-1/2 gap-4 p-1  cursor-pointer rounded-md z-4  ${
                //   showProfile ? "bg-[#224855]  " : ""
                showProfile ? "bg-[#252525]  " : ""
              }`}
              onClick={profilePannelHanlder}
              // style={{ width: "178px" }}
            >
              {/* <img src="" alt=""/> */}
              <div
                className={`flex items-center justify-center p-1   rounded-md bg-[#1E3F4A]`}
              >
                {adminProfile ? (
                  <img
                    src={adminProfile.image}
                    alt="admin profile image"
                    className="w-8 h-8"
                  />
                ) : (
                  <FaUserCog className={` cursor-pointer w-8 h-8   `} />
                )}
              </div>
              <div className="font-semibold text-[#DEE1E2]">
                <p className="">
                  {adminProfile ? adminProfile.name : "Jacobe Jones"}
                </p>
                <p className="text-xs ">Admin</p>
              </div>
            </div>
            {showProfile && (
              <div
                className="absolute right-0  top-[3.7rem] z-[53]"
                // style={{ width: "170px" }}
              >
                <div className="w-[170px] md:w-[174.5px] py-2 relative z-50 bg-[#252525] rounded-bl-md rounded-br-md shadow-lg">
                  <button
                    className="w-full flex items-center px-4  pt-2 pb-2 text-sm font-bold text-[#DEE1E2] border-y border-[#1E3F4A]  hover:text-gray-400 "
                    onClick={handleLogout}
                  >
                    <BiLogOutCircle className="w-5 h-5 " />
                    <span className="pl-2 text-xs md:text-sm">Logout</span>
                  </button>
                  {/* <button
                  className="w-full flex items-center px-4  pt-2 pb-2 text-sm font-bold text-[#DEE1E2] hover:text-gray-400"
                  onClick={handleUpdatePassword}
                >
                  <RxUpdate className="w-5 h-5 " />
                  <span className="pl-2 text-xs md:text-sm">
                    Update Password
                  </span>
                </button> */}
                  <button
                    className="w-full flex items-center px-4  pt-2 pb-2 border-t border-[#1E3F4A]  text-sm font-bold text-[#DEE1E2] hover:text-gray-400"
                    onClick={handleUpdateProfile}
                  >
                    <FaUserCog className="w-5 h-5 " />
                    <span className="pl-2 text-xs md:text-sm">
                      Update Profile
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* </nav> */}
          {/* <img
            src={logoFirstWord}
            alt="Logo"
            className={` ${isOpen ? "" : "hidden"}`}
          /> */}
        </div>
      </header>
    </>
  );
};

export default Header;
