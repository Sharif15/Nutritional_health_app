import { useState, ReactNode, MouseEventHandler } from "react";

interface DialogProps {
  triggerText: string;
  children: ReactNode;
}

export function Dialog({ triggerText, children }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded">
        {triggerText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            {children}
            <button onClick={handleClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
