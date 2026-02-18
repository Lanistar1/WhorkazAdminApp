/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateRoles,
  useGetPermissionList,
} from "@/app/actions/reactQuery";
import CustomInputField from "@/components/CustomInputField";
import Header from "@/components/Header";
import CustomSelectField from "@/components/CustomSelectField";

const CreateRolePage = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateRoles();
  const { data: permissions = [] } = useGetPermissionList();

  const [formData, setFormData] = useState({
    name: "",
    roleType: "",
    description: "",
    permissions: [] as string[],
    color: "#0066cc",
    icon: "shield",
    level: 1,
    });


  // ✅ Reusable Input Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "level" ? Number(value) : value,
    }));
  };

  // ✅ Toggle Permission
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
            metadata: {
            color: formData.color,
            icon: formData.icon,
            level: formData.level,
            },
        },
        {
            onSuccess: () => {
            router.push("/roles");
            },
        }
    );

  };

  return (
        <div className="min-h-screen bg-white dark:bg-white text-gray-900">
            <Header title="Create New Plan" />
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


                {/* <CustomInputField
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Enter role description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                /> */}

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
                    {permissions.map((perm) => (
                    <label
                        key={perm.id}
                        className="flex items-center gap-2 text-sm"
                    >
                        <input
                        type="checkbox"
                        checked={formData.permissions.includes(
                            perm.id
                        )}
                        onChange={() =>
                            togglePermission(perm.id)
                        }
                        />
                        {perm.displayName}
                    </label>
                    ))}
                </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-3 gap-4">

                {/* <CustomInputField
                    label="Color"
                    name="color"
                    type="color"
                    value={formData.color}
                    onChange={handleChange}
                />

                <CustomInputField
                    label="Icon"
                    name="icon"
                    type="text"
                    placeholder="Enter icon name"
                    value={formData.icon}
                    onChange={handleChange}
                /> */}

                {/* <CustomInputField
                    label="Level"
                    name="level"
                    type="number"
                    placeholder="Enter level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                /> */}

                </div>

                <button
                disabled={isPending}
                className="bg-[#3900DC] w-[500px] text-white px-6 py-3 rounded-lg disabled:opacity-60 cursor-pointer"
                >
                {isPending ? "Creating..." : "Create Role"}
                </button>
            </form>
            </div>
        </div>

    
  );
};

export default CreateRolePage;
