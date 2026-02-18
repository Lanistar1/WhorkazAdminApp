/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useRoleById } from "@/app/actions/reactQuery";
import { ShieldCheck, Calendar, Layers } from "lucide-react";

const RoleDetailPage = () => {
  const { id } = useParams() as { id: string };
  const { token } = useAuth();

  const { data, isLoading } = useRoleById(id, token as string);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!data?.data?.role) {
    return <div className="p-6">Role not found.</div>;
  }

  const role = data.data.role;

  // Group permissions by category
  const groupedPermissions = role.rolePermissions.reduce(
    (acc: any, item: any) => {
      const category = item.permission.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item.permission);
      return acc;
    },
    {}
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
            style={{ backgroundColor: role.metadata?.color }}
          >
            <ShieldCheck size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {role.name}
            </h1>
            <p className="text-gray-500">
              {role.description}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {role.isSystem && (
            <span className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
              System Role
            </span>
          )}
          {role.isActive ? (
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
              Active
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
              Inactive
            </span>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Role Type</p>
          <p className="font-semibold capitalize">
            {role.roleType.replace("_", " ")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <Layers size={16} />
            Level
          </p>
          <p className="text-2xl font-bold">
            {role.metadata?.level}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <Calendar size={16} />
            Created
          </p>
          <p className="font-medium">
            {new Date(role.createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>

      {/* Permissions Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-6">
        <h2 className="text-xl font-semibold">
          Permissions ({role.rolePermissions.length}) - (Grouped by category)
        </h2>

        {Object.keys(groupedPermissions).map((category) => (
          <div key={category} className="space-y-3">

            <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
              {category.replace("_", " ")}
            </h3>

            <div className="flex flex-wrap gap-3">
              {groupedPermissions[category].map((perm: any) => (
                <div
                  key={perm.id}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                >
                  {perm.displayName}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RoleDetailPage;
