'use client'
import React from "react";
import { ArrowUpRight, ArrowDownRight, Users, Briefcase, ShieldAlert, UserPlus } from "lucide-react";
import Header from "@/components/Header";

const Dashboardpage = () => {
  const stats = [
    {
      title: "Total Users",
      value: "30,200",
      icon: <Users className="w-5 h-5 text-purple-500" />,
      change: "+4.5% in the last 7 days",
      isPositive: true,
    },
    {
      title: "New signups",
      value: "4,500",
      icon: <UserPlus className="w-5 h-5 text-purple-500" />,
      change: "-4.5% in the last 30 days",
      isPositive: false,
    },
    {
      title: "Pending KYC approvals",
      value: "200",
      icon: <ShieldAlert className="w-5 h-5 text-purple-500" />,
      change: "-4.5% in the last 30 days",
      isPositive: false,
    },
    {
      title: "Jobs posted",
      value: "40,567",
      icon: <Briefcase className="w-5 h-5 text-purple-500" />,
      change: "+4.5% in the last 7 days",
      isPositive: true,
    },
    {
      title: "Ongoing Disputes",
      value: "5",
      icon: <ShieldAlert className="w-5 h-5 text-purple-500" />,
      change: "+4.5% in the last 7 days",
      isPositive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F6F1] text-gray-900">
      {/* Header */}
      <Header title="Dashboard" />

      {/* Main Section */}
      <main className="p-8">
        {/* Grid of Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 rounded-full">{stat.icon}</div>
              </div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">{stat.value}</h2>
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
      </main>
    </div>
  );
};

export default Dashboardpage;
