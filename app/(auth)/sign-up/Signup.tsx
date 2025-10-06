"use client";

import Image from "next/image";
import { useState } from "react";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");


  return (
    <>
      {/* <ThemeMode /> */}
      <div className="flex items-center justify-center  lg:flex-row h-screen">

        {/* Right Section - Signup Form */}
        <div className="w-full max-w-[450px] lg:max-w-full lg:w-1/2 flex  lg:p-8 bg-[#FFFDFA]  transition-colors duration-300 mt-5">
            
          <div className="w-full mx-6 my-12 lg:p-8 rounded-2xl bg-white">
            {/* Logo */}
            <div className="flex -mb-3 ml-20 md:-ml-2">
              <Image
                src="/assets/icons/AppLogo.png"
                alt="Whorkaz Logo"
                width={150}
                height={34}
                className="object-contain"
              />
            </div>
            <h2 className="text-[20px] ml-10 md:ml-0 md:text-[28px] font-semibold text-[#191926] dark:text-[[#191926]] mb-4 md:my-4">
              Sign up to find trusted experts
            </h2>

            {/* Social Login Buttons */}
            <div className="flex flex-col ml-15 md:ml-0 w-[250px] md:w-[450px] sm:flex-row gap-3 mb-6 mt-2">
              <button className="cursor-pointer flex-1 flex items-center text-[14px] font-semibold justify-center gap-2 bg-white dark:bg-white text-[#4B4B56] dark:text-[#4B4B56] border border-gray-100 dark:border-gray-700 rounded-[32px] py-3 transition-colors">
                <Image
                  src="/assets/icons/apple-icon.png"
                  alt="Apple"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                Continue with Apple
              </button>
              <button className="cursor-pointer w-full flex-1 flex items-center text-[14px] font-semibold justify-center gap-2 bg-[#2167FF] dark:bg-[#2167FF] text-[#4B4B56] dark:text-white border border-gray-300 dark:border-gray-700 rounded-[32px] py-3  transition-colors">
                <Image
                  src="/assets/icons/google-icon.png"
                  alt="Google"
                  width={26}
                  height={26}
                  className="object-contain"
                />
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#C7C7CF] dark:border-[#C7C7CF]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-[16px] bg-[#FFFDFA]  text-gray-500 dark:text-gray-400">
                  or
                </span>
              </div>
            </div>

            {/* Email and Password Fields */}
            <form className="space-y-4">
              <CustomInputField
                label="Email address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <CustomInputField
                label="Password"
                type="password"
                placeholder="Password should be 8 or more characters long"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <CustomInputField
                label="Re-write Password"
                type="password"
                placeholder="Password should be 8 or more characters long"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="flex items-center">
                <input
                  type="radio"
                  id="terms"
                  className="h-4 w-4 text-[#3900DC] dark:text-[#4A00F4] border-gray-300 dark:border-gray-700 rounded focus:ring-[#3900DC] dark:focus:ring-[#4A00F4] transition-colors"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-[14px] font-medium text-[#4B4B56] dark:text-[#4B4B56]"
                >
                  Yes, I understand and I agree to the Workaz 
                  <span className="font-semibold text-[#2E00B0] cursor-pointer"> Terms & Conditions
                  and Privacy Policy</span>
                </label>
              </div>
              <Link href="">
                <div className="flex justify-start items-center cursor-pointer ml-15 md:ml-0">
                  <CustomButton title="Create account" />
                </div>
              </Link>
            </form>

            {/* Login Link */}
            <div className="flex justify-start items-center mb-3 mt-2 gap-2 ml-20 md:ml-0">
              <p className=" text-start text-sm text-gray-600 dark:text-gray-400">Already have an account?</p>
              <Link href="/sign-in">
                <p className=" cursor-pointer text-[#3900DC] dark:text-[#4A00F4] hover:underline font-semibold">Login</p> 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;



