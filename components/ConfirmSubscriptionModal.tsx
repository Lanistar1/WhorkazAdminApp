/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

const ConfirmSubscriptionModal = ({
  open,
  onClose,
  onConfirm,
  plan,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: any;
  loading: boolean;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-5">
        <h2 className="text-lg font-semibold">Confirm Subscription</h2>

        <p className="text-sm text-gray-600">
          You are about to subscribe to <b>{plan?.name}</b> for{" "}
          <b>₦{plan?.price}</b>. Do you want to continue?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-[#3900DC] text-white rounded-lg text-sm disabled:opacity-60"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSubscriptionModal;
