import React, { useState } from "react";
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import uploadMultiInputImage from "../firebase_image/multiInputImage";

interface ThumbnailUploaderProps {
  thumbnails: string[];
  setThumbnails: (url: string[]) => void;
}

interface Thumbnail {
  _id: string;
  image: string;
}

const generateRandomId = (length = 8) =>
  Math.random().toString(36).substr(2, length);

const imageName = (imageUrl: string) => {
  return imageUrl.substring(
    imageUrl?.lastIndexOf("/") + 1,
    imageUrl?.indexOf("%2F")
  );
};

const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({
  thumbnails,
  setThumbnails,
}) => {
  const [progressStatus, setProgressStatus] = useState<number | null>(null);
  const [progressInputId, setProgressInputId] = useState("");

  const [inThumbnails, setinThumbnails] = useState<Thumbnail[]>([
    { _id: generateRandomId(), image: "" },
  ]);

  const handleThumbnailChange = async (
    index: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    const folderName = event?.target?.files?.[0].name ?? "";
    if (selectedFile) {
      const imageUrl = await uploadMultiInputImage(
        // `thumbnail_${generateRandomId()}`,
        folderName,
        selectedFile,
        (progress) => {
          // if (progress !== null) {
          setProgressInputId(index.toString());
          setProgressStatus(progress);
          // }
        }
      );

      const updatedThumnails = [...inThumbnails].map((thumnail) =>
        thumnail._id === index ? { ...thumnail, image: imageUrl } : thumnail
      );

      const updatethum = updatedThumnails.map((thumbnail) => thumbnail.image);
      setinThumbnails(updatedThumnails);

      setThumbnails(updatethum);
    }
  };

  const addThumbnailField = () => {
    setinThumbnails((prev) => [
      ...prev,
      { _id: generateRandomId(), image: "" },
    ]);
  };

  console.log(inThumbnails, "from inside");

  const removeThumbnailField = (value: { image: string; _id: string }) => {
    const updatethum = [...thumbnails];
    const filterThum = updatethum.filter((url) => url !== value.image);

    setinThumbnails((prev) => {
      // Ensure that prev is an array before filtering
      if (Array.isArray(prev)) {
        return prev.filter((thumIn) => thumIn._id !== value._id);
      }
      return prev;
    });

    setThumbnails(filterThum);
  };

  return (
    <div className="">
      <p className="text-lg font-bold text-gray-400">Thumbnails:</p>
      <div className="grid gap-4">
        {inThumbnails?.map((thumbnail) => (
          <div
            className="relative flex items-center w-full h-full gap-4 "
            key={thumbnail._id}
          >
            <div className="relative w-full">
              <input
                type="file"
                name="image"
                onChange={(e) => handleThumbnailChange(thumbnail._id, e)}
                className="hidden"
                id={`image-upload-${thumbnail._id}`}
                accept="image/*"
              />
              <label
                htmlFor={`image-upload-${thumbnail._id}`}
                className={`px-4 py-2 pl-24 relative ${
                  progressStatus ? "pb-2" : ""
                } w-full text-base bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md text-gray-400 cursor-pointer flex items-center justify-between`}
              >
                {imageName(thumbnail.image) || "Choose a Image"}
                <span className="text-gray-400 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 font-medium bg-[#1A1A1A]">
                  Browse
                </span>
              </label>
              {thumbnail._id === progressInputId &&
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

            {inThumbnails.length > 1 && (
              <button
                type="button"
                onClick={() => removeThumbnailField(thumbnail)}
                className="px-2 py-1 mb-4 text-sm font-bold rounded justify-self-end bg-rose-800 hover:bg-rose-700 focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
                //   disabled={inputFields.length === 1}
              >
                <MdOutlineDelete className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addThumbnailField}
          type="button"
          className="flex items-center p-2 bg-teal-800 rounded justify-self-start"
        >
          <MdAdd className="w-5 h-5" />
          <span className="text-sm font-medium">Thumbnail</span>
        </button>
      </div>
    </div>
  );
};

export default ThumbnailUploader;
