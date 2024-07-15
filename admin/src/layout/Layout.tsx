import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
