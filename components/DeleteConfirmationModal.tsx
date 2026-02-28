// components/DeleteConfirmationModal.tsx
'use client';
import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message,
}) => {
  if (!isOpen) return null;

  // Stop propagation to prevent closing the modal immediately if the click is inside
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white dark:bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
        onClick={handleModalClick}
      >
        <h3 className="text-xl font-bold text-[#FF2929] mb-4">{title}</h3>
        <p className="text-gray-700 dark:text-gray-700 mb-6">{message}</p>
        
        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold bg-[#FF2929] text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;