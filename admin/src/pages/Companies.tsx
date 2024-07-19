import { IoIosSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import {
  CompanyDataUpdateType,
  DeletElementData,
  ProductDeleteStateType,
  UniDelet,
} from "../types/contentType";
import { ApiError, ApiResponse } from "../types/apiType";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import { listHeadingCompanies } from "../components/content_data/contentData";
import useCompanies from "../hooks/useCompanies";
import { useDispatch } from "react-redux";
import { addingData } from "../store/companies";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { useState } from "react";
import ConfirmationDialog from "../components/modal/ConfirmationDialog";
import Pagination from "../components/pagination/Pagination";
import CompaniesLoading from "../components/loading-elemnts/CompaniesLoading";

const Companies: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDeletModal, setDeletModal] = useState<ProductDeleteStateType>({
    delet: false,
    deletElementId: "",
  });
  const { isPending, isError, data, refetch } = useCompanies();
  console.log(data);

  const companyData = data?.data?.data;
  console.log(companyData, "companies");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCompanies = companyData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  console.log(currentCompanies, "pagination");

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [dialogCrendial, setDialogCrendial] = useState({
    targetUrl: "",
    showDialog: false,
  });

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
      toast.success(`Company Deleted`);
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
      toast.error(`${error.message}`);
    },
  });

  const deletcompany = (id: string) => {
    setDeletModal((prev) => ({
      ...prev,
      delet: true,
      deletElementId: id,
    }));
  };

  const updatecompany = (data: CompanyDataUpdateType) => {
    console.log(data);
    dispatch(addingData(data));
    navigate("/companies/form");
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
      path: `/api/company/delete/${isDeletModal?.deletElementId}`,
    };

    console.log(deleteObj);

    // Proceed with the deletion
    mutation.mutate(deleteObj);
  };

  return (
    <>
      {isDeletModal?.delet && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={confirmhandler} />
      )}
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
          className={` md:p-8 p-6
  
h-full
        border-gray-200 
    rounded-md  font-philosopher max-w-full w-full shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
              Companies
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
              >
                <Link to={"/companies/form"}>
                  <span className="hidden md:inline-block">Add Company</span>

                  <IoIosSend className="w-6 h-6 md:hidden" />
                </Link>
              </button>
            </div>
          </div>
          <section
            className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
          >
            <section className="grid grid-cols-customCompanies pb-2 p-2  gap-4  text-[#DEE1E2] min-w-[1200px] font-medium md:font-semibold bg-[#1A1A1A]">
              <p className="pl-2 md:text-lg">SrNo.</p>

              {listHeadingCompanies.map((heading, index) => (
                <p
                  key={index}
                  className={`   md:text-lg ${
                    index !== 0 ? "justify-self-center" : "ml-10"
                  }`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </p>
              ))}
            </section>
            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] bg-[#252525]">
              {isPending ? (
                // Loading element for the table
                <CompaniesLoading />
              ) : isError ? (
                <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-rose-600">
                  Check Internet connection or Contact to Admin
                </p>
              ) : (
                currentCompanies?.map((company, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 text-[#DEE1E2] border-[#1A1A1A] grid-cols-customCompanies group hover:bg-[#2c2c2c]"
                  >
                    <span>{i + 1}</span>

                    <span
                      className={`  font-semibold text-center  rounded-full  `}
                    >
                      {company?.name}
                    </span>

                    <span className="text-sm font-semibold break-words break-all text-ellipsis">
                      {company?.email}
                    </span>

                    <div className="flex items-center justify-center">
                      {company?.image ? (
                        <img
                          src={company?.image}
                          alt="user Image"
                          className="object-contain w-24 h-24 rounded-lg"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-400">
                          No Image
                        </span>
                      )}
                    </div>
                    <span className="flex justify-center ml-2 text-sm font-semibold ">
                      {company?.phone || "--"}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold ">
                      {company?.address || "--"}
                    </span>
                    <span
                      onClick={() =>
                        company?.website && handleLinkClick(company.website)
                      }
                      className={`ml-2 text-sm font-semibold text-center ${
                        company?.website ? "underline text-sky-400 " : ""
                      } break-words break-all cursor-pointer `}
                    >
                      {company?.website ? "WebSite" : "----"}
                    </span>

                    <span className="flex justify-center ml-2 text-sm font-semibold ">
                      {company?.status}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold ">
                      {company?.productcount || 0}
                    </span>
                    {/* <span className="flex justify-center ml-2 text-sm font-semibold ">
                  {company?.dateAdded || "---"}
                </span> */}

                    <div className="grid justify-center gap-2">
                      <button
                        className="px-3 py-2 text-sm font-semibold rounded-md bg-emerald-800 hover:bg-emerald-700"
                        onClick={() => updatecompany(company)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-2 text-sm font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
                        onClick={() => deletcompany(company._id || "")}
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
            apiData={companyData ?? []}
            itemsPerPage={itemsPerPage}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};

export default Companies;
