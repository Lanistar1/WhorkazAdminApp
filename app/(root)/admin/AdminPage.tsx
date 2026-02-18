
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useMemo } from "react";
import Table from "@/components/Table";
import Header from "@/components/Header";
import { Search, Download } from "lucide-react";

import { useDeleteAdmin, useGetAdmin, useGetUsers } from "@/app/actions/reactQuery"; // ← adjust path if needed
import { AdminUser } from "@/app/actions/type";
import Link from "next/link";
// import { useAuth } from wherever your auth context/hook is

interface TableColumn {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

const getStatusClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface DisplayAdmin {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  userType?: string;
  status?: string;
  createdAt?: string;
  [key: string]: any;
}

interface DisplayUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  userType?: string;
  status?: string;
  createdAt?: string;
  // keep [key: string]: any; if you really need it
  [key: string]: any;
}

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");


  const { 
  data: response, 
  isLoading, 
  isError, 
  error 
} = useGetAdmin();

// Extract admins safely
const admins: AdminUser[] = useMemo(() => {
  return response?.data?.admins ?? [];
}, [response]);

// ======== delete Admin ===========
const deleteAdminMutation = useDeleteAdmin();

// Debug logs (remove after confirming)
console.log("Full admin response:", response);
console.log("Extracted admins:", admins);

// Filtering (now type-safe)
const filteredAdmins = admins.filter(admin => {
  if (filterStatus === "all") return true;
  return admin.status?.toLowerCase() === filterStatus.toLowerCase();
});

// Table data (type-safe)
const tableData: AdminUser[] = filterStatus === "all" 
  ? filteredAdmins 
  : filteredAdmins.filter(admin => admin.status?.toLowerCase() === filterStatus.toLowerCase());



  // Client-side search (only if your API doesn't support keyword filtering)
//   const filteredAdmins = admins.filter(admin => {
//   if (filterStatus === "all") return true;
//   return admin.status?.toLowerCase() === filterStatus.toLowerCase();
// });


  if (isLoading) {
    return <div className="p-6">Loading admins...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load users: {error?.message || "Unknown error"}
      </div>
    );
  }


  const userColumns: TableColumn[] = [
    {
      key: "name",
      label: "Name",
      render: (item) => {
        const fullName = [item.firstName, item.lastName]
          .filter(Boolean)
          .join(" ")
          .trim();

        return fullName || item.email?.split("@")[0] || "—";
      },
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (item: AdminUser) => {
        const roleName = item.adminProfile?.role?.name;

        if (!roleName) return "—";

        return roleName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      },
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(item.status)}`}>
          {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Unknown"}
        </span>
      ),
    },
    {
      key: "date",
      label: "Signup date",
      render: (item) => {
        if (!item.createdAt) return "—";
        try {
          const date = new Date(item.createdAt);
          return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          // or: return date.toISOString().split("T")[0]; // YYYY-MM-DD
        } catch {
          return "—";
        }
      },
    },
  ];

    // ==  deleting admin ======
    const handleAction = (item: AdminUser, action: string) => {
        console.log(`Action: ${action} on admin`, item);

        if (action === "delete") {
            // Show a confirmation before deleting
            if (window.confirm(`Are you sure you want to delete admin "${item.firstName || item.email}"? This cannot be undone.`)) {
            // Trigger the delete mutation with the admin's ID
            deleteAdminMutation.mutate(item.id, {
                onSuccess: () => {
                console.log("Admin deleted successfully");
                // The mutation already invalidates the query → table will auto-refresh
                },
                onError: (err) => {
                console.error("Delete failed:", err);
                // Optional: toast.error("Failed to delete admin")
                },
            });
            }
        } else {
            // Handle other actions (view, edit) if needed
            console.log(`Unhandled action: ${action}`);
        }

        // Do NOT close modal here — let the table component handle it after action
        // closeModal();  ← REMOVE or COMMENT this line if it's here
    };

  //======== export file ==========
  const exportToCSV = () => {
    if (tableData.length === 0) return;

    const headers = userColumns.map((col) => col.label).join(",");
    const rows = tableData.map((item) =>
      userColumns
        .map((col) => {
          const value = item[col.key];
          // Escape commas and quotes
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value ?? "";
        })
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `users_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
      <Header title="Admin Management" />

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-[#C7C7CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          {/* Filter + Export */}
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
              disabled={isLoading || tableData.length === 0}
              className="flex items-center gap-2 px-4 py-2 text-black border border-[#C7C7CF] rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <Download className="h-5 w-5" />
              Export CSV
            </button>
            <Link href="/admin/new-admin">
              <button
                className="bg-[#3900DC] cursor-pointer text-white font-semibold rounded-[32px] w-[80px] py-2  px-5 flex items-center justify-center hover:opacity-90 transition"
              >
                New
              </button>
            </Link>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading users...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-10 text-red-600">
            <p>Failed to load users</p>
            <p className="text-sm">{(error as any)?.message || "Unknown error"}</p>
          </div>
        )}

        {!isLoading && !isError && (
          <Table
            columns={userColumns as any}  // ← safe assertion
            data={tableData as any}       // ← safe assertion
            onAction={handleAction as any} // ← safe assertion (optional, but fixes the onAction mismatch)
            // isLoading={isLoading}      // if your Table supports it
            />
        )}

        {!isLoading && !isError && tableData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No users found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;