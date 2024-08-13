import React, { useEffect, useState } from "react";

import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";

import { ApiError, ApiResponse } from "../types/apiType.js";
import { apiRequest } from "../api/adminApi.js";

import {
  BlogPostResponseType,
  BlogPostType,
  BlogStateType,
  MutationObjectBlogType,
} from "../types/contentType.ts";

import JoditTextEditor from "../components/textEditor/JoditTextEditor.tsx";
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import { useBlogCategory, useSingleBlog } from "../api/querys.ts";
import uploadMultiInputImage from "../components/firebase_image/multiInputImage.ts";
import ThumbnailUploader from "../components/BlogFormComponents/ThumbnailUploader.tsx";

interface OpenStateType {
  category: boolean;
}

const creatingSlug = (value: string) => {
  const slugValue = value.toLocaleLowerCase().replace(" ", "-");

  // console.log(value, slugValue, "from outside");
  return slugValue;
};

const imageName = (imageUrl: string) => {
  return imageUrl.substring(
    imageUrl?.lastIndexOf("/") + 1,
    imageUrl?.indexOf("%2F")
  );
};

const generateRandomId = (length = 8) =>
  Math.random().toString(36).substr(2, length);

const BlogForm: React.FC = () => {
  const param = useParams();

  const { data } = useBlogCategory();
  const { isError: singleBlogIsError, data: singBlogData } = useSingleBlog(
    param?.id ?? "0"
  );

  const categoryApiData = data?.data;

  const singBlogApiData = singBlogData?.data?.data;

  const isUpdate = (Object.keys(singBlogApiData ?? {}) ?? []).length !== 0;

  const [blogData, setBlogDAta] = useState<BlogStateType>({
    title: "",
    category: "",
    content: "",

    brand: [{ name: "", image: "", link: "", _id: generateRandomId() }],

    thumnail: [],
  });

  useEffect(() => {
    if (isUpdate && !singleBlogIsError) {
      setBlogDAta((prev) => ({
        ...prev,
        title: singBlogApiData?.title || "",
        category: singBlogApiData?.category || "",
        content: singBlogApiData?.content || "",

        brand: singBlogApiData?.brand || [
          { name: "", image: "", link: "", _id: generateRandomId() },
        ],

        thumnail: singBlogApiData?.thumnail || [],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate, singleBlogIsError]);

  const [isOpen, setOpen] = useState<OpenStateType>({
    category: false,
  });

  //   const dispatch = useDispatch();
  const [progressStatus, setProgressStatus] = useState<number | null>(null);
  const [progressInputId, setProgressInputId] = useState("");

  const mutation = useMutation<
    ApiResponse<BlogPostResponseType>,
    ApiError,
    MutationObjectBlogType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<BlogPostType, BlogPostResponseType>({
          url: path,
          method: condition === "creat" ? "post" : "put",
          data: data,
        });

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

    onSuccess: (data) => {
      console.log(data, "Blog created");
      toast.dismiss();
      clearhandler();
      toast.success(
        `${isUpdate ? "Update Successfull" : "Create Successfull"}`
      );
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error.message);
    },
  });

  //for text Data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let checked: boolean | undefined;

    if (e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }

    setBlogDAta((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectOption = (field: string, value: string) => {
    console.log(value);
    setBlogDAta((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handlingprogress = (pregressscore: number, index: string) => {
    if (pregressscore !== null) {
      setProgressInputId(index);
      setProgressStatus(pregressscore);
    }
  };

  //for Image Data
  const handleImageChange = async (
    index: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target?.files?.[0];
    const folderName = event?.target?.files?.[0].name ?? "";

    console.log(folderName, setProgressStatus, "from single image uploade");

    if (selectedFile) {
      const imageUrl = await uploadMultiInputImage(
        folderName,
        selectedFile,
        (progress) =>
          progress !== null ? handlingprogress(progress, index) : null
      );

      setBlogDAta((prevState) => {
        const updatedBrands = prevState.brand.map((brand) =>
          brand._id === index ? { ...brand, image: imageUrl } : brand
        );
        return { ...prevState, brand: updatedBrands };
      });
    }
  };

  const handleBrandChange = (
    _id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setBlogDAta((prevState) => {
      const updatedBrands = prevState.brand.map((brand) =>
        brand._id === _id ? { ...brand, [name]: value } : brand
      );
      return { ...prevState, brand: updatedBrands };
    });
  };

  const handlingDrop = (name: string, value: string) => {
    setBlogDAta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addBrandField = () => {
    setBlogDAta((prevState) => ({
      ...prevState,
      brand: [
        ...prevState.brand,
        { name: "", image: "", link: "", _id: generateRandomId() },
      ],
    }));
  };

  const removeBrandField = (index: number) => {
    const updatedBrands = blogData.brand.filter((_, i) => i !== index);
    setBlogDAta((prevState) => ({
      ...prevState,
      brand: updatedBrands,
    }));
  };

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const removeIdFromBrand = blogData.brand.map((brand) => {
      return {
        name: brand.name,
        link: brand.link,
        image: brand.image,
      };
    });

    const payloade = {
      thumnail: blogData.thumnail,
      title: blogData.title,
      slug: creatingSlug(blogData.title),
      category: blogData.category,
      content: blogData.content,
      brand: removeIdFromBrand,
    };

    // console.log(blogData, payloade);

    if (!isUpdate) {
      console.log("now create");
      mutation.mutate({
        path: "api/blog",
        condition: "creat",
        data: payloade,
      });
    } else {
      console.log("update Id");
      mutation.mutate({
        path: `api/blog/${param?.id !== "" && param?.id}`,
        condition: "update",
        data: payloade,
      });
    }
  };

  const clearhandler = () => {
    setBlogDAta({
      category: "",
      content: "",

      thumnail: [],

      brand: [],
      title: "",
    });

    navigate("/blog");
  };

  console.log(blogData);

  const thumnailhandler = (thumbnails: string[]) => {
    console.log(thumbnails, "from images");

    setBlogDAta((prev) => ({
      ...prev,
      thumnail: thumbnails,
    }));
  };

  return (
    <div className="px-4 pt-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden  rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex-1 h-full p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-[#DEE1E2]">
              Blog Form
            </h2>
            <div onClick={clearhandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </div>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden pr-4 md:pr-0 text-[#DEE1E2]">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={blogData?.title}
                type="text"
                onChange={handleChange}
                name="title"
                className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border   rounded-md outline-none "
                placeholder="Enter Title"
                required
              />

              {/* Status Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 font-medium pl-4 bg-[#252525] focus:border-[#DEE1E2] text-gray-400 border-transparent rounded-md cursor-pointer"
                  onClick={() =>
                    setOpen({ ...isOpen, category: !isOpen.category })
                  }
                >
                  {blogData?.category !== ""
                    ? blogData?.category
                    : "Select Category"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-64 text-[#DEE1E2] bg-[#1A1A1A] overflow-auto shadow-lg absolute z-10 ${
                    isOpen.category ? "max-h-36" : "hidden"
                  } custom-scrollbar`}
                >
                  {categoryApiData?.map((category, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        blogData?.category === category.name
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() => selectOption("category", category.name)}
                    >
                      <span>{category.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2">
                <JoditTextEditor
                  content={blogData?.content}
                  // setBlogDAta={setBlogDAta}
                  OnChangeEditor={(e) => handlingDrop("content", e)}
                />
              </div>
              <div className="md:col-span-2">
                <ThumbnailUploader
                  thumbnails={blogData.thumnail}
                  setThumbnails={thumnailhandler}
                />
              </div>
              <div className="md:col-span-2">
                <p className="text-lg font-bold text-gray-400">
                  Brand Details:
                </p>
                {blogData.brand.map((brand, index) => (
                  <div key={index} className="grid w-full gap-4 mb-4">
                    <input
                      type="text"
                      name="name"
                      value={brand.name}
                      className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
                      onChange={(e) => handleBrandChange(brand._id, e)}
                      placeholder="Brand Name"
                    />
                    <div className="relative w-full h-full">
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => handleImageChange(brand._id, e)}
                        className="hidden"
                        id={`file-upload-${brand._id}`}
                      />
                      <label
                        htmlFor={`file-upload-${brand._id}`}
                        className={`px-4 py-2 pl-24 relative ${
                          progressStatus ? "pb-2" : ""
                        } w-full text-base bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md text-gray-400 cursor-pointer flex items-center justify-between`}
                      >
                        {/* {"Choose a file"} */}
                        {imageName(brand.image) || "Choose a file"}
                        <span className="text-gray-400 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 font-medium bg-[#1A1A1A]">
                          Browse
                        </span>
                      </label>
                      {progressInputId === brand._id &&
                        progressStatus !== null &&
                        progressStatus !== 0 && (
                          <>
                            <div className="absolute inset-0 z-10 flex items-end">
                              <div
                                className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                                style={{ width: `${progressStatus}%` }}
                                // style={{ width: `${100}%` }}
                              ></div>
                            </div>
                          </>
                        )}
                    </div>
                    <input
                      type="text"
                      name="link"
                      value={brand.link}
                      className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
                      onChange={(e) => handleBrandChange(brand._id, e)}
                      placeholder="Brand Link"
                    />

                    {blogData.brand.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBrandField(index)}
                        className="px-2 py-1 mb-4 text-sm font-bold rounded justify-self-end bg-rose-800 hover:bg-rose-700 focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
                      >
                        <MdOutlineDelete className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={addBrandField}
                  type="button"
                  className="flex items-center p-2 bg-teal-800 rounded justify-self-start"
                >
                  <MdAdd className="w-5 h-5" />
                  <span className="text-sm font-medium">Brand</span>
                </button>
              </div>
            </div>

            <div className="flex">
              <button
                className="px-4 py-2 text-white rounded-md bg-emerald-800 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                type="submit"
              >
                {isUpdate ? "Update" : "Submit"}
              </button>
              <button
                className="px-4 py-2 ml-8 text-white rounded-md bg-rose-800 hover:bg-rose-700"
                type="button"
                onClick={clearhandler}
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

export default BlogForm;
