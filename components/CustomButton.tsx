import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;     // NEW: show spinner
  disabled?: boolean;      // NEW: disable button
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onClick,
  className = "",
  type = "submit",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}   // ← disable when loading or manually disabled
      className={`
        bg-[#3900DC] text-white font-semibold rounded-[32px] 
        w-[250px] h-[54px] px-5 flex items-center justify-center 
        transition-all duration-200
        ${isLoading || disabled 
          ? "opacity-60 cursor-not-allowed" 
          : "hover:opacity-90 cursor-pointer"
        }
        ${className}
      `}
    >
      {isLoading ? (
        <>
          {/* Simple & beautiful CSS spinner */}
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Creating...
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default CustomButton;
