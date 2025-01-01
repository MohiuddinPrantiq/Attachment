import React from "react";

interface SelectProps {
  name?: string; 
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; 
  placeholder?: string; 
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  name = "",
  value = "",
  onChange = () => {},
  options = [],
  placeholder = "Select an option", // Default placeholder text
  className = "w-full px-4 py-3.5 bg-white rounded-lg shadow-md border border-gray-200 text-black focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none",
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={className}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option} className="text-black">
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
