/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useMemo } from "react";
import Table2 from "@/components/Table2";
import Header from "@/components/Header";
import { Search, Download } from "lucide-react";
import Link from "next/link";
import CustomModal from "@/components/CustomModal";
import SuccessModal from "@/components/SuccessModal";

// Hooks and mutations
import {
  useGetCourseList,
  useApproveCourse,
  useRejectCourse,
} from "@/app/actions/reactQuery"; // Adjust path

// Types from table component (import to make compatible)
import type { TableItem } from "@/components/Table2";
import { useAuth } from "@/app/context/AuthContext";

// Course types based on your API response
interface Workman {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  price: string;
  classType: "physical" | "online";
  isActive: boolean;
  averageRating: string;
  totalRatings: number;
  totalEnrollments: number;
  createdAt: string;
  updatedAt: string;
  workman: Workman;
  status?: string;  // Optional since not in current API response
}

interface PaginatedCourses {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Payload types
export type approveCoursetype = {
  admin_id: string;
  review_notes: string;
  approved: boolean;
};

export type rejectCoursetype = {
  reason: string;
  rejection_notes: string;
  allow_resubmission: boolean;
};

// Status class helper
const getStatusClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Status Select component (typed for Course)
const StatusSelect = ({
  item,
  updateStatus,
}: {
  item: Course;
  updateStatus?: (id: string | number, newStatus: string) => void;
}) => {
  const [status, setStatus] = useState(item.status || "resubmit");

  return (
    <select
      value={status}
      onChange={(e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        if (updateStatus) updateStatus(item.id, newStatus);
      }}
      className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusClass(
        status
      )} border-none focus:outline-none`}
    >
      <option value=""></option>
      <option value="accepted">Accepted</option>
      <option value="rejected">Rejected</option>
    </select>
  );
};

// Local TableColumn interface (non-generic to avoid issues)
interface TableColumn {
  key: string;
  label: string;
  render?: (
    item: any,
    updateStatus?: (id: string | number, newStatus: string) => void
  ) => React.ReactNode;
}

// Component
const CoursePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Course | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");
  const [requestResubmission, setRequestResubmission] = useState(false);

  // Fetch courses
  const {
    data: rawData,
    isLoading,
    isError,
    error,
  } = useGetCourseList({
    keyword: searchTerm.trim() || undefined,
    category: undefined, // add if needed
    status: filterStatus === "all" ? undefined : filterStatus,
  });

  // Extract courses
  const courses = useMemo(() => rawData?.courses ?? [], [rawData]);

  // Mutations (per course id)
  // const approveMutation = useApproveCourse(selectedItem?.id || "");
  // const rejectMutation = useRejectCourse(selectedItem?.id || "");

  const approveMutation = useApproveCourse();
  const rejectMutation = useRejectCourse();

  // Filtered data
  const filteredData = courses.filter((item) => {
    const matchesSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (item.status || "resubmit").toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAction = (item: Course, action: string) => {
    console.log(`Action: ${action} on item`, item);
  };

  const updateStatus = (id: string | number, status: string) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      setSelectedItem(course);          // ← use setSelectedItem
      setNewStatus(status);
      setConfirmationModalOpen(true);
    }
  };

 
  const handleConfirm = () => {
    if (!selectedItem?.id || !newStatus) return;

    // Replace with real admin ID from your auth context
    const adminId = "your-real-admin-id-here"; // ← update this


    if (newStatus === "accepted") {
      const payload: approveCoursetype = {
        admin_id: adminId,
        review_notes: reason.trim() || "Approved",
        approved: true,
      };

      approveMutation.mutate(
        { id: selectedItem.id, data: payload },
        {
          onSuccess: () => {
            setConfirmationModalOpen(false);
            setSuccessModalOpen(true);
            setReason("");
            setRequestResubmission(false);
          },
        }
      );
    } else {
      const payload: rejectCoursetype = {
        reason: reason.trim() || "Not approved",
        rejection_notes: reason.trim() || "",
        allow_resubmission: newStatus === "resubmit" || requestResubmission,
      };

      rejectMutation.mutate(
        { id: selectedItem.id, data: payload },
        {
          onSuccess: () => {
            setConfirmationModalOpen(false);
            setSuccessModalOpen(true);
            setReason("");
            setRequestResubmission(false);
          },
        }
      );
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalOpen(false);
    setReason("");
    setRequestResubmission(false);
  };

  const handleCloseSuccess = () => {
    setSuccessModalOpen(false);
  };

  const exportToCSV = () => {
    const headers = userColumns.map((col) => col.label).join(",");
    const rows = filteredData.map((item) =>
      userColumns.map((col) => {
        if (col.render) {
          return col.render(item) ?? "";
        }
        return item[col.key] ?? "";
      }).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "courses.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const userColumns: TableColumn[] = [
    {
      key: "courseTitle",
      label: "Course title",
      render: (item) => item.title,
    },
    {
      key: "submittedBy",
      label: "Submitted By",
      render: (item) => {
        const w = item.workman;
        return `${w.firstName || ""} ${w.lastName || ""}`.trim() || w.email;
      },
    },
    {
      key: "submittedDate",
      label: "Date Submitted",
      render: (item) => new Date(item.createdAt).toLocaleDateString("en-GB"),
    },
    {
      key: "viewCourse",
      label: "View course",
      render: (item) => (
        <Link href={`/courses/${item.id}`}>
          <span className="text-blue-600 hover:underline cursor-pointer">
            View course
          </span>
        </Link>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item, updateStatus) => (
        <StatusSelect item={item} updateStatus={updateStatus} />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
      <Header title="Courses and content" />
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search by course title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-[#C7C7CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-[#C7C7CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
            >
              <option value="all">All Statuses</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 text-black border border-[#C7C7CF] rounded-lg hover:bg-[#2E00B3]"
            >
              <Download className="h-5 w-5" />
              Export CSV
            </button>
            <Link href="/courses/new-course">
              <button
                className="bg-[#3900DC] cursor-pointer text-white font-semibold rounded-[32px] w-[80px] py-2  px-5 flex items-center justify-center hover:opacity-90 transition"
              >
                New
              </button>
            </Link>
          </div>
        </div>

        <Table2
          columns={userColumns as TableColumn<TableItem>[]}
          data={filteredData as TableItem[]}
          onAction={handleAction}
          updateStatus={updateStatus}
        />
      </div>
      <CustomModal
        isOpen={confirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        status={newStatus}
        reason={reason}
        setReason={setReason}
        requestResubmission={requestResubmission}
        setRequestResubmission={setRequestResubmission}
      />
      <SuccessModal
        isOpen={successModalOpen}
        onClose={handleCloseSuccess}
        previousStatus={newStatus}
      />
    </div>
  );
};

export default CoursePage;