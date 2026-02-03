/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useMemo } from "react";
import Table from "@/components/Table";
import Header from "@/components/Header";
import { Search, Download } from "lucide-react";
import Link from "next/link";

import { useGetService, useDeleteService } from "@/app/actions/reactQuery"; // adjust path
import { createServiceType } from "@/app/actions/type";

interface TableColumn {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

const ServicePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: services = [], isLoading, isError, error } = useGetService();

//   const { data: services = [], isLoading } = useGetService();

    const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


//   const { data: response, isLoading, isError, error } = useGetService();

  // always default to array to avoid runtime errors
//   const services: createServiceType[] = response ?? [];



  const deleteServiceMutation = useDeleteService();

//   const filteredServices = services.filter((s) =>
//     s.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  const tableColumns: TableColumn[] = [
    { key: "name", label: "Service Name" },
    { key: "description", label: "Description" },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {item.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleAction = (item: createServiceType, action: string) => {
    if (action === "delete" && window.confirm(`Delete service "${item.name}"?`)) {
      deleteServiceMutation.mutate(item.name); // or ID if your API returns it
    }
  };

  const exportToCSV = () => {
    if (!filteredServices.length) return;
    const headers = tableColumns.map((col) => col.label).join(",");
    const rows = filteredServices.map((item : any) =>
      tableColumns.map((col) => item[col.key] ?? "").join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `services_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header title="Service Management" />

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search by service name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={exportToCSV}
              disabled={isLoading || filteredServices.length === 0}
              className="flex items-center gap-2 px-4 py-2 text-black border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <Download className="h-5 w-5" />
              Export CSV
            </button>

            <Link href="/services/new-service">
              <button className="bg-indigo-600 text-white font-semibold rounded-full px-5 py-2 hover:opacity-90">
                New
              </button>
            </Link>
          </div>
        </div>

        {isLoading && <div>Loading services...</div>}
        {isError && <div className="text-red-600">Error: {(error as any)?.message}</div>}

        {!isLoading && !isError && filteredServices.length > 0 && (
          <Table columns={tableColumns as any} data={filteredServices as any} onAction={handleAction as any} />
        )}

        {!isLoading && !isError && filteredServices.length === 0 && (
          <div className="text-center py-12 text-gray-500">No services found.</div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
