/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from "react";
import Table from "@/components/Table";
import Header from "@/components/Header";
import { Search, Filter, Download } from "lucide-react"; // Assuming icons from lucide-react

interface TableColumn {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "approve":
      return "bg-green-100 text-green-800";
    case "reject":
      return "bg-red-100 text-red-800";
    case "resubmit":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "";
  }
};

interface TableItem {
//   id: string | number;
  [key: string]: any;
}

const DisputeCenter = () => {
  const userColumns: TableColumn[] = [
    { key: "name", label: "Client" },
    { key: "provider", label: "Provider" },
    { key: "evidence", label: "Submitted evidence" },
    { key: "type", label: "Dispute type" },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(item.status)}`}>
          {item.status}
        </span>
      ),
    },
  ];

  const userData = [
    { name: "John Doe", evidence: "SC_23456_img", type: "Job quality", status: "Approve", provider : "Sandra Onyekachi" },
    { name: "Jane Smith", evidence: "SC_23456_img", type: "Job quality", status: "Reject", provider : "Sandra Onyekachi" },
    { name: "Bob Johnson", evidence: "SC_23456_img", type: "Job quality", status: "Resubmit", provider : "Sandra Onyekachi" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleAction = (item: TableItem, action: string) => {
    console.log(`Action: ${action} on item`, item);
    // Add navigation or API logic here (e.g., router.push(`/users/${item.id}`) for "view")
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
      userColumns.map((col) => item[col.key]).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-0">
      <Header title="KYC & Verification" />
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
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

        <Table columns={userColumns} data={filteredData} onAction={handleAction} />
      </div>
    </div>
  );
};

export default DisputeCenter;