// 'use client'
// import React, { useState } from "react";
// import { User, Bell, CreditCard, Headphones, BadgeCheck, Trash2, Pencil, X, Save } from "lucide-react";
// import Header from "@/components/Header";

// interface Field {
//   label: string;
//   value: string;
//   icon?: React.ReactNode;
// }

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState('account');
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [fields, setFields] = useState<Field[]>([
//     { label: 'Email address', value: 'jasonalexander45@gmail.com' },
//     { label: 'Phone number', value: '+234 904 8390 2839' },
//     { label: 'Location', value: '678 Agric Street, Opebi, Lagos' },
//     { label: 'Default currency', value: 'NGN (₦)' },
//     { label: 'Time zone', value: 'WAT (UTC+1)' },
//   ]);
//   const [tempValues, setTempValues] = useState<{ [key: string]: string }>({});

//   // State for preferences (using boolean for enabled/disabled)
//   const [preferences, setPreferences] = useState({
//     emailNotifications: true,
//     pushNotifications: false,
//     smsNotifications: true,
//     darkMode: false,
//   });

//   const tabs = [
//     { id: 'account', name: 'Account', icon: <User className="h-5 w-5" /> },
//     { id: 'preferences', name: 'Preferences', icon: <Bell className="h-5 w-5" /> },
//     { id: 'payments', name: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
//     { id: 'help', name: 'Help Center', icon: <Headphones className="h-5 w-5" /> },
//     { id: 'verification', name: 'ID Verification', icon: <BadgeCheck className="h-5 w-5" /> },
//   ];

//   const startEditing = (label: string) => {
//     setEditingField(label);
//     setTempValues({ ...tempValues, [label]: fields.find(f => f.label === label)?.value || '' });
//   };

//   const cancelEditing = () => {
//     setEditingField(null);
//     setTempValues({});
//   };

//   const saveField = (label: string) => {
//     const newValue = tempValues[label];
//     setFields(prev => prev.map(f => f.label === label ? { ...f, value: newValue } : f));
//     setEditingField(null);
//     setTempValues({});
//   };

//   const handleInputChange = (label: string, value: string) => {
//     setTempValues({ ...tempValues, [label]: value });
//   };

//   const handlePreferenceChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPreferences(prev => ({ ...prev, [key]: e.target.checked }));
//   };

//   const savePreferences = () => {
//     console.log("Preferences saved:", preferences);
//   };

//   const renderContent = () => {
//     if (activeTab === 'account') {
//       return (
//         <div className="p-6 md:ml-10 space-y-6 bg-gray-50 p-5 mt-5 md:mt-0 md:w-[500px]">
//           {/* Vertical stack for Email, Phone, Location */}
//           {fields.slice(0, 3).map((field) => (
//             <div key={field.label} className="space-y-2">
//               <label className="text-[14px] font-medium text-[#95959F]">{field.label}</label>
//               <div className="flex items-center space-x-2">
//                 {editingField === field.label ? (
//                   <div className="flex flex-col w-full">
//                     <input
//                       type="text"
//                       value={tempValues[field.label] || ''}
//                       onChange={(e) => handleInputChange(field.label, e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                     <div className="flex justify-end gap-2 mt-3">
//                       <button
//                         onClick={cancelEditing}
//                         className="px-4 py-2 bg-gray-100 text-[#4B4B56] rounded-lg text-[14px] font-medium hover:bg-gray-200 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={() => saveField(field.label)}
//                         className="px-4 py-2 bg-[#3900DC] text-white rounded-lg text-[14px] font-medium hover:bg-purple-700 transition-colors"
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-[16px] text-[#4B4B56]">
//                     <span>{field.value}</span>
//                     <button
//                       onClick={() => startEditing(field.label)}
//                       className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                     >
//                       <Pencil className="h-4 w-4 text-gray-500" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}

//           {/* Side-by-side for Default currency and Time zone */}
//           <div className="space-y-2">
//             <label className="text-[14px] font-medium text-[#95959F]">Default currency & Time zone</label>
//             <div className="flex space-x-6">
//               {fields.slice(3).map((field) => (
//                 <div key={field.label} className="w-1/2 space-y-2">
//                   <div className="flex items-center space-x-2">
//                     {editingField === field.label ? (
//                       <div className="flex flex-col w-full">
//                         <input
//                           type="text"
//                           value={tempValues[field.label] || ''}
//                           onChange={(e) => handleInputChange(field.label, e.target.value)}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                         <div className="flex justify-end gap-2 mt-3">
//                           <button
//                             onClick={cancelEditing}
//                             className="px-4 py-2 bg-gray-100 text-[#4B4B56] rounded-lg text-[14px] font-medium hover:bg-gray-200 transition-colors"
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             onClick={() => saveField(field.label)}
//                             className="px-4 py-2 bg-[#3900DC] text-white rounded-lg text-[14px] font-medium hover:bg-purple-700 transition-colors"
//                           >
//                             Save
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-[16px] text-[#4B4B56]">
//                         <span>{field.value}</span>
//                         <button
//                           onClick={() => startEditing(field.label)}
//                           className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                         >
//                           <Pencil className="h-4 w-4 text-gray-500" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-end mt-8">
//             <button className="px-6 py-3 bg-[#3900DC] text-white rounded-full text-[16px] font-medium hover:bg-[#3900DC] transition-colors">
//               Save changes
//             </button>
//           </div>
//         </div>
//       );
//     }

//     if (activeTab === 'preferences') {
//       return (
//         <div className="p-6 md:ml-10 space-y-6 bg-gray-50 p-5 mt-5 md:mt-0 md:w-[500px]">
//           {Object.entries(preferences).map(([key, value]) => (
//             <div key={key} className="flex items-center justify-between">
//               <label className="text-[14px] font-medium text-[#95959F] capitalize">
//                 {key === 'darkMode' ? 'Dark mode' : key.replace('Notifications', '') + ' notifications'}
//               </label>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   checked={value}
//                   onChange={handlePreferenceChange(key)}
//                   className="w-4 h-4 text-[#3900DC] bg-gray-100 border-gray-300 focus:ring-2 focus:ring-purple-500"
//                 />
//                 <span className="text-[14px] text-[#4B4B56]">Enabled</span>
//               </div>
//             </div>
//           ))}
//           <div className="flex justify-center mt-8">
//             <button
//               onClick={savePreferences}
//               className="px-6 py-3 bg-[#3900DC] text-white rounded-full text-[16px] font-medium hover:bg-[#2E00B3] transition-colors"
//             >
//               Save changes
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="flex-1 flex items-center justify-center h-full">
//         <div className="text-[18px] font-semibold text-[#32323E]">Coming Soon</div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
//       <Header title="Settings" />
//       <div className="px-5 md:px-20 py-10 w-full bg-white mr-10 dark:bg-white text-gray-900 dark:text-gray-900 flex flex-col md:flex-row">
//         {/* Sidebar */}
//         <div className="w-full md:w-[300px] bg-white dark:bg-white">
//           <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-3 px-6 py-4 text-left transition-colors whitespace-nowrap
//                   ${activeTab === tab.id 
//                     ? 'bg-purple-100 border-l-4 border-purple-600 text-purple-700 font-semibold' 
//                     : 'text-[#4B4B56] hover:bg-gray-50'}`}
//               >
//                 {tab.icon}
//                 <span className="text-[16px]">{tab.name}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Content */}
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default Settings;




'use client'
import React, { useState } from "react";
import { 
  User, 
  Bell, 
  CreditCard, 
  Headphones, 
  BadgeCheck, 
  Pencil 
} from "lucide-react";
import Header from "@/components/Header";

interface Field {
  label: string;
  value: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fields, setFields] = useState<Field[]>([
    { label: 'Email address', value: 'jasonalexander45@gmail.com' },
    { label: 'Phone number', value: '+234 904 8390 2839' },
    { label: 'Location', value: '678 Agric Street, Opebi, Lagos' },
    { label: 'Default currency', value: 'NGN (₦)' },
    { label: 'Time zone', value: 'WAT (UTC+1)' },
  ]);
  const [tempValues, setTempValues] = useState<{ [key: string]: string }>({});

  // Notification preference states
  const [adminAlerts, setAdminAlerts] = useState({
    newUserRegistered: false,
    kycPending: false,
    newDispute: false,
    paymentFailed: false,
  });

  const [adminNotificationType, setAdminNotificationType] = useState({
    email: false,
    inDashboard: false,
  });

  const tabs = [
    { id: 'account', name: 'General settings', icon: <User className="h-5 w-5" /> },
    { id: 'preferences', name: 'Preferences', icon: <Bell className="h-5 w-5" /> },
    { id: 'payments', name: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'help', name: 'Platform Policies', icon: <Headphones className="h-5 w-5" /> },
    { id: 'access', name: 'Access & Activity', icon: <BadgeCheck className="h-5 w-5" /> },
  ];

  const handleAlertChange = (key: string) => {
    setAdminAlerts(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleNotificationChange = (key: string) => {
    setAdminNotificationType(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const resetPreferences = () => {
    setAdminAlerts({
      newUserRegistered: false,
      kycPending: false,
      newDispute: false,
      paymentFailed: false,
    });
    setAdminNotificationType({
      email: false,
      inDashboard: false,
    });
  };

  const savePreferences = () => {
    console.log("Preferences saved:", {
      adminAlerts,
      adminNotificationType
    });
  };

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

  // const savePreferences = () => {
  //   console.log("Preferences saved:", preferences);
  // };

  const renderContent = () => {
    // Account tab
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

          {/* Side-by-side for Default currency and Time zone */}
          <div className="space-y-2">
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
          </div>

          <div className="flex justify-end mt-8">
            <button className="px-6 py-3 bg-[#3900DC] text-white rounded-full text-[16px] font-medium hover:bg-[#3900DC] transition-colors">
              Save changes
            </button>
          </div>
        </div>
      );
    }

    // Preferences tab
    if (activeTab === 'preferences') {
      return (
        <div className="p-6 md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-[#32323E] mb-6">Notification preferences</h2>

            {/* Admin Alerts Section */}
            <div className="mb-8">
              <h3 className="text-[15px] font-medium text-[#4B4B56] mb-4">Admin alerts</h3>
              <div className="space-y-3">
                {Object.entries(adminAlerts).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleAlertChange(key)}
                      className="w-4 h-4 accent-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-[14px] text-[#4B4B56] capitalize">
                      {key === 'newUserRegistered'
                        ? 'New user registered'
                        : key === 'kycPending'
                        ? 'KYC pending'
                        : key === 'newDispute'
                        ? 'New dispute raised'
                        : 'Payment failed'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-gray-200 my-6" />

            {/* Notification type section */}
            <div className="mb-6">
              <h3 className="text-[15px] font-medium text-[#4B4B56] mb-4">Admin alerts</h3>
              <div className="space-y-3">
                {Object.entries(adminNotificationType).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleNotificationChange(key)}
                      className="w-4 h-4 accent-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-[14px] text-[#4B4B56] capitalize">
                      {key === 'email' ? 'Email' : 'In-dashboard alerts'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-gray-200 my-6" />

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={resetPreferences}
                className="px-5 py-2.5 bg-gray-100 text-[#4B4B56] rounded-full text-[14px] font-medium hover:bg-gray-200 transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={savePreferences}
                className="px-6 py-2.5 bg-[#3900DC] text-white rounded-full text-[14px] font-medium hover:bg-[#2E00B3] transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Default for other tabs
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="text-[18px] font-semibold text-[#32323E]">Coming Soon</div>
      </div>
    );
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

export default Settings;
