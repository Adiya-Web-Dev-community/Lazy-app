import React from "react";
import { LogOutModalProps } from "../../types/contentType";

const LogOutModal: React.FC<LogOutModalProps> = ({ onClose, onConfirm }) => {
  const handlingPropogation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 cursor-pointer bg-black/60"
      onClick={onClose}
    >
      <div
        className="p-6 bg-[#252525] text-[#DEE1E2] rounded-md  cursor-default"
        onClick={handlingPropogation}
      >
        <h2 className="mb-4 text-lg font-semibold">
          Are you sure you want to Logout
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-gray-800 bg-gray-400 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
