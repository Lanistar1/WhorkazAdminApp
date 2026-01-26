"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell, LogOutIcon, MessageSquare, Calendar, MapPin, DollarSign, Clock, BookOpen, Users } from "lucide-react";

// Import your hook
import { useCourseById } from "@/app/actions/reactQuery"; // adjust path if needed

const CourseDetail = ({ id }: { id: string }) => {
  const { data: course, isLoading, isError, error } = useCourseById(id);

  const [openSections, setOpenSections] = useState([true, true]);
  const [comment, setComment] = useState("");

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app: send to API, then update local state
      console.log("New comment:", comment);
      setComment("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading course details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white p-6 text-red-600">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>{error?.message || "Failed to load course"}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white p-6 text-gray-600">
        <h1 className="text-2xl font-bold">Course Not Found</h1>
      </div>
    );
  }

  // Format instructor name
  const instructorName = course.workman
    ? `${course.workman.firstName || ""} ${course.workman.lastName || ""}`.trim() ||
      course.workman.email
    : "Unknown Instructor";

  // Format dates
  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—";

  const startDate = formatDate(course.startDate);
  const endDate = formatDate(course.endDate);
  const createdDate = formatDate(course.createdAt);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm px-4 py-4 sm:px-6 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{course.title}</h1>
        <div className="flex items-center space-x-4">
          <Bell className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
          <MessageSquare className="hidden sm:block h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
          <LogOutIcon className="sm:hidden h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column: Course Content */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Course Content
            </h2>
            <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
              {course.courseContent || "No detailed content available."}
            </div>

            {/* Optional: If sections were structured, you could render them here */}
            {/* For now we just show the raw courseContent string */}

            <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2 mt-5">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              What You Will Learn
            </h4>

            {course.whatYouWillLearn ? (
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-2 pl-1">
                {course.whatYouWillLearn
                  .split(',')
                  .map(item => item.trim())
                  .filter(Boolean)
                  .map((item, index) => (
                    <li key={index} className="leading-relaxed">
                      {item.trim()}
                      {index < course.whatYouWillLearn.split(',').length - 1 ? '.' : ''}
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No learning outcomes listed.</p>
            )}
          </div>

          {/* Right Column: Details + Video/Comments */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Course Image / Video Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* <Image
                src={course.image || "/assets/images/courseDetailImage.png"}
                alt={course.title}
                width={800}
                height={450}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              /> */}
              <Image
                src= "/assets/images/courseDetailImage.png"
                alt={course.title}
                width={800}
                height={450}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <span>Instructor: {instructorName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-indigo-600" />
                    <span>Price: ₦{parseFloat(course.price).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-indigo-600" />
                    <span>Duration: {course.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                    <span>Created: {createdDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Details</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-gray-700">Category</dt>
                  <dd className="text-gray-600">{course.category}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Level</dt>
                  <dd className="text-gray-600 capitalize">{course.level}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Class Type</dt>
                  <dd className="text-gray-600 capitalize">{course.classType}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Start – End Date</dt>
                  <dd className="text-gray-600">
                    {startDate} – {endDate}
                  </dd>
                </div>
                {course.classPlace && (
                  <div className="col-span-2">
                    <dt className="font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-indigo-600" />
                      Location
                    </dt>
                    <dd className="text-gray-600 mt-1">
                      {course.classPlace}
                      {course.locationDescription && (
                        <p className="text-gray-500 text-xs mt-1">{course.locationDescription}</p>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Description & Learning Outcomes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-700 mb-4">{course.description || "No description available."}</p>

              {/* <h4 className="text-base font-semibold text-gray-800 mb-2">What You Will Learn</h4>
              <p className="text-gray-700">{course.whatYouWillLearn || "No learning outcomes listed."}</p> */}
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
                Comments
              </h3>

              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex items-start gap-3">
                  <Image
                    src="/assets/images/person3.png"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                      placeholder="Write your comment..."
                      rows={3}
                    />
                    <button
                      type="submit"
                      className="mt-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                    >
                      Submit Comment
                    </button>
                  </div>
                </div>
              </form>

              {/* Example comments */}
              <div className="space-y-6">
                <div className="flex gap-3">
                  <Image
                    src="/assets/images/person3.png"
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">Felix O.</span>
                      <span className="text-yellow-500">★★★★★</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      Clear and Well-Structured. This course is incredibly well-organized. Each topic flows logically into the next...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;