import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, { onClick: () => setOpen(!open) });
        }
        if (child.type === DropdownMenuContent && open) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  onClick?: () => void;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children, onClick }) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: onClick as any });
  }
  return <button onClick={onClick}>{children}</button>;
};

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: 'start' | 'end';
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children, align = 'start' }) => {
  const alignmentClass = align === 'end' ? 'right-0' : 'left-0';
  return (
    <div className={`absolute z-50 mt-2 w-56 origin-top-${align} rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${alignmentClass}`}>
      <div className="py-1">{children}</div>
    </div>
  );
};

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      type="button"
      className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
      onClick={onClick as any}
    >
      {children}
    </button>
  );
};

export const DropdownMenuLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="px-4 py-2 text-xs text-gray-500 uppercase">{children}</div>
  );
};

export const DropdownMenuSeparator: React.FC = () => {
  return (
    <div className="my-1 h-px bg-gray-200" />
  );
};
