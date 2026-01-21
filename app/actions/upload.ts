/* eslint-disable @typescript-eslint/no-explicit-any */
// app/actions/upload.ts

import axios from "axios";
// import { apiUrl } from "@/config"; // Make sure you have this
import { useAuth } from "@/app/context/AuthContext";

/**
 * Upload a single file to your backend (Cloudinary via your API)
 * Returns the public URL string
 */
export const uploadSingleFile = async (file: File): Promise<string> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log(apiUrl);
  // Get token from auth context (only works in client components)
  // We'll handle both client & server cases safely
  let token: string | null = null;

  try {
    // Try to get from localStorage (works everywhere)
    token = localStorage.getItem("authToken");
  } catch (error) {
    // If localStorage not available (e.g. server), skip
  }

  if (!token) {
    throw new Error("You must be logged in to upload files");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(`${apiUrl}/api/v1/upload/single`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // DO NOT set Content-Type — let browser set multipart boundary
      },
      timeout: 30000, // 30 seconds
    });

    // Adjust based on your actual response
    // Common patterns:
    if (res.data?.data?.url) return res.data.data.url;
    if (res.data?.url) return res.data.url;
    if (res.data?.secure_url) return res.data.secure_url;

    throw new Error("Upload failed: No URL returned");
  } catch (error: any) {
    console.error("Upload failed:", error);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.message.includes("timeout")) {
      throw new Error("Upload timed out. Please try again.");
    }
    throw new Error("Failed to upload image. Please try again.");
  }
};

/**
 * Upload multiple files in parallel
 */
export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadSingleFile(file));
  return await Promise.all(uploadPromises);
};