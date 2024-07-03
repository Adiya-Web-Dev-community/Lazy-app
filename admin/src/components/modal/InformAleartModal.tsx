// ConfirmDeleteModal.js
import React from "react";

const InformAleartModal = ({ onClose }) => {
  //   if (!isOpen) return null;

  const handlingPropogation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-50 cursor-pointer bg-black/60"
      onClick={onClose}
    >
      <div
        className="p-6 bg-[#252525] text-[#DEE1E2] rounded-lg shadow-lg cursor-default"
        onClick={handlingPropogation}
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-400 ">
          By View You will able to Do:
        </h2>
        <ul className="grid gap-2 px-4 mb-4 list-disc">
          <li>Able to view Basic Info of Product</li>
          <li>Able to view Feature Info of Product</li>
          <li>Able to Edit and Delete Feature Info of Product</li>
        </ul>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 font-semibold text-gray-800 bg-gray-400 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          {/* <button
            className="px-4 py-2 font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
            onClick={onConfirm}
          >
            Delete
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default InformAleartModal;
