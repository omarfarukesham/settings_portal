import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import { twMerge } from 'tailwind-merge';

const DropdownArrowIcon = ({ isOpen, arrowContainerClass }) => {
  return (
    <div
      className={twMerge(
        'h-full flex items-center justify-center pointer-events-none',
        arrowContainerClass,
      )}
    >
      <ArrowDownIcon className={isOpen ? 'rotate-180' : ''} />
    </div>
  );
};

export default DropdownArrowIcon;
