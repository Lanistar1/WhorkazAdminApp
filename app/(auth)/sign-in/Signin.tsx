"use client";

import Image from "next/image";
import { useState } from "react";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useSigninAccount } from "@/app/actions/reactQuery";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-toastify";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync: loginUser, isPending } = useSigninAccount();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      // Success — save user + token
      login(response.data.user, response.data.token);
      // Redirect happens inside AuthContext login()
    } catch (error) {
      // Error already shown via onError in useSigninAccount
    }
  };


  return (
    <>
      {/* <ThemeMode /> */}
      <div className="flex flex-row items-center justify-center lg:flex-row h-screen">

        {/* Right Section - Signup Form */}
        <div className="w-full max-w-[450px] lg:max-w-full lg:w-1/2 flex  lg:p-8 bg-[#FFFDFA]  transition-colors duration-300 mt-0 md:mt-5">            
          <div className="w-full mx-6 my-12 p-0 md:p-8 rounded-2xl bg-white  ">
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
            <h2 className="text-[20px] ml-10 md:ml-0 md:text-[28px] font-semibold text-[#191926] dark:text-[[#191926]] mb-4 md:mb-0 md:my-4 ">
              Sign in to find trusted experts
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <CustomInputField
                label="Email address"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <CustomInputField
                label="Password"
                type="password"
                name="password"
                placeholder="Password should be 8 or more characters long"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Link href="/dashboard">
               <div className="flex justify-start items-center cursor-pointer mt-6 ml-15 md:ml-0">
                 <CustomButton
                  title={isPending ? "Signing in..." : "Continue with Whorkaz"}
                  isLoading={isPending}
                  disabled={isPending}
                />
              </div>
              </Link>
             
              {/* <button
                type="submit"
                className="w-full bg-[#3900DC] dark:bg-[#4A00F4] text-white py-3 rounded-lg hover:bg-[#4A00F4] dark:hover:bg-[#3900DC] transition-colors font-semibold"
              >
                Create account
              </button> */}
            </form>

            {/* Login Link */}
            <div className="flex justify-start items-center mb-3 mt-2 gap-2 ml-20 md:ml-0">
              <p className=" text-start text-sm text-gray-600 dark:text-gray-400">Don’t have an account?</p>
              <Link href="/sign-up">
                <p className=" cursor-pointer text-[#3900DC] dark:text-[#4A00F4] hover:underline font-semibold">Sign up</p> 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
