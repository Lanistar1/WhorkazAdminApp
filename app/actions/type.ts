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

