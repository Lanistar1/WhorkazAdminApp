// 'use client'
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAdminCourses } from "@/app/actions/reactQuery"; 

// import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
// import Link from 'next/link';

// const CourseReviewPage = () => {
//   const router = useRouter();
//   const [page, setPage] = useState(1);
//   const [status, setStatus] = useState('published');

//   const { data, isLoading } = useAdminCourses({ page, limit: 10, status });

//   if (isLoading) return <div>Loading courses...</div>;

//   return (
//     <div className="p-6 bg-white rounded-lg shadow">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl font-bold text-[#222222]">Manage Courses</h2>
//         <select 
//           value={status} 
//           onChange={(e) => setStatus(e.target.value)}
//           className="border p-2 rounded text-[#222222]"
//         >
//           <option value="published">Published</option>
//           <option value="pending">Pending</option>
//           <option value="rejected">Rejected</option>
//         </select>
//       </div>

//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="border-b bg-gray-50">
//             <th className="p-3 text-[#222222]">Course Title</th>
//             <th className="p-3 text-[#222222]">Category</th>
//             <th className="p-3 text-[#222222]">Price</th>
//             <th className="p-3 text-[#222222]">Class Type</th>
//             <th className="p-3 text-[#222222]">Level</th>
//             <th className="p-3 text-right text-[#222222]">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.courses.map((course: any) => (
//             <tr key={course._id} className="border-b hover:bg-gray-50">
//               <td className="p-3 font-medium text-[#222222]">{course.title}</td>
//               <td className="p-3 capitalize text-[#222222]">{course.category}</td>
//               <td className="p-3 text-[#222222]">₦{course.price}</td>
//               <td className="p-3 text-[#222222]">{course.classType}</td>
//               <td className="p-3 text-[#222222]">{course.level}</td>
//               <td className="p-3 text-right">
//                 <Link href={`/course-review/${course.id}`} key={course.id} className=" flexp-1 text-[#222222] hover:bg-gray-200 rounded justify-end">
//                     <MoreHorizontal size={20} />
//                 </Link>
//                 {/* <button 
//                   onClick={() => router.push(`/course-review/${course._id}`)}
//                   className="p-1 text-[#222222] hover:bg-gray-200 rounded"
//                 >
//                   <MoreHorizontal size={20} />
//                 </button> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       {/* Pagination Section */}
// <div className="flex justify-between items-center mt-4">
//   <span className="text-sm text-gray-500">
//     {/* Changed from data?.pagination.page to data?.page */}
//     Page {data?.page} of {data?.totalPages}
//   </span>
//   <div className="flex gap-2">
//     <button 
//       disabled={page === 1}
//       onClick={() => setPage(p => p - 1)}
//       className="p-2 border rounded disabled:opacity-50"
//     >
//       <ChevronLeft size={18}/>
//     </button>
//     <button 
//       disabled={page === data?.totalPages} // Changed from pagination.pages
//       onClick={() => setPage(p => p + 1)}
//       className="p-2 border rounded disabled:opacity-50"
//     >
//       <ChevronRight size={18}/>
//     </button>
//   </div>
// </div>
//     </div>
//   );
// };

// export default CourseReviewPage;




'use client';

import React, { useState } from 'react';
import { useAdminCourses } from "@/app/actions/reactQuery";
import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

const CourseReviewPage = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('published');

  const limit = 10;

  const { data, isLoading, isFetching, isError, error } = useAdminCourses({
    page,
    limit,
    status,
  });

  // Support different backend response formats
  const currentPage = data?.page || data?.pagination?.page || page;
  const totalPages = data?.totalPages || data?.pagination?.totalPages || 1;
  const courses = data?.courses || data?.data?.courses || [];

  if (isLoading) return <div className="p-6 text-[#222222]">Loading courses...</div>;

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Error: {(error as any)?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
      <Header title="Manage Courses" />
       <div className="p-6">

           {/* Table */}
      <table className="w-full text-left px-6">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 text-[#222222]">Course Title</th>
            <th className="p-3 text-[#222222]">Category</th>
            <th className="p-3 text-[#222222]">Price</th>
            <th className="p-3 text-[#222222]">Class Type</th>
            <th className="p-3 text-[#222222]">Level</th>
            <th className="p-3 text-right text-[#222222]">Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.length > 0 ? (
            courses.map((course: any) => (
              <tr key={course._id} className=" hover:bg-gray-50">
                <td className="p-3 font-medium text-[#222222]">{course.title}</td>
                <td className="p-3 capitalize text-[#222222]">{course.category}</td>
                <td className="p-3 text-[#222222]">₦{course.price}</td>
                <td className="p-3 text-[#222222]">{course.classType}</td>
                <td className="p-3 text-[#222222]">{course.level}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/course-review/${course.id}`}
                    className="inline-flex justify-end p-1 text-[#222222] hover:bg-gray-200 rounded"
                  >
                    <MoreHorizontal size={20} />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
          {isFetching && <span className="ml-2 text-xs">(Fetching...)</span>}
        </span>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
            {isFetching && <span className="ml-2 text-xs">(Fetching...)</span>}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 border border-gray-300 rounded bg-white text-[#222222] 
                        hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} className="text-[#222222]" />
            </button>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="p-2 border border-gray-300 rounded bg-white text-[#222222]
                        hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} className="text-[#222222]" />
            </button>
          </div>
        </div>
      </div>
       </div>

     
    </div>
  );
};

export default CourseReviewPage;