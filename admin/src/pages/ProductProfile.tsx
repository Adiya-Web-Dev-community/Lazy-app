import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductProfile = () => {
  const productDetails = {
    productName: "Wireless Mouse",
    companyName: "ABC Corp",
    category: "Electronics",
    price: 25.99,
    stockQuantity: 150,
    // sku: "WM12345",
    status: "Active",
    dateAdded: "2024-01-15",
  };

  const { id } = useParams();

  const [activeTab, setActivetab] = useState("info");

  const tabHandler = (tabValue) => {
    setActivetab(tabValue);
  };

  const navigate = useNavigate();

  const handleFeature = () => {
    navigate(`/products/${id}/feature/form`);
  };
  return (
    <section
      className={`  md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
    >
      <section
        className={` md:p-8 p-6 h-full border-gray-200 
    rounded-md  font-philosopher max-w-full w-full shadow-md `}
      >
        <div className="flex items-center pb-3 md:pb-6 border-b-2 border-[#1A1A1A]">
          <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
            Product Profile
          </h1>
          <Link to={"/products"}>
            <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
          </Link>
        </div>

        <section
          className={`w-full overflow-auto  text-[#DEE1E2] pt-2 md:pt-6 [&::-webkit-scrollbar]:hidden rounded-lg   shadow-md `}
        >
          <div className="border-b-2 border-emerald-800">
            <button
              className={`px-4 py-2 mr-2 rounded-tl-md rounded-tr-md  ${
                activeTab === "info" && "bg-emerald-800"
              }`}
              onClick={() => tabHandler("info")}
            >
              Basic Info
            </button>
            <button
              className={`px-4 py-2 rounded-tl-md rounded-tr-md ${
                activeTab === "feature" && "bg-emerald-800"
              }`}
              onClick={() => tabHandler("feature")}
            >
              Features
            </button>
          </div>
          {activeTab === "info" && (
            <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="flex gap-3 text-lg">
                <span className="text-base font-semibold text-gray-500">
                  Product Name
                </span>
                <span className="font-bold">{productDetails.productName}</span>
              </div>
              <div className="flex gap-3 text-lg ">
                <span className="text-base font-semibold text-gray-500">
                  Company Name
                </span>
                <span className="font-bold">{productDetails.companyName}</span>
              </div>
              <div className="flex gap-3 text-lg ">
                <span className="text-base font-semibold text-gray-500">
                  Category
                </span>
                <span className="font-bold">{productDetails.category}</span>
              </div>
              <div className="flex gap-3 text-lg ">
                <span className="text-base font-semibold text-gray-500">
                  Stock Quantity
                </span>
                <span className="font-bold">
                  {productDetails.stockQuantity}
                </span>
              </div>
              <div className="flex gap-3 text-lg ">
                <span className="text-base font-semibold text-gray-500">
                  Price
                </span>
                <span className="font-bold">{productDetails.price}</span>
              </div>
              <div className="flex gap-3 text-lg ">
                <span className="text-base font-semibold text-gray-500">
                  status
                </span>
                <span className="font-bold">{productDetails.status}</span>
              </div>
              <div className="flex gap-3 text-lg ">
                <span className="text-base font-semibold text-gray-500">
                  Date Added
                </span>
                <span className="font-bold">{productDetails.dateAdded}</span>
              </div>
            </div>
          )}
          {activeTab === "feature" && (
            <div className="grid mt-8 ">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold ">Features</h2>
                <button
                  type="button"
                  onClick={handleFeature}
                  className="flex items-center gap-1 px-2 py-1 text-sm font-bold rounded bg-emerald-800 hover:bg-emerald-700 focus:outline-none focus:shadow-outline"
                >
                  <span className="mb-1">Features</span>{" "}
                  <MdAdd className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {/* category */}
                <div className="flex items-center col-span-1 gap-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
                  <h4 className="mb-2 text-xl font-semibold ">
                    Display Features
                  </h4>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      type="button"
                      //   onClick={() =>
                      //     handleRemoveFeature(categoryIndex, featureIndex)
                      //   }
                      className="px-2 py-1 text-sm font-bold rounded bg-rose-800 hover:bg-rose-700 focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
                      //   disabled={category.features.length === 1}
                    >
                      <MdOutlineDelete className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      //   onClick={() =>
                      //     handleRemoveFeature(categoryIndex, featureIndex)
                      //   }
                      className="px-2 py-1 text-sm font-bold rounded bg-emerald-800 hover:bg-emerald-700 focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
                      //   disabled={category.features.length === 1}
                    >
                      <MdOutlineEdit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-500">
                    Display Size
                  </span>
                  <span className="ml-2 font-bold">16.51 cm (6.5 inch)</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-500">
                    Resolution
                  </span>
                  <span className="ml-2 font-bold">1600 x 720 Pixels</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-500">
                    Resolution Type
                  </span>
                  <span className="ml-2 font-bold">HD+</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-500">
                    GPU
                  </span>
                  <span className="ml-2 font-bold">Adreno 619</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </section>
  );
};

export default ProductProfile;
