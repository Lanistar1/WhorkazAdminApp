/* eslint-disable @typescript-eslint/no-explicit-any */
// types/auth.ts or anywhere you keep types

export type LoginCredentials = {
  email: string;
  password: string;
};

// types/auth.ts

export type Role2 = {
  id: string;
  name: string;
  roleType: string; // e.g. "super_admin"
  description: string;
};

export type AdminProfile = {
  id: string;
  isActive: boolean;
  role: Role2;
  permissions: string[];
  restrictions: Record<string, any>;
  lastLoginAt: string | null;
};

export type UserFromAPI = {
  email: string;
  userType: "client" | "freelancer" | "admin";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: string | null;
  status: string;
  lastName: string;
  profilePic: string | null;
  adminProfile?: AdminProfile;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: UserFromAPI;
    token: string;
    refreshToken: string;
  };
};

export type AuthUser = {
  email: string;
  userType: "client" | "freelancer" | "admin";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: string | null;
  status?: string;
  role?: Role2;
  permissions?: string[];
};



// export type UserFromAPI = {
//   email: string;
//   userType: "client" | "freelancer";
//   isEmailVerified: boolean;
//   isPhoneVerified: boolean;
//   kycVerificationStatus: string | null;
//   status?: string;
// };

// export type LoginResponse = {
//   success: boolean;
//   message: string;
//   data: {
//     user: UserFromAPI;
//     token: string;
//   };
// };

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
  parentId: null;
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

//==========approve KYC ========
export type approveKYCType = {
  verification_notes: string;
  badge_level: string;
};

//==========reject KYC ========
export type rejectKYCType = {
  reason: string;
  rejection_notes: string;
  allow_resubmission: boolean;
};

//==========update document verification status ========
export type updateDocVerificationType = {
  verified: boolean;
  verification_notes: string;
};

//========== add dispute message ========
export type addDisbuteMessageType = {
  message: string;
  internal_only: boolean;
};

//========== resolve dispute ========
export type resolveDisbuteType = {
  resolution_type: string;
  resolution_details: string;
  refund_amount: number;
  admin_notes: string;
};

//========== process refund ========
export type precessRefundType = {
  reason: string;
  amount: number;
  dispute_id: string;
};

//========== adjust wallet ========
export type adjustWalletType = {
  reason: string;
  amount: number;
  reference: string;
  admin_id: string;
};

//========== release order payout ========
export type releaseOrderPayoutType = {
  reason: string;
  amount: number;
  reference: string;
  admin_id: string;
};



//========== get payment typescript ============
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'refund';

export interface Payer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  userType: 'client' | 'provider';
}

export interface Job {
  id: string;
  title: string;
  budget: string;
}

export interface Payment {
  id: string;
  reference: string;
  amount: string;
  currency: string;
  status: PaymentStatus;
  provider: string;
  contextType: string;
  contextId: string;
  createdAt: string;
  updatedAt: string;
  payer: Payer;
  job: Job;
}

export interface PaymentSummary {
  totalAmount: string;
  totalTransactions: number;
  successfulPayments: number;
  failedPayments: number;
  refundedAmount: number;
}

export interface PaginatedPaymentsResponse {
  payments: Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  summary: PaymentSummary;
}

export interface PaymentsAPIResponse {
  success: boolean;
  message: string;
  data: PaginatedPaymentsResponse;
}



//========== get KYC typescript ============
export type KYCStatus = 'approve' | 'reject' | 'resubmit';

export interface KYCItem {
  id: string | number;
  name: string;
  doc: string;
  role: string;
  status: KYCStatus;
  date: string;
}

export interface PaginatedKYCResponse {
  users: KYCItem[];
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}


// ============= typescript for report and analysis ==========
// ===== analytics types =====

export interface UserAnalytics {
  verifiedWorkmen: number;
  activeClients: number;
  jobsCompleted: number;
  openDisputes: number;
  avgCompletionDays: number;
}

export interface RevenueAnalytics {
  labels: string[];
  values: number[];
}

export interface ServiceAnalytics {
  labels: string[];
  completedJobs: number[];
  disputeStats: {
    settled: number;
    unsettled: number;
  };
  topProviders: {
    id: string;
    providerName: string;
    category: string;
    jobsCompleted: number;
    rating: string;
    joined: string;
  }[];
}


//  ========== Users Analytics ============
export interface UserGrowthTrend {
  date: string;
  total_users: number;
  new_registrations: number;
}

export interface UserGeoDistribution {
  location: string;
  user_count: number;
  percentage: number;
}

export interface UserAnalyticsData {
  total_users: number;
  active_users: number;
  new_registrations: number;
  user_types: {
    workman: number;
    client: number;
    admin: number;
  };
  growth_trend: UserGrowthTrend[];
  geographic_distribution: UserGeoDistribution[];
}

export interface UserAnalyticsResponse {
  success: boolean;
  message: string;
  data: UserAnalyticsData;
}

//  ========== Revenue Analytics ============
export interface RevenueByCategory {
  category: string;
  revenue: number;
  percentage: number;
}

export interface MonthlyRevenueTrend {
  month: string;
  revenue: number;
  transactions: number;
}

export interface RevenueAnalyticsData {
  total_revenue: number;
  platform_fees: number;
  transactions_count: number;
  average_transaction: number;
  revenue_by_category: RevenueByCategory[];
  monthly_trend: MonthlyRevenueTrend[];
}

export interface RevenueAnalyticsResponse {
  success: boolean;
  message: string;
  data: RevenueAnalyticsData;
}



// ============ types/service.ts =============

// Single service item
export type Service = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// The "data" object returned by the API
export type ServiceData = {
  services: Service[];
};

// Full API response
export type ServiceApiResponse = {
  success: boolean;
  message: string;
  data: ServiceData;
};

// =========== create plans ===========
export type CreatePlanType = {
  name: string;
  description: string;
  price: number;
  currency: "NGN" | "USD";
  interval: "monthly" | "yearly";
  planType: "workman" | "both";
  features: string[];
};

// =========== create Admin Roles ===========
export type AdminRole = {
  name: string;
  roleType:  string; 
  description: string;
  permissions: string[];
  metadata: {
    color: string;  
    icon: string;
    level: number;
  };
};

// =========== Assign role to admin  ===========
export type AssignRole = {
  roleId: string;
};

// =========== Fetch admin role response  ===========
export interface PermissionMetadata {
  level: number;
}

export interface Permission {
  id: string;
  name: string;
  displayName: string;
  category: string;
  action: string;
  description: string;
  metadata: PermissionMetadata;
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  conditions: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  permission: Permission;
}

export interface RoleMetadata {
  icon: string;
  color: string;
  level: number;
}

export interface Role {
  id: string;
  name: string;
  roleType: string;
  description: string;
  metadata: RoleMetadata;
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  rolePermissions: RolePermission[];
}

export interface RolesResponse {
  roles: Role[];
}

// ======== get permission typescript type ============
export interface Permission {
  id: string;
  name: string;
  displayName: string;
  category: string;
  action: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionsResponse {
  permissions: Permission[];
}



export type Permission1 = {
  id: string;
  name: string;
  displayName: string;
  category: string;
};

export type RolePermission1 = {
  permission: Permission1;
};

export type Role1 = {
  id: string;
  name: string;
  roleType:
    | "super_admin"
    | "user_manager"
    | "content_moderator"
    | "payment_manager"
    | "support_agent"
    | "analytics_viewer";
  description: string;
  isActive: boolean;
  isSystem: boolean;
  metadata: {
    color: string;
    icon: string;
    level: number;
  };
  rolePermissions: RolePermission1[];
  createdAt: string;
  updatedAt: string;
};

export type RoleByIdResponse = {
  success: boolean;
  message: string;
  data: {
    role: Role1;
  };
};


// =========== update Admin Roles ===========
export type updateRoleType = {
  name: string;
  roleType: string,
  description: string;
  permissions: string[];
  isActive: boolean
};




// ==========================
// Role Metadata
// ==========================

export interface RoleMetadata {
  icon: string;
  color: string;
  level: number;
}

// ==========================
// Role
// ==========================

export interface Role {
  id: string;
  name: string;
  roleType: string;
  description: string;
  metadata: RoleMetadata;
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==========================
// Notification Preferences
// ==========================

export interface NotificationChannel {
  push: boolean;
  email: boolean;
}

export interface NotificationPreferences {
  payments: NotificationChannel;
  newMessages: NotificationChannel;
  announcements: NotificationChannel;
  accountActivity: NotificationChannel;
  jobStatusUpdates: NotificationChannel;
}

// ==========================
// Admin Profile Preferences
// ==========================

export interface AdminProfilePreferences {
  theme: string;
  language: string;
  notifications: {
    sms: boolean;
    push: boolean;
    email: boolean;
  };
  dashboardLayout: string;
}

// ==========================
// Admin Profile
// ==========================

export interface AdminProfile1 {
  id: string;
  userId: string;
  roleId: string;
  employeeId: string | null;
  department: string | null;
  position: string | null;
  customPermissions: string[] | null;
  restrictions: Record<string, any> | null;
  preferences: AdminProfilePreferences;
  lastLoginAt: string | null;
  lastLoginIP: string | null;
  isActive: boolean;
  suspendedAt: string | null;
  suspensionReason: string | null;
  terminatedAt: string | null;
  terminationReason: string | null;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

// ==========================
// Admin User
// ==========================

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
  kycIdPicture: string | null;
  profilePic: string | null;
  address: string | null;
  bio: string | null;
  googleId: string | null;
  appleId: string | null;
  userType: "admin";
  status: string;
  payoutOption: string;
  skills: string[] | null;
  dashboardPreferences: Record<string, any> | null;
  notificationPreferences: NotificationPreferences | null;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;

  adminProfile: AdminProfile1;
  role: Role;
}

// ==========================
// Pagination
// ==========================

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  currentPage: number;
}

// ==========================
// API Response
// ==========================

export type AdminUsersResponse1 = {
  success: boolean;
  message: string;
  data: {
    admins: AdminUser[];
    pagination: Pagination;
  };
}
