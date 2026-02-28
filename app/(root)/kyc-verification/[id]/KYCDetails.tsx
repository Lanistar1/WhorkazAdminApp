/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useGetKYCDetail, useApproveKYC, useDeclineKYC } from "@/app/actions/reactQuery";
import { User, Mail, BadgeCheck, Calendar, FileText, ArrowLeft, X, CheckCircle, AlertTriangle } from "lucide-react";
import Image from "next/image";

// Temporary interface to fix TS errors until BE updates response
interface KYCUserDetail {
  firstName?: string;
  lastName?: string;
  email?: string;
  userType?: string;
  createdAt: string;
  kycType?: string;
  kycIdPicture?: string;
}

const KYCDetailPage = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { token } = useAuth();

  const { data, isLoading } = useGetKYCDetail(id, token as string);
  // const user = data as unknown as KYCUserDetail;
  const user = data?.application;

  const approveMutation = useApproveKYC();
  const declineMutation = useDeclineKYC();

  // Modal States
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  // Form States
  const [approveData, setApproveData] = useState({ verification_notes: "", badge_level: "bronze" });
  const [declineData, setDeclineData] = useState({ reason: "", rejection_notes: "", allow_resubmission: true });

  if (isLoading) return <div className="p-12 text-center text-gray-500">Loading Application Details...</div>;
  if (!user) return <div className="p-12 text-center text-gray-500">Application not found.</div>;

  const handleApproveSubmit = () => {
    approveMutation.mutate({ id, data: approveData }, {
      onSuccess: () => router.push('/kyc-verification')
    });
  };

  const handleDeclineSubmit = () => {
    declineMutation.mutate({ id, data: declineData }, {
      onSuccess: () => router.push('/kyc-verification')
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-[#F9FAFB] min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-black transition w-fit">
          <ArrowLeft size={18} /> Back to List
        </button>
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">KYC Application</h1>
            <p className="text-gray-500 text-sm">Reviewing application ID: <span className="font-mono">{id}</span></p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowDeclineModal(true)}
              className="px-6 py-2.5 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              Decline Request
            </button>
            <button
              onClick={() => setShowApproveModal(true)}
              className="px-6 py-2.5 bg-[#3900DC] text-white rounded-lg font-semibold hover:bg-[#2E00B3] transition"
            >
              Approve KYC
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* User Info Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
            <h2 className="text-lg font-bold border-b pb-2">User Information</h2>
            <div className="space-y-4">
              <InfoRow icon={<User size={18}/>} label="Full Name" value={`${user.user_info.first_name ?? 'Pending'} ${user.user_info.last_name ?? ''}`} />
              <InfoRow icon={<Mail size={18}/>} label="Email Address" value={user.user_info.email ?? 'Pending'} />
              <InfoRow icon={<BadgeCheck size={18}/>} label="User Type" value={user.user_info.date_of_birth ?? 'Pending'} color="capitalize" />
              <InfoRow icon={<Calendar size={18}/>} label="Submitted On" value={
                user?.submitted_at
                  ? new Date(user.submitted_at).toLocaleDateString()
                  : 'Pending'
              } />
            </div>
          </div>
        </div>

        {/* Document Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
            <div className="flex justify-between items-center">
               <h2 className="text-lg font-bold flex items-center text-[#222222] gap-2">
                <FileText size={20} className="text-gray-400" />
                Document Proof: <span className="uppercase text-[#3900DC]">{user.kyc_type ?? 'N/A'}</span>
              </h2>
              {/* {user.documents && (
                <a href={user.documents} target="_blank" className="text-sm text-[#3900DC] font-medium hover:underline">
                    View Original
                </a>
              )} */}
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border bg-gray-50">
              {user?.documents?.[0]?.url ? (
                <Image
                  src={user.documents[0].url}
                  alt="KYC Document"
                  fill
                  className="object-contain p-2"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 italic">
                  No document image provided
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- APPROVE MODAL --- */}
      {showApproveModal && (
        <Modal title="Confirm Approval" onClose={() => setShowApproveModal(false)}>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg flex gap-3 text-sm">
              <CheckCircle size={20} />
              <p>You are about to approve this user KYC. This will grant them a verification badge.</p>
            </div>
            <div >
              <label className="block text-[#222222]  text-sm font-medium mb-1">Select Badge Level</label>
              <select 
                className="w-full text-[#222222] border border-[#cccccc] p-2 rounded-lg outline-none focus:ring-1 focus:ring-[#3900DC]"
                value={approveData.badge_level}
                onChange={(e) => setApproveData({...approveData, badge_level: e.target.value})}
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
              </select>
            </div>
            <div>
              <label className="block text-[#222222] text-sm font-medium mb-1">Verification Notes</label>
              <textarea 
                className="w-full text-[#222222] border border-[#cccccc] p-2 rounded-lg h-24 outline-none focus:ring-1 focus:ring-[#3900DC]"
                placeholder="e.g. All documents verified..."
                onChange={(e) => setApproveData({...approveData, verification_notes: e.target.value})}
              />
            </div>
            <button 
              onClick={handleApproveSubmit}
              disabled={approveMutation.isPending}
              className="w-full bg-[#3900DC] text-white py-2.5 rounded-lg font-bold disabled:opacity-50"
            >
              {approveMutation.isPending ? "Approving..." : "Complete Approval"}
            </button>
          </div>
        </Modal>
      )}

      {/* --- DECLINE MODAL --- */}
      {showDeclineModal && (
        <Modal title="Decline Application" onClose={() => setShowDeclineModal(false)}>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 text-red-700 rounded-lg flex gap-3 text-sm">
              <AlertTriangle size={20} />
              <p>Please provide a reason for declining. This will be sent to the user.</p>
            </div>
            <div>
              <label className="block text-[#222222] text-sm font-medium mb-1">Select Primary Reason</label>
              <select 
                className="w-full text-[#222222] border border-[#cccccc] p-2 rounded-lg outline-none focus:ring-1 focus:ring-red-500"
                onChange={(e) => setDeclineData({...declineData, reason: e.target.value})}
              >
                <option value="">Select a reason</option>
                <option value="Document quality insufficient">Blurry Image</option>
                <option value="Invalid Document Type">Invalid Document</option>
                <option value="Expired Document">Expired ID</option>
                <option value="Details Mismatch">Mismatched Name/DOB</option>
              </select>
            </div>
            <div>
              <label className="block text-[#222222] text-sm font-medium mb-1">Rejection Notes (Sent to user)</label>
              <textarea 
                className="w-full text-[#222222] border border-[#cccccc] p-2 rounded-lg h-24 outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Explain what the user needs to fix..."
                onChange={(e) => setDeclineData({...declineData, rejection_notes: e.target.value})}
              />
            </div>
            <div className="flex  items-center gap-2">
              <input 
                type="checkbox" 
                id="resubmit" 
                checked={declineData.allow_resubmission}
                onChange={(e) => setDeclineData({...declineData, allow_resubmission: e.target.checked})}
              />
              <label htmlFor="resubmit" className="text-sm text-[#222222]">Allow user to resubmit documents</label>
            </div>
            <button 
              onClick={handleDeclineSubmit}
              disabled={declineMutation.isPending || !declineData.reason}
              className="w-full bg-red-600 text-white py-2.5 rounded-lg font-bold disabled:opacity-50"
            >
              {declineMutation.isPending ? "Declining..." : "Confirm Decline"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// --- Small Reusable Components to clean up the JSX ---

const InfoRow = ({ icon, label, value, color = "" }: { icon: any, label: string, value: string, color?: string }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-gray-50 text-gray-500 rounded-lg">{icon}</div>
    <div>
      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{label}</p>
      <p className={`font-medium text-gray-900 ${color}`}>{value}</p>
    </div>
  </div>
);

const Modal = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-black"><X size={24}/></button>
      </div>
      {children}
    </div>
  </div>
);

export default KYCDetailPage;