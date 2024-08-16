import { useState } from "react";
import Pagination from "../components/pagination/Pagination";

import { Link, useParams } from "react-router-dom";
import InfoGuideLoading from "../components/loading-elemnts/InfoGuideLoading";
import { TiArrowBackOutline } from "react-icons/ti";
import { useSingleFaq } from "../api/querys";

const ProfileFaq = () => {
  const { id } = useParams();
  const { isPending, isError, data } = useSingleFaq(id ?? "0");

  const faqApiData = data?.data?.data;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCompanies = faqApiData?.items.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const faqHeading = ["Question", "Answer"];
  return (
    <section
      className={`  md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
    >
      <section
        className={` md:p-8 p-6
        
      h-full
               border-gray-200 
          rounded-md  font-philosopher max-w-full w-full shadow-md`}
      >
        <div className="flex items-center gap-2 mb-2 md:mb-6">
          <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
            FAQ Question Answer List
          </h1>
          <Link to={"/faq"}>
            <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
          </Link>
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
        </div>
        <section
          className={`w-full overflow-auto  border-2  [&::-webkit-scrollbar]:hidden rounded-lg border-[#1A1A1A] shadow-md bg-[#1A1A1A]`}
        >
          <section className="grid gap-4 p-2 pb-2 min-w-[600px] font-medium  grid-cols-customFaqProfile text-[#DEE1E2] md:font-semibold bg-[#1A1A1A]">
            <p className="pl-2 md:text-lg">SrNo.</p>

            {faqHeading.map((heading, index) => (
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
            {
              isPending ? (
                <InfoGuideLoading />
              ) : isError ? (
                <p className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-rose-600">
                  Check Internet connection or Contact to Admin
                </p>
              ) : (
                currentCompanies?.map((faq, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 text-[#DEE1E2] border-[#1A1A1A] grid-cols-customFaqProfile group hover:bg-[#2c2c2c]"
                  >
                    <span>{i + 1}</span>

                    <span className="ml-2 text-sm font-semibold md:text-base">
                      {faq?.question}
                    </span>
                    <span className="ml-2 text-sm font-semibold md:text-base">
                      {faq?.answer}
                    </span>
                  </section>
                ))
              )
              // )
            }
          </div>
        </section>

        <Pagination
          currentPage={currentPage}
          apiData={faqApiData?.items ?? []}
          itemsPerPage={itemsPerPage}
          handleClick={handleClick}
        />
      </section>
    </section>
  );
};

export default ProfileFaq;