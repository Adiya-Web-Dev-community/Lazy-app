// ConfirmDeleteModal.js

import { ConfirmDeleteModalProps } from "../../types/contentType";

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  onClose,
  onConfirm,
}) => {
  //   if (!isOpen) return null;

  const handlingPropogation = (e: React.MouseEvent) => {
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
        <h2 className="mb-4 text-xl font-bold">
          Are you sure you want to delete this?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 font-semibold text-gray-800 bg-gray-400 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
