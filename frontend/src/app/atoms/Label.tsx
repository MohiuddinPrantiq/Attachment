import React from "react";

interface LabelProps {
  className?: string; // class styles
  text?: string;       // Text for the label
}

const Label: React.FC<LabelProps> = ({ className, text="" }) => {
  return (
    <label className={`${className || "block font-semibold mb-1 text-black"}`}>
      {text}
    </label>
  );
};

export default Label;
