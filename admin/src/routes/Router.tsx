import React from "react";
import PrivateRoute from "./PrivateRoute";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import Products from "../pages/Products";
import ProductsForm from "../forms/ProductsForm";
import Category from "../pages/Category";
import Companies from "../pages/Companies";
import CompaniesProfile from "../pages/CompaniesProfile";
import CompaniesForm from "../forms/CompaniesForm";
import Tabel from "../pages/Tabel";
import CategoryProductForm from "../pages/CategoryProductForm";
import Authentication from "../pages/Authentication";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import RegisterAdmin from "../pages/RegisterAdmin";

const route = createBrowserRouter([
  {
    path: "/login",
    element: <Authentication />,
    children: [
      {
        path: "register",
        element: <RegisterAdmin />,
      },
      // {
      //   path: "verify-email",
      //   //   element: <EmailVerification />,
      // },
      // {
      //   path: "verify-phone",
      //   element: <PhoneVerification />,
      // },
      {
        path: "forgot-password",
        //   element: <ForgetPasswordByEmailLink />,
      },
      {
        path: "reset-password",
        element: <ForgetPassword />,
      },

      {
        path: "update-password",
        //   element: <ResetPassword />,
      },
      {
        path: "",
        element: <Login />,
      },
    ],
  },

  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { path: "/dashboard", element: <DashBoard /> },
      // { path: "/dashboard/form/:id", element: <UserDataUpdateForm /> },

      { path: "/products", element: <Products /> },
      { path: "/products/form", element: <ProductsForm /> },
      {
        path: "/category",
        element: <Category />,
      },
      { path: "/category/:id", element: <Tabel /> },
      //   { path: "/category/:id/form", element: <CategoryProductForm /> },

      { path: "/companies", element: <Companies /> },
      { path: "/companies/:id", element: <CompaniesProfile /> },
      { path: "/companies/companiesForm", element: <CompaniesForm /> },
      //   { path: "/orders", element: <Orders /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={route} />;
};

export default Router;
