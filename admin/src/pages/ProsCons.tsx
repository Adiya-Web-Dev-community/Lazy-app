import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import {
  DeletElementData,
  ProductDeleteStateType,
  UniDelet,
} from "../types/contentType";
import { useProsCons } from "../api/querys";
import { ApiError, ApiResponse } from "../types/apiType";
import { apiRequest } from "../api/adminApi";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { IoIosSend } from "react-icons/io";
import ProsConsLoading from "../components/loading-elemnts/ProsConsLoading";
import Pagination from "../components/pagination/Pagination";

const ProsCons: React.FC = () => {
  const prosConsHeading = ["Title", "Pros", "Cons", "Actions"];

  const { isPending, data, refetch, isError } = useProsCons();

  const [isDeletModal, setDeletModal] = useState<ProductDeleteStateType>({
    delet: false,
    deletElementId: "",
  });

  const prosConsApiData = data?.data?.data;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProsCons = prosConsApiData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const mutation = useMutation<
    ApiResponse<DeletElementData>,
    ApiError,
    UniDelet
  >({
    mutationFn: async (deletObj) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<UniDelet, DeletElementData>({
          url: deletObj.path,
          method: "delete",
        });

        return response as ApiResponse<DeletElementData>;
      } catch (error) {
        console.log(error);
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },
    onSuccess: (data: ApiResponse<DeletElementData>) => {
      console.log(data);
      refetch();
      toast.dismiss();
      toast.success(`${data?.message}`);
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
    },
  });

  const deletHandler = (id: string) => {
    setDeletModal((prev) => ({
      ...prev,
      delet: true,
      deletElementId: id,
    }));
  };

  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/proscons/form/${id}`);
  };

  const closehandler = () => {
    setDeletModal((prev) => ({
      ...prev,
      delet: false,
      deletElementId: "",
    }));
  };

  const confirmhandler = () => {
    const deleteObj: UniDelet = {
      path: `/api/proscons/${isDeletModal?.deletElementId}`,
    };

    // Proceed with the deletion
    mutation.mutate(deleteObj);
  };

  const handlingProsCons = () => {
    navigate("/proscons/form");
  };

  return (
    <>
      {isDeletModal?.delet && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={confirmhandler} />
      )}

      <section
        className={`  md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={` md:p-8 p-6
    
  h-full
           border-gray-200 
      rounded-md  font-philosopher max-w-full w-full shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
              Pros & Cons
            </h1>
          </div>
          <div className="flex justify-between mb-4">
            <div className={`flex items-center   `}>
              <input
                type="search"
                placeholder={`Search`}
                className={` p-2 text-sm md:text-base  sm:px-4 py-1 border-[2px] border-transparent 
             bg-[#252525] focus:border-gray-800
          shadow-inner rounded-[0.26rem] outline-none `}
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                // onFocus={() => setCurrentPage(1)}
              />
            </div>
            <div className="relative flex items-center self-end ">
              <button
                className={` px-2 py-1 
                     bg-emerald-800  hover:bg-emerald-700 text-[#DEE1E2] font-semibold
                }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
                onClick={handlingProsCons}
              >
                <span className="hidden md:inline-block">Creat ProsCons</span>

                <IoIosSend className="w-6 h-6 md:hidden" />
              </button>
            </div>
          </div>

          <section
            className={`w-full overflow-auto  border-2  [&::-webkit-scrollbar]:hidden rounded-lg border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
          >
            <section className="grid gap-4 p-2 pb-2 min-w-[600px] font-medium  grid-cols-customeProsCons text-[#DEE1E2] md:font-semibold bg-[#1A1A1A]">
              <p className="pl-2 md:text-lg">SrNo.</p>

              {prosConsHeading.map((heading, index) => (
                <p
                  key={index}
                  className={`   md:text-lg ${
                    index !== 0 ? "justify-self-center" : "ml-6"
                  }`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </p>
              ))}
            </section>

            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[600px] bg-[#252525]">
              {isPending ? (
                <ProsConsLoading />
              ) : isError ? (
                <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-rose-600">
                  Check Internet connection or Contact to Admin
                </p>
              ) : (
                currentProsCons?.map((prosCons, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 text-[#DEE1E2] border-[#1A1A1A] grid-cols-customeProsCons group hover:bg-[#2c2c2c]"
                  >
                    <span>{i + 1}</span>
                    <span className="ml-2 text-sm font-semibold md:text-base">
                      {prosCons?.title}
                    </span>
                    <span className="ml-2 text-sm font-semibold md:text-base">
                      {prosCons?.pros.length !== 0 ? (
                        <ul className="h-full">
                          {prosCons.pros.map((pro, i) => (
                            <li className="text-gray-400 list-disc " key={i}>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "Add Pros"
                      )}
                    </span>
                    <span className="ml-2 text-sm font-semibold md:text-base">
                      {prosCons?.cons.length !== 0 ? (
                        <ul className="h-full">
                          {prosCons.cons.map((con, i) => (
                            <li className="text-gray-400 list-disc " key={i}>
                              {con}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "Add Cons"
                      )}
                    </span>
                    <div className="flex justify-center gap-4">
                      <button
                        className="px-3 py-2 text-sm font-semibold rounded-md bg-emerald-800 hover:bg-emerald-700 "
                        onClick={() => handleNavigate(prosCons.productId)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-2 text-sm font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
                        onClick={() => deletHandler(prosCons._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </section>
                ))
              )}
            </div>
          </section>

          <Pagination
            currentPage={currentPage}
            apiData={prosConsApiData ?? []}
            itemsPerPage={itemsPerPage}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};

export default ProsCons;
