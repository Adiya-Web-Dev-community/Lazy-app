import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { MdAdd, MdOutlineDelete } from "react-icons/md";

const DynamicInputFields = ({ companies, addingProductUrlData }) => {
  const [inputFields, setInputFields] = useState([
    {
      id: "wys",
      url: "",
      company: {
        name: "",
        id: "",
        image: "",
      },
    },
  ]);
  const [isOpen, setOpen] = useState({
    company: false,
    id: "",
  });

  useEffect(() => {
    // Check if all input fields are filled
    const allFieldsFilled = inputFields.every(
      (field) => field.url && field.company.name
    );

    // Update productData.productsLink only if all fields are filled
    if (allFieldsFilled) {
      addingProductUrlData((prevData) => ({
        ...prevData,
        productsLink: inputFields,
      }));
    }
  }, [inputFields, addingProductUrlData]);

  const generateRandomId = (length = 8) => {
    return Math.random().toString(36).substr(2, length);
  };

  console.log(inputFields);
  //   const [inputFields, setInputFields] = useState([{ id: 1, url: '', company: '' }]);

  const handleAddInputField = (e) => {
    e.preventDefault();
    setInputFields([
      ...inputFields,
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
  const handleRemoveInputField = (id) => {
    const filterFiled = inputFields.filter(
      (inputFiled, i) => inputFiled.id !== id
    );

    console.log(filterFiled, id, "filter");
    setInputFields(filterFiled);
  };

  const handleInputChange = (id, field, newValue) => {
    const updatedInputFields = inputFields.map((inputField) =>
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
      {inputFields.map((inputField) => (
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
          {/* <input
            type="text"
            value={inputField.company}
            onChange={(e) =>
              handleInputChange(inputField.id, "company", e.target.value)
            }
            placeholder="Enter Company Name"
            className="w-full p-2 mb-2 border rounded"
          /> */}
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
