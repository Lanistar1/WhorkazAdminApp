// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
// import React, { useState, useRef, useEffect } from "react";
// import { MoreHorizontal } from "lucide-react";
// import Link from "next/link";

// interface TableColumn {
//   key: string;
//   label: string;
//   render?: (item: any) => React.ReactNode;
// }

// interface TableItem {
// //   id: string | number;
//   [key: string]: any;
// }

// interface TableProps {
//   columns: TableColumn[];
//   data: TableItem[];
//   onAction?: (item: TableItem, action: string) => void;
// }

// const getStatusClass = (status: string) => {
//   switch (status.toLowerCase()) {
//     case "active":
//       return "bg-green-100 text-green-800";
//     case "inactive":
//       return "bg-red-100 text-red-800";
//     case "pending":
//       return "bg-yellow-100 text-yellow-800";
//     default:
//       return "";
//   }
// };

// const Table: React.FC<TableProps> = ({ columns, data, onAction }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
//   const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);
//   const iconRef = useRef<HTMLSpanElement>(null);

//   const handleIconClick = (event: React.MouseEvent, item: TableItem) => {
//     const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
//     setModalPosition({
//       top: rect.bottom + window.scrollY,
//       right: window.innerWidth - rect.right + window.scrollX,
//     });
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedItem(null);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (iconRef.current && !iconRef.current.contains(event.target as Node)) {
//         setIsModalOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleAction = (action: string) => {
//     if (selectedItem && onAction) {
//       onAction(selectedItem, action);
//     }
//     closeModal();
//   };

//   return (
//     <div className="overflow-x-auto border border-[#C7C7CF] p-4 rounded-[12px] shadow-sm">
//       <table className="w-full bg-white">
//         <thead className="bg-gray-50">
//           <tr className="text-left text-gray-500 text-sm">
//             {columns.map((column) => (
//               <th key={column.key} className="p-4 font-semibold">
//                 {column.label}
//               </th>
//             ))}
//             <th className="p-4 font-semibold">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr
//               key={item.id}
//               className={`border-t border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
//             >
//               {columns.map((column) => (
//                 <td key={column.key} className="p-4 text-sm text-gray-900">
//                   {column.render ? column.render(item) : item[column.key]}
//                 </td>
//               ))}
//               <td className="p-4">
//                 <MoreHorizontal
//                   ref={iconRef}
//                   className="h-5 w-5 text-gray-500 cursor-pointer"
//                   onClick={(e) => handleIconClick(e, item)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && selectedItem && (
//         <div
//           className="fixed bg-white border border-[#DBDBE3] rounded-[8px] shadow-lg p-2 z-50"
//           style={{
//             top: `${modalPosition.top}px`,
//             right: `${modalPosition.right}px`,
//             minWidth: "200px",
//           }}
//         >
//           <ul className="text-[14px] font-medium text-[#4B4B56]">
//             <li
//               className="px-4 py-2 text-[16px] font-semibold text-[#4B4B56] hover:bg-gray-100 rounded-t-[8px] cursor-pointer"
//               onClick={() => handleAction("view")}
//             >
//               View Details
//             </li>
//             <li
//               className="px-4 py-2 hover:bg-gray-100 text-[16px] font-semibold text-[#4B4B56] cursor-pointer"
//               onClick={() => handleAction("edit")}
//             >
//               Edit
//             </li>
//             <li
//               className="px-4 py-2 text-[16px] font-semibold text-[#FF2929] hover:bg-gray-100 rounded-b-[8px] cursor-pointer"
//               onClick={() => handleAction("delete")}
//             >
//               Delete
//             </li>
//           </ul>
//           <div
//             className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"
//             style={{
//               top: "-8px",
//               left: "50%",
//               transform: "translateX(-50%)",
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;





import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

interface TableColumn {
  key: string;
  label: string;
  render?: (item: any, updateStatus?: (id: string | number, newStatus: string) => void) => React.ReactNode;
}

interface TableItem {
  id: string | number;
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableItem[];
  onAction?: (item: TableItem, action: string) => void;
  updateStatus?: (id: string | number, newStatus: string) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, onAction, updateStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleIconClick = (event: React.MouseEvent, item: TableItem) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setModalPosition({
      top: rect.bottom + window.scrollY,
      right: window.innerWidth - rect.right + window.scrollX,
    });
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (action: string) => {
    if (selectedItem && onAction) {
      onAction(selectedItem, action);
    }
    closeModal();
  };

  return (
    <div className="overflow-x-auto border border-[#C7C7CF] p-4 rounded-[12px] shadow-sm">
      <table className="w-full bg-white">
        <thead className="bg-gray-50">
          <tr className="text-left text-gray-500 text-sm">
            {columns.map((column) => (
              <th key={column.key} className="p-4 font-semibold">
                {column.label}
              </th>
            ))}
            <th className="p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`border-t border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              {columns.map((column) => (
                <td key={column.key} className="p-4 text-sm text-gray-900">
                  {column.render ? column.render(item, updateStatus) : item[column.key]}
                </td>
              ))}
              <td className="p-4">
                <MoreHorizontal
                  ref={iconRef}
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={(e) => handleIconClick(e, item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedItem && (
        <div
          className="fixed bg-white border border-[#DBDBE3] rounded-[8px] shadow-lg p-2 z-50"
          style={{
            top: `${modalPosition.top}px`,
            right: `${modalPosition.right}px`,
            minWidth: "200px",
          }}
        >
          <ul className="text-[14px] font-medium text-[#4B4B56]">
            <li
              className="px-4 py-2 text-[16px] font-semibold text-[#4B4B56] hover:bg-gray-100 rounded-t-[8px] cursor-pointer"
              onClick={() => handleAction("view")}
            >
              View Details
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 text-[16px] font-semibold text-[#4B4B56] cursor-pointer"
              onClick={() => handleAction("edit")}
            >
              Edit
            </li>
            <li
              className="px-4 py-2 text-[16px] font-semibold text-[#FF2929] hover:bg-gray-100 rounded-b-[8px] cursor-pointer"
              onClick={() => handleAction("delete")}
            >
              Delete
            </li>
          </ul>
          <div
            className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"
            style={{
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Table;