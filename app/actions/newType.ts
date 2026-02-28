/* eslint-disable @typescript-eslint/no-explicit-any */
// 1. Specific Enums/Literal Types
export type KYCStatus = "pending" | "approved" | "rejected";
export type UserType = "client" | "workman";
export type PayoutOption = "fiat" | "crypto"; // Based on context

// 2. Nested Notification Preferences
export interface NotificationSetting {
  push: boolean;
  email: boolean;
}

export interface NotificationPreferences {
  payments: NotificationSetting;
  newMessages: NotificationSetting;
  announcements: NotificationSetting;
  accountActivity: NotificationSetting;
  jobStatusUpdates: NotificationSetting;
}

// 3. The Individual User Object
export interface BackendKYCUser {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycVerificationStatus: KYCStatus;
  kycType: string; // e.g., "nin"
  kycRejectionReason: string | null;
  kycIdPicture: string; // URL
  profilePic: string | null;
  address: string | null;
  bio: string | null;
  googleId: string | null;
  appleId: string | null;
  userType: UserType;
  status: string;
  payoutOption: PayoutOption;
  skills: string[] | null;
  dashboardPreferences: any | null;
  notificationPreferences: NotificationPreferences;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
  client: any | null;
  workman: any | null;
}

// 4. Pagination Metadata
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  currentPage: number;
}

// 5. The Root API Response Structure
export interface KYCApiResponse {
  success: boolean;
  message: string;
  data: {
    users: BackendKYCUser[];
    pagination: PaginationMeta;
  };
}