'use client'
import React, { useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useCourses, useMyCourses, useMyEnrolledCourses } from "@/app/actions/reactQuery"; 
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { Trash2 } from 'lucide-react'; 
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";



const CoursesPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("Marketplace");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);


  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      await axios.delete(`${apiUrl}/api/v1/courses/${courseToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Force immediate refresh
      // queryClient.invalidateQueries({ queryKey: ['my-courses'] });
      // queryClient.refetchQueries({ queryKey: ['my-courses'] });

      setShowDeleteModal(false);
      setCourseToDelete(null);

      toast.success("Course deleted successfully");

      //====== reload window after deleting ======
      window.location.reload();

    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete course");
    }
  };

  // Fetch courses based on filters (for Marketplace tab)
  const { data: coursesData, isLoading: isLoadingCourses } = useCourses({
    keyword: keyword || undefined,
    category: category || undefined,
    // Add other filters as needed, e.g., isActive: true
  });

  const { data: myCoursesData, isLoading: isLoadingMyCourses } = useMyCourses({
    keyword: keyword || undefined,
    category: category || undefined,
    // Add other filters as needed, e.g., isActive: true
  });

  const { data: enrolledCoursesData, isLoading: isLoadingEnrolled } = useMyEnrolledCourses({
    keyword: keyword || undefined,
    category: category || undefined,
  });


  const courses = coursesData?.courses || [];
  const myCourses = myCoursesData?.courses || [];
  // const enrolledCourses = enrolledCoursesData?.courses || [];
const enrolledCourses = enrolledCoursesData?.enrollments?.map((e) => e.course) || [];


  const totalCount = coursesData?.count || 0;

  // Derive popular courses: sorted by totalEnrollments descending
  const popularCourses = [...courses]
    .sort((a, b) => b.totalEnrollments - a.totalEnrollments)
    .slice(0, 6); // Limit to top 6 or adjust as needed

  // Derive recommended courses: sorted by averageRating descending
    const recommendedCourses = [...courses]
    .sort((a, b) => parseFloat(b.averageRating) - parseFloat(a.averageRating))
    .slice(0, 6);


     // Derive popular courses for my courses: sorted by totalEnrollments descending
  const popularMyCourses = [...myCourses]
    .sort((a, b) => b.totalEnrollments - a.totalEnrollments)
    .slice(0, 6); // Limit to top 6 or adjust as needed

  // Derive recommended courses for my course: sorted by averageRating descending
  // const recommendedMyCourses = [...myCourses]
  //   .sort((a, b) => b.averageRating - a.averageRating)
  //   .slice(0, 6); // Limit to top 6 or adjust as needed




  const renderContent = () => {
    switch (activeTab) {
      case "Marketplace":
        return (
          <>
            {/* Popular Courses */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-semibold text-[#32323E]">
                  Popular Courses ({popularCourses.length})
                </h2>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none px-4 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-[12px] text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors pr-8"
                  >
                    <option value="">All</option>
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="carpentry">Carpentry</option>
                    {/* Add more categories as needed */}
                  </select>
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              {isLoadingCourses ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white border rounded-[12px] p-4 shadow-sm animate-pulse"
                      >
                        <div className="w-full h-48 bg-gray-300 rounded" />
                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-gray-300 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="h-4 bg-gray-200 rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                </div>
              ) : popularCourses.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gray-200 border-4 border-dashed rounded-xl" />
                  <p className="text-xl font-semibold text-[#4B4B56]">No popular courses found</p>
                  <p className="text-[#95959F] mt-3 max-w-md mx-auto">
                    Try adjusting your search or check back later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {popularCourses.map((course) => (
                    <Link href={`/courses/${course.id}`} key={course.id}>
                      <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] overflow-hidden shadow-sm">
                        {/* <Image
                          src={course.image}
                          alt={course.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                        /> */}
                        <Image
                          src={
                            course.image && !course.image.includes("example.com")
                              ? course.image
                              : "/assets/images/electrician.png" // ← Create this file in public/assets/images/
                          }
                          alt={course.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                          priority={false} // Optional: helps with LCP if you have many images
                        />
                        <div className="p-4">
                          <h3 className="text-[16px] font-semibold text-[#32323E] mb-2">
                            {course.title}
                          </h3>
                          <div className="flex justify-between items-center space-x-2 text-[14px] text-[#95959F] mb-2">
                            <span>Skill Level: {course.level}</span>
                            <span>{course.estimatedDuration}</span>
                          </div>
                          <p className="text-[16px] font-semibold text-[#32323E]">
                            ₦{Number(course.price).toLocaleString()}
                            {/* {course.price} */}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Courses */}
            <div>
              <h2 className="text-[20px] font-semibold text-[#32323E] mb-4">
                Recommended Courses ({recommendedCourses.length})
              </h2>
              {isLoadingCourses ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white border rounded-[12px] p-4 shadow-sm animate-pulse"
                      >
                        <div className="w-full h-48 bg-gray-300 rounded" />
                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-gray-300 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="h-4 bg-gray-200 rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                </div>
              ) : recommendedCourses.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gray-200 border-4 border-dashed rounded-xl" />
                  <p className="text-xl font-semibold text-[#4B4B56]">No recommended courses found</p>
                  <p className="text-[#95959F] mt-3 max-w-md mx-auto">
                    Try adjusting your search or check back later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <Link href={`/courses/${course.id}`} key={course.id}>
                      <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] overflow-hidden shadow-sm">
                        
                        <Image
                          src={
                            course.image && !course.image.includes("example.com")
                              ? course.image
                              : "/assets/images/electrician.png" // ← Create this file in public/assets/images/
                          }
                          alt={course.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                          priority={false} // Optional: helps with LCP if you have many images
                        />
                        <div className="p-4">
                          <h3 className="text-[16px] font-semibold text-[#32323E] mb-2">
                            {course.title}
                          </h3>
                          <div className="flex justify-between items-center space-x-2 text-[14px] text-[#95959F] mb-2">
                            <span>Skill Level: {course.level}</span>
                            <span>{course.estimatedDuration}</span>
                          </div>
                          <p className="text-[16px] font-semibold text-[#32323E]">
                            ₦{Number(course.price).toLocaleString()}
                            {/* {course.price} */}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        );
      // case "Paid courses":
      //   return (
      //     <div className="text-center py-12">
      //       <h3 className="text-[18px] font-semibold text-[#32323E]">Nothing to show here</h3>
      //     </div>
      //   );
      case "Paid courses":
      return isLoadingEnrolled ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white border rounded-[12px] p-4 shadow-sm animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 rounded" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="w-28 h-28 mx-auto mb-6 bg-gray-200 border-4 border-dashed rounded-xl" />
          <p className="text-xl font-semibold text-[#4B4B56]">No enrolled courses found</p>
          <p className="text-[#95959F] mt-3 max-w-md mx-auto">
            You haven’t enrolled in any courses yet. Explore the marketplace to start learning.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div className="bg-white border border-[#DBDBE3] rounded-[12px] overflow-hidden shadow-sm">
                <Image
                  src={
                    course.image && !course.image.includes("example.com")
                      ? course.image
                      : "/assets/images/electrician.png"
                  }
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                  priority={false}
                />
                <div className="p-4">
                  <h3 className="text-[16px] font-semibold text-[#32323E] mb-2">
                    {course.title}
                  </h3>
                  <div className="flex justify-between items-center space-x-2 text-[14px] text-[#95959F] mb-2">
                    <span>Skill Level: {course.level}</span>
                    <span>{course.estimatedDuration}</span>
                  </div>
                  <p className="text-[16px] font-semibold text-[#32323E]">
                    ₦{Number(course.price).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );

      case "Posted Courses":
        return (
          <>
            {/* Popular Courses */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-semibold text-[#32323E]">
                  Courses ({popularMyCourses.length})
                </h2>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none px-4 py-2 bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded-[12px] text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors pr-8"
                  >
                    <option value="">All</option>
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="carpentry">Carpentry</option>
                    {/* Add more categories as needed */}
                  </select>
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              {isLoadingMyCourses ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white border rounded-[12px] p-4 shadow-sm animate-pulse"
                      >
                        <div className="w-full h-48 bg-gray-300 rounded" />
                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-gray-300 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="h-4 bg-gray-200 rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                </div>
              ) : popularMyCourses.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gray-200 border-4 border-dashed rounded-xl" />
                  <p className="text-xl font-semibold text-[#4B4B56]">No popular courses found</p>
                  <p className="text-[#95959F] mt-3 max-w-md mx-auto">
                    Try adjusting your search or check back later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {popularMyCourses.map((course) => (
                    <div key={course.id} className="relative"> {/* ← Key goes here */}
                      <Link href={`/courses/${course.id}`}>
                        <div className="bg-white dark:bg-white border border-[#DBDBE3] rounded-[12px] overflow-hidden shadow-sm">
                          <Image
                            src={
                              course.image && !course.image.includes("example.com")
                                ? course.image
                                : "/assets/images/electrician.png"
                            }
                            alt={course.title}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover"
                            priority={false}
                          />
                          <div className="p-4">
                            <h3 className="text-[16px] font-semibold text-[#32323E] mb-2">
                              {course.title}
                            </h3>
                            <div className="flex justify-between items-center space-x-2 text-[14px] text-[#95959F] mb-2">
                              <span>Skill Level: {course.level}</span>
                              <span>{course.estimatedDuration}</span>
                            </div>
                            <p className="text-[16px] font-semibold text-[#32323E]">
                              ₦{Number(course.price).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Delete Icon */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteClick(course.id);
                        }}
                        className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors cursor-pointer"
                        aria-label="Delete course"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Header */}
      <Header title="Courses" />

      {/* Main Content */}
      <main className="px-6 py-4">
        {/* Grow Your Career Section */}
        <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-[20px] md:text-[24px] font-semibold text-[#32323E]">
            Grow Your Career.
          </h1>
          <Link href="/courses/new-course">
            <button className="px-4 md:px-6 py-3 bg-[#3900DC] text-white rounded-full text-[12px] md:text-[16px] font-medium hover:bg-purple-700 transition-colors cursor-pointer">
              + Create new course
            </button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-[#DBDBE3] pb-2 overflow-x-auto">
          <button
            className={`text-[16px] font-medium whitespace-nowrap cursor-pointer ${activeTab === "Marketplace" ? "text-[#32323E] border-b-2 border-[#3900DC]" : "text-[#4B4B56] hover:text-[#32323E]"}`}
            onClick={() => setActiveTab("Marketplace")}
          >
            Marketplace
          </button>
          <button
            className={`text-[16px] font-medium whitespace-nowrap cursor-pointer ${activeTab === "Paid courses" ? "text-[#32323E] border-b-2 border-[#3900DC]" : "text-[#4B4B56] hover:text-[#32323E]"}`}
            onClick={() => setActiveTab("Paid courses")}
          >
            Paid courses
          </button>
          <button
            className={`text-[16px] font-medium whitespace-nowrap cursor-pointer ${activeTab === "Posted Courses" ? "text-[#32323E] border-b-2 border-[#3900DC]" : "text-[#4B4B56] hover:text-[#32323E]"}`}
            onClick={() => setActiveTab("Posted Courses")}
          >
            Posted Courses
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Image
            src="/assets/icons/searchIcon.png" // Replace with actual search icon path
            alt="Search"
            width={18}
            height={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 object-contain"
          />
          <input
            type="text"
            placeholder="What do you want to learn?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-300 rounded-[12px] text-[16px] font-medium text-[#4B4B56] dark:text-[#4B4B56] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="absolute right-30 top-1/2 transform -translate-y-1/2 h-6 border-l border-[#3900DC]"></div>
          <div className="absolute right-0 top-0 h-full w-[100px] flex items-center pr-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full py-2 bg-transparent text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56] hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors"
            >
              <option value="">All</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="carpentry">Carpentry</option>
              {/* Add more categories as needed */}
            </select>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>

        {renderContent()}
      </main>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCourseToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
      />
    </div>
  );
};

export default CoursesPage;