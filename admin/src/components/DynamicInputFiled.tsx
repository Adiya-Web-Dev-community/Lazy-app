import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from "react";
import { FaCaretDown } from "react-icons/fa";
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import { ApiError, ApiGetResponse } from "../types/apiType";
import {
  CompanyData,
  FormProductTypes,
  ProductPostResponseDataType,
} from "../types/contentType";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiGetRequest } from "../api/adminGetApi";

type HandleChangevalueTYpe =
  | string
  | {
      name?: string;
      id?: string;
      image?: string;
    };
interface InputFieldProps {
  companies: CompanyData[];
  addingProductUrlData: Dispatch<SetStateAction<FormProductTypes>>;
}

const DynamicInputFields: React.FC<InputFieldProps> = ({
  companies,
  addingProductUrlData,
}) => {
  // const [inputFields, setInputFields] = useState(
  //   () => {
  //     return condition
  //       ? [...produtlinks]
  //       : [
  //           {
  //             id: "wys",
  //             url: "",
  //             company: {
  //               name: "",
  //               id: "",
  //               image: "",
  //             },
  //           },
  //         ];
  //   }
  //   // condition && produtlinks.length !== 0
  //   //   ? produtlinks.map((item) => ({
  //   //       id: item?.company?._id,
  //   //       url: item?.url,
  //   //       company: {
  //   //         name: item?.company?.name,
  //   //         id: item?.company?._id,
  //   //         image: item?.company?.image,
  //   //       },
  //   //     }))
  //   //   :
  // );

  // const [inputFields, setInputFields] = useState([]);

  // console.log(
  //   inputFields,
  //   JSON.stringify(inputFields),
  //   JSON.stringify(produtlinks),
  //   JSON.stringify(inputFields) === JSON.stringify(produtlinks),
  //   companies,
  //   addingProductUrlData,
  //   produtlinks,
  //   condition,
  //   "<<updaetProduct?>>"
  // );

  // useEffect(() => {
  //   if (condition && produtlinks.length > 0) {
  //     setInputFields(
  //       produtlinks.map((item) => ({
  //         id: item?.company?._id,
  //         url: item?.url,
  //         company: {
  //           name: item?.company?.name,
  //           id: item?.company?._id,
  //           image: item?.company?.image,
  //         },
  //       }))
  //     );
  //   } else {
  //     setInputFields([
  //       {
  //         id: generateRandomId(),
  //         url: "",
  //         company: {
  //           name: "",
  //           id: "",
  //           image: "",
  //         },
  //       },
  //     ]);
  //   }
  // }, [condition, produtlinks]);

  // const updateArray = produtlinks.map((item) => ({
  //   id: item?.company?._id,
  //   url: item?.url,
  //   company: {
  //     name: item?.company?.name,
  //     id: item?.company?._id,
  //     image: item?.company?.image,
  //   },
  // }));

  // useMemo(() => {
  //   console.log("i am here <<updaetProduct?>>");
  //   if (condition && !isError && produtlinks.length !== 0) {
  //     console.log("start running <<updaetProduct?>>");
  //     setInputFields([...updateArray]);
  //   }
  // }, [condition, isError]);
  // const [isOpen, setOpen] = useState({
  //   company: false,
  //   id: "",
  // });

  // useEffect(() => {
  //   // Check if all input fields are filled
  //   const allFieldsFilled = inputFields.every(
  //     (field) => field.url && field.company.name
  //   );

  // Update productData.productsLink only if all fields are filled
  // if (allFieldsFilled) {
  //   addingProductUrlData((prevData) => ({
  //     ...prevData,
  //     productsLink: inputFields,
  //   }));
  // }
  // Update productData.productsLink only if all fields are filled
  //   if (allFieldsFilled) {
  //     addingProductUrlData((prevData) => {
  //       // Avoid unnecessary updates
  //       if (
  //         JSON.stringify(prevData.productsLink) !== JSON.stringify(inputFields)
  //       ) {
  //         return {
  //           ...prevData,
  //           productsLink: inputFields,
  //         };
  //       }
  //       return prevData;
  //     });
  //   }
  // }, [inputFields, addingProductUrlData]);

  // console.log(inputFields, "in dynamicfield");

  // const generateRandomId = (length = 8) => {
  //   return Math.random().toString(36).substr(2, length);
  // };

  const { id } = useParams();
  const generateRandomId = (length = 8) =>
    Math.random().toString(36).substr(2, length);

  const { data: singleProduct } = useQuery<
    ApiGetResponse<ProductPostResponseDataType>,
    ApiError
  >({
    queryKey: [`single/${id}`],
    queryFn: async () => {
      return await apiGetRequest<ProductPostResponseDataType>({
        url: `api/product/${id}`,
      });
    },
  });

  const isUpdate = Object.keys(singleProduct || [])?.length !== 0;
  const singleProductObject = singleProduct?.data;

  const formatingProdutLink = singleProductObject?.productsLink?.map((link) => {
    return {
      url: link?.url,
      company: singleProductObject?.company?.find((comp) =>
        comp?.name?.includes?.(link?.company || "")
      ),
    };
  });

  const initialInputFields = () => {
    if (
      isUpdate &&
      singleProductObject &&
      singleProductObject.productsLink &&
      singleProductObject?.productsLink?.length > 0
    ) {
      return formatingProdutLink?.map((item) => ({
        id: item?.company?._id || generateRandomId(),
        url: item?.url || "",
        company: {
          name: item?.company?.name || "",
          id: item?.company?._id || "",
          image: item?.company?.image || "",
        },
      }));
    }
    return [
      {
        id: generateRandomId(),
        url: "",
        company: {
          name: "",
          id: "",
          image: "",
        },
      },
    ];
  };

  const [inputFields, setInputFields] = useState(initialInputFields());
  const [isOpen, setOpen] = useState({
    company: false,
    id: "",
  });

  useEffect(() => {
    setInputFields(initialInputFields());
  }, [isUpdate]);

  useEffect(() => {
    const allFieldsFilled = inputFields?.every(
      (field) => field.url && field.company.name
    );

    if (allFieldsFilled) {
      addingProductUrlData((prevData) => {
        if (
          JSON.stringify(prevData.productsLink) !== JSON.stringify(inputFields)
        ) {
          return {
            ...prevData,
            productsLink: inputFields,
          };
        }
        return prevData;
      });
    }
  }, [inputFields, addingProductUrlData]);

  // console.log(inputFields);
  //   const [inputFields, setInputFields] = useState([{ id: 1, url: '', company: '' }]);

  const handleAddInputField = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setInputFields([
      ...(inputFields || []),
      {
        id: generateRandomId(),
        url: "",
        company: {
          name: "",
          id: "",
          image: "",
        },
      },
    ]);
  };
  const handleRemoveInputField = useCallback(
    (id: string) => {
      const filterFiled = inputFields?.filter(
        (inputFiled) => inputFiled.id !== id
      );

      console.log(filterFiled, id, "filter");
      setInputFields(filterFiled);
    },
    [inputFields]
  );

  const handleInputChange = (
    id: string,
    field: string,
    newValue: HandleChangevalueTYpe
  ) => {
    const updatedInputFields = inputFields?.map((inputField) =>
      inputField.id === id ? { ...inputField, [field]: newValue } : inputField
    );
    setInputFields(updatedInputFields);
    // addingProductUrlData((prev) => ({
    //   ...prev,
    //   productsLink: [...prev.productsLink, ...updatedInputFields],
    // }));
    if (field === "company") {
      setOpen((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  return (
    <div className="grid gap-3 pl-1 md:col-span-2">
      {inputFields?.map((inputField) => (
        <div key={inputField.id} className="grid items-center gap-4 md:flex ">
          <input
            type="url"
            value={inputField.url}
            onChange={(e) =>
              handleInputChange(inputField.id, "url", e.target.value)
            }
            placeholder="Enter Product URL"
            className=" h-10 pl-4 font-medium w-full md:w-1/2 rounded-md  border  bg-[#252525] focus:border-[#DEE1E2] border-transparent"
          />

          <div className="relative  w-full md:w-[43%]">
            <div
              className="flex realtive justify-between p-2  pl-4 font-medium border rounded-md cursor-pointer text-gray-400 bg-[#252525] focus:border-[#DEE1E2]  border-transparent  "
              onClick={() =>
                setOpen({
                  ...isOpen,
                  company: !isOpen.company,
                  id: inputField.id,
                })
              }
            >
              {inputField?.company?.name !== "" ? (
                <div className="flex items-center gap-2">
                  <img
                    src={inputField?.company.image}
                    alt="company logo"
                    className="object-contain w-8 h-6 rounded-full"
                  />
                  <span className="font-medium">
                    {inputField?.company.name}
                  </span>
                </div>
              ) : (
                "Select Product of Company"
              )}
              <FaCaretDown className="m-1" />
            </div>
            <ul
              className={`mt-2 p-2 rounded-md w-48 [&::-webkit-scrollbar]:hidden overflow-y-scroll text-[#DEE1E2] bg-[#1A1A1A] shadow-lg absolute z-10 ${
                isOpen.company && isOpen.id === inputField.id
                  ? "max-h-40"
                  : "hidden"
              } custom-scrollbar`}
            >
              {companies?.map((company, i) => (
                <li
                  key={i}
                  className={`p-2 mb-2 text-sm text-[#DEE1E2] rounded-md cursor-pointer flex items-center gap-2 hover:bg-blue-200/60 ${
                    inputField?.company?.name === company?.name
                      ? "bg-rose-600"
                      : ""
                  }`}
                  onClick={() =>
                    handleInputChange(inputField.id, "company", {
                      name: company?.name,
                      id: company?._id,
                      image: company?.image,
                    })
                  }
                >
                  <img
                    src={company?.image}
                    alt="company logo"
                    className="object-contain w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{company?.name}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="flex justify-end w-full"> */}
          <button
            type="button"
            onClick={() => handleRemoveInputField(inputField.id)}
            className="px-2 py-1 mb-4 text-sm font-bold rounded justify-self-end bg-rose-800 hover:bg-rose-700 focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
            disabled={inputFields.length === 1}
          >
            <MdOutlineDelete className="w-4 h-4" />
          </button>
          {/* </div> */}
        </div>
      ))}
      <button
        onClick={handleAddInputField}
        className="flex items-center p-2 bg-teal-800 rounded justify-self-start"
      >
        <MdAdd className="w-5 h-5" />
        <span className="text-sm font-medium"> New Url</span>
      </button>
    </div>
  );
};

export default DynamicInputFields;
