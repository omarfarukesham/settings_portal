import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const CollapsibleSection = ({
  children,
  icon: Icon,
  title,
  open = true,
  isRequired = false,
  id,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div id={id}>
      {/* Title Area */}
      <div
        className='flex items-center gap-[10px] py-3 border-b border-gray-4 cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        {Icon && <Icon />}

        <div className='flex-1 text-base-1 font-bold flex items-center gap-3'>
          {title}
          {isRequired && (
            <span className='text-xs rounded-full bg-danger text-white px-2 py-1'>
              Required
            </span>
          )}
        </div>

        <ArrowDownIcon className={`transition ${isOpen ? '' : 'rotate-180'}`} />
      </div>

      {/* Content Area */}
      <div className={twMerge('py-6', !isOpen && 'sr-only', className)}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
