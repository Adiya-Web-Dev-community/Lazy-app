import { ApiError, ApiResponse } from "../types/apiType";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import {
  ClaimGet,
  DeletElementData,
  ProductDeleteStateType,
  UniDelet,
} from "../types/contentType";
import { apiRequest } from "../api/adminApi";

import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { useState } from "react";
import Pagination from "../components/pagination/Pagination";
import CategoryLoading from "../components/loading-elemnts/CategoryLoading";
import { useClaims } from "../api/querys";
// import CreatPostCategory from "../forms/CreatPostCategory";
import UpdateClaim, { ClaimStateType } from "../forms/UpdateClaim";

const Claim: React.FC = () => {
  const [isClaimForm, setClaimForm] = useState<ClaimStateType>({
    updateId: "",
    updatedata: "",
  });
  const [isDeletModal, setDeletModal] = useState<ProductDeleteStateType>({
    delet: false,
    deletElementId: "",
  });

  const categoryHeading = [
    "Name",
    "Product Name",
    "Date Of Order",
    // "Order Id",
    "Status",
    // "Invoice",
    // "Approved",
    "Order Amount",
    "Remark",
    "Setting",
  ];

  const { isPending, isError, data, error, refetch } = useClaims();

  const categoryApiData = data?.data;
  console.log(data, categoryApiData, error, "claims");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCategory = categoryApiData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // console.log(currentCategory, "pagination");

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

        // return { data: response.data };
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

  const deletCategory = (id: string) => {
    setDeletModal((prev) => ({
      ...prev,
      delet: true,
      deletElementId: id,
    }));
  };
  const updateCategory = (claim: ClaimGet) => {
    setClaimForm((prev) => ({
      ...prev,
      updateId: claim._id,
      updatedata: claim.status,
    }));
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
      path: `/api/claim/${isDeletModal?.deletElementId}`,
    };

    // Proceed with the deletion
    mutation.mutate(deleteObj);
  };

  const clearFileds = () => {
    setClaimForm((prev) => ({
      ...prev,
      updateId: "",
      updatedata: "",
    }));
  };

  return (
    <>
      {isClaimForm.updateId && (
        <UpdateClaim
          isClaimForm={isClaimForm}
          refetch={refetch}
          clear={clearFileds}
        />
      )}
      {isDeletModal?.delet && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={confirmhandler} />
      )}
      <section
        className={`  md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={` md:p-8 p-6 h-full border-gray-200 rounded-md  font-philosopher max-w-full w-full shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
              Claims
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
            {/* <div className="relative flex items-center self-end ">
              <button
                className={` px-2 py-1 
                     bg-emerald-800  hover:bg-emerald-700 text-[#DEE1E2] font-semibold
                }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
                onClick={handlingCategory}
              >
                <span className="hidden md:inline-block">
                  Creat Post Category
                </span>

                <IoIosSend className="w-6 h-6 md:hidden" />
              </button>
            </div> */}
          </div>
          <section
            className={`w-full overflow-auto  border-2  [&::-webkit-scrollbar]:hidden rounded-lg border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
          >
            <section className="grid gap-4 p-2 pb-2 min-w-[1200px] font-medium  grid-cols-customePostClaim text-[#DEE1E2] md:font-semibold bg-[#1A1A1A]">
              <p className="pl-2 md:text-lg">SrNo.</p>

              {categoryHeading.map((heading, index) => (
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

            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] bg-[#252525]">
              {
                isPending ? (
                  <CategoryLoading />
                ) : isError ? (
                  <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-rose-600">
                    Check Internet connection or Contact to Admin
                  </p>
                ) : (
                  currentCategory?.map((claim, i) => (
                    <section
                      key={i}
                      className="grid items-center gap-4 py-2 pl-6 pr-4 border-t-2 text-[#DEE1E2] border-[#1A1A1A] grid-cols-customePostClaim group hover:bg-[#2c2c2c]"
                    >
                      <span>{i + 1}</span>

                      <span className="flex ml-2 text-sm font-semibold md:text-base">
                        {claim?.name}
                      </span>
                      <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                        {claim?.productname}
                      </span>
                      <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                        {claim?.dateOfOrder.split("T")[0]}
                      </span>
                      {/* <span className="flex ml-4 text-sm font-semibold md:text-base">
                        {claim.isApproved === true ? (
                          claim.status
                        ) : 
                        
                        (
                          <button
                            className="px-3 py-2 text-sm font-semibold rounded-md bg-emerald-700 hover:bg-emerald-600 "
                            onClick={() => approvehandler(claim)}
                          >
                            Approve
                          </button>
                        )}
                      </span> */}
                      <span className="flex ml-4 text-sm font-semibold md:text-base">
                        {claim.status}
                      </span>
                      {/* <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                        <div className="grid gap-3">
                          <button
                            className="px-3 py-2 text-sm font-semibold rounded-md bg-emerald-700 hover:bg-emerald-600 "
                            onClick={() => approvehandler(category)}
                          >
                            Approve
                          </button>
                         
                        </div>
                      </span> */}
                      <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                        {claim?.orderamount}
                      </span>

                      <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                        {claim?.remarks ? claim?.remarks : "Add remark"}
                      </span>

                      <div className="grid gap-3">
                        <button
                          className="px-3 py-2 text-sm font-semibold rounded-md bg-emerald-800 hover:bg-emerald-700 "
                          onClick={() => updateCategory(claim)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-2 text-sm font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
                          onClick={() => deletCategory(claim?._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </section>
                  ))
                )
                // )
              }
            </div>
          </section>

          <Pagination
            currentPage={currentPage}
            apiData={categoryApiData ?? []}
            itemsPerPage={itemsPerPage}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};
export default Claim;
