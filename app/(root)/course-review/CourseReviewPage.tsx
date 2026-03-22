'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminCourses } from "@/app/actions/reactQuery"; 

import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const CourseReviewPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('published');

  const { data, isLoading } = useAdminCourses({ page, limit: 10, status });

  if (isLoading) return <div>Loading courses...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-[#222222]">Manage Courses</h2>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded text-[#222222]"
        >
          <option value="published">Published</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-[#222222]">Course Title</th>
            <th className="p-3 text-[#222222]">Category</th>
            <th className="p-3 text-[#222222]">Price</th>
            <th className="p-3 text-[#222222]">Class Type</th>
            <th className="p-3 text-[#222222]">Level</th>
            <th className="p-3 text-right text-[#222222]">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.courses.map((course: any) => (
            <tr key={course._id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium text-[#222222]">{course.title}</td>
              <td className="p-3 capitalize text-[#222222]">{course.category}</td>
              <td className="p-3 text-[#222222]">₦{course.price}</td>
              <td className="p-3 text-[#222222]">{course.classType}</td>
              <td className="p-3 text-[#222222]">{course.level}</td>
              <td className="p-3 text-right">
                <Link href={`/course-review/${course.id}`} key={course.id} className=" flexp-1 text-[#222222] hover:bg-gray-200 rounded justify-end">
                    <MoreHorizontal size={20} />
                </Link>
                {/* <button 
                  onClick={() => router.push(`/course-review/${course._id}`)}
                  className="p-1 text-[#222222] hover:bg-gray-200 rounded"
                >
                  <MoreHorizontal size={20} />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {/* Pagination Section */}
<div className="flex justify-between items-center mt-4">
  <span className="text-sm text-gray-500">
    {/* Changed from data?.pagination.page to data?.page */}
    Page {data?.page} of {data?.totalPages}
  </span>
  <div className="flex gap-2">
    <button 
      disabled={page === 1}
      onClick={() => setPage(p => p - 1)}
      className="p-2 border rounded disabled:opacity-50"
    >
      <ChevronLeft size={18}/>
    </button>
    <button 
      disabled={page === data?.totalPages} // Changed from pagination.pages
      onClick={() => setPage(p => p + 1)}
      className="p-2 border rounded disabled:opacity-50"
    >
      <ChevronRight size={18}/>
    </button>
  </div>
</div>
    </div>
  );
};

export default CourseReviewPage;