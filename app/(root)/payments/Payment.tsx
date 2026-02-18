/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import Header from "@/components/Header";
import { Search, Download, Table2 } from "lucide-react";
import { useGetTransactionList } from "@/app/actions/reactQuery";
import Pagination from "@/components/Pagination.tsx";
import { PaginatedPaymentsResponse } from "@/app/actions/type";

// ✅ Extract this helper component to safely use useState
const StatusSelect = ({
  item,
  updateStatus,
}: {
  item: any;
  updateStatus?: (id: string | number, newStatus: string) => void;
}) => {
  const [status, setStatus] = useState(item.status);

 


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
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
      <option value="Failed">Failed</option>
      <option value="Refund">Refund</option>
    </select>
  );
};

interface TableColumn {
  key: string;
  label: string;
  render?: (
    item: any,
    updateStatus?: (id: string | number, newStatus: string) => void
  ) => React.ReactNode;
}

interface TableItem {
  id: string | number;
  [key: string]: any;
}

const Payment = () => {
  const userColumns: TableColumn[] = [
    { key: "id", label: "Transaction Id" },
    { key: "clientName", label: "Client name" },
    { key: "paymentFor", label: "Payment for" },
    { key: "jobTitle", label: "Job title" },
    { key: "amount", label: "Amount" },
    {
      key: "status",
      label: "Status",
      // ✅ Now using our StatusSelect component here
      render: (item, updateStatus) => (
        <StatusSelect item={item} updateStatus={updateStatus} />
      ),
    },
  ];

  // const { data, isLoading, isError } = useGetTransactionList();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;


  const [userData, setUserData] = useState<any[]>([]);

   const mapApiStatusToUiStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "initialized":
        return "Pending";
      case "successful":
        return "Completed";
      case "failed":
        return "Failed";
      case "refund":
        return "Refund";
      default:
        return status;
    }
  };

  const { data, isLoading } = useGetTransactionList({
    page,
    limit,
    status: filterStatus === 'all' ? undefined : filterStatus,
  });

  // const payments = data?.payments ?? [];
  // const totalPages = data?.totalPages ?? 1;

  const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();



  const response = data as PaginatedPaymentsResponse | undefined;
  const totalPages = response?.totalPages ?? 1;


  const formattedData = React.useMemo(() => {
    if (!response?.payments) return [];

    return response.payments.map((p) => ({
      id: p.reference,
      clientName: p.payer?.email ?? "-",
      paymentFor: p.contextType ?? "-",
      jobTitle: p.job?.title ?? "N/A",
      amount: `₦${Number(p.amount).toLocaleString()}`,
      // status: capitalize(p.status),
      status: mapApiStatusToUiStatus(p.status),
    }));
  }, [response]);


  // const formattedData = React.useMemo(() => {
  //   return payments.map((p : any) => ({
  //     id: p.reference,
  //     clientName: p.payer?.email ?? '-',
  //     providerName: p.provider ?? '-',
  //     jobTitle: p.job?.title ?? '-',
  //     amount: `₦${Number(p.amount).toLocaleString()}`,
  //     status: capitalize(p.status),
  //   }));
  // }, [payments]);




  if (isLoading) {
    return (
      <div className="p-12 text-center text-gray-500">
        Loading transactions...
      </div>
    );
  }

  // if (!userData.length) {
  //   return (
  //     <div className="p-12 text-center text-gray-500">
  //       No transactions found.
  //     </div>
  //   );
  // }

  if (!formattedData.length && !isLoading) {
    return (
      <div className="p-12 text-center text-gray-500">
        No transactions found.
      </div>
    );
  }


  // useEffect(() => {
  //   if (data?.transactions) {
  //     const formatted = data.transactions.map((txn: any) => ({
  //       id: txn.reference || txn._id,
  //       clientName: txn.client?.name || "-",
  //       providerName: txn.provider?.businessName || "-",
  //       jobTitle: txn.job?.title || "-",
  //       amount: `₦${txn.amount?.toLocaleString()}`,
  //       status: txn.status,
  //     }));

  //     setUserData(formatted);
  //   }
  // }, [data]);

  // const [filterStatus, setFilterStatus] = useState("all");

  const handleAction = (item: TableItem, action: string) => {
    console.log(`Action: ${action} on item`, item);
  };

  const updateStatus = (id: string | number, newStatus: string) => {
    setUserData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // const filteredData = userData.filter((item) => {
  //   const matchesSearch = Object.values(item)
  //     .join(" ")
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesStatus =
  //     filterStatus === "all" ||
  //     item.status.toLowerCase() === filterStatus.toLowerCase();
  //   return matchesSearch && matchesStatus;
  // });


  const filteredData = formattedData.filter((item : any) => {
    const matchesSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });


  const exportToCSV = () => {
    const headers = userColumns.map((col) => col.label).join(",");
    const rows = filteredData.map((item : any) =>
      userColumns
        .map((col) =>
          col.key === "status"
            ? item.status
            : (item as Record<string, any>)[col.key]
        )
        .join(",")
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

        {!filteredData.length ? (
          <div className="p-12 text-center text-gray-500">
            No transactions match your filter.
          </div>
        ) : (
          <Table
            columns={userColumns}
            data={filteredData}
            onAction={handleAction}
            updateStatus={updateStatus}
          />
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />



        {/* <Table
          columns={userColumns}
          data={filteredData}
          onAction={handleAction}
          updateStatus={updateStatus}
        /> */}
      </div>
    </div>
  );
};

export default Payment;

