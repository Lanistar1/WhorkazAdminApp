"use client";
import { useState } from 'react';
import { useAdminCourseById, useApproveCourse, useRejectCourse } from "@/app/actions/reactQuery";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Tag,
  Mail,
  Phone
} from "lucide-react";

interface CourseDetailProps {
  id: string;
}

const CoureReviewDetail = ({ id }: CourseDetailProps) => {
  const { data: course, isLoading } = useAdminCourseById(id as string);
  const [modalType, setModalType] = useState<'approve' | 'reject' | null>(null);
  const [note, setNote] = useState("");

  const approveMutation = useApproveCourse();
  const rejectMutation = useRejectCourse();

  const handleApprove = () => {
    approveMutation.mutate({
      id: id as string,
      data: { admin_id: "admin_001", review_notes: note, approved: true }
    }, { onSuccess: () => setModalType(null) });
  };

  const handleReject = () => {
    rejectMutation.mutate({
      id: id as string,
      data: { reason: "Policy Violation", rejection_notes: note, allow_resubmission: true }
    }, { onSuccess: () => setModalType(null) });
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!course) return <p className="text-center py-10">Course not found.</p>;

  const workman = course.workman;
  const fullName = workman.firstName ? `${workman.firstName} ${workman.lastName}` : "Unnamed Instructor";

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700">
              {course.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              course.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
            }`}>
              {course.status}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">{course.title}</h1>
          <p className="text-gray-500 flex items-center gap-1 mt-1 text-sm">
            Created on {new Date(course.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setModalType('reject')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            <XCircle size={18} /> Reject
          </button>
          <button 
            onClick={() => setModalType('approve')}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium"
          >
            <CheckCircle size={18} /> Approve Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Banner Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 shadow-inner border border-gray-100">
            {course.image ? (
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">No Image Provided</div>
            )}
          </div>

          {/* Details Tabs/Sections */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-8">
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
                  <BookOpen size={20} className="text-blue-500" /> Description
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{course.description}</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
                  <Tag size={20} className="text-blue-500" /> What you will learn
                </h3>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg italic border-l-4 border-blue-400">
                  {course.whatYouWillLearn}
                </p>
              </section>

              {course.classType === 'physical' && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-gray-100 bg-gray-50">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <MapPin size={16} /> Venue
                    </h4>
                    <p className="text-sm text-gray-600">{course.classPlace}</p>
                  </div>
                  <div className="p-4 rounded-lg border border-gray-100 bg-gray-50">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <Clock size={16} /> Duration
                    </h4>
                    <p className="text-sm text-gray-600">{course.estimatedDuration}</p>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Workman/Instructor Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Instructor Details</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                {workman.profilePic ? (
                  <img src={workman.profilePic} alt="avatar" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <User size={28} />
                )}
              </div>
              <div>
                <p className="font-bold text-gray-900">{fullName}</p>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {workman.userType}
                </span>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={16} /> {workman.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={16} /> {workman.phoneNumber || "No phone provided"}
              </div>
              <div className={`text-xs font-medium mt-2 flex items-center gap-1 ${
                workman.kycVerificationStatus === 'verified' ? 'text-green-600' : 'text-red-500'
              }`}>
                <CheckCircle size={14} /> KYC: {workman.kycVerificationStatus}
              </div>
            </div>
          </div>

          {/* Pricing & Logistics Card */}
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-400 text-sm font-medium mb-1">Course Price</h3>
            <p className="text-4xl font-bold mb-6">₦{Number(course.price).toLocaleString()}</p>
            
            <div className="space-y-4 text-sm border-t border-gray-800 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Class Type:</span>
                <span className="capitalize">{course.classType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Level:</span>
                <span className="capitalize">{course.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Start Date:</span>
                <span>{new Date(course.startDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal - Styled better */}
      {modalType && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl transition-all">
            <div className={`h-12 w-12 rounded-full mb-4 flex items-center justify-center ${
              modalType === 'approve' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {modalType === 'approve' ? <CheckCircle size={28} /> : <XCircle size={28} />}
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {modalType === 'approve' ? 'Approve this course?' : 'Reject this course?'}
            </h3>
            <p className="text-gray-500 mb-6">
              {modalType === 'approve' 
                ? 'This will publish the course and make it available for enrollment.' 
                : 'Please provide a reason. The instructor will see these notes.'}
            </p>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {modalType === 'approve' ? 'Internal Review Notes (Optional)' : 'Rejection Feedback (Required)'}
            </label>
            <textarea 
              className="w-full border border-gray-200 p-4 rounded-xl h-32 mb-6 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Start typing..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex gap-3">
              <button 
                onClick={() => setModalType(null)} 
                className="flex-1 px-4 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={modalType === 'approve' ? handleApprove : handleReject}
                className={`flex-1 px-4 py-3 rounded-xl text-white font-semibold transition-all shadow-md active:scale-95 ${
                  modalType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
                disabled={approveMutation.isPending || rejectMutation.isPending}
              >
                {approveMutation.isPending || rejectMutation.isPending ? 'Processing...' : 'Confirm Action'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoureReviewDetail;