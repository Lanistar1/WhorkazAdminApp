
// // app/course/[id]/page.js
// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { Bell, LogOutIcon, MessageSquare } from "lucide-react";

// const CourseDetail = ({ id }: { id: string }) => {

//   // Simulated course data (replace with API call in a real app)
//   const [course, setCourse] = useState({
//     id: id || "1",
//     title: "Introduction to Electrical Maintenance",
//     status: "Rejected",
//     content: [
//       {
//         section: "1. Introduction",
//         duration: "3 mins",
//         subsections: [],
//       },
//       {
//         section: "2. Understanding Home Electrical Systems",
//         duration: "3 mins",
//         subsections: [
//           { title: "Common Faults and How to Fix Them", duration: "3 mins" },
//           { title: "Using Tools Safely and Effectively", duration: "3 mins" },
//         ],
//       },
//     ],
//     video: {
//       title: "Understanding Home Electrical Systems",
//       instructor: "Engr. Yusuf Ayodeji",
//       date: "February 2025",
//       url: "https://www.youtube.com/watch?v=OKa5q8DTy8U", // Replace with actual video URL
//     },
//     comments: [
//       {
//         user: "Felix O.",
//         rating: 5,
//         text: "Clear and Well-Structured. This course is incredibly well-organized. Each topic flows logically into the next, making the learning process smooth and enjoyable.",
//       },
//       {
//         user: "Felix O.",
//         rating: 5,
//         text: "Another great comment about the course.",
//       },
//     ],
//   });

//   const [openSections, setOpenSections] = useState([true, true]); // Track open/closed state of sections
//   const [comment, setComment] = useState("");

//   // Simulate data fetching (replace with real API call)
//   useEffect(() => {
//     if (id) {
//       // Fetch course data based on id (e.g., from an API)
//       // setCourse(fetchedData);
//     }
//   }, [id]);

//   const toggleSection = (index) => {
//     setOpenSections((prev) =>
//       prev.map((open, i) => (i === index ? !open : open))
//     );
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (comment.trim()) {
//       setCourse((prev) => ({
//         ...prev,
//         comments: [
//           ...prev.comments,
//           { user: "Current User", rating: 5, text: comment },
//         ],
//       }));
//       setComment("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white p-0 text-gray-900">
//       <div className="flex justify-between items-center mb-4 bg-[#FEFEFF] border-b border-[#DBDBE3] shadow-sm px-6 py-4">
//         <h1 className="text-2xl font-semibold">{course.title}</h1>
//         <div className="flex items-center space-x-2">
//             <Bell className="h-5 w-5 text-gray-500 dark:text-gray-500" />
//             <MessageSquare className="hidden md:flex h-5 w-5 text-gray-500 dark:text-gray-500" />
//             <LogOutIcon className=" md:hidden h-5 w-5 text-gray-500 dark:text-gray-500"/>
//             {/* <select
//                 value={course.status}
//                 className="p-1 bg-red-100 text-red-600 rounded"
//             >
//                 <option value="Rejected">Rejected</option>
//                 <option value="Accepted">Accepted</option>
//             </select> */}
//         </div>
//       </div>

//       <div className="flex gap-6 p-6">
//         {/* Course Content */}
//         <div className="w-1/3">
//           <div className="bg-gray-100 p-2 rounded mb-2">Course content</div>
//           {course.content.map((section, index) => (
//             <div key={index} className="mb-2">
//               <div
//                 className="flex justify-between items-center p-2 bg-gray-100 rounded cursor-pointer"
//                 onClick={() => toggleSection(index)}
//               >
//                 <span>{section.section} {section.duration && `(${section.duration})`}</span>
//                 <span>{openSections[index] ? "▼" : "▶"}</span>
//               </div>
//               {openSections[index] && (
//                 <div className="ml-4 mt-2">
//                   {section.subsections.map((sub, subIndex) => (
//                     <div key={subIndex} className="flex items-center mb-2">
//                       <input type="checkbox" className="mr-2" />
//                       <span>{sub.title} ({sub.duration})</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Video and Comments */}
//         <div className="w-2/3">
//           <div className=" rounded-lg shadow-lg p-4 mb-4">
//             <Image
//                 src="/assets/images/courseDetailImage.png"
//                 alt="Whorkaz Logo"
//                 width={750}
//                 height={34}
//                 className="object-contain"
//                 />
//             <div className="mt-2 text-sm text-gray-600">
//               {course.video.title} <br />
//               {course.video.instructor} - {course.video.date}
//             </div>
//           </div>

//           <div className=" rounded-lg p-4">
//             <div className="flex items-center mb-4">
//               <Image
//                     src="/assets/images/person3.png"
//                     alt="Whorkaz Logo"
//                     width={48}
//                     height={48}
//                     className="object-contain"
//                 />
//               {/* <span className="pl-2">Add a comment</span> */}
//             </div>
//             <form onSubmit={handleCommentSubmit}>
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="w-full p-2 border border-[#cccccc] rounded-lg mb-2"
//                 placeholder="Write your comment..."
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-[#3900DC] text-white rounded-lg"
//               >
//                 Submit
//               </button>
//             </form>
//             {course.comments.map((comment, index) => (
//               <div key={index} className="mt-4">
//                 <div className="flex items-center">
//                   <Image
//                         src="/assets/images/person3.png"
//                         alt="Whorkaz Logo"
//                         width={48}
//                         height={48}
//                         className="object-contain"
//                     />
//                   <div className="pl-2">
//                     <p className="font-semibold">{comment.user}</p>
//                     <div className="flex">
//                       {Array.from({ length: 5 }, (_, i) => (
//                         <span
//                           key={i}
//                           className={i < comment.rating ? "text-yellow-400" : "text-gray-300"}
//                         >
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="mt-2 text-gray-600">{comment.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;




// app/course/[id]/page.js
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bell, LogOutIcon, MessageSquare } from "lucide-react";

const CourseDetail = ({ id }: { id: string }) => {
  // Simulated course data (replace with API call in a real app)
  const [course, setCourse] = useState({
    id: id || "1",
    title: "Introduction to Electrical Maintenance",
    status: "Rejected",
    content: [
      {
        section: "1. Introduction",
        duration: "3 mins",
        subsections: [],
      },
      {
        section: "2. Understanding Home Electrical Systems",
        duration: "3 mins",
        subsections: [
          { title: "Common Faults and How to Fix Them", duration: "3 mins" },
          { title: "Using Tools Safely and Effectively", duration: "3 mins" },
        ],
      },
    ],
    video: {
      title: "Understanding Home Electrical Systems",
      instructor: "Engr. Yusuf Ayodeji",
      date: "February 2025",
      url: "https://www.youtube.com/watch?v=OKa5q8DTy8U", // Replace with actual video URL
    },
    comments: [
      {
        user: "Felix O.",
        rating: 5,
        text: "Clear and Well-Structured. This course is incredibly well-organized. Each topic flows logically into the next, making the learning process smooth and enjoyable.",
      },
      {
        user: "Felix O.",
        rating: 5,
        text: "Another great comment about the course.",
      },
    ],
  });

  const [openSections, setOpenSections] = useState([true, true]); // Track open/closed state of sections
  const [comment, setComment] = useState("");

  // Simulate data fetching (replace with real API call)
  useEffect(() => {
    if (id) {
      // Fetch course data based on id (e.g., from an API)
      // setCourse(fetchedData);
    }
  }, [id]);

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setCourse((prev) => ({
        ...prev,
        comments: [
          ...prev.comments,
          { user: "Current User", rating: 5, text: comment },
        ],
      }));
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 mb-15 md:mb-0">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#FEFEFF] border-b border-[#DBDBE3] shadow-sm px-4 py-3 sm:px-6">
        <h1 className="text-[14px] sm:text-[18px] font-semibold">{course.title}</h1>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-gray-500" />
          <MessageSquare className="hidden sm:flex h-5 w-5 text-gray-500" />
          <LogOutIcon className="sm:hidden h-5 w-5 text-gray-500" />
          {/* Status dropdown hidden for now; can be added back with responsive styling */}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Course Content */}
          <div className="w-full sm:w-1/3">
            <div className="bg-gray-100 p-2 rounded mb-2 text-center sm:text-left">
              Course content
            </div>
            {course.content.map((section, index) => (
              <div key={index} className="mb-2">
                <div
                  className="flex justify-between items-center p-2 bg-gray-100 rounded cursor-pointer"
                  onClick={() => toggleSection(index)}
                >
                  <span className="text-sm sm:text-base">
                    {section.section} {section.duration && `(${section.duration})`}
                  </span>
                  <span className="text-sm sm:text-base">
                    {openSections[index] ? "▼" : "▶"}
                  </span>
                </div>
                {openSections[index] && (
                  <div className="ml-0 sm:ml-4 mt-2">
                    {section.subsections.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center mb-2 text-sm sm:text-base"
                      >
                        <input type="checkbox" className="mr-2" />
                        <span>{sub.title} ({sub.duration})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Video and Comments */}
          <div className="w-full sm:w-2/3">
            <div className="rounded-lg shadow-lg p-4 mb-4">
              <Image
                src="/assets/images/courseDetailImage.png"
                alt="Course Video"
                width={750}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="mt-2 text-sm sm:text-base text-gray-600">
                {course.video.title} <br />
                {course.video.instructor} - {course.video.date}
              </div>
            </div>

            <div className="rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Image
                  src="/assets/images/person3.png"
                  alt="User Avatar"
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2"
                />
                <span className="text-sm sm:text-base pl-2">Add a comment</span>
              </div>
              <form onSubmit={handleCommentSubmit} className="space-y-2">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border border-[#cccccc] rounded-lg mb-2 text-sm sm:text-base"
                  placeholder="Write your comment..."
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3900DC] text-white rounded-lg text-sm sm:text-base"
                >
                  Submit
                </button>
              </form>
              {course.comments.map((comment, index) => (
                <div key={index} className="mt-4">
                  <div className="flex items-center">
                    <Image
                      src="/assets/images/person3.png"
                      alt={comment.user}
                      width={48}
                      height={48}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2"
                    />
                    <div className="pl-2">
                      <p className="font-semibold text-sm sm:text-base">
                        {comment.user}
                      </p>
                      <div className="flex text-sm sm:text-base">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={
                              i < comment.rating ? "text-yellow-400" : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm sm:text-base">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;