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
import BlogReview from "../pages/BlogReview";
import InfoGuide from "../pages/InfoGuide";
import EmailVerification from "../pages/EmailVerification";
import Faq from "../pages/Faq";
import FaqForm from "../forms/FaqForm";
import ProfileFaq from "../pages/ProfileFaq";
import ProsCons from "../pages/ProsCons";
import ProsConsForm from "../forms/ProsConsForm";
import PostCategory from "../pages/PostCategory";
import Transaction from "../pages/Transaction";
import TransactionForm from "../pages/TransactionForm";
import Claim from "../pages/Claim";
import ClaimHistory from "../pages/ClaimHistory";
import Users from "../pages/Users";
import UserClaim from "../pages/UserClaim";

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
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "reset-password",
        element: <ForgetPassword />,
      },
      {
        path: "",
        element: <Login />,
      },
      {
        path: "verify-email",
        element: <EmailVerification />,
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
      { path: "/blog/form/:id", element: <BlogForm /> },

      //blog-Category
      { path: "/blog-category", element: <BlogCategory /> },

      //blog-Review
      { path: "/blog-review", element: <BlogReview /> },

      // info-guide
      { path: "/info-guide", element: <InfoGuide /> },

      // faq
      { path: "/faq", element: <Faq /> },
      { path: "/faq/form", element: <FaqForm /> },
      { path: "/faq/form/:id", element: <FaqForm /> },
      { path: "/faq/:id", element: <ProfileFaq /> },

      //proscons
      { path: "/proscons", element: <ProsCons /> },
      { path: "/proscons/form", element: <ProsConsForm /> },
      { path: "/proscons/form/:id", element: <ProsConsForm /> },

      //Post-Category
      { path: "/post-category", element: <PostCategory /> },

      //transaction
      { path: "/transaction", element: <Transaction /> },
      { path: "/transaction/:id", element: <TransactionForm /> },

      //Claim
      { path: "/claim", element: <Claim /> },
      { path: "/claim/:id", element: <ClaimHistory /> },

      //Users
      { path: "/users", element: <Users /> },
      { path: "/users/:id", element: <UserClaim /> },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={route} />;
};

export default Router;
