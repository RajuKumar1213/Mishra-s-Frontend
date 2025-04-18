import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  padding = "py-3 px-6",
  bgColor = "bg-[#FF6F00]",
  textColor = "text-white",
  hoverBgColor = "hover:bg-[#e65c00]",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out ${padding} ${bgColor} ${textColor} ${hoverBgColor} ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
