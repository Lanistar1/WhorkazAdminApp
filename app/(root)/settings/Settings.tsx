/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from "react";
import { 
  User, 
  Bell, 
  CreditCard, 
  Headphones, 
  BadgeCheck, 
  Pencil,
} from "lucide-react";
import Header from "@/components/Header";
import Image from "next/image";
import { useUpdateNotificationPreferences, useNotificationPreferences, useResetNotificationPreferences } from "@/app/actions/reactQuery";
import { AdminSettings, NotificationPreferencesType } from "@/app/actions/type";
import { useRouter } from "next/navigation"; 
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";


interface Field {
  label: string;
  value: string;
}

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
      checked ? "bg-[#3900DC]" : "bg-gray-300"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
        checked ? "translate-x-6" : ""
      }`}
    />
  </button>
);

const SettingPage = () => {
  const router = useRouter();
  const { token } = useAuth();

  const { mutate: updatePreferences, isPending } = useUpdateNotificationPreferences();
  const { data, isLoading, isError, error } = useNotificationPreferences();
  const { mutate: resetServerPreferences, isPending: isResetting } = useResetNotificationPreferences();

  const mutation = useMutation({
    mutationFn: async (data: AdminSettings) => {
      const res = await axios.put(
        "https://whorkaz.hordun.tech/api/v1/admin/settings",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => toast.success("Settings updated"),
    onError: () => toast.error("Update failed"),
  });

  // const [settings, setSettings] = useState<AdminSettings>({
  //   general: {
  //     supportEmail: "",
  //     supportPhoneNumber: "",
  //     defaultCurrency: "NGN",
  //     timeZone: "Africa/Lagos",
  //     location: "Nigeria",
  //     kycProvider: "manual",
  //     kycProviders: [
  //       {
  //         id: "prembly",
  //         name: "Prembly",
  //         isActive: false,
  //         apiKey: "",
  //         apiUrl: "",
  //       },
  //       {
  //         id: "youverify",
  //         name: "YouVerify",
  //         isActive: false,
  //         apiKey: "",
  //         apiUrl: "",
  //       },
  //     ],
  //   },
  //   payments: {
  //     defaultPaymentGateway: "paystack",
  //     paymentGateways: [
  //       {
  //         id: "paystack",
  //         name: "Paystack",
  //         isActive: true,
  //         apiKey: "",
  //         secretKey: "",
  //         supportedCurrencies: ["NGN", "USD"],
  //       },
  //       {
  //         id: "flutterwave",
  //         name: "Flutterwave",
  //         isActive: false,
  //         apiKey: "",
  //         secretKey: "",
  //         supportedCurrencies: ["NGN"],
  //       },
  //     ],
  //     withdrawCycle: "weekly",
  //     marketplaceCommissionRate: 5,
  //     minimumWithdrawAmount: 1000,
  //     jobPostingFee: 200,
  //     jobPostingFeeEnabled: true,
  //     jobPostingFeeMode: "per_job",
  //     jobCommissionRateTier1: 15,
  //     jobCommissionRateTier2: 10,
  //     jobCommissionTierThreshold: 50000,
  //     courseCommissionRate: 20,
  //     trainingPartnerAnnualFee: 20000,
  //     trainingPartnerFreeYears: 1,
  //     freeWeeklyJobViewLimit: 5,
  //     basicMonthlyBidLimit: 15,
  //     proMonthlyBidLimit: -1,
  //   },
  //   preferences: {
  //     notificationPreferences: {
  //       newUserRegistration: true,
  //       kycPending: true,
  //       newDisputeRaised: true,
  //       paymentFailed: true,
  //     },
  //     alertTypes: {
  //       email: true,
  //       inDashboardAlerts: true,
  //     },
  //   },
  //   platformPolicies: {
  //     termsOfService: "",
  //     privacyPolicy: "",
  //     refundPolicy: "",
  //     communityGuidelines: "",
  //   },
  //   accessActivity: {
  //     platformStatus: "active",
  //     twoFactorAuthentication: true,
  //     limitLoginAttempts: true,
  //     maxLoginAttempts: 5,
  //   },
  // });
  

const [settings, setSettings] = useState<AdminSettings>({
  general: {
    supportEmail: "support@whorkaz.com",
    supportPhoneNumber: "+2341234567890",
    defaultCurrency: "NGN",
    timeZone: "Africa/Lagos",
    location: "Nigeria",
    kycProvider: "manual",
    kycProviders: [
      {
        id: "prembly",
        name: "Prembly",
        isActive: true,
        apiKey: "",
        apiUrl: "https://api.prembly.com",
      },
      {
        id: "youverify",
        name: "YouVerify",
        isActive: false,
        apiKey: "",
        apiUrl: "https://api.sandbox.youverify.co",
      },
    ],
  },
  payments: {
    defaultPaymentGateway: "paystack",
    paymentGateways: [
      {
        id: "paystack",
        name: "Paystack",
        isActive: true,
        apiKey: "",
        secretKey: "",
        supportedCurrencies: ["NGN", "USD"],
      },
      {
        id: "flutterwave",
        name: "Flutterwave",
        isActive: true,
        apiKey: "",
        secretKey: "",
        supportedCurrencies: ["NGN", "GHS", "KES"],
      },
      {
        id: "nowpayments",
        name: "NOWPayments",
        isActive: true,
        apiKey: "",
        secretKey: "",
        supportedCurrencies: ["USD", "USDT", "USDC", "BTC", "ETH", "TRX", "BNB"],
      },
    ],
    withdrawCycle: "weekly",
    marketplaceCommissionRate: 5.00,
    minimumWithdrawAmount: 1000.00,
    jobPostingFee: 200.00,
    jobPostingFeeEnabled: true,
    jobPostingFeeMode: "per_job",
    jobCommissionRateTier1: 15.00,
    jobCommissionRateTier2: 10.00,
    jobCommissionTierThreshold: 50000.00,
    courseCommissionRate: 20.00,
    trainingPartnerAnnualFee: 20000.00,
    trainingPartnerFreeYears: 1,
    freeWeeklyJobViewLimit: 5,
    basicMonthlyBidLimit: 15,
    proMonthlyBidLimit: -1,
  },
  preferences: {
    notificationPreferences: {
      newUserRegistration: true,
      kycPending: true,
      newDisputeRaised: true,
      paymentFailed: true,
    },
    alertTypes: {
      email: true,
      inDashboardAlerts: true,
    },
  },
  platformPolicies: {
    termsOfService: "",
    privacyPolicy: "",
    refundPolicy: "",
    communityGuidelines: "",
  },
  accessActivity: {
    platformStatus: "active",
    twoFactorAuthentication: true,
    limitLoginAttempts: true,
    maxLoginAttempts: 5,
  },
});
  
  const [activeTab, setActiveTab] = useState('platform-policies'); 
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fields, setFields] = useState<Field[]>([
    { label: 'Email address', value: 'jasonalexander45@gmail.com' },
    { label: 'Phone number', value: '+234 904 8390 2839' },
    { label: 'Location', value: '678 Agric Street, Opebi, Lagos' },
    { label: 'Default currency', value: 'NGN (₦)' },
    { label: 'Time zone', value: 'WAT (UTC+1)' },
  ]);
  const [tempValues, setTempValues] = useState<{ [key: string]: string }>({});

  // NEW: Platform Policies data
  const policyItems = [
    { name: 'Terms of Service', action: 'Edit/view' },
    { name: 'Privacy Policy', action: 'Edit/view' },
    { name: 'Refund Policy', action: 'Edit/view' },
    { name: 'Community Guidelines', action: 'Edit/view' },
  ];

  // Add new state at the top of your component
  const [selectedPolicy, setSelectedPolicy] = useState<{
    name: string;
    mode: "view" | "edit";
  } | null>(null);

  const [policyContent, setPolicyContent] = useState({
    "Terms of Service": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Privacy Policy": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Pellentesque habitant morbi tristique senectus.",
    "Refund Policy": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, nisi vel consectetur.",
    "Community Guidelines": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam imperdiet."
  });



  // Handlers for Account Tab (untouched)
  const startEditing = (label: string) => {
    setEditingField(label);
    setTempValues({ ...tempValues, [label]: fields.find(f => f.label === label)?.value || '' });
  };

  const cancelEditing = () => {
    setEditingField(null);
    setTempValues({});
  };

  const saveField = (label: string) => {
    const newValue = tempValues[label];
    setFields(prev => prev.map(f => f.label === label ? { ...f, value: newValue } : f));
    setEditingField(null);
    setTempValues({});
  };

  const handleInputChange = (label: string, value: string) => {
    setTempValues({ ...tempValues, [label]: value });
  };
  
 

  // State definitions (add these to your component)
const [notificationPreferences, setNotificationPreferences] = useState({
  jobStatus: { email: false, push: false },
  messages: { email: false, push: false },
  payments: { email: false, push: false },
  announcements: { email: false, push: false },
  accountActivity: { email: false, push: false }
});

// 1. State (single object - recommended)
const [preferences, setPreferences] = useState<NotificationPreferencesType>({
  jobStatusUpdates: { email: false, push: false },
  newMessages: { email: false, push: false },
  payments: { email: false, push: false },
  announcements: { email: false, push: false },
  accountActivity: { email: false, push: false },
});


  // Sync local state when server data arrives
  useEffect(() => {
    if (data) {
      setPreferences(data);
    }
  }, [data]);

  // 2. Separate change handlers — THIS IS THE KEY
  const handleJobStatusChange = (channel: 'email' | 'push') => {
    setPreferences(prev => ({
      ...prev,
      jobStatusUpdates: {
        ...prev.jobStatusUpdates,
        [channel]: !prev.jobStatusUpdates[channel]
      }
    }));
  };

  const handleNewMessagesChange = (channel: 'email' | 'push') => {
    setPreferences(prev => ({
      ...prev,
      newMessages: {
        ...prev.newMessages,
        [channel]: !prev.newMessages[channel]
      }
    }));
  };

  const handlePaymentsChange = (channel: 'email' | 'push') => {
    setPreferences(prev => ({
      ...prev,
      payments: {
        ...prev.payments,
        [channel]: !prev.payments[channel]
      }
    }));
  };

  const handleAnnouncementsChange = (channel: 'email' | 'push') => {
    setPreferences(prev => ({
      ...prev,
      announcements: {
        ...prev.announcements,
        [channel]: !prev.announcements[channel]
      }
    }));
  };

  const handleAccountActivityChange = (channel: 'email' | 'push') => {
    setPreferences(prev => ({
      ...prev,
      accountActivity: {
        ...prev.accountActivity,
        [channel]: !prev.accountActivity[channel]
      }
    }));
  };

  const handleReset = () => {
    if (!confirm("Are you sure you want to reset all notification preferences to default?")) {
      return;
    }

    // Reset in UI immediately (optimistic)
    setNotificationPreferences({
      jobStatus: { email: false, push: false },
      messages: { email: false, push: false },
      payments: { email: false, push: false },
      announcements: { email: false, push: false },
      accountActivity: { email: false, push: false }
    });

    // Then call API
    resetServerPreferences();

    router.push("/dashboard");
  };

  const savePreferences = () => {
    // Save to API or localStorage
    console.log('Saving preferences:', notificationPreferences);
    updatePreferences(preferences);
    
    router.push("/dashboard");
    // Your save logic here
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading your preferences...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load preferences: {error?.message}
      </div>
    );
  }

  // useEffect(() => {
  //   if (data?.data?.preferences) {
  //     setPreferences(data.data.preferences);
  //   }
  // }, [data]);

  // Tabs structure
  const tabs = [
    { id: 'account', name: 'General settings', icon: <User className="h-5 w-5" /> },
    { id: 'preferences', name: 'Preferences', icon: <Bell className="h-5 w-5" /> },
    // { id: 'payments', name: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'platform-policies', name: 'Platform Policies', icon: <Headphones className="h-5 w-5" /> },
    { id: 'access', name: 'Access & Activity', icon: <BadgeCheck className="h-5 w-5" /> },
  ];


  

  

  const renderContent = () => {
    // 1. Account tab (General Settings) - Untouched
    if (activeTab === 'account') {
      return (
        <div className="p-6 md:ml-10 space-y-6 bg-gray-50 p-5 mt-5 md:mt-0 md:w-[500px]">
          {/* Vertical stack for Email, Phone, Location */}
          {fields.slice(0, 3).map((field) => (
            <div key={field.label} className="space-y-2">
              <label className="text-[14px] font-medium text-[#95959F]">{field.label}</label>
              <div className="flex items-center space-x-2">
                {editingField === field.label ? (
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      value={tempValues[field.label] || ''}
                      onChange={(e) => handleInputChange(field.label, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-gray-100 text-[#4B4B56] rounded-lg text-[14px] font-medium hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveField(field.label)}
                        className="px-4 py-2 bg-[#3900DC] text-white rounded-lg text-[14px] font-medium hover:bg-purple-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-[16px] text-[#4B4B56]">
                    <span>{field.value}</span>
                    <button
                      onClick={() => startEditing(field.label)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-row space-x-2 cursor-pointer">
            <Image
              src="/assets/icons/trash.png"
              alt="Whorkaz Logo"
              width={18}
              height={18}
              className="object-contain"
            />
            <h2 className="text-[14px] text-[#FF2929]">Delete Account</h2>
          </div>

          {/* Side-by-side for Default currency and Time zone */}
          {/* <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#95959F]">Default currency & Time zone</label>
            <div className="flex space-x-6">
              {fields.slice(3).map((field) => (
                <div key={field.label} className="w-1/2 space-y-2">
                  <div className="flex items-center space-x-2">
                    {editingField === field.label ? (
                      <div className="flex flex-col w-full">
                        <input
                          type="text"
                          value={tempValues[field.label] || ''}
                          onChange={(e) => handleInputChange(field.label, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            onClick={cancelEditing}
                            className="px-4 py-2 bg-gray-100 text-[#4B4B56] rounded-lg text-[14px] font-medium hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => saveField(field.label)}
                            className="px-4 py-2 bg-[#3900DC] text-white rounded-lg text-[14px] font-medium hover:bg-purple-700 transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-[16px] text-[#4B4B56]">
                        <span>{field.value}</span>
                        <button
                          onClick={() => startEditing(field.label)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Pencil className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <div className="flex justify-end mt-8">
            <button className="px-6 py-3 bg-[#3900DC] text-white rounded-full text-[16px] font-medium hover:bg-purple-700 transition-colors">
              Save changes
            </button>
          </div>
        </div>
      );
    }

    // 2. Preferences tab (untouched)
    if (activeTab === 'preferences') {
      return (
        <div className="md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            {/* Header */}
            <h2 className="text-[24px] font-semibold text-[#32323E] mb-6">
              Notification preferences
            </h2>

            {/* Job Status Updates Section */}
            <div className="mb-8">
              <h3 className="text-[15px] font-medium text-[#4B4B56] mb-1">
                Job Status Updates
              </h3>
              <div className="flex flex-row justify-between" >
                <p className="text-[14px] text-[#95959F] mb-6 leading-relaxed w-[300px]">
                  Know when someone applies, responds, or when your job status changes.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    
                    <input
                      type="checkbox"
                      checked={preferences.jobStatusUpdates.email}
                      onChange={() => handleJobStatusChange('email')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                    <span className="text-[14px] text-[#4B4B56]">Email</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    
                    <input
                      type="checkbox"
                      checked={preferences.jobStatusUpdates.push}
                      onChange={() => handleJobStatusChange('push')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                    <span className="text-[14px] text-[#4B4B56]">Push</span>
                  </div>
                </div>
              </div>
              
            </div>

            <hr className="border-[#DBDBE3] my-6" />

            {/* New Messages Section */}
            <div className="mb-8">
              <h3 className="text-[15px] font-medium text-[#4B4B56] mb-1">
                New Messages
              </h3>
              <div className="flex flex-row justify-between" >
                <p className="text-[14px] text-[#95959F] mb-6 leading-relaxed w-[300px]">
                  Receive a message alert when someone contacts or replies to you.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between space-x-3">
                    
                    <input
                      type="checkbox"
                      checked={preferences.newMessages.email}
                      onChange={() => handleNewMessagesChange('email')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                    <span className="text-[14px] text-[#4B4B56]">Email</span>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-3">
                    
                    <input
                      type="checkbox"
                      checked={preferences.newMessages.push}
                      onChange={() => handleNewMessagesChange('push')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                    <span className="text-[14px] text-[#4B4B56]">Push</span>
                  </div>
                </div>
              </div>
              
            </div>

            <hr className="border-[#DBDBE3] my-6" />

            {/* Payments Section */}
            <div className="mb-8">
              <h3 className="text-[15px] font-medium text-[#4B4B56] mb-1">
                Payments
              </h3>
              <div className="flex flex-row justify-between" >
                <p className="text-[14px] text-[#95959F] mb-6 leading-relaxed w-[300px]">
                  Be alerted when payments are received, made, or if there&apos;s a failed transaction.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.payments.email}
                      onChange={() => handlePaymentsChange('email')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                    <span className="text-[14px] text-[#4B4B56]">Email</span>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.payments.push}
                      onChange={() => handlePaymentsChange('push')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                    <span className="text-[14px] text-[#4B4B56]">Push</span>
                  </div>
                </div>
              </div>
              
            </div>

            <hr className="border-[#DBDBE3] my-6" />

            {/* Announcements Section */}
            <div className="mb-8">
              <h3 className="text-[15px] font-medium text-[#4B4B56] mb-1">
                Announcements
              </h3>
              <div className="flex flex-row justify-between" >
                <p className="text-[14px] text-[#95959F] mb-6 leading-relaxed w-[300px]">
                  Stay informed about new features, maintenance, and platform changes.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between space-x-3">
                    
                    <input
                      type="checkbox"
                      checked={preferences.announcements.email}
                      onChange={() => handleAnnouncementsChange('email')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                    <span className="text-[14px] text-[#4B4B56]">Email</span>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-3">
                    
                    <input
                      type="checkbox"
                      checked={preferences.announcements.push}
                      onChange={() => handleAnnouncementsChange('push')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                    <span className="text-[14px] text-[#4B4B56]">Push</span>
                  </div>
                </div>
              </div>
              
            </div>

            <hr className="border-[#DBDBE3] my-6" />

            {/* Account Activity Section */}
            <div className="mb-8">
              <h3 className="text-[15px] font-medium text-[#4B4B56] mb-1">
                Account Activity
              </h3>
              <div className="flex flex-row justify-between" >
                <p className="text-[14px] text-[#95959F] mb-6 leading-relaxed w-[300px]">
                  Be alerted for login from a new device, password change, or profile updates.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between space-x-3">
                    
                    <input
                      type="checkbox"
                      checked={preferences.accountActivity.email}
                      onChange={() => handleAccountActivityChange('email')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                    <span className="text-[14px] text-[#4B4B56]">Email</span>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-3">
                   
                    <input
                      type="checkbox"
                      checked={preferences.accountActivity.push}
                      onChange={() => handleAccountActivityChange('push')}
                      className="w-4 h-4 text-[#3900DC] bg-white border-gray-300 rounded focus:ring-[#3900DC] focus:ring-2"
                    />
                     <span className="text-[14px] text-[#4B4B56]">Push</span>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center space-x-4 pt-4">
              {/* <button
                onClick={resetPreferences}
                className="px-6 py-3 bg-white border border-[#DBDBE3] text-[#4B4B56] rounded-full text-[14px] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Reset to Default
              </button> */}
              <button
                onClick={handleReset}
                disabled={isResetting}
                className="px-6 py-3 bg-white border border-[#DBDBE3] text-[#4B4B56] rounded-full text-[14px] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
              >
                {isResetting ? "Resetting..." : "Reset to Default"}
              </button>
              <button
                onClick={savePreferences}
                className="px-8 py-3 bg-[#3900DC] text-white rounded-full text-[14px] font-medium hover:bg-[#2E00B3] transition-colors whitespace-nowrap"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    // 3. Payments tab - Untouched
    if (activeTab === 'payments') {
      return (
        <div className=" md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5 mb-10 md:mb-0">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-8">
            
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#32323E]">Payment settings</h2>
            </div>

            {/* Payment Gateway */}
            <div className="flex  ">
              <div className=" py-3 w-full max-w-md">
                {/* Payment Logos */}
                <div className="flex space-x-10 mb-6">
                  <Image src="/assets/icons/mastercard.png" alt="Mastercard" width={40} height={20} className="rounded" /> {/* Assume asset paths */}
                  <Image src="/assets/icons/flutterwave.png" alt="Flutterwave" width={40} height={20} className="rounded" />
                  <Image src="/assets/icons/paystack.png" alt="Paystack" width={40} height={20} className="rounded" />
                  <Image src="/assets/icons/visa.png" alt="Visa" width={40} height={20} className="rounded" />
                </div>
        
                {/* Form Fields */}
                <form className="space-y-4">
                  <div>
                    <label className="block text-[14px] font-semibold text-[#4B4B56] mb-1">Cardholder name</label>
                    <input
                      type="text"
                      placeholder="John Dortmund"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold text-[#4B4B56] mb-1">Card number</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-[14px] font-semibold text-[#4B4B56] mb-1">Expiry date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[14px] font-semibold text-[#4B4B56] mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
        
                  {/* Checkbox */}
                  <div className="flex items-center">
                    <input type="checkbox" id="save-payment" className="mr-2" />
                    <label htmlFor="save-payment" className="text-sm text-gray-500 text-center">
                      Save my payment for future purchases
                    </label>
                  </div>
        
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="flex item-center justify-center w-1/2 px-2 py-3 ml-auto bg-[#3900DC] text-white rounded-full font-bold hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Save payment details
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      );
    }

    // 4. Platform Policies tab (NEW)
    // if (activeTab === 'platform-policies') {
    //   return (
    //     <div className=" md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5">
    //         <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-8">
                
    //             {/* Header */}
    //             <div className="mb-6">
    //                 <h2 className="text-2xl font-semibold text-[#32323E]">Platform Policies & Content</h2>
    //                 <p className="text-[14px] text-[#95959F] mt-1">Manage the legal and public content of your platform.</p>
    //             </div>

    //             {/* Policy List */}
    //             <div className="space-y-2">
    //                 {policyItems.map((item) => (
    //                     <div 
    //                       key={item.name} 
    //                       className="flex justify-between items-center py-4 px-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
    //                     >
    //                         <span className="text-[16px] font-medium text-[#4B4B56]">{item.name}</span>
    //                         <button
    //                             onClick={() => console.log(`Viewing/Editing ${item.name}`)}
    //                             className="px-4 py-2 bg-gray-100 text-[#3900DC] rounded-lg text-[14px] font-medium hover:bg-gray-200 transition-colors border border-gray-200"
    //                         >
    //                             {item.action}
    //                         </button>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    //   );
    // }

    if (activeTab === 'platform-policies') {
      return (
        <div className="md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-8">

            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-[#32323E]">
                  Platform Policies & Content
                </h2>
                <p className="text-[14px] text-[#95959F] mt-1">
                  Manage the legal and public content of your platform.
                </p>
              </div>

              {selectedPolicy && (
                <button
                  onClick={() => setSelectedPolicy(null)}
                  className="text-sm text-[#3900DC] font-medium hover:underline"
                >
                  ← Back to list
                </button>
              )}
            </div>

            {/* Policy List */}
            {!selectedPolicy && (
              <div className="space-y-2">
                {policyItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center py-4 px-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[16px] font-medium text-[#4B4B56]">
                      {item.name}
                    </span>

                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          setSelectedPolicy({ name: item.name, mode: "view" })
                        }
                        className="px-4 py-2 bg-gray-100 text-[#4B4B56] rounded-lg text-[14px] font-medium hover:bg-gray-200 transition-colors border border-gray-200"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          setSelectedPolicy({ name: item.name, mode: "edit" })
                        }
                        className="px-4 py-2 bg-[#3900DC] text-white rounded-lg text-[14px] font-medium hover:bg-[#2E00B3] transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View Policy */}
            {selectedPolicy?.mode === "view" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#32323E]">
                  {selectedPolicy.name}
                </h3>

                <div className="bg-gray-50 p-4 rounded-lg border text-[15px] leading-relaxed text-[#4B4B56]">
                  {policyContent[selectedPolicy.name as keyof typeof policyContent]}
                </div>
              </div>
            )}

            {/* Edit Policy */}
            {selectedPolicy?.mode === "edit" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#32323E]">
                  Edit {selectedPolicy.name}
                </h3>

                <textarea
                  rows={10}
                  value={policyContent[selectedPolicy.name as keyof typeof policyContent]}
                  onChange={(e) =>
                    setPolicyContent((prev) => ({
                      ...prev,
                      [selectedPolicy.name]: e.target.value
                    }))
                  }
                  className="w-full p-4 border border-gray-300 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
                />

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setSelectedPolicy(null)}
                    className="px-6 py-3 bg-gray-100 text-[#4B4B56] rounded-full text-[14px] font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      console.log("Saved:", policyContent);
                      setSelectedPolicy(null);
                    }}
                    className="px-6 py-3 bg-[#3900DC] text-white rounded-full text-[14px] font-medium hover:bg-[#2E00B3]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      );
    }



    // 5. Default for Access & Activity
  //   if (activeTab === 'access') {
  //       return (
  //   <div className="bg-[#F9FAFB] min-h-screen p-10">
  //     <div className="max-w-6xl mx-auto space-y-10">

  //       {/* HEADER */}
  //       <div>
  //         <h1 className="text-3xl font-semibold text-[#111827]">
  //           Platform Settings
  //         </h1>
  //         <p className="text-gray-500 mt-1">
  //           Configure KYC, Payments, Security and Platform behaviour.
  //         </p>
  //       </div>

  //       {/* ================= GENERAL CARD ================= */}
  //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

  //         <h2 className="text-xl font-semibold text-gray-800">
  //           General Configuration
  //         </h2>

  //         <div className="grid md:grid-cols-2 gap-6">
  //           <div>
  //             <label className="label">Support Email</label>
  //             <input
  //               className="input"
  //               value={settings.general.supportEmail}
  //               onChange={(e) =>
  //                 setSettings(prev => ({
  //                   ...prev,
  //                   general: {
  //                     ...prev.general,
  //                     supportEmail: e.target.value,
  //                   },
  //                 }))
  //               }
  //             />
  //           </div>

  //           <div>
  //             <label className="label">Support Phone</label>
  //             <input
  //               className="input"
  //               value={settings.general.supportPhoneNumber}
  //               onChange={(e) =>
  //                 setSettings(prev => ({
  //                   ...prev,
  //                   general: {
  //                     ...prev.general,
  //                     supportPhoneNumber: e.target.value,
  //                   },
  //                 }))
  //               }
  //             />
  //           </div>
  //         </div>

  //         {/* KYC PROVIDER SELECT */}
  //         <div>
  //           <label className="label">Default KYC Method</label>
  //           <select
  //             className="input"
  //             value={settings.general.kycProvider}
  //             onChange={(e) =>
  //               setSettings(prev => ({
  //                 ...prev,
  //                 general: {
  //                   ...prev.general,
  //                   kycProvider: e.target.value,
  //                 },
  //               }))
  //             }
  //           >
  //             <option value="manual">Manual</option>
  //             {settings.general.kycProviders.map(p => (
  //               <option key={p.id} value={p.id}>
  //                 {p.name}
  //               </option>
  //             ))}
  //           </select>
  //         </div>

  //         {/* KYC PROVIDER CARDS */}
  //         <div className="space-y-5">
  //           {settings.general.kycProviders.map((provider, index) => (
  //             <div
  //               key={provider.id}
  //               className="border border-gray-200 rounded-xl p-6 bg-gray-50 space-y-4"
  //             >
  //               <div className="flex justify-between items-center">
  //                 <div>
  //                   <h3 className="font-medium text-gray-800">
  //                     {provider.name}
  //                   </h3>
  //                   <p className="text-sm text-gray-500">
  //                     API URL: {provider.apiUrl}
  //                   </p>
  //                 </div>

  //                 <Toggle
  //                   checked={provider.isActive}
  //                   onChange={() => {
  //                     const updated = [...settings.general.kycProviders];
  //                     updated[index].isActive =
  //                       !updated[index].isActive;

  //                     setSettings(prev => ({
  //                       ...prev,
  //                       general: {
  //                         ...prev.general,
  //                         kycProviders: updated,
  //                       },
  //                     }));
  //                   }}
  //                 />
  //               </div>

  //               {provider.isActive && (
  //                 <input
  //                   placeholder="API Key"
  //                   className="input"
  //                   value={provider.apiKey}
  //                   onChange={(e) => {
  //                     const updated = [...settings.general.kycProviders];
  //                     updated[index].apiKey = e.target.value;

  //                     setSettings(prev => ({
  //                       ...prev,
  //                       general: {
  //                         ...prev.general,
  //                         kycProviders: updated,
  //                       },
  //                     }));
  //                   }}
  //                 />
  //               )}
  //             </div>
  //           ))}
  //         </div>
  //       </div>

  //       {/* ================= SECURITY CARD ================= */}
  //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">

  //         <h2 className="text-xl font-semibold text-gray-800">
  //           Security & Access
  //         </h2>

  //         <div className="flex justify-between items-center">
  //           <div>
  //             <p className="font-medium text-gray-700">
  //               Platform Status
  //             </p>
  //             <p className="text-sm text-gray-500">
  //               Disable platform access globally
  //             </p>
  //           </div>

  //           <select
  //             className="input w-40"
  //             value={settings.accessActivity.platformStatus}
  //             onChange={(e) =>
  //               setSettings(prev => ({
  //                 ...prev,
  //                 accessActivity: {
  //                   ...prev.accessActivity,
  //                   platformStatus: e.target.value as "active" | "inactive",
  //                 },
  //               }))
  //             }
  //           >
  //             <option value="active">Active</option>
  //             <option value="inactive">Inactive</option>
  //           </select>
  //         </div>

  //         <div className="flex justify-between items-center">
  //           <span className="font-medium text-gray-700">
  //             Two Factor Authentication
  //           </span>
  //           <Toggle
  //             checked={settings.accessActivity.twoFactorAuthentication}
  //             onChange={() =>
  //               setSettings(prev => ({
  //                 ...prev,
  //                 accessActivity: {
  //                   ...prev.accessActivity,
  //                   twoFactorAuthentication:
  //                     !prev.accessActivity.twoFactorAuthentication,
  //                 },
  //               }))
  //             }
  //           />
  //         </div>
  //       </div>

  //       {/* SAVE BUTTON */}
  //       <div className="flex justify-end">
  //         <button
  //           onClick={() => mutation.mutate(settings)}
  //           className="px-10 py-3 bg-[#3900DC] text-white rounded-xl shadow-md hover:bg-[#2E00B3] transition-all"
  //         >
  //           Save All Changes
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
  //   }

  if (activeTab === 'access') {
  return (
    <div className="md:ml-10 bg-gray-50 md:w-[800px] rounded-lg mt-5 p-6 overflow-y-auto max-h-[80vh]">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-12">

        {/* ========================================= */}
        {/*              GENERAL SETTINGS             */}
        {/* ========================================= */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">General Platform Settings</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Support Email</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
                value={settings.general.supportEmail}
                onChange={e => setSettings(p => ({ ...p, general: { ...p.general, supportEmail: e.target.value } }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Support Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
                value={settings.general.supportPhoneNumber}
                onChange={e => setSettings(p => ({ ...p, general: { ...p.general, supportPhoneNumber: e.target.value } }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Currency</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
                value={settings.general.defaultCurrency}
                onChange={e => setSettings(p => ({ ...p, general: { ...p.general, defaultCurrency: e.target.value } }))}
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">$ USD</option>
                <option value="GHS">₵ GHS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Time Zone</label>
              <input
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
                value={settings.general.timeZone}
                onChange={e => setSettings(p => ({ ...p, general: { ...p.general, timeZone: e.target.value } }))}
                placeholder="Africa/Lagos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Platform Location (Country)</label>
              <input
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
                value={settings.general.location}
                onChange={e => setSettings(p => ({ ...p, general: { ...p.general, location: e.target.value } }))}
              />
            </div>
          </div>

          {/* KYC Providers */}
          <div className="pt-4 border-t">
            <h3 className="text-xl font-medium mb-4">KYC Providers</h3>
            <div className="space-y-1.5">
  <label className="block text-sm font-medium text-gray-700">Default KYC Verification Method</label>
  <select
    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC] focus:border-[#3900DC]"
    value={settings.general.kycProvider}
    onChange={e => setSettings(p => ({
      ...p,
      general: { ...p.general, kycProvider: e.target.value }
    }))}
  >
    <option value="manual">Manual Review (admin checks documents)</option>
    <option value="prembly" disabled={!settings.general.kycProviders.find(p => p.id === "prembly")?.isActive}>
      Prembly (automated)
    </option>
    <option value="youverify" disabled={!settings.general.kycProviders.find(p => p.id === "youverify")?.isActive}>
      YouVerify (automated)
    </option>
  </select>
  <p className="text-xs text-gray-500">
    {settings.general.kycProvider === "manual"
      ? "Users will upload documents — admins review manually."
      : `Using automated verification via ${settings.general.kycProvider === "prembly" ? "Prembly" : "YouVerify"}`}
  </p>
</div>
            <div className="space-y-6">
              {settings.general.kycProviders.map((provider, idx) => (
                <div key={provider.id} className="border rounded-xl p-5 bg-gray-50 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{provider.name}</h4>
                      <p className="text-sm text-gray-500">{provider.apiUrl || "No API URL set"}</p>
                    </div>
                    <Toggle
                      checked={provider.isActive}
                      onChange={() => {
                        const updated = [...settings.general.kycProviders];
                        updated[idx].isActive = !updated[idx].isActive;
                        setSettings(p => ({ ...p, general: { ...p.general, kycProviders: updated } }));
                      }}
                    />
                  </div>

                  {provider.isActive && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1.5">API Key</label>
                        <input
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                          value={provider.apiKey}
                          onChange={e => {
                            const updated = [...settings.general.kycProviders];
                            updated[idx].apiKey = e.target.value;
                            setSettings(p => ({ ...p, general: { ...p.general, kycProviders: updated } }));
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1.5">API URL</label>
                        <input
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                          value={provider.apiUrl}
                          onChange={e => {
                            const updated = [...settings.general.kycProviders];
                            updated[idx].apiUrl = e.target.value;
                            setSettings(p => ({ ...p, general: { ...p.general, kycProviders: updated } }));
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/*              PAYMENTS SECTION             */}
        {/* ========================================= */}
        <section className="space-y-6 pt-8 border-t">
          <h2 className="text-2xl font-semibold text-gray-800">Payments & Commission Settings</h2>

          <div className="space-y-8">

            {/* Default Gateway */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Payment Gateway</label>
              <select
                className="w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3900DC]"
                value={settings.payments.defaultPaymentGateway}
                onChange={e => setSettings(p => ({
                  ...p,
                  payments: { ...p.payments, defaultPaymentGateway: e.target.value }
                }))}
              >
                <option value="paystack">Paystack</option>
                <option value="flutterwave">Flutterwave</option>
                <option value="nowpayments">NOWPayments</option>
              </select>
            </div>

            {/* Payment Gateways List */}
            <div className="space-y-6">
              <h3 className="text-xl font-medium">Configured Gateways</h3>
              {settings.payments.paymentGateways.map((gw, idx) => (
                <div key={gw.id} className="border rounded-xl p-6 bg-gray-50 space-y-5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold">{gw.name}</h4>
                    <Toggle
                      checked={gw.isActive}
                      onChange={() => {
                        const updated = [...settings.payments.paymentGateways];
                        updated[idx].isActive = !updated[idx].isActive;
                        setSettings(p => ({ ...p, payments: { ...p.payments, paymentGateways: updated } }));
                      }}
                    />
                  </div>

                  {gw.isActive && (
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1.5">Public / API Key</label>
                        <input
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                          value={gw.apiKey}
                          onChange={e => {
                            const updated = [...settings.payments.paymentGateways];
                            updated[idx].apiKey = e.target.value;
                            setSettings(p => ({ ...p, payments: { ...p.payments, paymentGateways: updated } }));
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1.5">Secret Key</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                          value={gw.secretKey}
                          onChange={e => {
                            const updated = [...settings.payments.paymentGateways];
                            updated[idx].secretKey = e.target.value;
                            setSettings(p => ({ ...p, payments: { ...p.payments, paymentGateways: updated } }));
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-gray-600">
                    Supported: {gw.supportedCurrencies.join(", ")}
                  </div>
                </div>
              ))}
            </div>

            {/* Commission & Limits */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium mb-1.5">Marketplace Commission (%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  value={settings.payments.marketplaceCommissionRate}
                  onChange={e => setSettings(p => ({
                    ...p,
                    payments: { ...p.payments, marketplaceCommissionRate: Number(e.target.value) }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Minimum Withdrawal (₦)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  value={settings.payments.minimumWithdrawAmount}
                  onChange={e => setSettings(p => ({
                    ...p,
                    payments: { ...p.payments, minimumWithdrawAmount: Number(e.target.value) }
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Withdraw Cycle</label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  value={settings.payments.withdrawCycle}
                  onChange={e => setSettings(p => ({
                    ...p,
                    payments: { ...p.payments, withdrawCycle: e.target.value }
                  }))}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Job Posting Fee (₦)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  value={settings.payments.jobPostingFee}
                  onChange={e => setSettings(p => ({
                    ...p,
                    payments: { ...p.payments, jobPostingFee: Number(e.target.value) }
                  }))}
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  checked={settings.payments.jobPostingFeeEnabled}
                  onChange={() => setSettings(p => ({
                    ...p,
                    payments: { ...p.payments, jobPostingFeeEnabled: !p.payments.jobPostingFeeEnabled }
                  }))}
                  className="w-5 h-5 text-[#3900DC] rounded"
                />
                <label className="text-sm font-medium">Enable Job Posting Fee</label>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/*           SECURITY / ACCESS CONTROL       */}
        {/* ========================================= */}
        <section className="space-y-6 pt-10 border-t">
          <h2 className="text-2xl font-semibold text-gray-800">Security & Access Control</h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium">Platform Status</p>
                <p className="text-sm text-gray-500">Globally enable/disable access</p>
              </div>
              <select
                className="w-48 px-4 py-2.5 border rounded-lg"
                value={settings.accessActivity.platformStatus}
                onChange={e => setSettings(p => ({
                  ...p,
                  accessActivity: { ...p.accessActivity, platformStatus: e.target.value as any }
                }))}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive / Maintenance</option>
              </select>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="font-medium">Force Two-Factor Authentication</span>
              <Toggle
                checked={settings.accessActivity.twoFactorAuthentication}
                onChange={() => setSettings(p => ({
                  ...p,
                  accessActivity: { ...p.accessActivity, twoFactorAuthentication: !p.accessActivity.twoFactorAuthentication }
                }))}
              />
            </div>

            <div className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium">Limit Login Attempts</p>
                <p className="text-sm text-gray-500">After limit → temporary lockout</p>
              </div>
              <Toggle
                checked={settings.accessActivity.limitLoginAttempts}
                onChange={() => setSettings(p => ({
                  ...p,
                  accessActivity: { ...p.accessActivity, limitLoginAttempts: !p.accessActivity.limitLoginAttempts }
                }))}
              />
            </div>

            {settings.accessActivity.limitLoginAttempts && (
              <div className="pl-10">
                <label className="block text-sm font-medium mb-1.5">Max failed attempts</label>
                <input
                  type="number"
                  min={3}
                  max={15}
                  className="w-24 px-4 py-2.5 border rounded-lg"
                  value={settings.accessActivity.maxLoginAttempts}
                  onChange={e => setSettings(p => ({
                    ...p,
                    accessActivity: { ...p.accessActivity, maxLoginAttempts: Number(e.target.value) }
                  }))}
                />
              </div>
            )}
          </div>
        </section>

        {/* SAVE */}
        <div className="flex justify-end pt-10 border-t sticky bottom-0 bg-white py-4 -mx-8 px-8 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.1)]">
          <button
            onClick={() => mutation.mutate(settings)}
            disabled={mutation.isPending}
            className="px-12 py-3.5 bg-[#3900DC] text-white rounded-xl font-medium hover:bg-[#2E00B3] disabled:opacity-60 transition"
          >
            {mutation.isPending ? "Saving..." : "Save All Platform Settings"}
          </button>
        </div>

      </div>
    </div>
  );
}
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      <Header title="Settings" />
      <div className="px-5 md:px-20 py-10 flex flex-col md:flex-row w-full">
        {/* Sidebar */}
        <div className="w-full md:w-[300px] bg-white">
          <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-4 text-left transition-colors whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-purple-100 border-l-4 border-purple-600 text-purple-700 font-semibold'
                    : 'text-[#4B4B56] hover:bg-gray-50'}`}
              >
                {tab.icon}
                <span className="text-[16px]">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingPage;
