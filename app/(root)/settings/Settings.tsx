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
import { NotificationPreferencesType } from "@/app/actions/type";
import { useRouter } from "next/navigation"; 


interface Field {
  label: string;
  value: string;
}

const SettingPage = () => {
  const router = useRouter();
  
  const { mutate: updatePreferences, isPending } = useUpdateNotificationPreferences();
  // const { data, isLoading, isError, error } = useNotificationPreferences();
  const { mutate: resetServerPreferences, isPending: isResetting } = useResetNotificationPreferences();

  // Set default tab to 'platform-policies' for easy testing/previewing
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
  // useEffect(() => {
  //   if (data) {
  //     setPreferences(data);
  //   }
  // }, [data]);

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

  // if (isLoading) {
  //   return <div className="p-8 text-center">Loading your preferences...</div>;
  // }

  // if (isError) {
  //   return (
  //     <div className="p-8 text-center text-red-600">
  //       Failed to load preferences: {error?.message}
  //     </div>
  //   );
  // }

  // Tabs structure
  const tabs = [
    { id: 'account', name: 'General settings', icon: <User className="h-5 w-5" /> },
    { id: 'preferences', name: 'Preferences', icon: <Bell className="h-5 w-5" /> },
    { id: 'payments', name: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
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
    if (activeTab === 'platform-policies') {
      return (
        <div className=" md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-8">
                
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#32323E]">Platform Policies & Content</h2>
                    <p className="text-[14px] text-[#95959F] mt-1">Manage the legal and public content of your platform.</p>
                </div>

                {/* Policy List */}
                <div className="space-y-2">
                    {policyItems.map((item) => (
                        <div 
                          key={item.name} 
                          className="flex justify-between items-center py-4 px-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-[16px] font-medium text-[#4B4B56]">{item.name}</span>
                            <button
                                onClick={() => console.log(`Viewing/Editing ${item.name}`)}
                                className="px-4 py-2 bg-gray-100 text-[#3900DC] rounded-lg text-[14px] font-medium hover:bg-gray-200 transition-colors border border-gray-200"
                            >
                                {item.action}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
    }


    // 5. Default for Access & Activity
    if (activeTab === 'access') {
        return (
            <div className="flex-1 flex items-center justify-center p-10 md:ml-10 bg-white md:w-[600px] border rounded-lg shadow-sm">
                <div className="text-[18px] font-semibold text-[#32323E]">Coming Soon</div>
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
