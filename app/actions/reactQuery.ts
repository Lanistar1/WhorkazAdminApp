/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";
import { approveCourse, createAdmin, createCategory, createService, deleteAdminById, deleteCategoryById, deleteServiceById, fetchAdmin, fetchAdminActivity, fetchAdminById, fetchCategory, fetchCategoryById, fetchCourseById, fetchCourses, fetchDashboardGeographicDistribution, fetchDashboardMetric, fetchDashboardRevenueTrends, fetchDashboardServiceCategories, fetchDashboardTopPerformingProviders, fetchDashboardUserGrowth, fetchService, fetchServiceById, fetchUserById, fetchUsers, rejectCourse, signIn, updateAdminProfile, updateCategory, updateCourse, updateService, updateUserProfile, updateUserStatus, userBanStatus } from "./api";
import { Admin_Query_Keys, approveCoursetype, createAdminType, createCategoryType, createServiceType, LoginCredentials, LoginResponse, rejectCoursetype, updateCategoryType, updateCoursetype, updateServiceType, updateUserProfileType, updateUserStatusType, userBanStatusUpdateType, userProfile } from "./type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";


// ======= Signin call ========
export const useSigninAccount = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: signIn,
    onSuccess: (data) => {
      toast.success(data.message || "Login successful!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Invalid email or password";
      toast.error(message);
    },
  });
};


//=====fetching Admin ========
export const useGetAdmin = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchAdmin(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


//=====fetching Admin detail ========
export const useAdminById = (id: string, token: string) => {
  return useQuery<userProfile, Error>({ // Added type for useQuery
    queryKey: [Admin_Query_Keys.Admin_ID, id],
    queryFn: () => fetchAdminById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};


//=====fetching Admin activities ========
export const useGetAdminActivity = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchAdminActivity(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


// ===== Delete Admin ========
export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  const { token } = useAuth(); // Assuming you can access token here

  return useMutation<void, Error, string>({
    // The mutation function receives the job ID (string)
    mutationFn: (jobId) => deleteAdminById(jobId, token as string),
    
    onSuccess: () => {
      // ✅ Invalidate the job list cache immediately after successful deletion
      queryClient.invalidateQueries({ queryKey: [Admin_Query_Keys.My_Admins] });      
      // OPTIONAL: Show a success toast notification
      toast.success("Admin deleted successfully.");

      // ✅ Temporary fix: Reload the entire browser window
      window.location.reload();
    },
    
    onError: (error) => {
      // OPTIONAL: Show an error toast notification
      toast.error(`Error deleting admin: ${error.message}`);
    },
  });
};


//=========create new admin ==========
export const usecreateAdmin = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: createAdminType) => createAdmin(data, token),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Admin created successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

//======== update admin profike ================
export const useUpdateAdminProfile = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: updateUserProfileType) => updateAdminProfile(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Admin status updated successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

//=====fetching User ========
export const useGetUsers = (
    filters: {
    status?: string;
    role?: string;
    keyword?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile", filters],
    queryFn: () => fetchUsers(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


//=====fetching User detail ========
export const useUserById = (id: string, token: string) => {
  return useQuery<userProfile, Error>({ // Added type for useQuery
    queryKey: [Admin_Query_Keys.Admin_ID, id],
    queryFn: () => fetchUserById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};


//======== update user status ================
export const useUpdateUserStatus = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: updateUserStatusType) => updateUserStatus(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`User status updated successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};



//======== update user ban / unban status ================
export const useUpdateUserBanStatus = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: userBanStatusUpdateType) => userBanStatus(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`User ban status updated successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};



//======== update user profile ================
export const useUpdateUserProfile = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: updateUserProfileType) => updateUserProfile(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`User status updated successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};


//=====fetching Course list ========
export const useGetCourseList = (
    filters: {
    status?: string;
    category?: string;
    keyword?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile", filters],
    queryFn: () => fetchCourses(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


//=====fetching course detail ========
export const useCourseById = (id: string, token: string) => {
  return useQuery<userProfile, Error>({ // Added type for useQuery
    queryKey: [Admin_Query_Keys.Admin_ID, id],
    queryFn: () => fetchCourseById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};


//======== approve course ================
export const useApproveCourse = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: approveCoursetype) => approveCourse(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Course approved successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};


//======== reject course ================
export const useRejectCourse = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: rejectCoursetype) => rejectCourse(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Course rejected successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};


//======== update course ================
export const useUpdateCourse = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: updateCoursetype) => updateCourse(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Course rejected successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

//=====fetching category ========
export const useGetCategory = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchCategory(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching category detail ========
export const useCategoryById = (id: string, token: string) => {
  return useQuery<userProfile, Error>({ // Added type for useQuery
    queryKey: [Admin_Query_Keys.Admin_ID, id],
    queryFn: () => fetchCategoryById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};

//=========create new category ==========
export const usecreateCategory = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: createCategoryType) => createCategory(data, token),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Category created successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

//======== update category ================
export const useUpdateCategory = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: updateCategoryType) => updateCategory(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Category updated successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

// ===== Delete Category ========
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { token } = useAuth(); // Assuming you can access token here

  return useMutation<void, Error, string>({
    // The mutation function receives the job ID (string)
    mutationFn: (categoryId) => deleteCategoryById(categoryId, token as string),
    
    onSuccess: () => {
      // ✅ Invalidate the job list cache immediately after successful deletion
      queryClient.invalidateQueries({ queryKey: [Admin_Query_Keys.My_Admins] });      
      // OPTIONAL: Show a success toast notification
      toast.success("Category deleted successfully.");

      // ✅ Temporary fix: Reload the entire browser window
      window.location.reload();
    },
    
    onError: (error) => {
      // OPTIONAL: Show an error toast notification
      toast.error(`Error deleting category: ${error.message}`);
    },
  });
};

//=====fetching services ========
export const useGetService = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchService(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


//=====fetching service detail ========
export const useServiceById = (id: string, token: string) => {
  return useQuery<userProfile, Error>({ // Added type for useQuery
    queryKey: [Admin_Query_Keys.Admin_ID, id],
    queryFn: () => fetchServiceById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};

//=========create new service ==========
export const usecreateService = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: createServiceType) => createService(data, token),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Service created successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

//======== update service ================
export const useUpdateService = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: updateServiceType) => updateService(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Service updated successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

// ===== Delete Service ========
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  const { token } = useAuth(); // Assuming you can access token here

  return useMutation<void, Error, string>({
    // The mutation function receives the job ID (string)
    mutationFn: (serviceId) => deleteServiceById(serviceId, token as string),
    
    onSuccess: () => {
      // ✅ Invalidate the job list cache immediately after successful deletion
      queryClient.invalidateQueries({ queryKey: [Admin_Query_Keys.My_Admins] });      
      // OPTIONAL: Show a success toast notification
      toast.success("Service deleted successfully.");

      // ✅ Temporary fix: Reload the entire browser window
      window.location.reload();
    },
    
    onError: (error) => {
      // OPTIONAL: Show an error toast notification
      toast.error(`Error deleting service: ${error.message}`);
    },
  });
};


//=====fetching Dashboard Metrics ========
export const useGetDashboardMetric = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardMetric(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching Dashboard Charts - User Growth  ========
export const useGetDashboardUserGrowth = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardUserGrowth(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


//=====fetching Dashboard Charts - Revenue Trends  ========
export const useGetDashboardRevenueTrends = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardRevenueTrends(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching Dashboard Charts - Service Categories  ========
export const useGetDashboardServiceCategories = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardServiceCategories(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching Dashboard Charts - Geographic Distribution ========
export const useGetDashboardGeographicDistribution = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardGeographicDistribution(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching Dashboard Charts -Top Performing Providers ========
export const useGetDashboardTopPerformingProviders = () => {
  const { token } = useAuth();

  return useQuery<userProfile, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardTopPerformingProviders(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};