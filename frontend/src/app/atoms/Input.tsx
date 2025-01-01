import React from "react";

interface InputProps {
  type?: string; 
  name?: string; 
  placeholder?: string; 
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text", // Default to "text"
  name = "",
  placeholder = "",
  value = "",
  onChange = () => {},
  className = "",
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default Input;
