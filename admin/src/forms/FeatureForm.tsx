// // FeatureForm.js

// import React, { useState } from "react";
// import {
//   MdAdd,
//   MdCancel,
//   MdFileDownloadDone,
//   MdOutlineDelete,
// } from "react-icons/md";
// import { TiArrowBackOutline } from "react-icons/ti";
// import { useNavigate, useParams } from "react-router-dom";

// const FeatureForm = () => {
//   const [featureCategories, setFeatureCategories] = useState([
//     {
//       category: "Display",
//       features: [{ key: "Brightness", value: "330 nits" }],
//     },
//   ]);

//   // console.log(featureCategories, "fetures");

//   const handleAddCategory = () => {
//     setFeatureCategories([
//       ...featureCategories,
//       { category: "", features: [{ key: "", value: "" }] },
//     ]);
//   };

//   const handleCategoryChange = (index, event) => {
//     const newFeatureCategories = [...featureCategories];
//     newFeatureCategories[index].category = event.target.value;
//     setFeatureCategories(newFeatureCategories);
//   };

//   const handleFeatureChange = (categoryIndex, featureIndex, event) => {
//     const newFeatureCategories = [...featureCategories];
//     newFeatureCategories[categoryIndex].features[featureIndex][
//       event.target.name
//     ] = event.target.value;
//     setFeatureCategories(newFeatureCategories);
//   };

//   const handleAddFeature = (categoryIndex) => {
//     const newFeatureCategories = [...featureCategories];
//     newFeatureCategories[categoryIndex].features.push({ key: "", value: "" });
//     setFeatureCategories(newFeatureCategories);
//   };
//   const handleRemoveFeature = (categoryIndex, fetureIndex) => {
//     const newFeatureCategories = [...featureCategories];
//     const filtredFeatureCategory = newFeatureCategories[
//       categoryIndex
//     ].features.filter((feature, index) => index !== fetureIndex);

//     newFeatureCategories[categoryIndex].features = filtredFeatureCategory;
//     setFeatureCategories(newFeatureCategories);

//     console.log(
//       categoryIndex,
//       fetureIndex,
//       newFeatureCategories
//       // updateCategoryFetures
//     );
//   };

//   const { id } = useParams();

//   const handleRemoveCategory = (categoryIndex) => {
//     const filterCategory = featureCategories.filter(
//       (category, index) => index !== categoryIndex
//     );

//     setFeatureCategories(filterCategory);
//   };

//   const navigate = useNavigate();

//   const clearhandler = () => {
//     // dispatch(clearFeatData());

//     navigate(`/products/${id}`);
//   };

//   const submitHandler = (e: React.FormEvent) => {
//     e.preventDefault();

//     // const productPostObject = {
//     //   companyId: productData.company.id,
//     //   name: productData.name,
//     //   image: productData.image,
//     //   description: productData.description,
//     //   price: Number(productData.price),
//     //   category: productData.category.id,

//     //   available: productData.available,
//     // };

//     // console.log(productPostObject);
//     console.log(featureCategories);

//     // if (Object.keys(dishUpdateData)?.length === 0) {
//     //   console.log("now creat");
//     //   mutation.mutate({
//     //     // path: "/menus",
//     //     condition: "creat",
//     //     data: productPostObject,
//     //   });
//     // } else {
//     //   console.log("update Id");
//     //   mutation.mutate({
//     //     // path: `/menus/${dishUpdateData?._id}`,
//     //     condition: "update",
//     //     data: productPostObject,
//     //   });
//     // }
//   };
//   return (
//     <section
//       className={`  md:pl-0 p-4 h-full rounded-md font-philosopher mx-auto`}
//     >
//       <form
//         onSubmit={submitHandler}
//         className={` md:p-8 p-6 h-full border-gray-200
//     rounded-md  font-philosopher max-w-full w-full shadow-md `}
//       >
//         <div className="flex items-center mb-2 md:mb-6">
//           <h1 className=" text-[28px] font-bold md:text-4xl text-[#DEE1E2]">
//             Mobile Festures Form
//           </h1>
//           <div onClick={clearhandler}>
//             <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
//           </div>
//         </div>
//         <section className={`w-full   rounded-lg  shadow-md `}>
//           <div className=" h-[420px]  overflow-y-auto [&::-webkit-scrollbar]:hidden">
//             {featureCategories.map((category, categoryIndex) => (
//               <div
//                 className={`p-4 border border-gray-700 rounded-lg ${
//                   featureCategories.length !== 1 && "mb-6"
//                 } text-[#DEE1E2]`}
//               >
//                 <div className="flex items-center w-full pb-4 ">
//                   <h1 className="w-full text-2xl font-bold">Category Tabel</h1>
//                   <div className="flex justify-end w-full">
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveCategory(categoryIndex)}
//                       className="px-2 py-1 text-sm font-bold rounded bg-rose-800 hover:bg-rose-700 focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
//                       disabled={featureCategories.length === 1}
//                     >
//                       <MdOutlineDelete className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div key={categoryIndex} className="p-4 px-0 ">
//                   <div className="mb-4">
//                     <label className="block mb-2 text-sm font-bold ">
//                       Category
//                     </label>
//                     <input
//                       type="text"
//                       value={category.category}
//                       onChange={(event) =>
//                         handleCategoryChange(categoryIndex, event)
//                       }
//                       className="w-full px-3 py-2 leading-tight focus:border-[#DEE1E2] border-transparent bg-[#252525] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                       placeholder="Enter Category Name"
//                     />
//                   </div>
//                   {category.features.map((feature, featureIndex) => (
//                     <div className="mb-4" key={featureIndex}>
//                       <div>
//                         <div className="mb-2">
//                           <label className="block mb-1 text-sm font-bold ">
//                             Feature Heading
//                           </label>
//                           <input
//                             type="text"
//                             name="key"
//                             value={feature.key}
//                             onChange={(event) =>
//                               handleFeatureChange(
//                                 categoryIndex,
//                                 featureIndex,
//                                 event
//                               )
//                             }
//                             className="w-full px-3 py-2 leading-tight bg-[#252525] focus:border-[#DEE1E2] border-transparent rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                             placeholder="Enter Feature Heading"
//                           />
//                         </div>
//                         <div className="mb-2">
//                           <label className="block mb-1 text-sm font-bold ">
//                             Feature Value
//                           </label>
//                           <input
//                             type="text"
//                             name="value"
//                             value={feature.value}
//                             onChange={(event) =>
//                               handleFeatureChange(
//                                 categoryIndex,
//                                 featureIndex,
//                                 event
//                               )
//                             }
//                             className="w-full px-3 py-2 leading-tight bg-[#252525] focus:border-[#DEE1E2] border-transparent rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                             placeholder="Enter Feature Value"
//                           />
//                         </div>
//                       </div>
//                       <div className="flex justify-end w-full">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleRemoveFeature(categoryIndex, featureIndex)
//                           }
//                           className="px-2 py-1 text-sm font-bold rounded bg-rose-800 hover:bg-rose-700 focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
//                           disabled={category.features.length === 1}
//                         >
//                           <MdOutlineDelete className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => handleAddFeature(categoryIndex)}
//                     className="flex items-center gap-1 px-2 py-1 text-sm font-bold rounded bg-emerald-800 hover:bg-emerald-700 focus:outline-none focus:shadow-outline"
//                   >
//                     <span className="mb-1">Features</span>{" "}
//                     <MdAdd className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center gap-4 pt-4">
//             <button
//               type="button"
//               onClick={handleAddCategory}
//               className="px-2 py-1 gap-1 text-sm flex items-center font-bold text-[#DEE1E2] bg-teal-800 rounded-md hover:bg-teal-700 focus:outline-none focus:shadow-outline"
//             >
//               <span className="mb-1">Category</span>{" "}
//               <MdAdd className="w-5 h-5" />
//             </button>
//             <button
//               type="submit"
//               // onClick={handleAddCategory}
//               className="px-2 py-1 gap-1 text-sm flex items-center font-bold text-[#DEE1E2] bg-emerald-800 rounded-md hover:bg-emerald-700 focus:outline-none focus:shadow-outline"
//             >
//               <span className="mb-1">Submit</span>{" "}
//               <MdFileDownloadDone className="w-5 h-5" />
//             </button>
//             <button
//               type="button"
//               onClick={clearhandler}
//               className="px-2 py-1 gap-1 text-sm flex items-center font-bold text-[#DEE1E2] bg-rose-800 rounded-md hover:bg-rose-700 focus:outline-none focus:shadow-outline"
//             >
//               <span className="mb-1">Cancel</span>{" "}
//               <MdCancel className="w-5 h-5" />
//             </button>
//           </div>
//         </section>
//       </form>
//     </section>
//   );
// };

// export default FeatureForm;
