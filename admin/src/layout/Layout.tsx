// import React from "react";

// const Layout = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-screen text-4xl text-rose-600">
//       Let's Add admin panel here
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { setUserToken } from "../store/auth";
// import { useDispatch } from "react-redux";
// import { ToastContainer } from "react-toastify";

import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import SideBar from "../components/navigation/Sidebar";
import Header from "../components/navigation/Header";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState({
    large: false,
    small: false,
  });

  const navigate = useNavigate();

  const toggleSidebarLarge = () => {
    setSidebarOpen((prev) => ({
      ...prev,
      large: !prev.large,
    }));
  };
  const toggleSidebarSmall = () => {
    setSidebarOpen((prev) => ({
      ...prev,
      small: !prev.small,
    }));
  };

  // const dispatch = useDispatch();

  // const userKey = localStorage.getItem("authToken");

  // // const navigate = useNavigate();

  // //token pass to authSlice reducer
  // if (userKey) {
  //   dispatch(setUserToken(userKey));
  // }

  useEffect(() => {
    //token getting from localStorage

    if (location.pathname === "/") navigate("/products");
  }, [navigate]);

  return (
    <>
      <main className={`relative flex   min-h-screen bg-black`}>
        <ToastContainer />

        <SideBar
          isOpen={isSidebarOpen}
          onToggleSidebarLarge={toggleSidebarLarge}
          onToggleSidebarSmall={toggleSidebarSmall}
        />
        <div className="relative flex-1 overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          <Header
            onToggleSidebarSmall={toggleSidebarSmall}
            isOpen={isSidebarOpen}
          />
          <div className=" mt-16  h-[calc(100vh-5rem)] ">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
