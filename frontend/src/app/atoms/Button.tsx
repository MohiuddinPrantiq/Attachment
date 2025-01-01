import React from "react";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  text="button",
  onClick = () => {},
  className = "w-full px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors font-semibold",
  type = "button",
}) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {text}
    </button>
  );
};

export default Button;
