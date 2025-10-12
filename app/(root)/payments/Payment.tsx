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
    case "completed":
      return "bg-green-100 text-green-800";
    case "failed":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "refund":
      return "bg-[#F3EFFF] text-[#3900DC]";
    default:
      return "";
  }
};

interface TableItem {
  id: string | number;
  [key: string]: any;
}

const Payment = () => {
  const userColumns: TableColumn[] = [
    { key: "id", label: "Transaction Id" },
    { key: "clientName", label: "Client name" },
    { key: "providerName", label: "Provider name" },
    { key: "jobTitle", label: "Job title" },
    { key: "amount", label: "Amount" },
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
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refund">Refund</option>
          </select>
        );
      },
    },
  ];

  const [userData, setUserData] = useState([
    { id: "TXN-10234", clientName: "Ibrahim Musa", providerName: "Musa Electric", jobTitle: "Rewiring Apartment", amount: "₦150,000", status: "Completed" },
    { id: "TXN-10235", clientName: "Ibrahim Musa", providerName: "Musa Electric", jobTitle: "Rewiring Apartment", amount: "₦150,000", status: "Pending" },
    { id: "TXN-10236", clientName: "Ibrahim Musa", providerName: "Musa Electric", jobTitle: "Rewiring Apartment", amount: "₦150,000", status: "Failed" },
    { id: "TXN-10237", clientName: "Ibrahim Musa", providerName: "Musa Electric", jobTitle: "Rewiring Apartment", amount: "₦150,000", status: "Refund" },
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
      <Header title="Payments and Transactions" />
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

export default Payment;
