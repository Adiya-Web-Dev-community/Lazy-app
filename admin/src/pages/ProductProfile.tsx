import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { MdAdd } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";

import ConfirmationDialog from "../components/modal/ConfirmationDialog";
import { ApiError, ApiGetResponse } from "../types/apiType";
import { ProductData } from "../types/contentType";
import { apiGetRequest } from "../api/adminGetApi";

const ProductProfile: React.FC = () => {
  const { id } = useParams();

  const [activeTab, setActivetab] = useState<string>("info");

  const { data } = useQuery<ApiGetResponse<ProductData>, ApiError>({
    queryKey: ["single_product"],
    queryFn: async () => {
      return await apiGetRequest<ProductData>({
        url: `api/product/${id}`,
      });
    },
  });

  const [dialogCrendial, setDialogCrendial] = useState({
    targetUrl: "",
    showDialog: false,
  });

  console.log(data, "from profile");
  const singleProduct = data?.data;

  const tabHandler = (tabValue: string) => {
    setActivetab(tabValue);
  };

  const navigate = useNavigate();

  const handleFeature = () => {
    // navigate(`/products/${id}/feature/form`);
    navigate(`/products/form/${id}`);
  };

  const handleLinkClick = (url: string) => {
    setDialogCrendial((prev) => ({
      ...prev,
      targetUrl: url,
      showDialog: true,
    }));
  };

  const handleCloseDialog = () => {
    setDialogCrendial((prev) => ({
      ...prev,
      targetUrl: "",
      showDialog: false,
    }));
  };

  const handleConfirmRedirect = () => {
    window.open(dialogCrendial.targetUrl, "_blank");
    handleCloseDialog();
  };
  return (
    <React.Fragment>
      {dialogCrendial.showDialog && (
        <ConfirmationDialog
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRedirect}
        />
      )}

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
                <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                  {singleProduct?.images?.length !== 0 ? (
                    <div className="flex items-center justify-center w-full gap-4">
                      {singleProduct?.images?.map((img, i) => (
                        <img
                          key={img}
                          src={img}
                          alt={`product image ${i}`}
                          className="object-cover w-40 h-40 rounded-md "
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="">No Images</p>
                  )}
                </div>

                <div className="flex items-center gap-3 text-lg">
                  <span className="text-base font-semibold text-gray-500">
                    Product Name
                  </span>
                  <span className="font-bold">{singleProduct?.name}</span>
                </div>
                <div className="flex items-center gap-3 text-lg ">
                  <span className="text-base font-semibold text-gray-500">
                    Companies
                  </span>
                  <div className="font-bold">
                    {singleProduct?.company?.length !== 0 ? (
                      <div className="flex items-center gap-2">
                        {singleProduct?.company?.map((icon) => (
                          <img
                            key={icon?.image}
                            src={icon?.image}
                            alt={`${icon?.name}`}
                            className="w-10 h-10 rounded-full"
                          />
                        ))}
                      </div>
                    ) : (
                      "----"
                    )}
                  </div>
                </div>
                <div className="flex gap-3 text-lg ">
                  <span className="text-base font-semibold text-gray-500">
                    Category
                  </span>
                  <span className="font-bold">{singleProduct?.category}</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-base font-semibold text-gray-500">
                    Product Link
                  </span>
                  {singleProduct?.productsLink?.length !== 0 ? (
                    <div className="flex items-center gap-2">
                      {singleProduct?.productsLink?.map((link, i) => (
                        <p
                          key={i}
                          className="text-blue-600 underline cursor-pointer"
                          onClick={() =>
                            link?.url && handleLinkClick(link?.url)
                          }
                        >
                          {link.company}
                        </p>
                      ))}
                    </div>
                  ) : (
                    "----"
                  )}
                </div>

                <div className="flex items-center gap-3 text-lg">
                  <span className="text-base font-semibold text-gray-500">
                    status
                  </span>
                  <span className="font-bold">{singleProduct?.status}</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <span className="text-base font-semibold text-gray-500">
                    Date Added
                  </span>

                  <span className="font-bold">
                    {singleProduct?.createdAt?.split("T")[0]}
                  </span>
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
                    <span className="mb-1">Edit Features</span>{" "}
                    <MdAdd className="w-5 h-5" />
                  </button>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: singleProduct?.feature || "",
                  }}
                  className="mb-2"
                />
                {/* <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              
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
              </div> */}
              </div>
            )}
          </section>
        </section>
      </section>
    </React.Fragment>
  );
};

export default ProductProfile;
