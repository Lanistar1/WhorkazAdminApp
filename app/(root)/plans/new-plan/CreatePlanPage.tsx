"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePlan } from "@/app/actions/reactQuery";
import CustomInputField from "@/components/CustomInputField";
import CustomSelectField from "@/components/CustomSelectField";
import Header from "@/components/Header";

const CreatePlanPage = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreatePlan();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "NGN",
    interval: "monthly",
    features: "",
    planType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        currency: formData.currency as "NGN",
        interval: formData.interval as "monthly" | "yearly",
        planType: formData.planType as "workman" | "both",
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      },
      {
        onSuccess: () => router.push("/plans"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
        <Header title="Create New Plan" />
        <div className="max-w-2xl ml-20 p-6">

            <form onSubmit={handleSubmit} className="space-y-4">
                <CustomInputField
                label="Plan Name"
                name="name"
                placeholder="Enter plan name"
                value={formData.name}
                onChange={handleChange}
                required
                />

                <CustomInputField
                label="Description"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                required
                />

                <CustomInputField
                label="Price"
                name="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                required
                />

                {/* Currency */}
            <CustomSelectField
                label="Currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
                options={[
                    { label: "Naira (NGN)", value: "NGN" },
                    { label: "Dollar (USD)", value: "USD" },
                ]}
                />

                {/* Interval */}
                <CustomSelectField
                    label="Billing Interval"
                    name="interval"
                    value={formData.interval}
                    onChange={handleChange}
                    required
                    options={[
                        { label: "Monthly", value: "monthly" },
                        { label: "Yearly", value: "yearly" },
                    ]}
                    />

                    {/* Plan type */}
                {/* <CustomSelectField
                    label="Plan Type"
                    name="planType"
                    value={formData.planType}
                    onChange={handleChange}
                    required
                    options={[
                        { label: "workman", value: "Workman" },
                        { label: "both", value: "Both" },
                    ]}
                    /> */}

                    <CustomSelectField
                      label="Plan Type"
                      name="planType"
                      value={formData.planType}
                      onChange={handleChange}
                      required
                      options={[
                        { label: "workman", value: "Workman" },
                        { label: "client", value: "Client" },
                      ]}
                    />


                <CustomInputField
                  label="Features"
                  name="features"
                  placeholder="Feature 1, Feature 2, Feature 3"
                  value={formData.features}
                  onChange={handleChange}
                  />

                <button
                disabled={isPending}
                className="w-full bg-[#3900DC] text-white py-2 rounded-lg disabled:opacity-60 cursor-pointer"
                >
                {isPending ? "Creating..." : "Create Plan"}
                </button>
            </form>
        </div>
    </div>
    
  );
};

export default CreatePlanPage;
