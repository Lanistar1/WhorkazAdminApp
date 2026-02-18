/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetPermissionList,
  useRoleById,
  useUpdateRole,
} from "@/app/actions/reactQuery";
import { useAuth } from "@/app/context/AuthContext";
import CustomInputField from "@/components/CustomInputField";
import Header from "@/components/Header";
import CustomSelectField from "@/components/CustomSelectField";


const EditRolePage = ({ id }: { id: string }) => {
  const router = useRouter();
//   const { id } = useParams() as { id: string };
  const { token } = useAuth();

  const { mutate, isPending } = useUpdateRole(id);
  const { data: permissions = [] } = useGetPermissionList();
  const { data: roleData, isLoading } = useRoleById(id, token as string);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    roleType: "",
    permissions: [] as string[],
    isActive: true || false
  });

  // ✅ Prefill form when role loads
  useEffect(() => {
  if (!roleData?.data?.role) return;

  const role = roleData.data.role;

  setFormData({
    name: role.name,
    roleType: role.roleType,
    description: role.description,
    permissions: role.rolePermissions.map(
      (rp) => rp.permission.id
    ),
    isActive: role.isActive
  });
}, [roleData]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  const togglePermission = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(id)
        ? prev.permissions.filter((p) => p !== id)
        : [...prev.permissions, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        name: formData.name,
        roleType: formData.roleType,
        description: formData.description,
        permissions: formData.permissions,
        isActive: formData.isActive
      },
      {
        onSuccess: () => {
          router.push("/roles");
        },
      }
    );
  };

  if (isLoading) {
    return <div className="p-6">Loading role...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header title="Edit Role" />

      <div className="p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Role Name */}
          <CustomInputField
            label="Role Name"
            name="name"
            type="text"
            placeholder="Enter role name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Role Type */}
          <CustomSelectField
            label="Role Type"
            name="roleType"
            value={formData.roleType}
            onChange={handleChange}
            required
            options={[
              { label: "Super Admin", value: "super_admin" },
              { label: "User Manager", value: "user_manager" },
              { label: "Content Moderator", value: "content_moderator" },
              { label: "Payment Manager", value: "payment_manager" },
              { label: "Support Agent", value: "support_agent" },
              { label: "Analytics Viewer", value: "analytics_viewer" },
            ]}
          />

          {/* Description */}
          <CustomInputField
            label="Description"
            name="description"
            type="textarea"
            placeholder="Enter role description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Permissions */}
          <div>
            <label className="block mb-3 text-sm font-medium">
              Assign Permissions
            </label>

            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto border border-[#cccccc] rounded-lg p-3">
              {permissions.map((perm: any) => (
                <label
                  key={perm.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(perm.id)}
                    onChange={() => togglePermission(perm.id)}
                  />
                  {perm.displayName}
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={isPending}
            className="bg-[#3900DC] w-[500px] text-white px-6 py-3 rounded-lg disabled:opacity-60 cursor-pointer"
          >
            {isPending ? "Saving..." : "Update Role"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditRolePage;
