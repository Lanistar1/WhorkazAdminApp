'use client';

import React, { useState, useRef, useEffect } from "react";

// Define a generic column interface
interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (
    item: T,
    updateStatus?: (id: string | number, newStatus: string) => void
  ) => React.ReactNode;
}

// Define the shape of a table item
export interface TableItem {
  id: string | number;
  [key: string]: string | number | boolean | null | undefined;
}

// Props for the table
interface TableProps<T extends TableItem> {
  columns: TableColumn<T>[];
  data: T[];
  onAction?: (item: T, action: string) => void;
  updateStatus?: (id: string | number, newStatus: string) => void;
}

const Table2 = <T extends TableItem>({
  columns,
  data,
  onAction,
  updateStatus,
}: TableProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const iconRef = useRef<SVGSVGElement>(null); // ✅ correct type for Lucide icon (SVG element)


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
          <tr className="text-left text-[#95959F] text-sm">
            {columns.map((column) => (
              <th key={String(column.key)} className="p-4 font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`border-t border-gray-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="p-4 text-sm text-gray-900">
                  {column.render
                    ? column.render(item, updateStatus)
                    : String(item[column.key as keyof T] ?? "")}
                </td>
              ))}
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

export default Table2;
