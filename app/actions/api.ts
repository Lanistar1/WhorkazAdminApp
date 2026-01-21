import axios from "axios";
import { approveCoursetype, createAdminType, createCategoryType, createServiceType, LoginCredentials, LoginResponse, rejectCoursetype, updateCategoryType, updateCoursetype, updateServiceType, updateUserProfileType, updateUserStatusType, userBanStatusUpdateType, userProfile } from "./type";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl);


// ======= Signin call ========
export const signIn = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const res = await axios.post(`${apiUrl}/api/v1/auth/login`, credentials);
  return res.data;
};

//=====fetching Admin ========
export const fetchAdmin = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/users?role=admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; // { user: { ... } }
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
  const res = await axios.patch(`${apiUrl}/api/v1/admin/admins`, data, {
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
export const fetchUsers = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/users?role=admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; // { user: { ... } }
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
export const fetchCourses = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; // { user: { ... } }
};


//=====fetching course detail========
export const fetchCourseById = async (id: string, token: string) => {
  if (!token) throw new Error("Authentication token missing");

  const response = await axios.get(`${apiUrl}/api/v1/admin/courses//${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};


//======== approve course ================
export const approveCourse = async (data: approveCoursetype, token: string | null, id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/admin/courses/${id}/approve`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};


//======== reject course ================
export const rejectCourse = async (data: rejectCoursetype, token: string | null, id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/admin/courses/${id}/reject`, data, {
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
export const fetchService = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/lookups/services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
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
export const fetchDashboardMetric = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/api/v1/admin/dashboard/metrics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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