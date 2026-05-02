// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   useDeleteNotification,
//   useMarkNotificationAsRead,
//   useNotificationDetail,
//   useNotifications,
// } from "@/app/actions/reactQuery";
// import { ArrowLeft, Search, SlidersHorizontal, Trash2 } from "lucide-react";

// const NotificationPage = () => {
//   const { data: notifications, isLoading } = useNotifications();

//   const [search, setSearch] = useState("");
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   const { data: notificationDetail, isLoading: isLoadingDetail } =
//     useNotificationDetail(selectedId);

//   const markAsReadMutation = useMarkNotificationAsRead();
//   const deleteMutation = useDeleteNotification();

//   const filteredNotifications = useMemo(() => {
//     if (!Array.isArray(notifications)) return [];

//     return notifications.filter((item) => {
//       const title = (item.title || "").toLowerCase();
//       const message = (item.message || "").toLowerCase();
//       const searchText = search.toLowerCase();

//       return title.includes(searchText) || message.includes(searchText);
//     });
//   }, [notifications, search]);

//   const handleSelectNotification = (id: string, status: "read" | "unread") => {
//     setSelectedId(id);

//     if (status === "unread") {
//       markAsReadMutation.mutate(id);
//     }
//   };

//   const handleDelete = (id: string) => {
//     deleteMutation.mutate(id, {
//       onSuccess: () => {
//         setSelectedId(null);
//       },
//     });
//   };

//   return (
//     <div className="w-full bg-[#fafafa] min-h-screen px-6 py-6">
//       <div className="mx-auto max-w-[1200px]">
//         {/* Search Row */}
//         {!selectedId && (
//           <div className="flex items-center gap-4 mb-6">
//             <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 w-full shadow-sm">
//               <Search className="w-4 h-4 text-gray-400" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by reference"
//                 className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
//               />
//             </div>

//             <button
//               type="button"
//               className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
//             >
//               <SlidersHorizontal className="w-4 h-4" />
//               Filter
//             </button>
//           </div>
//         )}

//         {/* Main Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Notifications List */}
//           <div className={`${selectedId ? "hidden lg:block" : ""} lg:col-span-2`}>
//             <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//               {isLoading ? (
//                 <div className="p-6 text-sm text-gray-500">
//                   Loading notifications...
//                 </div>
//               ) : filteredNotifications.length === 0 ? (
//                 <div className="p-6 text-sm text-gray-500">
//                   No notifications found.
//                 </div>
//               ) : (
//                 <div className="divide-y divide-gray-100">
//                   {filteredNotifications.map((notif) => (
//                     <button
//                       key={notif.id}
//                       type="button"
//                       onClick={() =>
//                         handleSelectNotification(notif.id, notif.status)
//                       }
//                       className={`w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-gray-50 transition ${
//                         selectedId === notif.id ? "bg-[#f4f1ff]" : ""
//                       }`}
//                     >
//                       {/* Left */}
//                       <div className="flex items-start gap-4">
//                         <div className="relative">
//                           <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
//                             <span className="text-sm font-bold text-gray-600">
//                               {notif.title?.[0] || "N"}
//                             </span>
//                           </div>

//                           {/* Green dot */}
//                           <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                         </div>

//                         <div>
//                           <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
//                             {notif.title || "New Notification"}

//                             {notif.status === "unread" && (
//                               <span className="w-2 h-2 rounded-full bg-purple-600"></span>
//                             )}
//                           </h3>

//                           <p className="text-sm text-gray-500 mt-1 leading-snug line-clamp-2">
//                             {notif.message}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Right */}
//                       <div className="flex flex-col items-end gap-2 text-xs text-gray-400 font-semibold">
//                         <span>20m</span>
//                         <span className="text-lg leading-none">•••</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Notification Detail */}
//           <div className="lg:col-span-1">
//             <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 min-h-[300px]">
//               {!selectedId ? (
//                 <div className="text-sm text-gray-500">
//                   Select a notification to view details.
//                 </div>
//               ) : isLoadingDetail ? (
//                 <div className="text-sm text-gray-500">Loading details...</div>
//               ) : !notificationDetail ? (
//                 <div className="text-sm text-gray-500">
//                   Notification not found.
//                 </div>
//               ) : (
//                 <div>
//                   {/* Back Arrow */}
//                   <button
//                     type="button"
//                     onClick={() => setSelectedId(null)}
//                     className="flex items-center gap-2 text-sm font-bold text-purple-700 hover:underline mb-4"
//                   >
//                     <ArrowLeft className="w-4 h-4" />
//                     Back
//                   </button>

//                   {/* Header */}
//                   <div className="flex items-center justify-between gap-3 mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
//                         <span className="text-sm font-bold text-gray-600">
//                           {notificationDetail.title?.[0] || "N"}
//                         </span>
//                       </div>

//                       <div>
//                         <p className="text-sm font-bold text-gray-900">
//                           System Notification
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {notificationDetail.type}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Delete */}
//                     <button
//                       type="button"
//                       onClick={() => handleDelete(notificationDetail.id)}
//                       disabled={deleteMutation.isPending}
//                       className="p-2 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition disabled:opacity-50"
//                     >
//                       <Trash2 className="w-4 h-4 text-red-500" />
//                     </button>
//                   </div>

//                   {/* Title */}
//                   <h2 className="text-base font-extrabold text-gray-900 mb-2">
//                     {notificationDetail.title}
//                   </h2>

//                   {/* Message */}
//                   <p className="text-sm text-gray-600 leading-relaxed">
//                     {notificationDetail.message}
//                   </p>

//                   {/* Status badge */}
//                   <div className="mt-5">
//                     {notificationDetail.status === "read" ? (
//                       <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
//                         Read
//                       </span>
//                     ) : (
//                       <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
//                         Unread
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPage;

"use client";

import React, { useMemo, useState } from "react";
import {
  useDeleteNotification,
  useMarkNotificationAsRead,
  useNotifications,
} from "@/app/actions/reactQuery";
import { ArrowLeft, Search, Trash2 } from "lucide-react";
import Header from "@/components/Header";

type FilterType = "all" | "unread" | "read";

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const NotificationPage = () => {
  const { data: notifications, isLoading } = useNotifications();

  const markAsReadMutation = useMarkNotificationAsRead();
  const deleteMutation = useDeleteNotification();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredNotifications = useMemo(() => {
    if (!Array.isArray(notifications)) return [];

    let list = [...notifications];

    // Sort newest first
    list.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Put unread first
    list.sort((a, b) => {
      if (a.status === "unread" && b.status === "read") return -1;
      if (a.status === "read" && b.status === "unread") return 1;
      return 0;
    });

    // Filter by tab
    if (filter === "unread") {
      list = list.filter((n) => n.status === "unread");
    } else if (filter === "read") {
      list = list.filter((n) => n.status === "read");
    }

    // Filter by search
    if (search.trim()) {
      const query = search.toLowerCase();
      list = list.filter((n) => {
        return (
          (n.title || "").toLowerCase().includes(query) ||
          (n.message || "").toLowerCase().includes(query) ||
          (n.type || "").toLowerCase().includes(query)
        );
      });
    }

    return list;
  }, [notifications, search, filter]);

  const handleExpand = (id: string, status: "read" | "unread") => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    setExpandedId(id);

    // Mark as read when opened
    if (status === "unread") {
      markAsReadMutation.mutate(id);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        if (expandedId === id) setExpandedId(null);
      },
    });
  };

  return (
     <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Header */}
      <Header title="Notification" />
      <div className="mx-auto w-full max-w-[370px] md:max-w-[950px] mt-10">
        {/* Search */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 w-full shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications"
              className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 py-1"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
              filter === "all"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
              filter === "unread"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            Unread
          </button>

          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
              filter === "read"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            Read
          </button>
        </div>

        {/* Notifications List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-sm text-gray-500">
              Loading notifications...
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No notifications found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notif) => {
                const isExpanded = expandedId === notif.id;

                return (
                  <div key={notif.id}>
                    {/* Notification Row */}
                    <button
                      type="button"
                      onClick={() => handleExpand(notif.id, notif.status)}
                      className={`w-full flex items-start justify-between gap-4 px-5 py-5 text-left transition ${
                        isExpanded ? "bg-[#f4f1ff]" : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Left */}
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-700">
                              {notif.title?.[0] || "N"}
                            </span>
                          </div>

                          {/* Status dot */}
                          {notif.status === "unread" && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-purple-600 border-2 border-white rounded-full"></span>
                          )}
                        </div>

                        {/* Text */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">
                            {notif.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1 leading-snug line-clamp-2">
                            {notif.message}
                          </p>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex flex-col items-end gap-2 text-xs text-gray-400 font-semibold">
                        <span>{formatTimeAgo(notif.createdAt)}</span>
                        <span className="text-lg leading-none">•••</span>
                      </div>
                    </button>

                    {/* Expanded Detail */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 bg-[#f4f1ff]">
                        {/* Back */}
                        <button
                          type="button"
                          onClick={() => setExpandedId(null)}
                          className="flex items-center gap-2 text-sm font-bold text-purple-700 hover:underline mb-4"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>

                        {/* Detail Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs font-bold uppercase text-gray-400">
                                {notif.type.replaceAll("_", " ")}
                              </p>

                              <h2 className="text-base font-extrabold text-gray-900 mt-1">
                                {notif.title}
                              </h2>

                              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                {notif.message}
                              </p>

                              <p className="text-xs text-gray-400 font-semibold mt-4">
                                Created:{" "}
                                {new Date(notif.createdAt).toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>

                              <p className="text-xs text-gray-400 font-semibold mt-1">
                                Updated:{" "}
                                {new Date(notif.updatedAt).toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>

                              {/* Status Badge */}
                              <div className="mt-4">
                                {notif.status === "read" ? (
                                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                    Read
                                  </span>
                                ) : (
                                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                                    Unread
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDelete(notif.id)}
                              disabled={deleteMutation.isPending}
                              className="p-2 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition disabled:opacity-50"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>

                          {/* Extra Data Section */}
                          {(notif as any)?.data && (
                            <div className="mt-5 border-t border-gray-100 pt-4">
                              <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                                Extra Details
                              </p>

                              <pre className="text-xs bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-auto text-gray-700">
                                {JSON.stringify((notif as any).data, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;