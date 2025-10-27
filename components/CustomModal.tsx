/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from "react";

const CustomModal = ({
  isOpen,
  onClose,
  onConfirm,
  status,
  reason,
  setReason,
  requestResubmission,
  setRequestResubmission,
} : any) => {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (status.toLowerCase()) {
      case "rejected":
        return (
          <>
            <h2 className="text-lg font-semibold text-gray-900">
              Are you sure you want to reject this course?
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please provide a reason so the instructor can improve and re-submit if necessary.
            </p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for rejection"
              className="w-full p-2 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
            />
            <div className="mt-2">
              <input
                type="checkbox"
                checked={requestResubmission}
                onChange={(e) => setRequestResubmission(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Request resubmission</span>
            </div>
          </>
        );
      case "accepted":
        return (
          <>
            <h2 className="text-lg font-semibold text-gray-900">
              Confirm approval of course publication?
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Once approved, it will be visible in the course library and available to all users.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  const getConfirmButtonText = () => {
    switch (status.toLowerCase()) {
      case "rejected":
        return "Send message";
      case "accepted":
        return "Approve course";
      default:
        return "Confirm";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] md:w-full max-w-md">
        {getModalContent()}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#3900DC] text-white rounded-lg hover:bg-[#2E00B3]"
          >
            {getConfirmButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;