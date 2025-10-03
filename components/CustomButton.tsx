import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  className?: string; // optional extra styles if you want to override later
}

const CustomButton: React.FC<ButtonProps> = ({ title, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#3900DC] cursor-pointer text-white font-semibold rounded-[32px] w-[250px] h-[54px] px-5 flex items-center justify-center hover:opacity-90 transition ${className}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
