"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usecreateAdmin } from "@/app/actions/reactQuery"; // adjust path
import { toast } from "react-toastify";

// Assuming these are your reusable components
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";

// Form data type
type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
};

const NewAdmin = () => {
  const router = useRouter();
  const createAdminMutation = usecreateAdmin();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "", // default to "admin" since this is admin creation
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      await createAdminMutation.mutateAsync(formData);
      toast.success("Admin created successfully!");
      
      // Optional: reset form or redirect
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "",
      });
      
      // Redirect to admin list or dashboard
      window.location.reload();
    } catch (err) {
      // Error already handled in mutation onError
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Add New Admin
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the details to create a new administrator account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First Name */}
          <CustomInputField
            label="First Name"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />

          {/* Last Name */}
          <CustomInputField
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />

          {/* Email */}
          <CustomInputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          {/* Password */}
          <CustomInputField
            label="Password"
            type="password"
            name="password"
            placeholder="Password should be 8 or more characters long"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {/* Role - Fixed to "admin" but shown for clarity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800"
              required
            >
              <option value="admin">Admin</option>
              <option value="⁠COO (Chief Operating Officer)">⁠COO (Chief Operating Officer)</option>
              <option value="Finance & Admin Manager">Finance & Admin Manager</option>
              <option value="⁠Customer Support / Quality Control">⁠Customer Support / Quality Control</option>
              <option value="⁠Growth Development & AI Lead">⁠Growth Development & AI Lead</option>
              {/* Add more roles if backend supports them later */}
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <CustomButton
              title={createAdminMutation.isPending ? "Creating Admin..." : "Create Admin"}
              isLoading={createAdminMutation.isPending}
              disabled={createAdminMutation.isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
            />
          </div>
        </form>

        {/* Optional footer note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Ensure the email is valid and the password meets security requirements.
        </p>
      </div>
    </div>
  );
};

export default NewAdmin;