import { useState, ReactNode, MouseEventHandler, MouseEvent} from "react";

interface DialogProps {
  triggerText: string;
  children: ReactNode;
}

export function Dialog({ triggerText, children }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose /* : MouseEventHandler<HTMLButtonElement> */ = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    // Close only if the user clicks on the overlay, not inside the modal
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded">
        {triggerText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={handleClose}>
          <div className="relative bg-white p-6 rounded shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
                X
            </button>
            {children}
            {/* <button onClick={handleClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
