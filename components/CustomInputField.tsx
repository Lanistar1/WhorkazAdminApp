"use client";

import { useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: IconType; // optional leading icon
  name?: string;
}

const CustomInputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  leftIcon: LeftIcon,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block font-semibold text-[18px] text-[#4B4B56] dark:text-[#4B4B56]">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Left icon if provided */}
        {LeftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            <LeftIcon size={18} />
          </span>
        )}

        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`h-12 w-full rounded-[12px] border border-zinc-200 bg-white px-4 pr-10 text-[15px] outline-none focus:border-[#3900DC] ${
            LeftIcon ? "pl-10" : ""
          } ${disabled ? "bg-zinc-100 cursor-not-allowed" : ""}`}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInputField;
