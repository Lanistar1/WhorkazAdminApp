/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, UserCheck } from "lucide-react";
import Table from "@/components/Table";
import Header from "@/components/Header";
import CustomSelectField from "@/components/CustomSelectField";
import { useGetRolesList, useDeleteRole, useGetAdmin, useCreateAssignRole } from "@/app/actions/reactQuery";

interface RoleItem {
  id: string;
  name: string;
  roleType: string;
  description: string;
  level: number;
  permissionsCount: number;
  [key: string]: any;
}

interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: any;
}

interface TableColumn<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

const RolesPage = () => {
  const router = useRouter();
  const { data } = useGetRolesList();
//   const { mutate: deleteRole } = useDeleteRole();
  const { mutate: deleteRole, isPending: isDeleting } = useDeleteRole();

  const { data: adminResponse } = useGetAdmin();

  const roles = data?.roles ?? [];

  const admins: AdminUser[] = useMemo(() => {
    return adminResponse?.data?.admins ?? [];
  }, [adminResponse]);

  const tableData: RoleItem[] = roles.map((role: any) => ({
    id: role.id,
    name: role.name,
    roleType: role.roleType,
    description: role.description,
    level: role.metadata?.level,
    permissionsCount: role.rolePermissions?.length ?? 0,
  }));

  const columns: TableColumn<RoleItem>[] = [
    { key: "name", label: "Role Name" },
    { key: "roleType", label: "Role Type" },
    {
      key: "permissionsCount",
      label: "Permissions",
      render: (item: any) => `${item.permissionsCount} permissions`,
    },
    { key: "level", label: "Level" },
  ];

  const handleAction = (item: RoleItem, action: string) => {
    if (action === "view") router.push(`/roles/${item.id}`);
    if (action === "edit") router.push(`/roles/edit-role/${item.id}`);
    // if (action === "delete") deleteRole(item.id);
    if (action === "delete") {
        if (isDeleting) return;
        deleteRole(item.id);
    }

  };

  // ---------- Modal State ----------
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  // Hook for assigning role to selected admin
  const assignRoleMutation = useCreateAssignRole(selectedAdmin);

  const handleAssignRole = () => {
    if (!selectedAdmin || !selectedRole) return;

    assignRoleMutation.mutate(
      { roleId: selectedRole },
      {
        onSuccess: () => {
          setModalOpen(false);
          setSelectedAdmin("");
          setSelectedRole("");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header title="Role Management" />
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-5 h-5 border-4 border-[#3900DC] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Deleting role...</span>
            </div>
        </div>
        )}

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-end items-center gap-3 mb-6">
          <button
            onClick={() => router.push("/roles/new-role")}
            className="flex items-center gap-2 bg-[#3900DC] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            <Plus size={18} />
            Create Role
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            <UserCheck size={18} />
            Assign Role
          </button>
        </div>

        {/* Table */}
        <Table columns={columns} data={tableData} onAction={handleAction} />

        {/* ---------- Modal ---------- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
              <h2 className="text-xl font-semibold mb-4">Assign Role to Admin</h2>

              {/* Admin Dropdown */}
              <CustomSelectField
                label="Select Admin"
                name="admin"
                value={selectedAdmin}
                onChange={(e) => setSelectedAdmin(e.target.value)}
                options={admins.map((a) => ({
                  label: `${a.firstName} ${a.lastName} (${a.email})`,
                  value: a.id,
                }))}
              />

              {/* Role Dropdown */}
              <CustomSelectField
                label="Select Role"
                name="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                options={roles.map((r) => ({
                  label: r.name,
                  value: r.id,
                }))}
              />

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignRole}
                  disabled={assignRoleMutation.isPending}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60"
                >
                  {assignRoleMutation.isPending ? "Assigning..." : "Assign Role"}
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesPage;
