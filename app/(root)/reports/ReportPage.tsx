// app/report/page.tsx
"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Table2 from "@/components/Table2"; // Using Table2 as provided
import Header from "@/components/Header";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Stat {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
}

// Use the same flexible TableItem interface as in CoursePage
interface TableItem {
  id: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Extend TableItem for Provider with specific fields
interface Provider extends TableItem {
  rank: number;
  providerName: string;
  category: string;
  jobsCompleted: number;
  rating: string;
  joined: string;
  action: string;
}

interface TableColumn {
  key: string;
  label: string;
  render?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
    updateStatus?: (id: string | number, newStatus: string) => void
  ) => React.ReactNode;
}

const ReportPage = () => {
  // Stats Data
  const stats: Stat[] = [
    {
      icon: <span className="text-purple-500">👷</span>, // Replace with actual icon (e.g., User)
      title: "Verified Workmen",
      value: "150",
      change: "+4.5%",
      isPositive: true,
    },
    {
      icon: <span className="text-purple-500">👥</span>, // Replace with actual icon (e.g., Users)
      title: "Active Clients",
      value: "200",
      change: "+3.2%",
      isPositive: true,
    },
    {
      icon: <span className="text-purple-500">✔️</span>, // Replace with actual icon (e.g., Check)
      title: "Jobs Completed",
      value: "180",
      change: "-1.8%",
      isPositive: false,
    },
    {
      icon: <span className="text-purple-500">⚠️</span>, // Replace with actual icon (e.g., Alert)
      title: "Open Disputes",
      value: "15",
      change: "+2.1%",
      isPositive: false,
    },
    {
      icon: <span className="text-purple-500">⏱️</span>, // Replace with actual icon (e.g., Clock)
      title: "Average Job Completion Date",
      value: "5 days",
      change: "+0.5%",
      isPositive: true,
    },
  ];

  // Chart Data
  const jobPerformanceData = {
    labels: ["Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
    datasets: [
      {
        label: "Jobs Completed",
        data: [50, 60, 70, 80, 90, 100, 110],
        backgroundColor: "#4B0082", // Purple
        borderColor: "#4B0082",
        borderWidth: 1,
      },
    ],
  };

  const revenueFlowData = {
    labels: ["Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
    datasets: [
      {
        label: "Revenue",
        data: [1000, 1200, 1500, 1400, 1600, 1800, 2000],
        borderColor: "#FF4500", // OrangeRed
        backgroundColor: "rgba(255, 69, 0, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const disputeSettledData = {
    labels: ["Settled", "Unsettled"],
    datasets: [
      {
        data: [80, 20], // Percentage or count
        backgroundColor: ["#4B0082", "#FF4500"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" as const }, title: { display: false } },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Table Data
  const tableColumns: TableColumn[] = [
    { key: "rank", label: "Rank" },
    { key: "providerName", label: "Provider Name" },
    { key: "category", label: "Category" },
    { key: "jobsCompleted", label: "Jobs Completed" },
    { key: "rating", label: "Average Rating" },
    { key: "joined", label: "Joined" },
    {
      key: "action",
      label: "Action",
      render: (item) => (
        <span className="text-blue-600 hover:underline cursor-pointer">
          {item.action}
        </span>
      ),
    },
  ];

  const tableData: Provider[] = [
    { id: "1", rank: 1, providerName: "John Doe", category: "Electrician", jobsCompleted: 25, rating: "4.5", joined: "15/05/2024", action: "View" },
    { id: "2", rank: 2, providerName: "Jane Smith", category: "Plumber", jobsCompleted: 20, rating: "4.5", joined: "15/05/2024", action: "View" },
    { id: "3", rank: 3, providerName: "Mike Johnson", category: "Carpenter", jobsCompleted: 18, rating: "4.5", joined: "15/05/2024", action: "View" },
  ];

  const exportToCSV = () => {
    const headers = tableColumns.map((col) => col.label).join(",");
    const rows = tableData.map((item) =>
      tableColumns
        .map((col) => String(item[col.key] ?? ""))
        .join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "top_performing_providers.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header title="Reports and analytics" />
      <main className="px-4 sm:px-8 py-4">
        {/* Grid of Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.slice(0, 3).map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 rounded-full">{stat.icon}</div>
              </div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                {stat.value}
              </h2>
              <div className="flex items-center gap-2">
                {stat.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    stat.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
          {stats.slice(3, 5).map((stat, index) => (
            <div
              key={index + 3}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 rounded-full">{stat.icon}</div>
              </div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                {stat.value}
              </h2>
              <div className="flex items-center gap-2">
                {stat.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    stat.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Job Performance</h3>
            <div className="h-48 sm:h-64">
              <Bar data={jobPerformanceData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Revenue Flow</h3>
            <div className="h-48 sm:h-64">
              <Line data={revenueFlowData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Dispute Settled</h3>
            <div className="h-48 sm:h-64">
              <Pie data={disputeSettledData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 gap-4">
            <h3 className="text-xl font-semibold">Top Performing Providers</h3>
            <div className="flex items-center space-x-4">
              <button className="flex items-center justify-between px-4 py-2 bg-white border border-[#C7C7CF] rounded-lg text-[16px] font-medium text-[#4B4B56] hover:bg-gray-100 transition-colors">
                <Image
                  src="/assets/icons/filter.png"
                  alt="Filter"
                  width={18}
                  height={18}
                  className="object-contain mr-2"
                />
                All filters
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 text-black border border-[#C7C7CF] rounded-lg hover:bg-[#2E00B3]"
              >
                <Download className="h-5 w-5" />
                Export CSV
              </button>
              <button className="flex items-center justify-between px-4 py-2 bg-white border border-[#C7C7CF] rounded-lg text-[16px] font-medium text-[#4B4B56] hover:bg-gray-100 transition-colors">
                View More <MoreHorizontal className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
          <Table2
            columns={tableColumns}
            data={tableData}
            onAction={(item, action) => console.log(`Action: ${action} on`, item)}
          />
        </div>
      </main>
    </div>
  );
};

export default ReportPage;