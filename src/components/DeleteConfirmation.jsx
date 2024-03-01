import React from "react";

function DeleteConfirmationPopup({ onCancel, onConfirm }) {
  return (
    <div className=" fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <p className="font-bold">
          Are you sure you want to delete this review?
        </p>
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={onConfirm}
            className="bg-red-600 py-1 px-2 border rounded-lg text-white hover:underline font-semibold"
          >
            Delete
          </button>

          <button className="mr-2 hover:underline" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
