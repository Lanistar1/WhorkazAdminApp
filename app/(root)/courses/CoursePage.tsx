/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from "react";
import Table from "@/components/Table";
import Header from "@/components/Header";
import { Search, Download } from "lucide-react"; // Removed Filter icon as it's not used

interface TableColumn {
  key: string;
  label: string;
  render?: (item: any, updateStatus?: (id: string | number, newStatus: string) => void) => React.ReactNode;
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "resubmit":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "";
  }
};

interface TableItem {
  id: string | number;
  [key: string]: any;
}

const CoursePage = () => {
  const userColumns: TableColumn[] = [
    { key: "courseTitle", label: "Course title" },
    { key: "submittedBy", label: "Submitted By" },
    { key: "submittedDate", label: "Date Submitted" },
    { key: "viewCourse", label: "View course" },
    {
      key: "status",
      label: "Status",
      render: (item, updateStatus) => {
        const [status, setStatus] = useState(item.status);
        return (
          <select
            value={status}
            onChange={(e) => {
              const newStatus = e.target.value;
              setStatus(newStatus);
              if (updateStatus) updateStatus(item.id, newStatus);
            }}
            className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusClass(status)} border-none focus:outline-none`}
          >
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="resubmit">Resubmit</option>
          </select>
        );
      },
    },
  ];

  const [userData, setUserData] = useState([
    { courseTitle: "Wiring Basics for Beginners", submittedBy: "David Onuoha", submittedDate: "19-06-24", viewCourse: "View course", status: "Accepted" },
    { courseTitle: "Wiring Basics for Beginners", submittedBy: "Ibrahim Musa", submittedDate: "19-06-24", viewCourse: "View course", status: "Rejected" },
    { courseTitle: "Wiring Basics for Beginners", submittedBy: "David Onuoha", submittedDate: "19-06-24", viewCourse: "View course", status: "Resubmit" },
    { courseTitle: "Wiring Basics for Beginners", submittedBy: "Ibrahim Musa", submittedDate: "19-06-24", viewCourse: "View course", status: "Accepted" },

  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleAction = (item: TableItem, action: string) => {
    console.log(`Action: ${action} on item`, item);
    // Add navigation or API logic here (e.g., router.push(`/payments/${item.id}`) for "view")
  };

  const updateStatus = (id: string | number, newStatus: string) => {
    setUserData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // Filter data based on search term and status
  const filteredData = userData.filter((item) => {
    const matchesSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Basic CSV export function
  const exportToCSV = () => {
    const headers = userColumns.map((col) => col.label).join(",");
    const rows = filteredData.map((item) =>
      userColumns.map((col) => (col.key === "status" ? item.status : item[col.key])).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
      <Header title="Courses and content" />
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search by reference"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-[#C7C7CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          {/* Filter and Export */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-[#C7C7CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refund">Refund</option>
            </select>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 text-black border border-[#C7C7CF] rounded-lg hover:bg-[#2E00B3]"
            >
              <Download className="h-5 w-5" />
              Export CSV
            </button>
          </div>
        </div>

        <Table columns={userColumns} data={filteredData} onAction={handleAction} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default CoursePage;

