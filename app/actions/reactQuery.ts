/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";
import { approveCourse, approveKYC, assignRoles, createAdmin, createCategory, createOnlineCourse, createPhysicalCourse, createPlan, createRoles, createService, declineKYC, deleteAdminById, deleteCategoryById, deleteRoleById, deleteServiceById, disputeMessage, exportAnalyticReport, fetchAdmin, fetchAdminActivity, fetchAdminById, fetchAdminProfile, fetchCategory, fetchCategoryById, fetchCourseById, fetchCourses, fetchDashboardGeographicDistribution, fetchDashboardMetric, fetchDashboardRevenueTrends, fetchDashboardServiceCategories, fetchDashboardTopPerformingProviders, fetchDashboardUserGrowth, fetchDisbuteDetailById, fetchDisbuteList, fetchKYCDetailById, fetchNotificationPreferences, fetchPendingKYC, fetchPermissionList, fetchRevenueAnalysis, fetchRoleById, fetchRoleOnlyById, fetchRolesList, fetchService, fetchServiceAnalysis, fetchServiceById, fetchSubscriptionList, fetchTransactionDetailById, fetchTransactionList, fetchUserAnalysis, fetchUserById, fetchUsers, fetchWalletDetailById, fetchWalletList, rejectCourse, removeRoles, resetNotificationPreferences, resolveDispute, signIn, updateAdminProfile, updateCategory, updateCourse, updateKYCDoc, updateNotificationPreferences, updateRole, updateService, updateUserProfile, updateUserStatus, userBanStatus } from "./api";
import { addDisbuteMessageType, Admin_Query_Keys, AdminRole, AdminUsersResponse, AdminUsersResponse1, approveCoursetype, approveKYCType, AssignRole, CourseDetail, createAdminType, createCategoryType, CreatePlanType, createServiceType, DashboardMetrics, GetCoursesResponse, LoginCredentials, LoginResponse, NotificationPreferencesType, PaginatedCourses, PaginatedKYCResponse, PaginatedPaymentsResponse, PaginatedUsers, Permission, rejectCoursetype, rejectKYCType, resolveDisbuteType, RevenueAnalytics, RevenueAnalyticsData, RevenueAnalyticsResponse, Role, Role1, RoleByIdResponse, RolesResponse, Service, ServiceAnalytics, updateCategoryType, updateCoursetype, updateDocVerificationType, updateRoleType, updateServiceType, updateUserProfileType, updateUserStatusType, UserAnalytics, UserAnalyticsData, UserAnalyticsResponse, userBanStatusUpdateType, userProfile } from "./type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import axios from "axios";


// ======= Signin call ========
// export const useSigninAccount = () => {
//   return useMutation<LoginResponse, Error, LoginCredentials>({
//     mutationFn: signIn,
//     onSuccess: (data) => {
//       toast.success(data.message || "Login successful!");
//     },
//     onError: (error: any) => {
//       const message = error?.response?.data?.message || "Invalid email or password";
//       toast.error(message);
//     },
//   });
// };

export const useSigninAccount = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: signIn,
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Invalid email or password";
      toast.error(message);
    },
  });
};


//=====fetching Admin ========
export const useGetAdmin = () => {
  const { token } = useAuth();

  return useQuery<AdminUsersResponse1, Error>({
    queryKey: ["admins", "list"],
    queryFn: () => fetchAdmin(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
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

      //Reload the entire browser window
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
    keyword?: string;
    status?: string;
    role?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<PaginatedUsers, Error>({
    queryKey: ["users", filters],               // more semantic than "user-profile"
    queryFn: () => fetchUsers(token as string, filters),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    // Optional but recommended when filtering:
    // keepPreviousData: true,
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

  return useQuery<PaginatedCourses, Error>({
    queryKey: ["courses", "list", filters],
    queryFn: () => fetchCourses(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
};


//=====fetching course detail ========
export const useCourseById = (id: string) => {
  const { token } = useAuth();

  return useQuery<CourseDetail, Error>({
    queryKey: ["course", "detail", id],
    queryFn: () => fetchCourseById(id, token as string),
    enabled: !!id && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};


//======== approve course ================
export const useApproveCourse = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: approveCoursetype }) =>
      approveCourse(data, token, id),
    onSuccess: () => {
      toast.success("Course approved successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error approving course"
      );
    },
  });
};


//======== reject course ================
export const useRejectCourse = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: rejectCoursetype }) =>
      rejectCourse(data, token, id),
    onSuccess: () => {
      toast.success("Course rejected successfully");
      // Optional: invalidate courses list
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error rejecting course"
      );
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

//====== create online course ======
export const useCreateOnlineCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOnlineCourse,
    onSuccess: (data) => {
      toast.success("Online course created successfully!");
      // Optionally invalidate/refetch courses list
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create online course";
      toast.error(message);
    },
  });
};

//====== create physical course ======
export const useCreatePhysicalCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPhysicalCourse,
    onSuccess: (data) => {
      toast.success("Online course created successfully!");
      // Optionally invalidate/refetch courses list
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create online course";
      toast.error(message);
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
// export const useGetService = () => {
//   const { token } = useAuth();

//   return useQuery<createServiceType[], Error>({
//     queryKey: ["services"],
//     queryFn: async () => {
//       const res = await fetchService(token as string);
//       // ensure it's always an array
//       return Array.isArray(res) ? res : [];
//     },
//     enabled: !!token,
//     staleTime: 5 * 60 * 1000,
//   });
// };

export const useGetService = () => {
  const { token } = useAuth();

  return useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: () => fetchService(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
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
  return useQuery<DashboardMetrics, Error>({
    queryKey: ["dashboard-metrics"], // Updated unique key
    queryFn: () => fetchDashboardMetric(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
};

//=====fetching Dashboard Charts - User Growth  ========
export const useGetDashboardUserGrowth = () => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardUserGrowth(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


//=====fetching Dashboard Charts - Revenue Trends  ========
export const useGetDashboardRevenueTrends = () => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardRevenueTrends(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching Dashboard Charts - Service Categories  ========
export const useGetDashboardServiceCategories = () => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardServiceCategories(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching Dashboard Charts - Geographic Distribution ========
export const useGetDashboardGeographicDistribution = () => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardGeographicDistribution(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching Dashboard Charts -Top Performing Providers ========
export const useGetDashboardTopPerformingProviders = () => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-profile"],
    queryFn: () => fetchDashboardTopPerformingProviders(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get current admin profile
export const useAdminProfile = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["admin", "profile"],
    queryFn: () => fetchAdminProfile(token as string),
    enabled: !!token,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// ======== Update Notification call =========
export const useUpdateNotificationPreferences = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences: Partial<NotificationPreferencesType>) =>
      updateNotificationPreferences(preferences, token),

    onSuccess: (data) => {
      // Optional: invalidate queries that might depend on this data
      queryClient.invalidateQueries({ queryKey: ['notification-preferences'] });

      toast.success('Notification preferences updated successfully');
    },

    onError: (error: any) => {
      let errorMessage = 'Failed to update notification preferences';

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(`Error: ${errorMessage}`);
    },

    onMutate: async (newPreferences) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['notification-preferences'] });

      // Snapshot the previous value
      const previousPreferences = queryClient.getQueryData<NotificationPreferencesType>([
        'notification-preferences',
      ]);

      // Optimistically update
      queryClient.setQueryData(['notification-preferences'], (old: any) => ({
        ...old,
        ...newPreferences,
      }));

      // Return context with previous value for rollback on error
      return { previousPreferences };
    },

    // If the mutation fails, roll back to the previous value
    onSettled: (data, error, newPreferences, context) => {
      if (error && context?.previousPreferences) {
        queryClient.setQueryData(
          ['notification-preferences'],
          context.previousPreferences
        );
      }
    },
  });
};

// ========Fetch Notification preference =========
export const useNotificationPreferences = () => {
  const { token } = useAuth();

  return useQuery<NotificationPreferencesType, Error>({
    queryKey: ['notification-preferences'],
    queryFn: () => fetchNotificationPreferences(token as string),
    enabled: !!token, // only run when we have a token
    staleTime: 1000 * 60 * 5, // 5 minutes - preferences don't change very often
    gcTime: 1000 * 60 * 30,   // 30 minutes cache
    retry: 1,                 // less aggressive retry than default
  });
};

// =========== reset Notification ===========
export const useResetNotificationPreferences = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resetNotificationPreferences(token),

    onSuccess: () => {
      // Invalidate the preferences query so it refetches fresh (reset) values
      queryClient.invalidateQueries({ queryKey: ['notification-preferences'] });

      toast.success("Notification preferences reset to default successfully");
    },

    onError: (error: any) => {
      let errorMessage = "Failed to reset notification preferences";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(`Error: ${errorMessage}`);
    },
  });
};


//=====fetching pending KYC ========
// export const useGetPendingKYC = (
//     filters: {
//     status?: string;
//     priority?: string;
//     keyword?: string;
//   } = {}
// ) => {
//   const { token } = useAuth();

//   return useQuery<any, Error>({
//     queryKey: ["user-profile", filters],
//     queryFn: () => fetchPendingKYC(token as string),
//     enabled: !!token,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

export const useGetPendingKYC = (
  filters: { status?: string; priority?: string; keyword?: string; page?: number; limit?: number } = {}
) => {
  const { token } = useAuth();

  return useQuery<PaginatedKYCResponse, Error>({
    queryKey: ["user-profile", filters],
    queryFn: () => fetchPendingKYC(token as string, filters),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};




//=====fetching KYC details========
export const useGetKYCDetail = (id: string, token: string) => {
  return useQuery<userProfile, Error>({ // Added type for useQuery
    queryKey: [Admin_Query_Keys.Admin_ID, id],
    queryFn: () => fetchKYCDetailById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};

//======== approve KYC ================
export const useApproveKYC= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: approveKYCType }) =>
      approveKYC(data, token, id),
    onSuccess: () => {
      toast.success("KYC approved successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error approving course"
      );
    },
  });
};

//======== decline KYC ================
export const useDeclineKYC= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: rejectKYCType }) =>
      declineKYC(data, token, id),
    onSuccess: () => {
      toast.success("KYC decline successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error approving course"
      );
    },
  });
};

//======== update KYC Doc ================
export const useUpdateKYCDoc= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: updateDocVerificationType }) =>
      updateKYCDoc(data, token, id),
    onSuccess: () => {
      toast.success("KYC document updated successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error approving course"
      );
    },
  });
};

//=====fetching disbute list ========
export const useGetDisbute = (
    filters: {
    status?: string;
    priority?: string;
    type?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-profile", filters],
    queryFn: () => fetchDisbuteList(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching disbute detail========
export const useGetDisbuteDetail = (id: string, token: string) => {
  return useQuery<userProfile, Error>({ // Added type for useQuery
    queryKey: [Admin_Query_Keys.Admin_ID, id],
    queryFn: () => fetchDisbuteDetailById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};

//======== add dispute message ================
export const useAddDisputeMessage= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: addDisbuteMessageType }) =>
      disputeMessage(data, token, id),
    onSuccess: () => {
      toast.success("Dispute Message added successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error adding dispute message"
      );
    },
  });
};


//======== resolve dispute ================
export const useResolveDispute= () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: resolveDisbuteType }) =>
      resolveDispute(data, token, id),
    onSuccess: () => {
      toast.success("Dispute resolved successfully");
      // Optional: invalidate courses list query to refresh
      // queryClient.invalidateQueries({ queryKey: ["courses", "list"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error resolving dispute "
      );
    },
  });
};


// //=====fetching user analysis ========
// export const useGetUserAnalysis = (
//     filters: {
//     status?: string;
//     period?: string;
//     groupBy?: string;
//   } = {}
// ) => {
//   const { token } = useAuth();

//   return useQuery<any, Error>({
//     queryKey: ["user-profile", filters],
//     queryFn: () => fetchUserAnalysis(token as string),
//     enabled: !!token,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

// //=====fetching revenue analysis ========
// export const useGetRevenueAnalysis = (
//     filters: {
//     status?: string;
//     period?: string;
//     groupBy?: string;
//   } = {}
// ) => {
//   const { token } = useAuth();

//   return useQuery<any, Error>({
//     queryKey: ["user-profile", filters],
//     queryFn: () => fetchRevenueAnalysis(token as string),
//     enabled: !!token,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

// //=====fetching service analysis ========
// export const useGetServiceAnalysis = (
//     filters: {
//     status?: string;
//     period?: string;
//     groupBy?: string;
//   } = {}
// ) => {
//   const { token } = useAuth();

//   return useQuery<any, Error>({
//     queryKey: ["user-profile", filters],
//     queryFn: () => fetchServiceAnalysis(token as string),
//     enabled: !!token,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

export const useUserAnalytics = () => {
  const { token } = useAuth();

  return useQuery<UserAnalyticsData, Error>({
    queryKey: ["analytics", "users"],
    queryFn: () => fetchUserAnalysis(token as string),
    enabled: !!token,
  });
};

export const useRevenueAnalytics = () => {
  const { token } = useAuth();

  return useQuery<RevenueAnalyticsData, Error>({
    queryKey: ["analytics", "revenue"],
    queryFn: () => fetchRevenueAnalysis(token as string),
    enabled: !!token,
  });
};

export const useGetServiceAnalysis = () => {
  const { token } = useAuth();

  return useQuery<ServiceAnalytics, Error>({
    queryKey: ["analytics", "services"],
    queryFn: () => fetchServiceAnalysis(token as string),
    enabled: !!token,
  });
};



//=====export analysis report ========
export const useExportAnalyticReport = (
    filters: {
    status?: string;
    period?: string;
    groupBy?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-profile", filters],
    queryFn: () => exportAnalyticReport(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching transaction list ========
export const useGetTransactionList = (params: {
  page: number;
  limit: number;
  status?: string;
}) => {
  const { token } = useAuth();

  return useQuery<PaginatedPaymentsResponse, Error>({
    queryKey: ['admin-transactions', params],
    queryFn: () => fetchTransactionList(token as string, params),
    enabled: !!token,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};


//=====fetching transaction detail ========
export const useGetTransactionDetail = (id: string, token: string) => {
  return useQuery<userProfile, Error>({ // Added type for useQuery
    queryKey: [Admin_Query_Keys.Admin_ID, id],
    queryFn: () => fetchTransactionDetailById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};

//=====fetching wallet list ========
export const useGetWalletList = (
    filters: {
    status?: string;
    period?: string;
    groupBy?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["user-profile", filters],
    queryFn: () => fetchWalletList(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//=====fetching wallet detail ========
export const useGetWalletDetail = (id: string, token: string) => {
  return useQuery<userProfile, Error>({ // Added type for useQuery
    queryKey: [Admin_Query_Keys.Admin_ID, id],
    queryFn: () => fetchWalletDetailById(id, token),
    enabled: !!id && !!token, // Ensure it only runs if both are available
  });
};

// =========== create plans ============
export const useCreatePlan = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (data: CreatePlanType) =>
      createPlan(data, token),

    onSuccess: () => {
      toast.success("Plan created successfully");
    },

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });
};


//=====fetching subscription list ========
export const useGetSubscriptionList = (
    filters: {
    status?: string;
    period?: string;
    groupBy?: string;
  } = {}
) => {
  const { token } = useAuth();

  return useQuery<any, Error>({
    queryKey: ["subscription-plans", filters],
    queryFn: () => fetchSubscriptionList(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


// =========== create plans ============
export const useCreateRoles = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (data: AdminRole) =>
      createRoles(data, token),

    onSuccess: () => {
      toast.success("Roles created successfully");
    },

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });
};

//=====fetching roles list ========
export const useGetRolesList = () => {
  const { token } = useAuth();

  return useQuery<RolesResponse, Error>({
    queryKey: ["admin-roles"],
    queryFn: () => fetchRolesList(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
};


//=====fetching permission list ========
export const useGetPermissionList = () => {
  const { token } = useAuth();

  return useQuery<Permission[], Error>({
    queryKey: ["admin-permission"],
    queryFn: () => fetchPermissionList(token as string),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
};


// ===== Delete Roles ========
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  const { token } = useAuth(); 

  return useMutation<void, Error, string>({
    mutationFn: (roleId) => deleteRoleById(roleId, token as string),
    
    onSuccess: () => {
      // ✅ Invalidate the job list cache immediately after successful deletion
      queryClient.invalidateQueries({ queryKey: [Admin_Query_Keys.My_Admins] });      
      // OPTIONAL: Show a success toast notification
      toast.success("Role deleted successfully.");

      
      //Reload the entire browser window
      setTimeout(() => {
        window.location.reload();
      }, 4000); 
    },
    
    onError: (error) => {
      // OPTIONAL: Show an error toast notification
      toast.error(`Error deleting role: ${error.message}`);
    },
  });
};


// =========== assign role to admin ============
export const useCreateAssignRole = (id: string) => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (data: AssignRole) =>
      assignRoles(data, token, id),

    onSuccess: () => {
      toast.success("Roles assigned successfully");
    },

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });
};

// =========== remove role ============
export const useCreateRemoveRole = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (data: AssignRole) =>
      removeRoles(data, token),

    onSuccess: () => {
      toast.success("Roles removed successfully");
    },

    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });
};

//=====fetching role detail ========
export const useRoleById = (id: string, token: string) => {
  return useQuery<RoleByIdResponse, Error>({
    queryKey: ["role-detail", id],
    queryFn: () => fetchRoleById(id, token),
    enabled: !!id && !!token,
  });
};

//=====fetching role detail to edit role ========
export const useRoleOnlyById = (id: string, token: string) => {
  return useQuery<Role1, Error>({
    queryKey: ["role-only", id],
    queryFn: () => fetchRoleOnlyById(id, token),
    enabled: !!id && !!token,
  });
};


//======== update Role ================
export const useUpdateRole = (id: string) => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (data: updateRoleType) => updateRole(data, token, id),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Role updated successfully`);
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