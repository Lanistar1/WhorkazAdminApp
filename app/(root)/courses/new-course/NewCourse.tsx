/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Header from "@/components/Header";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { uploadSingleFile } from "@/app/actions/api";
import {
  useCreatePhysicalCourse,
  useCreateOnlineCourse,
} from "@/app/actions/reactQuery";
// import Image from "next/image";


type ClassMode = "physical" | "online" | null;

const NewCoursePage = () => {
  const router = useRouter();

  // Mode selection
  const [selectedMode, setSelectedMode] = useState<ClassMode>(null);
  const [confirmedMode, setConfirmedMode] = useState<ClassMode>(null);

  // Steps
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = ((step / totalSteps) * 100).toFixed(0) + "%";

  // Common fields
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseFile, setCourseFile] = useState<File | null>(null);
  const [courseImagePreview, setCourseImagePreview] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState("");
  const [whatYoullLearn, setWhatYoullLearn] = useState("");

  // Physical-only
  const [location, setLocation] = useState("");
  const [courseLocation, setCourseLocation] = useState("");
  const [locationDescription, setLocationDescription] = useState("");

  // Online-only
  const [courseLink, setCourseLink] = useState("");
  const [coursePlatform, setCoursePlatform] = useState("");

  // Upload state
  const [isUploading, setIsUploading] = useState(false);

  // Mutations
  const physicalMutation = useCreatePhysicalCourse();
  const onlineMutation = useCreateOnlineCourse();

  const isSubmitting = physicalMutation.isPending || onlineMutation.isPending || isUploading;

  // Image handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setCourseFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCourseImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setCourseFile(null);
      setCourseImagePreview("");
    }
  };

  const handlePrevClick = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setConfirmedMode(null);
      setSelectedMode(null);
    }
  };

  const handleNextClick = () => {
    if (step === 1 && courseTitle && courseCategory && courseLevel && coursePrice && courseDuration) {
      setStep(2);
    } else if (step === 2 && courseFile && (confirmedMode === "online" || location)) {
      setStep(3);
    } else if (step === 3) {
      const physicalValid = confirmedMode === "physical" && courseDescription && whatYoullLearn && courseLocation && locationDescription;
      const onlineValid = confirmedMode === "online" && courseDescription && whatYoullLearn && courseLink && coursePlatform;
      if (physicalValid || onlineValid) {
        setStep(4);
      }
    }
  };

  const handleSubmit = async () => {
    if (!courseFile) {
      toast.error("Please upload a course image");
      return;
    }

    setIsUploading(true);
    let imageUrl = "";

    try {
      imageUrl = await uploadSingleFile(courseFile);
    } catch {
      toast.error("Failed to upload image");
      setIsUploading(false);
      return;
    }

    setIsUploading(false);

    const baseData = {
      title: courseTitle,
      category: courseCategory,
      level: courseLevel as "beginner" | "intermediate" | "advanced",
      price: Number(coursePrice),
      estimatedDuration: courseDuration,
      image: imageUrl,
      description: courseDescription,
      whatYouWillLearn: whatYoullLearn,
      overview: courseDescription,
    };

    if (confirmedMode === "physical") {
      physicalMutation.mutate(
        {
          ...baseData,
          classType: "physical",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          classPlace: courseLocation,
          locationDescription: `${location} - ${locationDescription}`,
        },
        {
          onSuccess: () => {
            toast.success("Physical course created successfully!");
            router.push("/dashboard");
          },
          onError: (err: any) => toast.error(err?.response?.data?.message || "Failed to create course"),
        }
      );
    } else {
      onlineMutation.mutate(
        {
          ...baseData,
          classType: "online",
          startDate: new Date().toISOString(),
          endDate: undefined,
          courseLink,
          coursePlatform,
          courseContent: ""
        },
        {
          onSuccess: () => {
            toast.success("Online course created successfully!");
            router.push("/dashboard");
          },
          onError: (err: any) => toast.error(err?.response?.data?.message || "Failed to create course"),
        }
      );
    }
  };

  // =============== MODE SELECTION ===============
  if (!confirmedMode) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFFDFA]">
        <Header title="Courses" />

        <div className="mt-10 md:p-8 md:mx-20 mx-10 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#191926] text-center mb-3">
            Tell us where your classes will be taking place
          </h1>
          <p className="text-sm md:text-base text-[#95959F] text-center mb-10">
            This is to help us tailor your experience better
          </p>

          <div className="w-full max-w-md space-y-4">
            <label
              onClick={() => setSelectedMode("physical")}
              className={`flex items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all ${
                selectedMode === "physical"
                  ? "border-[#3900DC] bg-[#F9F9FB]"
                  : "border-[#E5E5E9] hover:bg-[#F9F9FB]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/physicalclass.png"
                  alt="Physical class"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-lg font-medium text-[#191926]">Physical class</span>
              </div>
              {selectedMode === "physical" && (
                <div className="w-6 h-6 rounded-full border-2 border-[#3900DC] bg-[#3900DC] p-1">
                  <svg className="w-full h-full text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                    <path d="M4.5 8.5l2.5 2.5 5-5" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </label>

            <label
              onClick={() => setSelectedMode("online")}
              className={`flex items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all ${
                selectedMode === "online"
                  ? "border-[#3900DC] bg-[#F9F9FB]"
                  : "border-[#E5E5E9] hover:bg-[#F9F9FB]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/onlineclass.png"
                  alt="Online class"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-lg font-medium text-[#191926]">Online class</span>
              </div>
              {selectedMode === "online" && (
                <div className="w-6 h-6 rounded-full border-2 border-[#3900DC] bg-[#3900DC] p-1">
                  <svg className="w-full h-full text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                    <path d="M4.5 8.5l2.5 2.5 5-5" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </label>
          </div>

          <button
            onClick={() => setConfirmedMode(selectedMode)}
            disabled={!selectedMode}
            className={`mt-12 max-w-xs px-8 py-3 rounded-full font-medium transition-all ${
              selectedMode
                ? "bg-[#3900DC] text-white hover:bg-[#2E00B8]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // =============== ONLINE COURSE FORM (Separate block) ===============
  if (confirmedMode === "online") {
    return (
      <div className="flex flex-col max-w-[450px] lg:max-w-full min-h-screen bg-[#FFFDFA]">
        <Header title="Courses" />

        <div className="flex flex-row gap-6 w-full rounded-2xl">
          <div className="mt-10 w-full md:p-8 md:mx-20 mx-10">
            <h3 className="text-[18px] md:text-[22px] font-semibold text-[#191926] mb-5">
              {step === 4 ? "Course Overview" : "Course Information"}
            </h3>

            <div className="flex h-2 bg-[#F1F1F5] rounded-full overflow-hidden mb-8">
              <div className="h-full bg-[#3900DC] transition-all duration-500" style={{ width: progress }} />
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                      Course Title
                    </label>
                    <input
                      type="text"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="Enter course title"
                      className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                    />
                  </div>

                  <div>
                    <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                      Course Category
                    </label>
                    <select
                      value={courseCategory}
                      onChange={(e) => setCourseCategory(e.target.value)}
                      className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] appearance-none"
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="electrical">Electrical</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="carpentry">Carpentry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                      Course Level
                    </label>
                    <select
                      value={courseLevel}
                      onChange={(e) => setCourseLevel(e.target.value)}
                      className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] appearance-none"
                    >
                      <option value="" disabled>Select Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                      Price
                    </label>
                    <input
                      type="number"
                      value={coursePrice}
                      onChange={(e) => setCoursePrice(e.target.value)}
                      placeholder="e.g. 50000"
                      className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                    />
                  </div>

                  <div>
                    <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                      Estimated Duration
                    </label>
                    <select
                      value={courseDuration}
                      onChange={(e) => setCourseDuration(e.target.value)}
                      className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] appearance-none"
                    >
                      <option value="" disabled>Select Duration</option>
                      <option value="6 weeks">6 weeks</option>
                      <option value="1 month">1 month</option>
                      <option value="2 months">2 months</option>
                      <option value="3 months">3 months</option>
                    </select>
                  </div>
                </div>

                <div className="mt-10 flex justify-end gap-4">
                  <button
                    onClick={handlePrevClick}
                    className="bg-gray-300 text-gray-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handleNextClick}
                    disabled={!courseTitle || !courseCategory || !courseLevel || !coursePrice || !courseDuration}
                    className={`bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${!courseTitle || !courseCategory || !courseLevel || !coursePrice || !courseDuration ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Next →
                  </button>
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                      Upload related image
                    </label>
                    <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#E5E5E9] rounded-lg bg-white cursor-pointer hover:bg-[#F9F9FB]">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="courseFileOnline"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="courseFileOnline" className="flex flex-col items-center">
                        {courseImagePreview ? (
                          // <img src={courseImagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                          <Image
                            src={courseImagePreview}
                            alt="preview"
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ) : (
                          <>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F1F1F5] text-[#3900DC] mb-2">
                              +
                            </div>
                            <p className="text-[14px] font-medium text-[#4B4B56] mb-1">Browse existing media</p>
                            <p className="text-[12px] font-medium text-[#A1A1A8]">Add an image (png, jpg, gif) or video (mp4)</p>
                            <p className="text-[8px] font-medium text-[#A1A1A8] mt-5">Recommended: 1600 x 1200 (max 2000mb)</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-end gap-4">
                  <button
                    onClick={handlePrevClick}
                    className="bg-gray-300 text-gray-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handleNextClick}
                    disabled={!courseFile}
                    className={`bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${!courseFile ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Next →
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                      Course Description
                    </label>
                    <textarea
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      placeholder="Enter course description"
                      className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] h-32 resize-none"
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
                      className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] h-32 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                      Course Link
                    </label>
                    <input
                      type="url"
                      value={courseLink}
                      onChange={(e) => setCourseLink(e.target.value)}
                      placeholder="https://zoom.us/j/..."
                      className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                    />
                  </div>

                  <div>
                    <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                      Course Platform
                    </label>
                    <select
                      value={coursePlatform}
                      onChange={(e) => setCoursePlatform(e.target.value)}
                      className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] appearance-none"
                    >
                      <option value="" disabled>Select Platform</option>
                      <option value="Zoom">Zoom</option>
                      <option value="Google Meet">Google Meet</option>
                      <option value="Microsoft Teams">Microsoft Teams</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-10 flex justify-end gap-4">
                  <button
                    onClick={handlePrevClick}
                    className="bg-gray-300 text-gray-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handleNextClick}
                    disabled={!courseDescription || !whatYoullLearn || !courseLink || !coursePlatform}
                    className={`bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${!courseDescription || !whatYoullLearn || !courseLink || !coursePlatform ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Next →
                  </button>
                </div>
              </>
            )}

            {/* STEP 4: OVERVIEW */}
            {step === 4 && (
              <>
                <div className="flex flex-col gap-4">
                  <h2 className="text-[24px] font-bold text-[#191926] mb-4">
                    {courseTitle || "Course Title Not Specified"}
                  </h2>
                  <p className="text-[16px] text-[#4B4B56]">Instructor: Ajala Seun</p>
                  <p className="text-[16px] text-[#4B4B56]">
                    Estimated Duration: {courseDuration || "Not specified"}
                  </p>
                  <p className="text-[16px] text-[#4B4B56]">
                    Course level: {courseLevel || "Not specified"}
                  </p>
                  <p className="text-[16px] text-[#4B4B56]">
                    Course Category: {courseCategory || "Not specified"}
                  </p>

                  <div>
                    <h2 className="text-[18px] font-bold">Course Overview:</h2>
                    <p className="text-[16px] text-[#4B4B56]">
                      {courseDescription || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-[18px] font-bold">Platform & Link:</h2>
                    <p className="text-[16px] text-[#4B4B56]">
                      {coursePlatform || "Not specified"} - {courseLink || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-[18px] font-bold">What You’ll Learn:</h2>
                    <p className="text-[16px] text-[#4B4B56]">
                      {whatYoullLearn.split("\n").filter(Boolean).map(line => line.trim()).join(" • ") || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#3900DC] text-white flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium disabled:opacity-70"
                  >
                    {isSubmitting ? "Creating..." : "Submit →"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =============== PHYSICAL COURSE FORM (Your exact original structure) ===============
  return (
    <div className="flex flex-col max-w-[450px] lg:max-w-full min-h-screen bg-[#FFFDFA]">
      <Header title="Courses" />

      <div className="flex flex-row gap-6 w-full rounded-2xl">
        <div className="mt-10 w-full md:p-8 md:mx-20 mx-10">
          <h3 className="text-[18px] md:text-[22px] font-semibold text-[#191926] mb-5">
            {step === 4 ? "Course Overview" : "Course Information"}
          </h3>

          <div className="flex h-2 bg-[#F1F1F5] rounded-full overflow-hidden mb-8">
            <div className="h-full bg-[#3900DC] transition-all duration-500" style={{ width: progress }} />
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="Enter course title"
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Course Category
                  </label>
                  <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] appearance-none"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="carpentry">Carpentry</option>
                  </select>
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Course Level
                  </label>
                  <select
                    value={courseLevel}
                    onChange={(e) => setCourseLevel(e.target.value)}
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] appearance-none"
                  >
                    <option value="" disabled>Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Price
                  </label>
                  <input
                    type="number"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Estimated Duration
                  </label>
                  <select
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] appearance-none"
                  >
                    <option value="" disabled>Select Duration</option>
                    <option value="1 month">1 month</option>
                    <option value="2 months">2 months</option>
                    <option value="3 months">3 months</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 flex justify-end gap-4">
                <button
                  onClick={handlePrevClick}
                  className="bg-gray-300 text-gray-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNextClick}
                  disabled={!courseTitle || !courseCategory || !courseLevel || !coursePrice || !courseDuration}
                  className={`bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${!courseTitle || !courseCategory || !courseLevel || !coursePrice || !courseDuration ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Specify Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Upload related image
                  </label>
                  <div className="border-2 border-dashed border-[#E5E5E9] rounded-lg p-6 text-center cursor-pointer hover:bg-[#F9F9FB] transition">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="courseFilePhysical"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="courseFilePhysical" className="flex flex-col items-center">
                      {courseImagePreview ? (
                        // <img src={courseImagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        <Image
                          src={courseImagePreview}
                          alt="preview"
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F1F1F5] text-[#3900DC] mb-2">
                            +
                          </div>
                          <p className="text-[14px] font-medium text-[#4B4B56] mb-1">Browse existing media</p>
                          <p className="text-[12px] font-medium text-[#A1A1A8]">Add an image (png, jpg, gif) or video (mp4)</p>
                          <p className="text-[8px] font-medium text-[#A1A1A8] mt-5">Recommended: 1600 x 1200 (max 2000mb)</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end gap-4">
                <button
                  onClick={handlePrevClick}
                  className="bg-gray-300 text-gray-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNextClick}
                  disabled={!location || !courseFile}
                  className={`bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${!location || !courseFile ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Course Description
                  </label>
                  <textarea
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    placeholder="Enter course description"
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] h-32 resize-none"
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
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] h-32 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Where would the classes be taking place?
                  </label>
                  <input
                    type="text"
                    value={courseLocation}
                    onChange={(e) => setCourseLocation(e.target.value)}
                    placeholder="Enter course location"
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC]"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-semibold text-[#4B4B56] mb-2 block">
                    Describe the course location with easy to get details
                  </label>
                  <textarea
                    value={locationDescription}
                    onChange={(e) => setLocationDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full p-3 text-[#4B4B56] rounded-lg border border-[#E5E5E9] bg-white focus:outline-none focus:border-[#3900DC] h-32 resize-none"
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-end gap-4">
                <button
                  onClick={handlePrevClick}
                  className="bg-gray-300 text-gray-800 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNextClick}
                  disabled={!courseDescription || !whatYoullLearn || !courseLocation || !locationDescription}
                  className={`bg-[#3900DC] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${!courseDescription || !whatYoullLearn || !courseLocation || !locationDescription ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* STEP 4: OVERVIEW */}
          {step === 4 && (
            <>
              <div className="flex flex-col gap-4">
                <h2 className="text-[24px] font-bold text-[#191926] mb-4">
                  {courseTitle || "Course Title Not Specified"}
                </h2>
                <p className="text-[16px] text-[#4B4B56]">Instructor: Ajala Seun</p>
                <p className="text-[16px] text-[#4B4B56]">
                  Estimated Duration: {courseDuration || "Not specified"}
                </p>
                <p className="text-[16px] text-[#4B4B56]">
                  Course level: {courseLevel || "Not specified"}
                </p>
                <p className="text-[16px] text-[#4B4B56]">
                  Course Category: {courseCategory || "Not specified"}
                </p>

                <div>
                  <h2 className="text-[18px] font-bold">Course Overview:</h2>
                  <p className="text-[16px] text-[#4B4B56]">
                    {courseDescription || "Not specified"}
                  </p>
                </div>

                <div>
                  <h2 className="text-[18px] font-bold">Location:</h2>
                  <p className="text-[16px] text-[#4B4B56]">
                    {location || "Not specified"}
                  </p>
                </div>

                <div>
                  <h2 className="text-[18px] font-bold">What You’ll Learn:</h2>
                  <p className="text-[16px] text-[#4B4B56]">
                    {whatYoullLearn.split(",").map((s) => s.trim()).join(" • ") || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#3900DC] text-white flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium disabled:opacity-70"
                >
                  {isSubmitting ? "Creating..." : "Submit →"}
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