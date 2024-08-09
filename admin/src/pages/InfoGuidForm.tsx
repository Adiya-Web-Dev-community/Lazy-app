import React, { useRef, useState } from "react";

import { TiArrowBackOutline } from "react-icons/ti";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
// import { SingleCategoryResponseData } from "../types/contentType";
import { apiRequest } from "../api/adminApi";
import { ApiError, ApiResponse } from "../types/apiType";
import {
  InfoGuidePostResponseType,
  InfoGuidPostType,
  InfoGuidProps,
  MutationObjectInfoGuideType,
} from "../types/contentType";
import uploadImage from "../components/firebase_image/image";
import { MdOutlineOndemandVideo } from "react-icons/md";
import uploadVideo from "../components/firebase_video/video";
import ReactPlayer from "react-player";

const InfoGuidForm: React.FC<InfoGuidProps> = ({
  infoFormData,
  formHandler,
  refetch,
}) => {
  const [infoGuideForm, setinfoForm] = useState({
    title: infoFormData.updateTitle ? infoFormData.updateTitle : "",

    imageSrc:
      infoFormData?.updateThumnail?.slice(
        67,
        infoFormData?.updateThumnail?.indexOf("%")
      ) || "",
    image: infoFormData?.updateThumnail || "",
    video: infoFormData?.updateVideo,
    videoSrc: infoFormData?.updateVideo.includes("www")
      ? infoFormData?.updateVideo.slice(
          infoFormData?.updateVideo.indexOf("www.") + 4,
          infoFormData?.updateVideo.indexOf(".com")
        )
      : "",
  });

  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  //   video
  const [external, setExternal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progressVideoStatus, setProgressVideoStatus] = useState<number | null>(
    null
  );
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      try {
        const videourl = await uploadVideo(
          file.name,
          file,
          setProgressVideoStatus
        );

        setinfoForm((prev) => ({
          ...prev,
          video: videourl,
          videoSrc: file.name,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading Video");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinfoForm((prev) => ({
      ...prev,
      [e?.target?.name]:
        e?.target?.type === "checkbox" ? e?.target?.checked : e?.target?.value,
    }));
  };

  const mutation = useMutation<
    ApiResponse<InfoGuidePostResponseType>,
    ApiError,
    MutationObjectInfoGuideType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          InfoGuidPostType,
          InfoGuidePostResponseType
        >({
          url: path,
          method: condition === "creat" ? "post" : "put",
          data: data,
        });

        // return { data: response.data };
        return response;
      } catch (error) {
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },

    onSuccess: (data) => {
      console.log(data);
      refetch();
      toast.dismiss();
      closeHandler();
      toast.success(
        `${infoFormData?.creat ? "Creat Successfull" : "Update Successfull"}`
      );

      setinfoForm((prev) => ({
        ...prev,
        categoryName: "",
      }));
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // const selectedFile = event.target.files[0];

    const selectedFile = event.target?.files?.[0];
    const folderName = event?.target?.files?.[0].name ?? "";

    console.log(folderName, setProgressStatus, "from single image uploade");

    if (selectedFile) {
      const imageUrl = await uploadImage(
        folderName,
        selectedFile,
        setProgressStatus
      );

      // console.log(imageUrl, selectedFile, "<<frommodal?>>");
      setinfoForm((prev) => ({
        ...prev,
        image: imageUrl,
        imageSrc: selectedFile.name,
      }));
    }
  };

  const submiteHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(infoGuideForm);

    const infoPayload: InfoGuidPostType = {
      title: infoGuideForm?.title,
      thumnail: infoGuideForm?.image,
      videourl: infoGuideForm?.video,
    };

    if (infoFormData?.creat) {
      console.log("now creat");
      mutation.mutate({
        path: "api/infoguide",
        condition: "creat",
        data: infoPayload,
      });
    }

    if (infoFormData.updateId) {
      console.log("update Id");
      mutation.mutate({
        path: `api/infoguide/${infoFormData.updateId}`,
        condition: "update",
        data: infoPayload,
      });
    }
  };

  const closeHandler = () => {
    if (infoFormData.creat) {
      formHandler((prev) => ({
        ...prev,
        creat: !prev.creat,
      }));
    } else {
      formHandler((prev) => ({
        ...prev,
        updateId: "",
        updateThumnail: "",
        updateTitle: "",
        updateVideo: "",
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center px-4 sm:px-0 bg-black/60"
      onClick={closeHandler}
    >
      <div
        className="bg-[#1A1A1A] rounded-md w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="" onSubmit={submiteHandler}>
          {/* left section */}
          <div className="p-6 px-8 rounded font-montserrat">
            <div className="flex pb-2">
              <h2 className=" md:text-4xl text-[28px] font-bold text-[#DEE1E2]">
                Info Guid Form
              </h2>
              <button onClick={closeHandler}>
                <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
              </button>
            </div>

            <input
              value={infoGuideForm?.title}
              type="text"
              onChange={handleChange}
              name="title"
              className={
                " font-medium outline-none w-full my-4 border h-10 bg-[#252525] border-transparent text-[#DEE1E2] rounded-md pl-4 focus-within:border-gray-800"
              }
              placeholder={"Enter Title"}
              required
            />
            <div className="relative w-full h-full mb-6">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                accept="image/*"
              />
              <label
                htmlFor="image-upload"
                className={`px-4 py-2 pl-24 relative ${
                  progressStatus ? "pb-2" : ""
                } w-full text-base bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md text-gray-400 cursor-pointer flex items-center justify-between`}
              >
                {infoGuideForm?.imageSrc || "Choose a Thumbnail"}
                <span className="text-gray-400 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 font-medium bg-[#1A1A1A]">
                  Browse
                </span>
              </label>
              {progressStatus !== null && progressStatus !== 0 && (
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

            <div className="w-full col-span-1 mb-4 md:col-span-2">
              {/* <div> */}
              <p className="mb-2 text-lg font-bold text-gray-500">Video</p>
              {/* </div> */}
              <div className="flex w-full gap-2 mb-2">
                <label htmlFor="" className="mb-1 font-medium text-gray-500">
                  External URL
                </label>
                <input
                  checked={external}
                  onChange={() => setExternal(!external)}
                  className="  rounded-[7px] cursor-pointer outline-none border border-transparent bg-[#252525]"
                  type="checkbox"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {external ? (
                  <>
                    <input
                      value={infoGuideForm?.video}
                      name="video"
                      onChange={handleChange}
                      className="w-full h-10 pl-4 font-medium bg-[#252525] text-[#DEE1E2] border border-transparent rounded-md outline-none focus:border-[#DEE1E2]"
                      type="url"
                      placeholder="Video URL"
                    />
                  </>
                ) : (
                  <div className="relative w-full h-full">
                    <input
                      ref={fileInputRef}
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="video-upload"
                      type="file"
                    />
                    <label
                      htmlFor="video-upload"
                      className={`px-4 py-2 pl-24 relative ${
                        progressVideoStatus ? "pb-2" : ""
                      } w-full text-base bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md text-gray-400 cursor-pointer flex items-center justify-between`}
                    >
                      {infoGuideForm?.videoSrc || "Choose a Video"}
                      <span className="text-gray-400 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 font-medium bg-[#1A1A1A]">
                        Browse
                      </span>
                    </label>
                    {progressVideoStatus !== null &&
                      progressVideoStatus !== 0 && (
                        <>
                          <div className="absolute inset-0 z-10 flex items-end">
                            <div
                              className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                              style={{ width: `${progressVideoStatus}%` }}
                            ></div>
                          </div>
                        </>
                      )}
                  </div>
                )}
                {infoGuideForm?.video ? (
                  <ReactPlayer
                    url={infoGuideForm?.video}
                    width="100%"
                    height="200px"
                    controls
                  />
                ) : (
                  <div className="w-full h-[200px] gap-4 bg-[#252525] rounded-md flex justify-center items-center text-gray-500 font-semibold text-xl">
                    <MdOutlineOndemandVideo className="w-12 h-12" />
                    <span className="w-[180px]">
                      Video will play here after uploade
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex text-[#DEE1E2] ">
              <button
                className="px-4 py-2 rounded bg-emerald-800 hover:bg-emerald-700"
                type="submit"
              >
                {/* Save Changes */}
                {infoFormData.updateId ? "Update" : "Submit"}
              </button>
              <button
                className="px-4 py-2 ml-8 rounded bg-rose-800 hover:bg-rose-700"
                onClick={closeHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoGuidForm;
