/* eslint-disable @typescript-eslint/no-explicit-any */

// 'use client'

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // ✅ For navigation
// import Header from "@/components/Header";
// import { Search, Download, MoreVertical } from "lucide-react"; // ✅ Added icon
// import Table2 from "@/components/Table2";
// import Pagination from "@/components/Pagination.tsx";
// import { KYCItem, KYCStatus } from "@/app/actions/type";
// import { useGetPendingKYC } from "@/app/actions/reactQuery";

// // Inside your KYC Verification Page file
// interface TableColumn {
//   key: string;
//   label: string;
//   render?: (item: any, updateStatus?: (id: string | number, newStatus: string) => void) => React.ReactNode;
// }


// const KYCVerification = () => {
//   const router = useRouter(); // ✅ Initialize router
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [userData, setUserData] = useState<KYCItem[]>([]);

//   // Inside KYCVerification component
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [selectedItem, setSelectedItem] = useState<KYCItem | null>(null);
// const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

//   const { data, isLoading } = useGetPendingKYC({
//     page,
//     limit: 20,
//     status: filterStatus === 'all' ? undefined : filterStatus,
//     keyword: searchTerm || undefined,
//   });

//   useEffect(() => {
//     if (data?.users) {
//       const formatted: KYCItem[] = data.users.map((user) => ({
//         id: user.id,
//         name: user.firstName && user.lastName 
//               ? `${user.firstName} ${user.lastName}` 
//               : user.email,
//         doc: user.kycType?.toUpperCase() ?? "N/A",
//         role: user.userType,
//         status: user.kycVerificationStatus,
//         date: new Date(user.createdAt).toLocaleDateString(),
//       }));
//       setUserData(formatted);
//     }
//   }, [data]);

//   // ✅ HANDLES THE POPUP ACTIONS
//   const handleAction = (item: KYCItem, action: string) => {
//   if (action === "view") {
//     console.log("Routing to ID:", item.id);
//     router.push(`/kyc-verification/${item.id}`);
//   }
// };


//   const updateStatus = (id: string | number, newStatus: string) => {
//     setUserData((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, status: newStatus as KYCStatus } : item
//       )
//     );
//   };

//   // ✅ ADDED ACTIONS COLUMN
//   // const userColumns = [
//   //   { key: "name", label: "User name" },
//   //   { key: "date", label: "Date Submitted" },
//   //   { key: "doc", label: "Document type" },
//   //   { key: "role", label: "Role" },
//   //   {
//   //     key: "status",
//   //     label: "Status",
//   //     render: (item: KYCItem) => (
//   //       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//   //         item.status === 'approved' ? 'bg-green-100 text-green-800' : 
//   //         item.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
//   //       }`}>
//   //         {item.status.toUpperCase()}
//   //       </span>
//   //     ),
//   //   },
//   //   {
//   //     key: "actions",
//   //     label: "Actions",
//   //     render: (item: KYCItem) => (
//   //       <div className="flex justify-center cursor-pointer">
//   //         {/* We trigger the popup here */}
//   //         <MoreVertical className="h-5 w-5 text-gray-500" />
//   //       </div>
//   //     ),
//   //   },
//   // ];


//   // Inside your KYCVerification component
// const userColumns: TableColumn[] = [
//   { key: "name", label: "User name" },
//   { key: "date", label: "Date Submitted" },
//   { key: "doc", label: "Document type" },
//   { key: "role", label: "Role" },
//   {
//     key: "status",
//     label: "Status",
//     render: (item: KYCItem) => (
//       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//         item.status === 'approved' ? 'bg-green-100 text-green-800' : 
//         item.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
//       }`}>
//         {item.status.toUpperCase()}
//       </span>
//     ),
//   },
//   {
//     key: "actions",
//     label: "Actions",
//     render: (item: KYCItem) => (
//       <div className="flex justify-center">
//         <MoreVertical 
//           className="h-5 w-5 text-gray-400 cursor-pointer hover:text-[#3900DC] transition-colors" 
//           onClick={(e) => {
//             e.stopPropagation(); // Prevents any other row clicks
//             handleAction(item, "view");
//           }}
//         />
//       </div>
//     ),
//   },
// ];

//   if (isLoading) return <div className="p-12 text-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <Header title="KYC & Verification" />
//       <div className="p-6">
//         {/* ... Search and Filter UI stays exactly as it was ... */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//             <div className="relative w-full md:w-2/3">
//                 <input
//                     type="text"
//                     placeholder="Search by name..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full p-2 pl-10 border border-[#C7C7CF] rounded-lg focus:ring-2 focus:ring-[#3900DC] outline-none"
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
//             </div>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="p-2 border border-[#C7C7CF] rounded-lg outline-none"
//             >
//               <option value="all">All Statuses</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//             </select>
//         </div>

//         <Table2<KYCItem>
//           columns={userColumns}
//           data={userData}
//           onAction={handleAction} // ✅ Pass the navigation handler
//           updateStatus={updateStatus}
//         />

//         <Pagination
//           currentPage={data?.pagination?.currentPage ?? 1}
//           totalPages={data?.pagination?.totalPages ?? 1}
//           onPageChange={setPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default KYCVerification;



'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Search, Download, MoreVertical, Inbox, Loader2 } from "lucide-react"; 
import Table2 from "@/components/Table2";
import Pagination from "@/components/Pagination.tsx";
import { KYCItem, KYCStatus } from "@/app/actions/type";
import { useGetPendingKYC } from "@/app/actions/reactQuery";

interface TableColumn {
  key: string;
  label: string;
  render?: (item: any, updateStatus?: (id: string | number, newStatus: string) => void) => React.ReactNode;
}

const KYCVerification = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [userData, setUserData] = useState<KYCItem[]>([]);

  const { data, isLoading, isFetching } = useGetPendingKYC({
    page,
    limit: 20,
    status: filterStatus === 'all' ? undefined : filterStatus,
    keyword: searchTerm || undefined,
  });

  useEffect(() => {
    if (data?.users) {
      const formatted: KYCItem[] = data.users.map((user) => ({
        id: user.id,
        name: user.firstName && user.lastName 
              ? `${user.firstName} ${user.lastName}` 
              : user.email,
        doc: user.kycType?.toUpperCase() ?? "N/A",
        role: user.userType,
        status: user.kycVerificationStatus,
        date: new Date(user.createdAt).toLocaleDateString(),
      }));
      setUserData(formatted);
    } else {
      setUserData([]);
    }
  }, [data]);

  const handleAction = (item: KYCItem, action: string) => {
    if (action === "view") {
      router.push(`/kyc-verification/${item.id}`);
    }
  };

  const updateStatus = (id: string | number, newStatus: string) => {
    setUserData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus as KYCStatus } : item
      )
    );
  };

  const userColumns: TableColumn[] = [
    { key: "name", label: "User name" },
    { key: "date", label: "Date Submitted" },
    { key: "doc", label: "Document type" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (item: KYCItem) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          item.status === 'approved' ? 'bg-green-100 text-green-800' : 
          item.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {item.status.toUpperCase()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: KYCItem) => (
        <div className="flex justify-center">
          <MoreVertical 
            className="h-5 w-5 text-gray-400 cursor-pointer hover:text-[#3900DC] transition-colors" 
            onClick={(e) => {
              e.stopPropagation();
              handleAction(item, "view");
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header title="KYC & Verification" />
      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-2/3">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-10 border border-[#C7C7CF] rounded-lg focus:ring-2 focus:ring-[#3900DC] outline-none"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setPage(1); // Reset to page 1 on filter change
              }}
              className="p-2 border border-[#C7C7CF] rounded-lg outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 border border-dashed border-gray-200 rounded-xl">
            <Loader2 className="h-10 w-10 animate-spin text-[#3900DC] mb-4" />
            <p className="text-gray-500 font-medium">Fetching KYC applications...</p>
          </div>
        ) : userData.length > 0 ? (
          <>
            <Table2<KYCItem>
              columns={userColumns}
              data={userData}
              onAction={handleAction}
              updateStatus={updateStatus}
            />
            <div className="mt-6">
              <Pagination
                currentPage={data?.pagination?.currentPage ?? 1}
                totalPages={data?.pagination?.totalPages ?? 1}
                onPageChange={setPage}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-20 border border-dashed border-gray-200 rounded-xl bg-gray-50">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <Inbox className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No Applications Found</h3>
            <p className="text-gray-500 max-w-xs text-center">
              We could not find any KYC applications matching your current filters or search term.
            </p>
            {(searchTerm || filterStatus !== 'all') && (
              <button 
                onClick={() => {setSearchTerm(''); setFilterStatus('all');}}
                className="mt-4 text-[#3900DC] font-semibold hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerification;