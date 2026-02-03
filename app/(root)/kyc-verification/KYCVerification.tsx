/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from "react";
import Table from "@/components/Table";
import Header from "@/components/Header";
import { Search, Download } from "lucide-react"; // Removed Filter icon as it's not used
import Table2 from "@/components/Table2";

interface TableColumn {
  key: string;
  label: string;
  render?: (item: any, updateStatus?: (id: string | number, newStatus: string) => void) => React.ReactNode;
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
  id?: string | number; // Made optional for now, but you can assign unique IDs
  [key: string]: any;
}

const KYCVerification = () => {
  const userColumns: TableColumn[] = [
    { key: "name", label: "User name" },
    { key: "date", label: "Date Submitted" },
    { key: "doc", label: "Document type" },
    { key: "role", label: "Role" },
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
              if (updateStatus) updateStatus(item.id, newStatus); // No need for fallback now that id exists
            }}
            className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusClass(status)} border-none focus:outline-none`}
          >
            <option value="Approve">Approve</option>
            <option value="Reject">Reject</option>
            <option value="Resubmit">Resubmit</option>
          </select>
        );
      },
    },
  ];

  const [userData, setUserData] = useState([
    { id: 1, name: "John Doe", doc: "ID card", role: "Workman", status: "Approve", date: "20/08/2022" },
    { id: 2, name: "Jane Smith", doc: "ID card", role: "Workman", status: "Reject", date: "20/08/2022" },
    { id: 3, name: "Bob Johnson", doc: "ID card", role: "Workman", status: "Resubmit", date: "20/08/2022" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleAction = (item: TableItem, action: string) => {
    console.log(`Action: ${action} on item`, item);
    // Add navigation or API logic here (e.g., router.push(`/kyc/${item.id}`) for "view")
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
    // const rows = filteredData.map((item) =>
    //   userColumns.map((col) => (col.key === "status" ? item.status : item[col.key])).join(",")
    // );
    const rows = filteredData.map((item) =>
        userColumns.map((col) => 
            col.key === "status" ? item.status : (item as Record<string, any>)[col.key]
        ).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kyc_verification.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
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
              <option value="approve">Approve</option>
              <option value="reject">Reject</option>
              <option value="resubmit">Resubmit</option>
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

        <Table2 columns={userColumns} data={filteredData} onAction={handleAction} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default KYCVerification;





/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'

// import React, { useState } from "react";
// import Table from "@/components/Table";
// import Header from "@/components/Header";
// import { Search, Download } from "lucide-react"; // Removed Filter icon as it's not used
// import Table2 from "@/components/Table2";
// import Pagination from "@/components/Pagination.tsx";
// import { KYCItem, KYCStatus } from "@/app/actions/type";
// import { useGetPendingKYC } from "@/app/actions/reactQuery";

// interface TableColumn {
//   key: string;
//   label: string;
//   render?: (item: any, updateStatus?: (id: string | number, newStatus: string) => void) => React.ReactNode;
// }

// const getStatusClass = (status: string) => {
//   switch (status.toLowerCase()) {
//     case "approve":
//       return "bg-green-100 text-green-800";
//     case "reject":
//       return "bg-red-100 text-red-800";
//     case "resubmit":
//       return "bg-yellow-100 text-yellow-800";
//     default:
//       return "";
//   }
// };

// interface TableItem {
//   id?: string | number; // Made optional for now, but you can assign unique IDs
//   [key: string]: any;
// }

// const KYCVerification = () => {
//   const [page, setPage] = useState(1);
//   const limit = 20;
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');

//   const { data, isLoading } = useGetPendingKYC({
//     page,
//     limit,
//     status: filterStatus === 'all' ? undefined : filterStatus,
//     keyword: searchTerm || undefined,
//   });

//   const [userData, setUserData] = useState<KYCItem[]>([]);

//   // Format API data into table-friendly state
//   React.useEffect(() => {
//     if (data?.users) {
//       setUserData(data.users);
//     }
//   }, [data?.users]);

//   const handleAction = (item: KYCItem, action: string) => {
//     console.log(`Action: ${action} on item`, item);
//   };

//   const updateStatus = (id: string | number, newStatus: KYCStatus) => {
//     setUserData((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
//     );
//   };

//   const filteredData = userData.filter((item) => {
//     const matchesSearch = Object.values(item)
//       .join(' ')
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase();
//     return matchesSearch && matchesStatus;
//   });

//    // ✅ Your table columns
//   const userColumns: TableColumn[] = [
//     { key: "name", label: "User name" },
//     { key: "date", label: "Date Submitted" },
//     { key: "doc", label: "Document type" },
//     { key: "role", label: "Role" },
//     {
//       key: "status",
//       label: "Status",
//       render: (item: KYCItem, updateStatus) => {
//         const [status, setStatus] = useState(item.status);
//         return (
//           <select
//             value={status}
//             onChange={(e) => {
//               const newStatus = e.target.value as KYCStatus;
//               setStatus(newStatus);
//               if (updateStatus) updateStatus(item.id, newStatus);
//             }}
//             className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusClass(status)} border-none focus:outline-none`}
//           >
//             <option value="approve">Approve</option>
//             <option value="reject">Reject</option>
//             <option value="resubmit">Resubmit</option>
//           </select>
//         );
//       },
//     },
//   ];

//   if (isLoading) {
//     return <div className="p-12 text-center text-gray-500">Loading KYC requests...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-white dark:bg-white text-gray-900">
//       <Header title="KYC & Verification" />
//       <div className="p-6">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//           <div className="relative w-full md:w-2/3">
//             <input
//               type="text"
//               placeholder="Search by name or document"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full p-2 pl-10 border border-[#C7C7CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
//           </div>

//           <div className="flex items-center gap-4 w-full md:w-auto">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="p-2 border border-[#C7C7CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
//             >
//               <option value="all">All Statuses</option>
//               <option value="approve">Approve</option>
//               <option value="reject">Reject</option>
//               <option value="resubmit">Resubmit</option>
//             </select>
//             <button
//               onClick={() => {
//                 // simple CSV export
//                 const headers = ['Name', 'Document', 'Role', 'Status', 'Date Submitted'];
//                 const rows = filteredData.map((item) =>
//                   [item.name, item.doc, item.role, item.status, item.date].join(',')
//                 );
//                 const csvContent = [headers.join(','), ...rows].join('\n');
//                 const blob = new Blob([csvContent], { type: 'text/csv' });
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'kyc_verification.csv';
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//               }}
//               className="flex items-center gap-2 px-4 py-2 text-black border border-[#C7C7CF] rounded-lg hover:bg-[#2E00B3]"
//             >
//               <Download className="h-5 w-5" />
//               Export CSV
//             </button>
//           </div>
//         </div>

//         <Table2 columns={userColumns} data={filteredData} onAction={handleAction} updateStatus={updateStatus} />

//         <Pagination
//           currentPage={data?.page ?? 1}
//           totalPages={data?.totalPages ?? 1}
//           onPageChange={setPage}
//         />
//       </div>
//     </div>
//   );
// };



// export default KYCVerification;