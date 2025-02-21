import React, { createContext, useContext, useCallback, useEffect, ReactNode, MouseEvent } from 'react';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface DialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DialogTriggerProps {
  children: React.ReactElement<{ onClick?: (e: MouseEvent) => void }>;
  asChild?: boolean;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

interface DialogComponentProps {
  children: ReactNode;
  className?: string;
}

// Create context with default values
const DialogContext = createContext<DialogContextType>({
  isOpen: false,
  setIsOpen: () => undefined
});

export const Dialog = ({ children, open = false, onOpenChange }: DialogProps) => {
  return (
    <DialogContext.Provider value={{ isOpen: open, setIsOpen: onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogTrigger = ({ children, asChild = false }: DialogTriggerProps) => {
  const { setIsOpen } = useContext(DialogContext);
  
  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e: MouseEvent) => {
        if (children.props.onClick) {
          children.props.onClick(e);
        }
        setIsOpen(true);
      }
    });
  }

  return (
    <button type="button" onClick={() => setIsOpen(true)}>
      {children}
    </button>
  );
};

export const DialogContent = ({ children, className = '' }: DialogContentProps) => {
  const { isOpen, setIsOpen } = useContext(DialogContext);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div 
        className={`relative bg-gray-800 w-full max-w-md mx-4 p-6 rounded-xl shadow-lg ${className}`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ className = '', children }: DialogComponentProps) => {
  return (
    <div className={`mb-4 text-center ${className}`}>
      {children}
    </div>
  );
};

export const DialogFooter = ({ className = '', children }: DialogComponentProps) => {
  return (
    <div className={`mt-6 flex justify-center gap-3 ${className}`}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ className = '', children }: DialogComponentProps) => {
  return (
    <h2 className={`text-xl font-semibold text-white tracking-tight ${className}`}>
      {children}
    </h2>
  );
};

export const DialogDescription = ({ className = '', children }: DialogComponentProps) => {
  return (
    <p className={`mt-2 text-base text-gray-400 ${className}`}>
      {children}
    </p>
  );
};