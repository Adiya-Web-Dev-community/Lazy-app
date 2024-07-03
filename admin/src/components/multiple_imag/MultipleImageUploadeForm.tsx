import { useState } from "react";
import uploadMultipleImage from "../firebase_image/multipleImages.js";

const FileUploadForm = () => {
  const [dishData, setDishData] = useState({ imageSrc: [], image: [] });
  const [progressStatus, setProgressStatus] = useState(null);

  const handleImageChange = async (event) => {
    const selectedFiles = event.target.files;
    const folderName = "your_folder_name"; // Replace with your desired folder name

    if (selectedFiles) {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const imageUrl = await uploadMultipleImage(
          folderName,
          file,
          setProgressStatus
        );
        return { imageUrl, file };
      });

      const imagesData = await Promise.all(uploadPromises);

      setDishData((prev) => ({
        ...prev,
        image: imagesData.map((data) => data.imageUrl),
        imageSrc: imagesData.map((data) => data.file),
      }));
    }
  };

  return (
    <form>
      <div className="relative w-full h-full">
        <input
          type="file"
          name="image"
          multiple
          onChange={handleImageChange}
          className={`px-2 py-[5px] ${
            progressStatus ? "pb-2" : ""
          } w-full text-sm border border-gray-400 focus-within:border-sky-400 rounded-md placeholder:text-gray-500 outline-none`}
          placeholder="Image URL"
          required
        />
        {progressStatus !== null && progressStatus !== "" && (
          <>
            <div className="absolute inset-0 z-10 flex items-end">
              <div
                className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                style={{ width: `${progressStatus}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default FileUploadForm;
