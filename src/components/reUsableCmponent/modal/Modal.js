import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isVisible, onClose, children, modalHeader }) => {
  if (!isVisible) return null;
  const modalContent = (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        style={{ zIndex: 9999 }}
        onClick={onClose}
      />
      
      <div
        className="fixed left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[90%] max-w-md"
        style={{ zIndex: 10000 }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            {modalHeader}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none" 
              viewBox="0 0 "
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default Modal;