import axios from "axios";
import { addDisbuteMessageType, AdminUsersResponse, approveCoursetype, approveKYCType, CourseDetailResponse, createAdminType, createCategoryType, CreateOnlineCoursePayload, CreatePhysicalCoursePayload, createServiceType, DashboardMetrics, GetCoursesResponse, LoginCredentials, LoginResponse, NotificationPreferencesType, PaginatedCourses, PaginatedKYCResponse, PaginatedPaymentsResponse, PaginatedUsers, rejectCoursetype, rejectKYCType, resolveDisbuteType, RevenueAnalytics, RevenueAnalyticsData, RevenueAnalyticsResponse, Service, ServiceAnalytics, ServiceApiResponse, updateCategoryType, updateCoursetype, updateDocVerificationType, updateServiceType, updateUserProfileType, updateUserStatusType, UserAnalytics, UserAnalyticsData, UserAnalyticsResponse, userBanStatusUpdateType, userProfile } from "./type";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl);


// ======= Signin call ========
export const signIn = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const res = await axios.post(`${apiUrl}/api/v1/auth/login`, credentials);
  return res.data;
};

//=====fetching Admin ========
export const fetchAdmin = async (token: string): Promise<AdminUsersResponse> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/users?role=admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // full response including success/message/data
};

//=====fetching Admin detail========
export const fetchAdminById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

//=====fetching Admin Activity========
export const fetchAdminActivity = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/profile/activity`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; // { user: { ... } }
};

// ======= Delete admin ========
export const deleteAdminById = async (id: string, token: string): Promise<void> => {
  if (!token) throw new Error("Authentication token missing");
  
  // NOTE: Assuming your API URL structure is consistent
  const response = await axios.delete(`${apiUrl}/api/v1/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  // You can return the response data if needed, but for delete, void is typical.
  if (response.status !== 200 && response.status !== 204) {
    throw new Error('Failed to delete admin.');
  }
};


//========create admin ================
export const createAdmin = async (data: createAdminType, token: string | null) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/admins`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== update admin profile ================
export const updateAdminProfile = async (data: updateUserProfileType, token: string | null, id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/admin/users/${id}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


//=====fetching users ========
// export const fetchUsers = async (token: string): Promise<userProfile> => {
//   const response = await axios.get(`${apiUrl}/api/v1/admin/users`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data.data; // { user: { ... } }
// };

export const fetchUsers = async (
  token: string,
  filters: {
    keyword?: string;
    status?: string;
    role?: string;      // will be sent as ?role=... or ?userType=... — adjust name if backend expects different
  } = {}
): Promise<PaginatedUsers> => {
  const params = new URLSearchParams();

  if (filters.keyword) params.append("keyword", filters.keyword);
  if (filters.status)  params.append("status",  filters.status);
  if (filters.role)    params.append("role",    filters.role);     // ← change to "userType" if backend uses userType

  const query = params.toString();
  const url = `${apiUrl}/api/v1/admin/users${query ? `?${query}` : ""}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Assuming response shape is { success, message, data: { users, total, ... } }
  return response.data.data as PaginatedUsers;
};


//=====fetching User detail========
export const fetchUserById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};


//======== update user status ================
export const updateUserStatus = async (data: updateUserStatusType, token: string | null, id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/admin/users/${id}/status`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


//======== update user ban / unban status ================
export const userBanStatus = async (data: userBanStatusUpdateType, token: string | null, id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/admin/users/${id}/ban`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


//======== update user profile ================
export const updateUserProfile = async (data: updateUserProfileType, token: string | null, id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/admin/users/${id}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


//=====fetching Course list ========
// export const fetchCourses = async (token: string): Promise<userProfile> => {
//   const response = await axios.get(`${apiUrl}/api/v1/admin/courses`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data.data; // { user: { ... } }
// };
export const fetchCourses = async (token: string): Promise<PaginatedCourses> => {
  const response = await axios.get<GetCoursesResponse>(`${apiUrl}/api/v1/admin/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};


//=====fetching course detail========
export const fetchCourseById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get<CourseDetailResponse>(
    `${apiUrl}/api/v1/admin/courses/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data.course; // return the actual course object
};

//======== approve course ================
export const approveCourse = async (data: approveCoursetype, token: string | null, id: string) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/courses/${id}/approve`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== reject course ================
export const rejectCourse = async (data: rejectCoursetype, token: string | null, id: string) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/courses/${id}/reject`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== update course ================
export const updateCourse = async (data: updateCoursetype, token: string | null, id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/admin/courses/${id}/status`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//====== create online course ======
export const createOnlineCourse = async (data: CreateOnlineCoursePayload) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication required");
  }

  const res = await axios.post(
    `${apiUrl}/api/v1/courses`, 
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};



//====== create physical course ======
export const createPhysicalCourse = async (data: CreatePhysicalCoursePayload) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication required");
  }

  const res = await axios.post(
    `${apiUrl}/api/v1/courses`, 
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

//=====fetching categoty ========
export const fetchCategory = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/lookups/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};


//=====fetching category detail========
export const fetchCategoryById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/admin/lookups/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

//========create category ================
export const createCategory = async (data: createCategoryType, token: string | null) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/lookups/categories`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== update category ================
export const updateCategory = async (data: updateCategoryType, token: string | null, id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/admin/lookups/categories/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// ======= Delete category ========
export const deleteCategoryById = async (id: string, token: string): Promise<void> => {
  if (!token) throw new Error("Authentication token missing");
  
  // NOTE: Assuming your API URL structure is consistent
  const response = await axios.delete(`${apiUrl}/api/v1/admin/lookups/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  // You can return the response data if needed, but for delete, void is typical.
  if (response.status !== 200 && response.status !== 204) {
    throw new Error('Failed to delete category.');
  }
};


//=====fetching services ========
// export const fetchService = async (token: string): Promise<createServiceType[]> => {
//   const response = await axios.get(`${apiUrl}/api/v1/admin/lookups/services`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data.data; // make sure API returns an array
// };

export const fetchService = async (token: string): Promise<Service[]> => {
  const response = await axios.get<ServiceApiResponse>(
    `${apiUrl}/api/v1/admin/lookups/services`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // return the array of services directly
  return response.data.data.services;
};



//=====fetching category detail========
export const fetchServiceById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/admin/lookups/services/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

//========create services ================
export const createService = async (data: createServiceType, token: string | null) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/lookups/services`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== update service ================
export const updateService = async (data: updateServiceType, token: string | null, id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/admin/lookups/services/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


// ======= Delete service ========
export const deleteServiceById = async (id: string, token: string): Promise<void> => {
  if (!token) throw new Error("Authentication token missing");
  
  // NOTE: Assuming your API URL structure is consistent
  const response = await axios.delete(`${apiUrl}/api/v1/admin/lookups/services/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  // You can return the response data if needed, but for delete, void is typical.
  if (response.status !== 200 && response.status !== 204) {
    throw new Error('Failed to delete category.');
  }
};


//=====fetching Dashboard Metrics ========
export const fetchDashboardMetric = async (token: string): Promise<DashboardMetrics> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/dashboard/metrics`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};


//=====fetching Dashboard Charts - User Growth  ========
export const fetchDashboardUserGrowth = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/dashboard/charts/user_growth`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//=====fetching Dashboard Charts - Revenue Trends  ========
export const fetchDashboardRevenueTrends = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/dashboard/charts/revenue_trends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//=====fetching Dashboard Charts - Service Categories  ========
export const fetchDashboardServiceCategories = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/dashboard/charts/service_categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//=====fetching Dashboard Charts - Geographic Distribution ========
export const fetchDashboardGeographicDistribution = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/dashboard/charts/geographic_distribution`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//=====fetching Dashboard Charts -Top Performing Providers ========
export const fetchDashboardTopPerformingProviders = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/analytics/top-providers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};


// Fetch current admin profile/activity
export const fetchAdminProfile = async (token: string) => {
  const response = await axios.get(
    `${apiUrl}/api/v1/admin/profile/activity`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data; // adjust path if the ID is nested differently
};

//=========== upload file for profile ==============
export const uploadSingleFile = async (file: File): Promise<string> => {
  const token = localStorage.getItem("authToken");

  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${apiUrl}/api/v1/upload/single`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // This matches your actual response
  return res.data.data.url;   // ← This is the correct path
};


// ======== Update Notification call =========
export const updateNotificationPreferences = async (
  preferences: Partial<NotificationPreferencesType>, // Partial allows sending only changed fields
  token: string | null
) => {
  if (!token) {
    throw new Error('Authentication token is required');
  }

  const response = await axios.patch(
    `${apiUrl}/api/v1/notifications/preferences`,
    preferences,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};


// ========Fetch Notification preference =========
export const fetchNotificationPreferences = async (
  token: string
): Promise<NotificationPreferencesType> => {
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.get(
    `${apiUrl}/api/v1/notifications/preferences`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // return response.data as NotificationPreferencesType;
  return response.data.data.preferences as NotificationPreferencesType;
};

// =========== reset Notification ===========
export const resetNotificationPreferences = async (token: string | null) => {
  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.post(
    `${apiUrl}/api/v1/notifications/preferences/reset`,
    {}, // ← no request body needed
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

//=====fetching pending KYC ========
// export const fetchPendingKYC = async (token: string): Promise<userProfile> => {
//   const response = await axios.get(`${apiUrl}/api/v1/admin/kyc/pending?`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data.data; 
// };

export const fetchPendingKYC = async (
  token: string,
  filters: { status?: string; priority?: string; keyword?: string; page?: number; limit?: number } = {}
): Promise<PaginatedKYCResponse> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/kyc/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: filters, // pass filters + page + limit directly
  });

  return response.data.data; // data contains { users, page, limit, totalPages, total }
};


//=====fetching KYC details========
export const fetchKYCDetailById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/admin/kyc/applications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

//======== approve KYC ================
export const approveKYC = async (data: approveKYCType, token: string | null, id: string) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/kyc/applications/${id}/approve`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

//======== decline KYC ================
export const declineKYC = async (data: rejectKYCType, token: string | null, id: string) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/kyc/applications/${id}/reject`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


//======== update KYC Doc ================
export const updateKYCDoc = async (data: updateDocVerificationType, token: string | null, id: string) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/kyc/documents/${id}/verify`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


//=====fetching disbute list ========
export const fetchDisbuteList = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/disputes?`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//=====fetching disbute detail========
export const fetchDisbuteDetailById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/admin/disputes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

//======== add dispute message ================
export const disputeMessage = async (data: addDisbuteMessageType, token: string | null, id: string) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/disputes/${id}/messages`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


//======== resolve dispute ================
export const resolveDispute = async (data: resolveDisbuteType, token: string | null, id: string) => {
  const res = await axios.post(`${apiUrl}/api/v1/admin/disputes/${id}/resolve`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// //=====fetching user analysis ========
// export const fetchUserAnalysis = async (token: string): Promise<UserAnalyticsResponse> => {
//   const response = await axios.get(`${apiUrl}/api/v1/admin/analytics/users?`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data.data; 
// };

// //=====fetching revenue analysis ========
// export const fetchRevenueAnalysis = async (token: string): Promise<RevenueAnalyticsResponse> => {
//   const response = await axios.get(`${apiUrl}/api/v1/admin/analytics/revenue?`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data.data; 
// };

// //=====fetching service analysis ========
// export const fetchServiceAnalysis = async (token: string): Promise<ServiceAnalytics> => {
//   const response = await axios.get(`${apiUrl}/api/v1/admin/analytics/services?`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data.data; 
// };

export const fetchUserAnalysis = async (token: string): Promise<UserAnalyticsData> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/analytics/users?`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};

export const fetchRevenueAnalysis = async (token: string): Promise<RevenueAnalyticsData> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/analytics/revenue?`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};

export const fetchServiceAnalysis = async (token: string): Promise<ServiceAnalytics> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/analytics/services?`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};


//=====export analysis report ========
export const exportAnalyticReport = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/analytics/export?`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//=====fetching transaction list ========

export const fetchTransactionList = async (
  token: string,
  params?: {
    page?: number;
    limit?: number;
    status?: string;
  }
): Promise<PaginatedPaymentsResponse> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data.data;
};


//=====fetching transaction detail========
export const fetchTransactionDetailById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/admin/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

//=====fetching wallet list ========
export const fetchWalletList = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/wallets?`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};

//=====fetching wallet detail========
export const fetchWalletDetailById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/admin/wallets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
