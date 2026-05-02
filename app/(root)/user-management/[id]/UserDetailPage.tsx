'use client';

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAdminUserById } from "@/app/actions/reactQuery";
import {
  useUpdateUserStatus,
  useUpdateUserBanStatus,
  useUpdateUserProfile,
} from "@/app/actions/reactQuery";
import { format } from "date-fns";

const UserDetailPage = ({ id }: { id: string }) => {
    const [activeModal, setActiveModal] = useState<
        "status" | "ban" | "profile" | null
        >(null);

  const { data, isLoading, isError } = useAdminUserById(id as string);

  // IMPORTANT FIX: extract user properly
  const user = data;
  console.log("my user friend", user)

  const updateStatusMutation = useUpdateUserStatus(id);
  const banStatusMutation = useUpdateUserBanStatus(id);
  const updateProfileMutation = useUpdateUserProfile(id);

  useEffect(() => {
        if (
            updateStatusMutation.isSuccess ||
            banStatusMutation.isSuccess ||
            updateProfileMutation.isSuccess
        ) {
            setActiveModal(null);
        }
        }, [
        updateStatusMutation.isSuccess,
        banStatusMutation.isSuccess,
        updateProfileMutation.isSuccess,
    ]);

  // ===== STATE =====
  const [status, setStatus] = useState("suspended");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("");

  const [banReason, setBanReason] = useState("");
  const [permanent, setPermanent] = useState(false);
  const [action, setAction] = useState<"ban" | "unban">("ban");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading user...
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not found
      </div>
    );
  }

  // ===== HANDLERS =====
  const handleStatusUpdate = () => {
  updateStatusMutation.mutate({
    status,
    reason,
    suspension_duration_days: duration ? "" : ""
  });
};

  const handleBanAction = () => {
    banStatusMutation.mutate({
        action,
        reason: banReason,
        permanent,
    });
  };

  const handleProfileUpdate = () => {
  updateProfileMutation.mutate({
    first_name: firstName,
    last_name: lastName,
    phone,
    status: "active",
  });
};

  const renderValue = (value: any) => {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return value;
  };

    const formatDate = (date?: string | null) => {
        if (!date) return "—";

        try {
            return format(new Date(date), "dd MMM yyyy • HH:mm");
        } catch {
            return "—";
        }
    };

    

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header title="User Details" />

      <div className="p-6 max-w-6xl mx-auto space-y-8">

        {/* ================= USER HEADER ================= */}
        <div className="flex items-center gap-5 p-5 border rounded-xl">
          <Image
            src={user.profilePic || "/assets/images/person3.png"}
            alt="user"
            width={70}
            height={70}
            className="rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {user.firstName || "—"} {user.lastName || ""}
            </h2>
            <p className="text-gray-500">{user.email || "—"}</p>
            <p className="text-sm text-gray-400">
              Status: <span className="capitalize">{user.status || "—"}</span>
            </p>
            <p className="text-sm text-gray-400">
              Role: {user.userType || "—"}
            </p>
          </div>
        </div>

        {/* ================= USER INFO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BASIC INFO */}
          <div className="border rounded-xl p-5 space-y-2">
            <h3 className="font-semibold mb-2">Basic Information</h3>

            <p><b>ID:</b> {renderValue(user.id)}</p>
            <p><b>Email:</b> {renderValue(user.email)}</p>
            <p><b>Phone:</b> {renderValue(user.phoneNumber)}</p>
            <p><b>Address:</b> {renderValue(user.address)}</p>
            <p><b>Bio:</b> {renderValue(user.bio)}</p>
          </div>

          {/* VERIFICATION */}
          <div className="border rounded-xl p-5 space-y-2">
            <h3 className="font-semibold mb-2">Verification</h3>

            <p><b>Email Verified:</b> {user.isEmailVerified ? "Yes" : "No"}</p>
            <p><b>Phone Verified:</b> {user.isPhoneVerified ? "Yes" : "No"}</p>
            <p><b>KYC Status:</b> {renderValue(user.kycVerificationStatus)}</p>
            <p><b>KYC Type:</b> {renderValue(user.kycType)}</p>
            <p><b>KYC Rejection:</b> {renderValue(user.kycRejectionReason)}</p>
          </div>

          {/* ACCOUNT STATUS */}
          <div className="border rounded-xl p-5 space-y-2">
            <h3 className="font-semibold mb-2">Account Status</h3>

            <p><b>Status:</b> {renderValue(user.status)}</p>
            <p><b>Failed Logins:</b> {renderValue(user.failedLoginAttempts)}</p>
            <p><b>Locked Until:</b> {renderValue(user.lockedUntil)}</p>
            <p><b>Payout Option:</b> {renderValue(user.payoutOption)}</p>
          </div>

          {/* DATES */}
          <div className="border rounded-xl p-5 space-y-2">
            <h3 className="font-semibold mb-2">Timestamps</h3>
            <p><b>Created:</b> {formatDate(user.createdAt)}</p>
            <p><b>Updated:</b> {formatDate(user.updatedAt)}</p>
          </div>
        </div>

        {/* ================= ADMIN ACTIONS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* STATUS BUTTON */}
        <button
            onClick={() => setActiveModal("status")}
            className="border border-[#DBDBE3] cursor-pointer rounded-xl p-5 text-left hover:shadow-lg transition bg-white"
        >
            <h3 className="text-[16px] font-semibold text-[#32323E]">
            Update User Status
            </h3>
            <p className="text-[14px] text-[#95959F] mt-1">
            Suspend or activate this user account.
            </p>
        </button>

        {/* BAN BUTTON */}
        <button
            onClick={() => setActiveModal("ban")}
            className="border  border-[#DBDBE3] cursor-pointer rounded-xl p-5 text-left hover:shadow-lg transition bg-white"
        >
            <h3 className="text-[16px] font-semibold text-[#32323E]">
            Ban / Unban User
            </h3>
            <p className="text-[14px] text-[#95959F] mt-1">
            Restrict access permanently or temporarily.
            </p>
        </button>

        {/* PROFILE BUTTON */}
        <button
            onClick={() => setActiveModal("profile")}
            className="border cursor-pointer border-[#DBDBE3] rounded-xl p-5 text-left hover:shadow-lg transition bg-white"
        >
            <h3 className="text-[16px] font-semibold text-[#32323E]">
            Override Profile
            </h3>
            <p className="text-[14px] text-[#95959F] mt-1">
            Edit user profile details as admin.
            </p>
        </button>

        </div>

      </div>

      {/* ================= MODAL BACKDROP ================= */}
{activeModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#DBDBE3] p-6 relative">

      {/* Modal Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-semibold text-[#32323E]">
          {activeModal === "status" && "Update User Status"}
          {activeModal === "ban" && "Ban / Unban User"}
          {activeModal === "profile" && "Profile Override"}
        </h2>

        <button
          onClick={() => setActiveModal(null)}
          className="text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>
      </div>

      {/* ================= STATUS FORM ================= */}
      {activeModal === "status" && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Status</label>
            <select
              className="w-full border p-3 rounded-lg mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Reason</label>
            <input
              placeholder="Enter reason"
              className="w-full border p-3 rounded-lg mt-1"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Suspension Duration (days)
            </label>
            <input
              type="number"
              placeholder="e.g 7"
              className="w-full border p-3 rounded-lg mt-1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <button
            disabled={updateStatusMutation.isPending}
            onClick={handleStatusUpdate}
            className="w-full bg-[#3900DC] text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            >
            {updateStatusMutation.isPending ? "Updating..." : "Apply Status Update"}
          </button>
        </div>
      )}

      {/* ================= BAN FORM ================= */}
      {activeModal === "ban" && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Action</label>
            <select
              className="w-full border p-3 rounded-lg mt-1"
              value={action}
              onChange={(e) => setAction(e.target.value as any)}
            >
              <option value="ban">Ban</option>
              <option value="unban">Unban</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Reason</label>
            <input
              placeholder="Enter reason"
              className="w-full border p-3 rounded-lg mt-1"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={permanent}
              onChange={(e) => setPermanent(e.target.checked)}
            />
            Permanent ban
          </label>

          <button
            disabled={banStatusMutation.isPending}
            onClick={handleBanAction}
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
            {banStatusMutation.isPending ? "Processing..." : "Submit Ban Action"}
          </button>
        </div>
      )}

      {/* ================= PROFILE FORM ================= */}
      {activeModal === "profile" && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">First Name</label>
            <input
              placeholder="Enter first name"
              className="w-full border p-3 rounded-lg mt-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Last Name</label>
            <input
              placeholder="Enter last name"
              className="w-full border p-3 rounded-lg mt-1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <input
              placeholder="+234..."
              className="w-full border p-3 rounded-lg mt-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            disabled={updateProfileMutation.isPending}
            onClick={handleProfileUpdate}
            className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
            {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
          </button>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
};

export default UserDetailPage;