import React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`inline-flex items-center justify-center overflow-hidden rounded-full ${className}`} {...props}>
      {children}
    </div>
  );
};

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage: React.FC<AvatarImageProps> = (props) => {
  return (
    <img className="h-full w-full rounded-full object-cover" {...props} />
  );
};

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children, ...props }) => {
  return (
    <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-600" {...props}>
      {children}
    </span>
  );
};
