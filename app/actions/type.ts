/* eslint-disable @typescript-eslint/no-explicit-any */
// types/auth.ts or anywhere you keep types

export type LoginCredentials = {
  email: string;
  password: string;
};

export type UserFromAPI = {
  email: string;
  userType: "client" | "freelancer";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: string | null;
  status?: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: UserFromAPI;
    token: string;
  };
};

export interface UserProfile {
  id: string;
  email: string;
  phoneNumber: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profilePic: string | null;
  userType: "client" | "workman";
  status: string;
  createdAt: string;
  workman: any | null;
}

export type userProfile = {
  user: UserProfile;
};

//========== create Admin ========
export type createAdminType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
};

//========== for get admin by id =====================
export enum Admin_Query_Keys {
  Admin_ID = "id",
  My_Admins = "My_Admins",
}

//========== update user status  ========
export type updateUserStatusType = {
  status: string;
  reason: string;
  suspension_duration_days: string;
};

//========== update ban / unban user  ========
export type userBanStatusUpdateType = {
  action: string;
  reason: string;
  permanent: boolean;
};


//========== update user profile  ========
export type updateUserProfileType = {
  first_name: string;
  last_name: string;
  phone: string;
  status: boolean;
};

//========== Approve course  ========
export type approveCoursetype = {
  admin_id: string;
  review_notes: string;
  approved: boolean;
};

//========== reject course  ========
export type rejectCoursetype = {
  reason: string;
  rejection_notes: string;
  allow_resubmission: boolean;
};

//========== update course status ========
export type updateCoursetype = {
  status: string;
  reason: string;
};

//========== create category ========
export type createCategoryType = {
  name: string;
  description: string;
  type: string;
  parentId: string;
  isActive: boolean;
};

//========== update category ========
export type updateCategoryType = {
  name: string;
  description: string;
  isActive: boolean;
};

//========== create service ========
export type createServiceType = {
  name: string;
  description: string;
  isActive: boolean;
};

//========== update service ========
export type updateServiceType = {
  name: string;
  description: string;
  isActive: boolean;
};


// =========== types/user.ts ================

export interface NotificationPreferences {
  payments: { push: boolean; email: boolean };
  newMessages: { push: boolean; email: boolean };
  announcements: { push: boolean; email: boolean };
  accountActivity: { push: boolean; email: boolean };
  jobStatusUpdates: { push: boolean; email: boolean };
}

export interface ClientProfile {
  id: string;
  clientType: "individual" | "business";
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string;
  companyName: string | null;
  industry: string | null;
  photo: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkmanProfile {
  id: string;
  skills: string[] | null;
  photo: string | null;
  rank: string;
  rating: string;
  level: number;
  serviceFee: string | null;
  location: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: string | null;
  kycType: string | null;
  kycRejectionReason: string | null;
  profilePic: string | null;
  address: string | null;
  bio: string | null;
  emailVerificationOtpExpiresAt: string | null;
  phoneVerificationOtpExpiresAt: string | null;
  userType: "admin" | "client" | "workman";
  status: string;
  notificationPreferences: NotificationPreferences | null;
  createdAt: string;
  updatedAt: string;
  client: ClientProfile | null;
  workman: WorkmanProfile | null;
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


// =========== types/dashboard.ts ===========
interface MetricItem {
  overall: number;
  last7Days: number;
}

export type DashboardMetrics = {
  totalUsers: MetricItem;
  jobPosted: MetricItem;
  newSignups: MetricItem;
  ongoingDisputes: MetricItem;
  pendingKycApprovals: MetricItem;
}



//==========types/course.ts ===========
export interface Workman {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: string;           
  price: string;           
  classType: "physical" | "online";
  isActive: boolean;
  averageRating: string;   
  totalRatings: number;
  totalEnrollments: number;
  createdAt: string;       
  updatedAt: string;       
  workman: Workman;
}

export interface PaginatedCourses {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetCoursesResponse {
  success: boolean;
  message: string;
  data: PaginatedCourses;
}



// ======== types for course detail

// Workman (instructor) profile
export interface Workman {
  id: string;
  email: string;
  password?: string; // usually not needed client-side
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: string | null;
  kycType: string | null;
  kycRejectionReason: string | null;
  profilePic: string | null;
  address: string | null;
  bio: string | null;
  emailVerificationOtp?: string | null;
  emailVerificationOtpExpiresAt?: string | null;
  phoneVerificationOtp?: string | null;
  phoneVerificationOtpExpiresAt?: string | null;
  userType: "workman" | string;
  status: string;
  notificationPreferences: any | null;
  createdAt: string;
  updatedAt: string;
}

// Single course detail
export interface CourseDetail {
  id: string;
  title: string;
  category: string;
  level: string;
  price: string;
  estimatedDuration: string;
  image: string | null;
  images: any[] | null;
  courseContent: string;
  description: string;
  whatYouWillLearn: string;
  overview: string;
  classType: "physical" | "online";
  startDate: string;
  endDate: string;
  courseLink: string | null;
  coursePlatform: string | null;
  classPlace: string | null;
  locationDescription: string | null;
  workmanId: string;
  averageRating: string;
  totalRatings: number;
  totalEnrollments: number;
  isActive: boolean;
  status: string; // e.g. "draft", "published", "rejected"
  createdAt: string;
  updatedAt: string;
  workman: Workman;
  ratings: any[]; // can be refined later if needed
  enrollments: any[]; // can be refined later
}

// Full API response wrapper
export interface CourseDetailResponse {
  success: boolean;
  message: string;
  data: {
    course: CourseDetail;
  };
}



// types/admin.ts (or append to your existing user types file)

// Nested notification preferences
export interface NotificationPreferences {
  payments: { push: boolean; email: boolean };
  newMessages: { push: boolean; email: boolean };
  announcements: { push: boolean; email: boolean };
  accountActivity: { push: boolean; email: boolean };
  jobStatusUpdates: { push: boolean; email: boolean };
}

// Single admin user
export interface AdminUser {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: string | null;
  kycType: string | null;
  kycRejectionReason: string | null;
  profilePic: string | null;
  address: string | null;
  bio: string | null;
  emailVerificationOtpExpiresAt: string | null;
  phoneVerificationOtpExpiresAt: string | null;
  userType: "admin";
  status: "active" | "inactive" | "pending" | string;
  notificationPreferences: NotificationPreferences | null;
  createdAt: string;
  updatedAt: string;
  client: null;    // always null for admins
  workman: null;   // always null for admins
}

// Paginated response wrapper
export interface AdminUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminUser[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}


// =======Online course request body type=======
export type CreateOnlineCoursePayload = {
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  estimatedDuration: string;
  image: string;
  images?: string[];
  courseContent: string;
  description: string;
  whatYouWillLearn: string;
  overview: string;
  classType: 'online' | 'in-person' | 'hybrid';
  startDate: string; // ISO 8601 format, e.g., "2024-02-01T00:00:00Z"
  endDate?: string;  // optional for self-paced courses
  courseLink?: string;
  coursePlatform?: string;
};


// =======Physical course request body type=======
export type CreatePhysicalCoursePayload = {
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  estimatedDuration: string;
  image: string;
  description: string;
  classType: 'physical';
  startDate: string; // ISO 8601 format, e.g., "2024-02-01T00:00:00Z"
  endDate?: string;  // optional for flexible scheduling
  classPlace: string; // name of the venue
  locationDescription: string; // full address and landmarks
};

//======= Update Notification Type ==========
export interface NotificationPreferencesType {
  jobStatusUpdates: {
    email: boolean;
    push: boolean;
  };
  newMessages: {
    email: boolean;
    push: boolean;
  };
  payments: {
    email: boolean;
    push: boolean;
  };
  announcements: {
    email: boolean;
    push: boolean;
  };
  accountActivity: {
    email: boolean;
    push: boolean;
  };
}