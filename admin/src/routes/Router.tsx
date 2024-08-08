import PrivateRoute from "./PrivateRoute";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Products from "../pages/Products";
import ProductsForm from "../forms/ProductsForm";
import Category from "../pages/Category";
import Companies from "../pages/Companies";

import CompaniesForm from "../forms/CompaniesForm";
import Tabel from "../pages/Tabel";

import Authentication from "../pages/Authentication";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import RegisterAdmin from "../pages/RegisterAdmin";

import ProductProfile from "../pages/ProductProfile";
import UpdateProfile from "../pages/UpdateProfile";
import VerifyEmailResetPass from "../pages/VerifyEmailResetPass";
import ProductUpdateForm from "../forms/ProductUpdateForm";
import Blog from "../pages/Blog";
import BlogForm from "../forms/BlogForm";
import BlogCategory from "../pages/BlogCategory";

const route = createBrowserRouter([
  {
    path: "/login",
    element: <Authentication />,
    children: [
      {
        path: "register",
        element: <RegisterAdmin />,
      },

      {
        path: "forgot-password",
        element: <VerifyEmailResetPass />,
      },
      {
        path: "reset-password",
        element: <ForgetPassword />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
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
      //product
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductProfile /> },
      { path: "/products/form", element: <ProductsForm /> },
      { path: "/products/form/:id", element: <ProductUpdateForm /> },
      // { path: "/products/:id/feature/form", element: <FeatureForm /> },

      // category
      {
        path: "/category",
        element: <Category />,
      },
      { path: "/category/:id", element: <Tabel /> },

      // companies
      { path: "/companies", element: <Companies /> },
      { path: "/companies/form", element: <CompaniesForm /> },

      // blog
      { path: "/blog", element: <Blog /> },
      { path: "/blog/form", element: <BlogForm /> },

      //blog-Category
      { path: "/blog-category", element: <BlogCategory /> },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={route} />;
};

export default Router;
