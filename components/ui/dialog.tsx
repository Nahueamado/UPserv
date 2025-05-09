import React from 'react';

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    open ? (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => onOpenChange(false)}
      >
        <div className="bg-white rounded-md shadow-lg" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    ) : null
  );
};

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="p-6" {...props}>
      {children}
    </div>
  );
};

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="mb-4" {...props}>
      {children}
    </div>
  );
};

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => {
  return (
    <h2 className="text-lg font-semibold" {...props}>
      {children}
    </h2>
  );
};

export const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, ...props }) => {
  return (
    <p className="text-sm text-gray-600" {...props}>
      {children}
    </p>
  );
};

export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="mt-4 flex justify-end space-x-2" {...props}>
      {children}
    </div>
  );
};
