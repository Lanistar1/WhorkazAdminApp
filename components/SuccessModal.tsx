/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from "react";
import Image from "next/image";

const SuccessModal = ({ isOpen, onClose, previousStatus } : any) => {
  if (!isOpen) return null;

  const getSuccessContent = () => {
    switch (previousStatus.toLowerCase()) {
      case "rejected":
        return {
          title: "Course rejected.",
          message: "The user has been notified with your feedback.",
          buttonText: "Continue",
        };
      case "accepted":
        return {
          title: "Course approved and published successfully.",
          message: "The user has been notified with your feedback.",
          buttonText: "Continue",
        };
      default:
        return {
          title: "Action completed.",
          message: "The user has been notified.",
          buttonText: "Continue",
        };
    }
  };

  const { title, message, buttonText } = getSuccessContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] max-w-md text-center">
        {/* Balloon Illustration (simulated with text; replace with actual SVG/image if available) */}
        <div className="flex justify-center mb-4">
          <Image
                src="/assets/images/approvalImage.png"
                alt="Whorkaz Logo"
                width={150}
                height={34}
                className="object-contain"
            />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-2">{message}</p>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="px-20 py-2 bg-[#3900DC] text-white rounded-full hover:bg-[#2E00B3]"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;