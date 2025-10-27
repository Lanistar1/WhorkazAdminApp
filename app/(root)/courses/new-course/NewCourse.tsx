// app/new-course/page.tsx
"use client";

import { useState } from "react";

const NewCoursePage = () => {
  const [step, setStep] = useState(1);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [moduleNames, setModuleNames] = useState("");
  const [courseFile, setCourseFile] = useState(null);
  const [courseDescription, setCourseDescription] = useState("");
  const [whatYoullLearn, setWhatYoullLearn] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");

  const handlePrevClick = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      console.log("Back to home or previous page");
    }
  };

  const handleNextClick = () => {
    if (step === 1) {
      if (courseTitle && courseCategory && courseLevel) {
        setStep(step + 1);
        console.log(`Course Title: ${courseTitle}, Category: ${courseCategory}, Level: ${courseLevel}`);
      }
    } else if (step === 2) {
      if (moduleNames && courseFile) {
        setStep(step + 1);
        //console.log(`Module Names: ${moduleNames}, Course File: ${courseFile?.name || "No file"}`);
      }
    } else if (step === 3) {
      if (courseDescription && whatYoullLearn && estimatedDuration) {
        setStep(step + 1);
        console.log(`Description: ${courseDescription}, What You'll Learn: ${whatYoullLearn}, Duration: ${estimatedDuration}`);
      }
    }
  };

  const handleSubmit = () => {
    const allData = {
      courseTitle,
      courseCategory,
      courseLevel,
      moduleNames,
      //courseFile: courseFile?.name || "No file",
      courseDescription,
      whatYoullLearn,
      estimatedDuration,
    };
    console.log("Submitted Data:", allData);
    alert("Course submitted successfully!"); // Example feedback
  };

  const progress = ((step / 4) * 100).toFixed(2) + "%"; // 4 steps total

  const isStep1Complete = courseTitle && courseCategory && courseLevel;
  const isStep2Complete = moduleNames && courseFile;
  const isStep3Complete = courseDescription && whatYoullLearn && estimatedDuration;

  return (
    <div className="flex mx-5 md:mx-20 max-w-[450px] lg:max-w-full min-h-screen md:p-8 bg-[#FFFDFA]">
      <div className="flex flex-row gap-6 w-full md:p-8 rounded-2xl">
        <div className="mt-20 w-full">
          {/* Header and Progress Bar */}
          <h3 className="text-[18px] font-semibold text-[#191926] mb-2">
            {step === 4 ? "Course Overview" : "Upload a New Course"}
          </h3>
          <div className="flex flex-1 h-2 bg-[#F1F1F5] rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-[#3900DC] transition-all duration-500 ease-in-out"
              style={{ width: progress }}
            ></div>
          </div>

          {step === 1 && (
            <>
              {/* Form Fields - Step 1 */}
              <div className="flex flex-col gap-6 md:mr-50">
                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="Enter course title"
                    className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Course Category
                  </label>
                  <div className="relative">
                    <select
                      value={courseCategory}
                      onChange={(e) => setCourseCategory(e.target.value)}
                      className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] appearance-none pr-10"
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="electrical">Electrical</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="carpentry">Carpentry</option>
                    </select>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A1A1A8]">
                      ▼
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Course Level
                  </label>
                  <div className="relative">
                    <select
                      value={courseLevel}
                      onChange={(e) => setCourseLevel(e.target.value)}
                      className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] appearance-none pr-10"
                    >
                      <option value="" disabled>
                        Select Level
                      </option>
                      <option value="beginner">Beginner</option>
                      <option value="experienced">Experienced</option>
                      <option value="expert">Expert</option>
                    </select>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A1A1A8]">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-10 flex justify-end gap-4">
                <button
                  onClick={handlePrevClick}
                  className="bg-gray-300 text-gray-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNextClick}
                  disabled={!isStep1Complete}
                  className={`bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${!isStep1Complete ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Form Fields - Step 2 */}
              <div className="flex flex-col gap-6 md:mr-50">
                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Add Module (Name)
                  </label>
                  <input
                    type="text"
                    value={moduleNames}
                    onChange={(e) => setModuleNames(e.target.value)}
                    placeholder="Enter module names (e.g., Module 1, Module 2, Module 3)"
                    className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Upload Course
                  </label>
                  <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#E5E5E9] rounded-lg bg-white cursor-pointer hover:bg-[#F9F9FB]">
                    <input
                      type="file"
                      accept="application/pdf,video/*"
                      className="hidden"
                      id="courseFile"
                      //onChange={(e) => setCourseFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="courseFile" className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F1F1F5] text-[#3900DC] mb-2">
                        +
                      </div>
                      <p className="text-[14px] text-[#4B4B56] mb-1">Click to upload or drag and drop</p>
                      <p className="text-[12px] text-[#A1A1A8]">PDF or Video (max. 100MB)</p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-10 flex justify-end gap-4">
                <button
                  onClick={handlePrevClick}
                  className="bg-gray-300 text-gray-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNextClick}
                  disabled={!isStep2Complete}
                  className={`bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${!isStep2Complete ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* Form Fields - Step 3 */}
              <div className="flex flex-col gap-6 md:mr-50">
                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Course Description
                  </label>
                  <textarea
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    placeholder="Enter course description"
                    className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] h-32 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    What You’ll Learn
                  </label>
                  <textarea
                    value={whatYoullLearn}
                    onChange={(e) => setWhatYoullLearn(e.target.value)}
                    placeholder="Enter skills (e.g., Skill 1, Skill 2, Skill 3)"
                    className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] h-32 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={estimatedDuration}
                    onChange={(e) => setEstimatedDuration(e.target.value)}
                    placeholder="Enter estimated duration (e.g., 10 hours)"
                    className="w-full p-3 rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-10 flex justify-end gap-4">
                <button
                  onClick={handlePrevClick}
                  className="bg-gray-300 text-gray-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNextClick}
                  disabled={!isStep3Complete}
                  className={`bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${!isStep3Complete ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              {/* Overview - Step 4 */}
              <div className="flex flex-col gap-1 md:mr-50">
                <h2 className="text-[24px] font-bold text-[#191926] mb-4">{courseTitle || "Course Title Not Specified"}</h2>
                <p>Instructor: Ajala Seun</p>
                <p className="text-[16px] text-[#4B4B56]">
                    Estimated Duration: {estimatedDuration || "Not specified"}
                  </p>
                  <p className="text-[16px] text-[#4B4B56]">
                    Course level: {courseLevel || "Not specified"}
                  </p>
                  <p className="text-[16px] text-[#4B4B56]">
                    Course Category: {courseCategory || "Not specified"}
                  </p>
                <div>
                    <h2 className="text-[18px] font-bold">Course Overview: </h2>
                    <p className="text-[16px] text-[#4B4B56]">
                     {courseDescription || "Not specified"}
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                   <div>
                        <h2 className="text-[18px] font-bold">Modules: </h2>
                        <p className="text-[16px] text-[#4B4B56]">
                        {moduleNames.split(",").map((item) => item.trim()).join(", ") || "Not specified"}
                        </p>
                    </div>
                  
                  <div>
                    <h2 className="text-[18px] font-bold">What You’ll Learn:  </h2>
                    <p className="text-[16px] text-[#4B4B56]">
                     {whatYoullLearn.split(",").map((item) => item.trim()).join(", ") || "Not specified"}
                    </p>
                  </div>
                  
                  
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10 flex justify-end gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Submit →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCoursePage;