'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usecreateService } from "@/app/actions/reactQuery";
import { toast } from "react-toastify";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { createServiceType } from "@/app/actions/type";

const NewService = () => {
  const router = useRouter();
  const createServiceMutation = usecreateService();

  const [formData, setFormData] = useState<createServiceType>({
    name: "",
    description: "",
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    await createServiceMutation.mutateAsync(formData);
    toast.success("Service created successfully!");
    router.push("/services"); // redirect to list
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-4">Add New Service</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <CustomInputField
            label="Service Name"
            name="name"
            placeholder="Enter service name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <CustomInputField
            label="Description"
            name="description"
            placeholder="Service description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              id="isActive"
            />
            <label htmlFor="isActive" className="text-gray-700">Active</label>
          </div>

          <CustomButton
            title={createServiceMutation.isPending ? "Creating..." : "Create Service"}
            isLoading={createServiceMutation.isPending}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          />
        </form>
      </div>
    </div>
  );
};

export default NewService;
