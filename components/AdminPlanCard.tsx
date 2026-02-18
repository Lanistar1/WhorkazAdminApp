/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const AdminPlanCard = ({ plan }: { plan: any }) => {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h3 className="font-semibold">{plan.name}</h3>
      <p className="text-sm text-gray-600 mb-2">
        {plan.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="font-bold">₦{plan.price}</span>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          {plan.interval}
        </span>
      </div>
    </div>
  );
};

export default AdminPlanCard
