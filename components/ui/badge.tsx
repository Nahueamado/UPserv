import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold';
  const variantStyles = {
    default: 'bg-blue-600 text-white',
    outline: 'border border-gray-300 text-gray-700',
    secondary: 'bg-gray-200 text-gray-800',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
