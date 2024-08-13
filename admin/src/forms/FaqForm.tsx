import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { useCategories } from "../hooks/useCategories";
import SunTextEditor from "../components/textEditor/SunTextEditor";
import {
  FAQPostResponseType,
  FaqPostType,
  MutationFAQObjectType,
} from "../types/contentType";
import { ApiError, ApiResponse } from "../types/apiType";
import { apiRequest } from "../api/adminApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import JoditTextEditor from "../components/textEditor/JoditTextEditor";
import useSingleFaq from "../hooks/useSingleFaq";

interface FaqItemType {
  question: string;
  answer: string;
}

export interface FaqFormType {
  name: string;
  category: string;
  content: string;
  items: FaqItemType[];
}

const FaqForm: React.FC = () => {
  const [faqData, setFaqData] = useState<FaqFormType>({
    name: "",
    category: "",
    content: "",
    items: [{ question: "", answer: "" }],
  });

  const { id } = useParams();

  const { data, error, isLoading } = useCategories();
  const {
    data: singleFaqData,
    error: singleError,
    isError,
  } = useSingleFaq(id ?? "0");
  //   {
  //     "_id": "66b6056e862582c182241788",
  //     "name": "google",
  //     "category": "semiElectronics",
  //     "content": `<div class=\"se-component se-video-container __se__float-none\">
  //     <figure style=\"width: 431px; height: 242px; padding-bottom: 242px;\">
  //     <iframe src=\"https://www.youtube.com/embed/zUbTnrxPrd0?si=iDQ5kZumIYmHk7OO\" data-proportion=\"true\" data-size=\"431px,242px\" data-align=\"none\" data-file-name=\"zUbTnrxPrd0?si=iDQ5kZumIYmHk7OO\" data-file-size=\"0\" data-origin=\"100%,56.25%\" style=\"width: 431px; height: 242px;\">
  //     </iframe>
  //     </figure></div>`,
  //     "items": [
  //         {
  //             "question": "first question",
  //             "answer": "answer",
  //             "_id": "66b6056e862582c182241789"
  //         }
  //     ],
  //     "createdAt": "2024-08-09T12:02:54.668Z",
  //     "updatedAt": "2024-08-09T12:02:54.668Z",
  //     "__v": 0
  // }

  const isUpdate = Object.keys(singleFaqData ?? []).length !== 0;

  const updateObjectData = singleFaqData?.data?.data;

  useEffect(() => {
    console.log("process");
    if (id !== "" && isUpdate && !isError) {
      console.log("update...");
      setFaqData((prev) => ({
        ...prev,
        name: updateObjectData?.name ?? "",
        category: updateObjectData?.category ?? "",
        content: updateObjectData?.content ?? "",
        items: updateObjectData?.items ?? [{ question: "", answer: "" }],
      }));
    }
  }, [isUpdate, singleFaqData, id]);

  console.log(
    id,
    singleFaqData,
    isError,
    updateObjectData,
    isUpdate,
    faqData,
    id,
    "single Faq"
  );

  const navigate = useNavigate();

  const categoryData = data?.data?.data;

  const [isOpen, setOpen] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFaqData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedItems = faqData.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFaqData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFaqData((prev) => ({
      ...prev,
      items: [...prev.items, { question: "", answer: "" }],
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = faqData.items.filter((_, i) => i !== index);
    setFaqData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const selectOption = (value: string) => {
    setFaqData((prev) => ({
      ...prev,
      category: value,
    }));
    setOpen(false);
  };

  const mutation = useMutation<
    ApiResponse<FAQPostResponseType>,
    ApiError,
    MutationFAQObjectType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<FaqPostType, FAQPostResponseType>({
          url: path,
          method: method,
          data: data,
        });

        // return { data: response.data };
        return response;
      } catch (error) {
        console.log(error);
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },

    onSuccess: () => {
      // console.log(data, data?.statusText);
      toast.dismiss();
      clearHandler();

      toast.success(`${isUpdate ? "Update SuccessFull" : "Creat Successfull"}`);
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted FAQ Data: ", faqData);

    console.log("now creat");
    if (isUpdate) {
      mutation.mutate({
        path: `api/faq/${updateObjectData?._id}`,
        method: "put",
        data: faqData,
      });
    } else {
      mutation.mutate({
        path: "api/faq",
        method: "post",
        data: faqData,
      });
    }

    // toast.success("FAQ Submitted Successfully");
    // Perform your API call here
  };

  // console.log()

  const handlingDrop = (name: string, value: string) => {
    setFaqData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearHandler = () => {
    setFaqData({
      name: "",
      category: "",
      content: "",
      items: [{ question: "", answer: "" }],
    });
    navigate("/faq");
  };

  // console.log(faqData);

  //   const categories = ["General Information", "Shipping", "Returns"];

  return (
    <div className="px-4 pt-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex-1 h-full p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-[#DEE1E2]">
              FAQ Form
            </h2>
            <div onClick={clearHandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </div>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 md:pr-0 text-[#DEE1E2] [&::-webkit-scrollbar]:hidden">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={faqData?.name}
                type="text"
                onChange={handleChange}
                name="name"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
                placeholder="FAQ Name"
                required
              />
              <div className="relative">
                <div
                  className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                  onClick={() => setOpen(!isOpen)}
                >
                  {faqData?.category !== ""
                    ? faqData?.category
                    : "Select Category"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-40 text-[#DEE1E2] overflow-y-scroll [&::-webkit-scrollbar]:hidden bg-[#1A1A1A] shadow-lg absolute z-10 ${
                    isOpen ? "max-h-60" : "hidden"
                  } custom-scrollbar`}
                >
                  {categoryData?.map((category, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        faqData?.category === category.name ? "bg-rose-600" : ""
                      }`}
                      onClick={() => selectOption(category.name)}
                    >
                      <span>{category.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <textarea
                value={faqData?.content}
                onChange={handleChange}
                name="content"
                className="w-full h-24 py-4 px-4 font-medium border-gray-400 md:col-span-2 bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
                placeholder="FAQ Content"
                required
              /> */}
              <div className="md:col-span-2">
                <JoditTextEditor
                  content={faqData?.content}
                  // setFaqData={setFaqData}
                  OnChangeEditor={(e) => handlingDrop("content", e)}
                />
                {/* <SunTextEditor
                  content={faqData?.content}
                  OnChangeEditor={(e) => handlingDrop("content", e)}
                /> */}
              </div>
              <div className="md:col-span-2">
                {faqData.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 py-4 ">
                    <div className="grid w-full gap-4">
                      <input
                        value={item?.question}
                        type="text"
                        onChange={(e) => handleItemChange(e, index)}
                        name="question"
                        className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
                        placeholder="FAQ Question"
                        required
                      />
                      <textarea
                        value={item?.answer}
                        onChange={(e) => handleItemChange(e, index)}
                        name="answer"
                        className="w-full h-24 py-4 px-4 font-medium border-gray-400 bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
                        placeholder="FAQ Answer"
                        required
                      />
                    </div>
                    {faqData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="px-2 py-1 mb-4 text-sm font-bold rounded justify-self-end bg-rose-800 hover:bg-rose-700 focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
                        //   disabled={inputFields.length === 1}
                      >
                        <MdOutlineDelete className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addItem}
                  className="flex items-center p-2 bg-teal-800 rounded justify-self-start"
                >
                  <MdAdd className="w-5 h-5" />
                  <span className="text-sm font-medium"> New Item</span>
                </button>
              </div>
            </div>
            <div className="flex">
              <button
                className="px-4 py-2 text-white rounded-md bg-emerald-800 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                type="submit"
                disabled={
                  !faqData.name || !faqData.category || !faqData.content
                }
              >
                Submit
              </button>
              <button
                className="px-4 py-2 ml-8 text-white rounded-md bg-rose-800 hover:bg-rose-700"
                type="button"
                onClick={clearHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FaqForm;
