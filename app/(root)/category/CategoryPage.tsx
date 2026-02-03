/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useMemo } from "react";
import Table from "@/components/Table";
import Header from "@/components/Header";
import { Search, Download } from "lucide-react";
import Link from "next/link";

import { useGetCategory, useDeleteCategory } from "@/app/actions/reactQuery";

interface TableColumn {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

interface CategoryItem {
  id: string;
  name: string;
  description?: string;
  type?: string;
  isActive: boolean;
  createdAt?: string;
  [key: string]: any;
}

const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useGetCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // Extract categories safely
  const categories: CategoryItem[] = useMemo(() => {
    return data?.categories ?? data ?? [];
  }, [data]);

  // Search filter
  const tableData = categories.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryColumns: TableColumn[] = [
    { key: "name", label: "Category Name" },
    { key: "description", label: "Description" },
    {
      key: "type",
      label: "Type",
      render: (item) => item.type || "—",
    },
    {
      key: "isActive",
      label: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            item.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (item) => {
        if (!item.createdAt) return "—";
        return new Date(item.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
  ];

  const handleAction = (item: CategoryItem, action: string) => {
    if (action === "delete") {
      if (window.confirm(`Delete category "${item.name}"?`)) {
        deleteCategoryMutation.mutate(item.id);
      }
    }
  };

  const exportToCSV = () => {
    if (tableData.length === 0) return;

    const headers = categoryColumns.map((c) => c.label).join(",");
    const rows = tableData.map((item) =>
      categoryColumns.map((c) => item[c.key] ?? "").join(",")
    );

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `categories_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
      <Header title="Category Management" />

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Search */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-[#C7C7CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 text-black border border-[#C7C7CF] rounded-lg hover:bg-gray-100"
            >
              <Download className="h-5 w-5" />
              Export CSV
            </button>

            <Link href="/category/new-category">
              <button className="bg-[#3900DC] text-white font-semibold rounded-[32px] px-6 py-2 hover:opacity-90 transition">
                New
              </button>
            </Link>
          </div>
        </div>

        {isLoading && <p className="text-center py-10">Loading categories...</p>}

        {isError && (
          <p className="text-center py-10 text-red-600">
            {(error as any)?.message || "Failed to load categories"}
          </p>
        )}

        {!isLoading && !isError && (
          <Table
            columns={categoryColumns as any}
            data={tableData as any}
            onAction={handleAction as any}
          />
        )}

        {!isLoading && !isError && tableData.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No categories found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
