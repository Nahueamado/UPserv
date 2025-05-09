import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ className = '', ...props }) => {
  return (
    <label
      className={`mb-2 block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    />
  );
};
