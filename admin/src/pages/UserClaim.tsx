import { ClaimGet } from "../types/contentType";

import { useState } from "react";
import Pagination from "../components/pagination/Pagination";
import CategoryLoading from "../components/loading-elemnts/CategoryLoading";
import { useClaimsByUserId } from "../api/querys";
// import CreatPostCategory from "../forms/CreatPostCategory";

import { useNavigate, useParams } from "react-router-dom";
// import { FaCaretDown } from "react-icons/fa";
import UpdateUserClaim from "../forms/UpdateUserClaim";

export interface UserClaimStateType {
  updateId: string;
  updatedata: {
    status: string;
    orderamount: number;
  };
}

export interface UserClaimUpdateProps {
  isClaimForm: UserClaimStateType;
  refetch: () => void;
  clear: () => void;
}

const UserClaim: React.FC = () => {
  const [isClaimForm, setClaimForm] = useState<UserClaimStateType>({
    updateId: "",
    updatedata: {
      status: "",
      orderamount: 0,
    },
  });

  //   const [isStatusFilter, setStatusFilter] = useState("");

  //   const [isOpen, setOpen] = useState({
  //     status: false,
  //   });

  const navigate = useNavigate();

  const { id } = useParams();

  const categoryHeading = [
    "Name",
    "Product Name",
    "Date Of Order",
    "Order Id",
    "Status",

    "Order Amount",
    "Remark",
    "Setting",
  ];

  const { isPending, isError, data, error, refetch } = useClaimsByUserId(
    id ?? ""
  );

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

  const updateCategory = (claim: ClaimGet) => {
    setClaimForm((prev) => ({
      ...prev,
      updateId: claim._id,
      updatedata: { status: claim.status, orderamount: claim.orderamount },
    }));
  };

  const clearFileds = () => {
    setClaimForm((prev) => ({
      ...prev,
      updateId: "",
      updatedata: {
        status: "",
        orderamount: 0,
      },
    }));
  };

  const navigateHandler = (id: string) => {
    navigate(`/claim/${id}`);
  };

  //   const filterhandler = (status: string) => {
  //     setStatusFilter(status);
  //     setOpen((prev) => ({
  //       ...prev,
  //       status: false,
  //     }));
  //   };

  //   const statusHeading = ["All", "Confirm", "Pending", "Cancel"];

  return (
    <>
      {isClaimForm.updateId && (
        <UpdateUserClaim
          isClaimForm={isClaimForm}
          refetch={refetch}
          clear={clearFileds}
        />
      )}

      <section
        className={`  md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={` md:p-8 p-6 h-full border-gray-200 rounded-md  font-philosopher max-w-full w-full shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
              User Claims
            </h1>
          </div>
          <div className="flex gap-4 mb-4">
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
            {/* <div className="relative">
              <div
                className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                onClick={() => setOpen({ ...isOpen, status: !isOpen.status })}
              >
                {isStatusFilter !== "" ? isStatusFilter : "Select Status"}
                <FaCaretDown className="m-1" />
              </div>
              <ul
                className={`mt-2 p-2 rounded-md w-64 text-[#DEE1E2] bg-[#1A1A1A] overflow-auto shadow-lg absolute z-10 ${
                  isOpen.status ? "max-h-36" : "hidden"
                } custom-scrollbar`}
              >
                {statusHeading?.map((status, i) => (
                  <li
                    key={i}
                    className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                      isStatusFilter === status ? "bg-rose-600" : ""
                    }`}
                    onClick={() =>
                      filterhandler(status === "All" ? "" : status)
                    }
                  >
                    <span>{status}</span>
                  </li>
                ))}
              </ul>
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
                ) : currentCategory?.length === 0 ? (
                  <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-green-700">
                    There is No Confirm Claim
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
                      <span
                        className="flex justify-center ml-2 text-sm font-semibold text-green-400 cursor-pointer md:text-base hover:text-green-600"
                        onClick={() => navigateHandler(claim._id)}
                      >
                        {claim?.orderid}
                      </span>

                      <span className="flex ml-4 text-sm font-semibold md:text-base">
                        {claim.status}
                      </span>

                      <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                        {claim?.orderamount}
                      </span>

                      <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                        {claim?.remarks ? claim?.remarks : "Add remark"}
                      </span>

                      {claim.status === "pending" ? (
                        <div className="grid justify-center gap-3">
                          <button
                            className="px-3 py-2 text-sm font-semibold rounded-md bg-emerald-800 hover:bg-emerald-700 "
                            onClick={() => updateCategory(claim)}
                          >
                            Edit
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs text-center font-semibold text-[#54c7ed]">
                          No Action
                        </p>
                      )}
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

export default UserClaim;
