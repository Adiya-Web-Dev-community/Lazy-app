import {
  BlogReviewType,
  DeletElementData,
  ProductDeleteStateType,
  UniDelet,
  VerifiedElementDataType,
  VerifyPathType,
} from "../types/contentType";
import { ApiError, ApiResponse } from "../types/apiType";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { apiRequest } from "../api/adminApi";
import { listHeadingBlogReview } from "../components/content_data/contentData";

import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { useState } from "react";

import Pagination from "../components/pagination/Pagination";

import useBlogReview from "../hooks/useBlogReview";
import StarRating from "../components/StarRating";
import BlogReviewLoading from "../components/loading-elemnts/BlogReviewLoading";
const BlogReview: React.FC = () => {
  const [isDeletModal, setDeletModal] = useState<ProductDeleteStateType>({
    delet: false,
    deletElementId: "",
  });
  const { isPending, isError, data, refetch } = useBlogReview();
  console.log(data);

  const blogData = data?.data?.data;
  console.log(blogData, "blog Review data");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  //calculation of page
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //   const currentReview = blogData?.slice(indexOfFirstItem, indexOfLastItem);
  const currentReview = [
    {
      _id: "Mansoor",
      blogId: "123",
      name: "Mansoor",
      email: "mansoor4tech@gmail.com",
      star: 4,
      isVerify: false,
    },
    {
      _id: "Abdullah",
      blogId: "345",
      name: "Abdullah",
      email: "abdullah4tech@gmail.com",
      star: 2,
      isVerify: true,
    },
    {
      _id: "Osama",
      blogId: "567",
      name: "Osama",
      email: "osama4tech@gmail.com",
      star: 1,
      isVerify: true,
    },
  ];

  //   console.log(currentReview, "pagination");

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const deleteMutation = useMutation<
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

  const reviewMutation = useMutation<
    ApiResponse<VerifiedElementDataType>,
    ApiError,
    VerifyPathType
  >({
    mutationFn: async (verfiry) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          VerifyPathType,
          VerifiedElementDataType
        >({
          url: verfiry.path,
          method: "delete",
        });

        // return { data: response.data };
        return response as ApiResponse<VerifiedElementDataType>;
      } catch (error) {
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },
    onSuccess: (data: ApiResponse<VerifiedElementDataType>) => {
      console.log(data);
      refetch();
      toast.dismiss();
      toast.success(`Review verify`);
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

  const deletHandler = (id: string) => {
    setDeletModal((prev) => ({
      ...prev,
      delet: true,
      deletElementId: id,
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
      path: `/api/blog/${isDeletModal?.deletElementId}`,
    };

    console.log(deleteObj);

    // Proceed with the deletion
    deleteMutation.mutate(deleteObj);
  };

  const verifyHandler = (value: BlogReviewType) => {
    console.log("verified:", value);
    const reviewPath: VerifyPathType = {
      path: `/api/blog/review/${value._id}/verify`,
    };

    console.log(reviewPath);

    // Proceed with the review verified
    reviewMutation.mutate(reviewPath);
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
              Blog Review List
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
              >
                <Link to={"/blog/form"}>
                  <span className="hidden md:inline-block">Create Blog</span>

                  <IoIosSend className="w-6 h-6 md:hidden" />
                </Link>
              </button> 
            </div>*/}
          </div>
          <section
            className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
          >
            <section className="grid grid-cols-customReviewBlog pb-2 p-2  gap-4  text-[#DEE1E2] min-w-[1200px] font-medium md:font-semibold bg-[#1A1A1A]">
              <p className="pl-2 md:text-lg">SrNo.</p>

              {listHeadingBlogReview.map((heading, index) => (
                <p
                  key={index}
                  className={`   md:text-lg ${
                    index !== 0 ? "justify-self-center" : "ml-20"
                  }`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </p>
              ))}
            </section>
            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] bg-[#252525]">
              {isPending ? (
                // Loading element for the table
                <BlogReviewLoading />
              ) : isError ? (
                <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-rose-600">
                  Check Internet connection or Contact to Admin
                </p>
              ) : (
                currentReview?.map((review, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 text-[#DEE1E2] border-[#1A1A1A] grid-cols-customReviewBlog group hover:bg-[#2c2c2c]"
                  >
                    <span>{i + 1}</span>

                    <span
                      className={`  font-semibold text-center  rounded-full  `}
                    >
                      {review?.name}
                    </span>

                    <span className="flex justify-center text-sm font-semibold break-words break-all text-ellipsis">
                      {review?.email}
                    </span>

                    <span className="flex justify-center ml-2 text-sm font-semibold md:text-base">
                      <StarRating rating={review.star} />
                    </span>

                    <span className=" flex justify-center text-sm font-semibold text-gray-600 md:text-[15px]">
                      {review.isVerify ? (
                        <span className="px-6 py-2 text-sm rounded-md text-emerald-400 ">
                          Verified
                        </span>
                      ) : (
                        <button
                          className={`px-3 text-sm py-2 text-white  rounded-md bg-emerald-800 hover:bg-emerald-700 `}
                          onClick={() => verifyHandler(review)}
                        >
                          Verify
                        </button>
                      )}
                    </span>

                    <div className="grid justify-center gap-2">
                      <button
                        className="px-3 py-2 text-sm font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
                        onClick={() => deletHandler(review?._id || "")}
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
            apiData={blogData ?? []}
            itemsPerPage={itemsPerPage}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};

export default BlogReview;
