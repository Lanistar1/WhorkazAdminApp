"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usecreateCategory } from "@/app/actions/reactQuery";
import { toast } from "react-toastify";

import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";

type FormData = {
  name: string;
  description: string;
  type: string;
  parentId: null;
  isActive: boolean;
};

const NewCategory = () => {
  const router = useRouter();
  const createCategoryMutation = usecreateCategory();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    type: "",
    parentId: null,
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.type) {
      toast.error("Category name and type are required");
      return;
    }

    try {
      await createCategoryMutation.mutateAsync(formData);
      router.push("/category");
    } catch {
      // handled in mutation
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Create New Category
          </h1>
          <p className="text-gray-500 mt-2">
            Add a new service category
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <CustomInputField
            label="Category Name"
            name="name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <CustomInputField
            label="Description"
            name="description"
            placeholder="Short description"
            value={formData.description}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Type
            </label>
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
            >
                <option value="">Select category type</option>
                <option value="general">General</option>
                <option value="course">Course</option>
                <option value="job">Job</option>
            </select>
            </div>


          {/* <CustomInputField
            label="Parent Category ID (optional)"
            name="parentId"
            placeholder="Parent category ID"
            value={formData.parentId}
            onChange={handleChange}
          /> */}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">Active</span>
          </div>

          <div className="pt-4">
            <CustomButton
              title={
                createCategoryMutation.isPending
                  ? "Creating..."
                  : "Create Category"
              }
              isLoading={createCategoryMutation.isPending}
              disabled={createCategoryMutation.isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
