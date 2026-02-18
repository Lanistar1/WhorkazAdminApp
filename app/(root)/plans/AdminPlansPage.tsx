/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useGetSubscriptionList } from "@/app/actions/reactQuery";
import Link from "next/link";
import AdminPlanCard from "@/components/AdminPlanCard";
import Header from "@/components/Header";

const AdminPlansPage = () => {
  const { data, isLoading } = useGetSubscriptionList();

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
        <Header title="Plans Management" />
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Subscription Plans</h1>

        <Link
          href="/plans/new-plan"
          className="bg-[#3900DC] text-white px-4 py-2 rounded-lg"
        >
          + Create Plan
        </Link>
      </div>

      {isLoading ? (
        <p>Loading plans...</p>
      ) : data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((plan: any) => (
            <AdminPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No plans found</p>
      )}
        </div>
      
    </div>
  );
};

export default AdminPlansPage;