import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { twMerge } from 'tailwind-merge';

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  className,
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (setIsOpen) {
      document.addEventListener('keydown', handleKeyPress);

      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [setIsOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={twMerge(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow z-50 w-11/12 lg:w-2/3 xl:w-1/2',
          className,
        )}
      >
        {children}
        {setIsOpen && showCloseButton && (
          <button
            onClick={() => setIsOpen(false)}
            type='button'
            className='absolute top-3 right-3 w-6 h-6 grid justify-center text-center bg-white text-primary-300 rounded-xl border border-gray-6'
          >
            x
          </button>
        )}
      </div>
      <div className='fixed w-screen h-screen top-0 left-0 bg-black opacity-70 z-40'></div>
    </>,
    document.getElementById('modal-root'), // ID of the div in index.html
  );
};

export default Modal;
