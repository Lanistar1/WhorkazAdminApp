// 'use client'
// import React, { useState } from "react";
// import { 
//   User, 
//   Bell, 
//   CreditCard, 
//   Headphones, 
//   BadgeCheck, 
//   Pencil,
//   Plus 
// } from "lucide-react";
// // Mocking the Header component as it's an external import
// const Header = ({ title }: { title: string }) => (
//   <header className="py-4 px-5 md:px-20 border-b">
//     <h1 className="text-2xl font-bold">{title}</h1>
//   </header>
// );

// interface Field {
//   label: string;
//   value: string;
// }

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState('payments'); // Setting default to 'payments' for testing
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [fields, setFields] = useState<Field[]>([
//     { label: 'Email address', value: 'jasonalexander45@gmail.com' },
//     { label: 'Phone number', value: '+234 904 8390 2839' },
//     { label: 'Location', value: '678 Agric Street, Opebi, Lagos' },
//     { label: 'Default currency', value: 'NGN (₦)' },
//     { label: 'Time zone', value: 'WAT (UTC+1)' },
//   ]);
//   const [tempValues, setTempValues] = useState<{ [key: string]: string }>({});

//   // Preferences tab state (untouched from previous step, but included for completeness)
//   const [adminAlerts, setAdminAlerts] = useState({
//     newUserRegistered: false,
//     kycPending: false,
//     newDispute: false,
//     paymentFailed: false,
//   });

//   const [adminNotificationType, setAdminNotificationType] = useState({
//     email: false,
//     inDashboard: false,
//   });

//   // NEW: Payments tab state
//   const [paymentSettings, setPaymentSettings] = useState({
//     gateway: 'Paystack', // Active gateway
//     withdrawalCycle: 'Weekly',
//     commissionRate: '10%',
//     minWithdrawalAmount: '2000', // Stored as string, formatted for display
//   });

//   const availableGateways = ['Paystack', 'Stripe', 'Flutterwave'];
//   const withdrawalCycleOptions = ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly'];
//   const commissionRateOptions = ['5%', '10%', '15%', '20%'];


//   // Handlers for Account Tab
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
  
//   // Handlers for Preferences Tab (untouched)
//   const handleAlertChange = (key: string) => {
//     setAdminAlerts(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
//   };

//   const handleNotificationChange = (key: string) => {
//     setAdminNotificationType(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
//   };

//   const resetPreferences = () => {
//     setAdminAlerts({
//       newUserRegistered: false,
//       kycPending: false,
//       newDispute: false,
//       paymentFailed: false,
//     });
//     setAdminNotificationType({
//       email: false,
//       inDashboard: false,
//     });
//   };

//   const savePreferences = () => {
//     console.log("Preferences saved:", {
//       adminAlerts,
//       adminNotificationType
//     });
//   };
  
//   // NEW: Handlers for Payments Tab
//   const handlePaymentChange = (key: keyof typeof paymentSettings, value: string) => {
//     setPaymentSettings(prev => ({ ...prev, [key]: value }));
//   };

//   const resetPaymentSettings = () => {
//     setPaymentSettings({
//       gateway: 'Paystack',
//       withdrawalCycle: 'Weekly',
//       commissionRate: '10%',
//       minWithdrawalAmount: '2000',
//     });
//   };

//   const savePaymentSettings = () => {
//     console.log("Payment Settings saved:", paymentSettings);
//   };

//   // Tabs structure
//   const tabs = [
//     { id: 'account', name: 'General settings', icon: <User className="h-5 w-5" /> },
//     { id: 'preferences', name: 'Preferences', icon: <Bell className="h-5 w-5" /> },
//     { id: 'payments', name: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
//     { id: 'platform-policies', name: 'Platform Policies', icon: <Headphones className="h-5 w-5" /> },
//     { id: 'access', name: 'Access & Activity', icon: <BadgeCheck className="h-5 w-5" /> },
//   ];

//   const renderContent = () => {
//     // 1. Account tab (General Settings)
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
//             <button className="px-6 py-3 bg-[#3900DC] text-white rounded-full text-[16px] font-medium hover:bg-purple-700 transition-colors">
//               Save changes
//             </button>
//           </div>
//         </div>
//       );
//     }

//     // 2. Preferences tab (untouched)
//     if (activeTab === 'preferences') {
//       return (
//         <div className=" md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5">
//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//             <h2 className="text-lg font-semibold text-[#32323E] mb-6">Notification preferences</h2>

//             {/* Admin Alerts Section */}
//             <div className="mb-8">
//               <h3 className="text-[15px] font-medium text-[#4B4B56] mb-4">Admin alerts</h3>
//               <div className="space-y-3">
//                 {Object.entries(adminAlerts).map(([key, value]) => (
//                   <label key={key} className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={value}
//                       onChange={() => handleAlertChange(key)}
//                       className="w-4 h-4 accent-purple-600 border-gray-300 rounded focus:ring-purple-500"
//                     />
//                     <span className="text-[14px] text-[#4B4B56] capitalize">
//                       {key === 'newUserRegistered'
//                         ? 'New user registered'
//                         : key === 'kycPending'
//                         ? 'KYC pending'
//                         : key === 'newDispute'
//                         ? 'New dispute raised'
//                         : 'Payment failed'}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <hr className="border-gray-200 my-6" />

//             {/* Notification type section */}
//             <div className="mb-6">
//               <h3 className="text-[15px] font-medium text-[#4B4B56] mb-4">Admin alerts</h3>
//               <div className="space-y-3">
//                 {Object.entries(adminNotificationType).map(([key, value]) => (
//                   <label key={key} className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={value}
//                       onChange={() => handleNotificationChange(key)}
//                       className="w-4 h-4 accent-purple-600 border-gray-300 rounded focus:ring-purple-500"
//                     />
//                     <span className="text-[14px] text-[#4B4B56] capitalize">
//                       {key === 'email' ? 'Email' : 'In-dashboard alerts'}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <hr className="border-gray-200 my-6" />

//             {/* Buttons */}
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={resetPreferences}
//                 className="px-5 py-2.5 bg-gray-100 text-[#4B4B56] rounded-full text-[14px] font-medium hover:bg-gray-200 transition-colors"
//               >
//                 Reset to Default
//               </button>
//               <button
//                 onClick={savePreferences}
//                 className="px-6 py-2.5 bg-[#3900DC] text-white rounded-full text-[14px] font-medium hover:bg-[#2E00B3] transition-colors"
//               >
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     }
    
//     // 3. Payments tab (NEW)
//     if (activeTab === 'payments') {
//       return (
//         <div className=" md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5 mb-10 md:mb-0">
//           <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-8">
            
//             {/* Header */}
//             <div className="mb-6">
//               <h2 className="text-2xl font-semibold text-[#32323E]">Payment settings</h2>
//               <p className="text-[14px] text-[#95959F] mt-1">Configure how money flows through the platform.</p>
//             </div>

//             {/* Payment Gateway */}
//             <div className="space-y-4">
//               <label className="text-[16px] font-medium text-[#4B4B56] block">Payment Gateway</label>
//               <div className="flex flex-col gap-3 w-[150px] md:ml-47 md:-mt-10">
//                 {availableGateways.map(gateway => {
//                   const isActive = paymentSettings.gateway === gateway;
//                   return (
//                     <button
//                       key={gateway}
//                       onClick={() => handlePaymentChange('gateway', gateway)}
//                       className={`flex items-center px-4 py-2 rounded-lg text-[14px] font-medium transition-colors border 
//                         ${isActive 
//                           ? 'bg-[#3900DC] text-white border-[#3900DC]' 
//                           : 'bg-white text-[#4B4B56] border-gray-300 hover:bg-gray-50'
//                         }`}
//                     >
//                       {/* Using the CreditCard icon or an initial letter mock icon */}
//                       <CreditCard className="h-4 w-4 mr-2" />
//                       {gateway}
//                     </button>
//                   );
//                 })}
//                 <button
//                     onClick={() => console.log('Add Custom Gateway')}
//                     className="flex items-center px-4 py-2 rounded-lg text-[14px] font-medium transition-colors border border-dashed border-gray-400 text-gray-600 hover:bg-gray-50"
//                   >
//                     <Plus className="h-4 w-4 mr-1" />
//                     Custom
//                   </button>
//               </div>
//             </div>

//             {/* Withdrawal Cycle */}
//             <div className=" flex flex-row space-x-4 items-center">
//               <label htmlFor="withdrawal-cycle" className="text-[16px] font-medium text-[#4B4B56] block">Withdrawal Cycle</label>
//               <div className="relative w-full max-w-[200px]">
//                 <select
//                   id="withdrawal-cycle"
//                   value={paymentSettings.withdrawalCycle}
//                   onChange={(e) => handlePaymentChange('withdrawalCycle', e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   {withdrawalCycleOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                 </div>
//               </div>
//             </div>

//             {/* Commission Rate */}
//             <div className="flex flex-row space-x-4 items-center">
//               <label htmlFor="commission-rate" className="text-[16px] font-medium text-[#4B4B56] block">Commission Rate</label>
//               <div className="relative w-full max-w-[200px]">
//                 <select
//                   id="commission-rate"
//                   value={paymentSettings.commissionRate}
//                   onChange={(e) => handlePaymentChange('commissionRate', e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   {commissionRateOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                 </div>
//               </div>
//             </div>

//             {/* Minimum withdrawal amount */}
//             <div className="flex flex-row space-x-4 items-center">
//               <label htmlFor="min-withdrawal" className="text-[16px] font-medium text-[#4B4B56]">
//                 Minimum
//                 <span className="block text-[15px] font-medium text-[#4B4B56]">withdrawal amount</span>
//               </label>
//               <div className="relative w-full max-w-[200px]">
//                 <input
//                   id="min-withdrawal"
//                   type="number"
//                   value={paymentSettings.minWithdrawalAmount}
//                   onChange={(e) => handlePaymentChange('minWithdrawalAmount', e.target.value)}
//                   className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="2000"
//                 />
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#4B4B56] text-[16px]">
//                   ₦
//                 </span>
//               </div>
//             </div>
            
//             {/* Buttons */}
//             <div className="flex justify-end space-x-4 pt-4">
//               <button
//                 onClick={resetPaymentSettings}
//                 className="px-5 py-2.5 bg-gray-100 text-[#4B4B56] rounded-full text-[14px] font-medium hover:bg-gray-200 transition-colors"
//               >
//                 Reset to Default
//               </button>
//               <button
//                 onClick={savePaymentSettings}
//                 className="px-6 py-2.5 bg-[#3900DC] text-white rounded-full text-[14px] font-medium hover:bg-purple-700 transition-colors"
//               >
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     // Default for other tabs
//     if (activeTab === 'platform-policies' || activeTab === 'access') {
//         return (
//             <div className="flex-1 flex items-center justify-center p-10 md:ml-10 bg-white md:w-[600px] border rounded-lg shadow-sm">
//                 <div className="text-[18px] font-semibold text-[#32323E]">Coming Soon</div>
//             </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-white text-gray-900">
//       <Header title="Settings" />
//       <div className="px-5 md:px-20 py-10 flex flex-col md:flex-row w-full">
//         {/* Sidebar */}
//         <div className="w-full md:w-[300px] bg-white">
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

//         {/* Main content */}
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
  Pencil,
  Plus 
} from "lucide-react";
// Mocking the Header component as it's an external import
const Header = ({ title }: { title: string }) => (
  <header className="py-4 px-5 md:px-20 border-b">
    <h1 className="text-2xl font-bold">{title}</h1>
  </header>
);

interface Field {
  label: string;
  value: string;
}

const Settings = () => {
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

  // Preferences tab state (untouched from previous step)
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

  // Payments tab state (untouched from previous step)
  const [paymentSettings, setPaymentSettings] = useState({
    gateway: 'Paystack', // Active gateway
    withdrawalCycle: 'Weekly',
    commissionRate: '10%',
    minWithdrawalAmount: '2000', // Stored as string, formatted for display
  });

  const availableGateways = ['Paystack', 'Stripe', 'Flutterwave'];
  const withdrawalCycleOptions = ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly'];
  const commissionRateOptions = ['5%', '10%', '15%', '20%'];
  
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
  
  // Handlers for Preferences Tab (untouched)
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
  
  // Handlers for Payments Tab (untouched)
  const handlePaymentChange = (key: keyof typeof paymentSettings, value: string) => {
    setPaymentSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetPaymentSettings = () => {
    setPaymentSettings({
      gateway: 'Paystack',
      withdrawalCycle: 'Weekly',
      commissionRate: '10%',
      minWithdrawalAmount: '2000',
    });
  };

  const savePaymentSettings = () => {
    console.log("Payment Settings saved:", paymentSettings);
  };

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
        <div className=" md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5">
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
    
    // 3. Payments tab - Untouched
    if (activeTab === 'payments') {
      return (
        <div className=" md:ml-10 bg-gray-50 md:w-[600px] rounded-lg mt-5 mb-10 md:mb-0">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-8">
            
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#32323E]">Payment settings</h2>
              <p className="text-[14px] text-[#95959F] mt-1">Configure how money flows through the platform.</p>
            </div>

            {/* Payment Gateway */}
            <div className="space-y-4">
              <label className="text-[16px] font-medium text-[#4B4B56] block">Payment Gateway</label>
              <div className="flex flex-col gap-3 w-[150px] md:ml-47 md:-mt-10">
                {availableGateways.map(gateway => {
                  const isActive = paymentSettings.gateway === gateway;
                  return (
                    <button
                      key={gateway}
                      onClick={() => handlePaymentChange('gateway', gateway)}
                      className={`flex items-center px-4 py-2 rounded-lg text-[14px] font-medium transition-colors border 
                        ${isActive 
                          ? 'bg-[#3900DC] text-white border-[#3900DC]' 
                          : 'bg-white text-[#4B4B56] border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {/* Using the CreditCard icon or an initial letter mock icon */}
                      <CreditCard className="h-4 w-4 mr-2" />
                      {gateway}
                    </button>
                  );
                })}
                <button
                    onClick={() => console.log('Add Custom Gateway')}
                    className="flex items-center px-4 py-2 rounded-lg text-[14px] font-medium transition-colors border border-dashed border-gray-400 text-gray-600 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Custom
                  </button>
              </div>
            </div>

            {/* Withdrawal Cycle */}
            <div className=" flex flex-row space-x-4 items-center">
              <label htmlFor="withdrawal-cycle" className="text-[16px] font-medium text-[#4B4B56] block">Withdrawal Cycle</label>
              <div className="relative w-full max-w-[200px]">
                <select
                  id="withdrawal-cycle"
                  value={paymentSettings.withdrawalCycle}
                  onChange={(e) => handlePaymentChange('withdrawalCycle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {withdrawalCycleOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Commission Rate */}
            <div className="flex flex-row space-x-4 items-center">
              <label htmlFor="commission-rate" className="text-[16px] font-medium text-[#4B4B56] block">Commission Rate</label>
              <div className="relative w-full max-w-[200px]">
                <select
                  id="commission-rate"
                  value={paymentSettings.commissionRate}
                  onChange={(e) => handlePaymentChange('commissionRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {commissionRateOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Minimum withdrawal amount */}
            <div className="flex flex-row space-x-4 items-center">
              <label htmlFor="min-withdrawal" className="text-[16px] font-medium text-[#4B4B56]">
                Minimum
                <span className="block text-[15px] font-medium text-[#4B4B56]">withdrawal amount</span>
              </label>
              <div className="relative w-full max-w-[200px]">
                <input
                  id="min-withdrawal"
                  type="number"
                  value={paymentSettings.minWithdrawalAmount}
                  onChange={(e) => handlePaymentChange('minWithdrawalAmount', e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-[16px] text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="2000"
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#4B4B56] text-[16px]">
                  ₦
                </span>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={resetPaymentSettings}
                className="px-5 py-2.5 bg-gray-100 text-[#4B4B56] rounded-full text-[14px] font-medium hover:bg-gray-200 transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={savePaymentSettings}
                className="px-6 py-2.5 bg-[#3900DC] text-white rounded-full text-[14px] font-medium hover:bg-purple-700 transition-colors"
              >
                Save changes
              </button>
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

export default Settings;
