import { useEffect, useState } from "react";
import uploadMultipleImage from "../firebase_image/multipleImages.ts";
interface StateProps {
  image: string[];
  imageNames: string[];
}
const FileUploadForm = ({ setImageData, imge, productName }) => {
  const extractImageName = (url: string) => {
    const parts = url.split(/\/|%2F/);
    const imagePart = parts[parts?.length - 1];
    return imagePart?.split("?")[0];
  };

  const [productData, setProductData] = useState<StateProps>({
    image: imge.length !== 0 ? [...imge] : [],
    imageNames: imge.length !== 0 ? imge.map(extractImageName) : [],
  });

  // console.log(productData, "multi>>>");
  const [progressStatus, setProgressStatus] = useState(null);

  useEffect(() => {
    if (imge.length !== 0) {
      setProductData({
        image: [...imge],
        imageNames: imge.map((url) => url.split("/").pop().split("?")[0]),
      });
    }
  }, [imge]);

  const handleImageChange = async (event) => {
    const selectedFiles = event.target.files;
    const folderName = productName; // Replace with your desired folder name

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

      setProductData((prev) => ({
        ...prev,
        image: imagesData.map((data) => data?.imageUrl),
        imageNames: imagesData.map((data) => data?.file?.name),
      }));

      setImageData((prev) => ({
        ...prev,
        image: imagesData.map((data) => data.imageUrl),
        imageNames: imagesData.map((data) => data.file),
      }));
    }
  };

  return (
    // // <form>
    // // <div className="relative w-full h-full">
    //   {/* <input
    //       type="file"
    //       name="image"
    //       multiple
    //       onChange={handleImageChange}
    //       className={`px-2 py-[5px] ${
    //         progressStatus ? "pb-2" : ""
    //       } w-full text-sm border border-gray-400 focus-within:border-sky-400 rounded-md placeholder:text-gray-500 outline-none`}
    //       placeholder="Image URL"
    //       required
    //     />
    //     {progressStatus !== null && progressStatus !== "" && (
    //       <>
    //         <div className="absolute inset-0 z-10 flex items-end">
    //           <div
    //             className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
    //             style={{ width: `${progressStatus}%` }}
    //           ></div>
    //         </div>
    //       </>
    //     )}
    //       </div>
    //      */}
    <div className="relative grid items-center w-full h-full grid-cols-1 col-span-1 gap-2 md:gap-4 md:col-span-2 md:grid-cols-2">
      <div className="relative cursor-pointer">
        <input
          type="file"
          name="image"
          multiple
          onChange={handleImageChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className={`px-4 py-2 pl-24 relative ${
            progressStatus ? "pb-2" : ""
          } w-full text-base bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md text-gray-400 cursor-pointer flex items-center justify-between`}
        >
          {productData?.imageNames?.length || "Choose a file"}
          <span className="text-gray-400 absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-2 font-medium bg-[#1A1A1A]">
            Browse
          </span>
        </label>
        {progressStatus !== null && progressStatus !== "" && (
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
      <ul className="text-sm font-semibold text-white list-disc list-inside font-gray-600 font-mavenPro">
        {productData.imageNames.map((name, index) => (
          <li key={index}>{name.split("%20")?.[1]}</li>
        ))}
      </ul>
    </div>
    // </form>
  );
};

export default FileUploadForm;
