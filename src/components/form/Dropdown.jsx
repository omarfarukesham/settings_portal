import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import useOutsideClick from '@/hooks/useClickOutside';
import useFindPosition from '@/hooks/useFindPosition';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Dropdown component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the dropdown.
 * @param {Array<Object>} props.options - An array of options for the dropdown.
 * @param {Object} props.defaultOption - The default selected option.
 * @param {string} [props.variant='default'] - The variant in dropdown design
 * @param {string} props.className - Additional CSS class for the dropdown button.
 * @param {string} props.arrowContainerClass - Additional CSS class for the dropdown button's arrow container div.
 * @param {string} props.optionsClassName - Additional CSS class for the dropdown options list.
 * @param {string} props.optionClassName - Additional CSS class for each dropdown option.
 * @param {Function} props.onChange - The function called when an option is selected.
 * @returns {React.Component} The rendered Dropdown component.
 */
const Dropdown = ({
  title,
  options,
  defaultOption,
  variant = 'default',
  className,
  arrowContainerClass,
  optionsClassName,
  optionClassName,

  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(defaultOption || null);
  const closeOptions = () => setIsOpen(false);

  // Ref for detecting clicks outside the dropdown
  const dropdownRef = useOutsideClick(closeOptions);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (onChange) onChange(selectedOption);
    setIsOpen(false);
  };

  // Update the change from parent component
  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  // Change to dynamic position for options
  const { bottom, right } = useFindPosition(dropdownRef);

  return (
    <div className='dropdown relative' ref={dropdownRef}>
      <button
        type='button'
        className={twMerge(
          'flex items-center text-[14px] leading-none rounded overflow-hidden h-[28px]',
          variant === 'default' && 'bg-white ',
          variant === 'outlined' && 'h-[26px] border border-gray-4 ',
          className,
        )}
        onClick={toggleDropdown}
      >
        <div className='px-2 flex-1 text-left'>
          {selectedOption ? selectedOption.label : title}
        </div>

        <div
          className={twMerge(
            'px-2 h-full flex items-center justify-center pointer-events-none',
            arrowContainerClass,
          )}
        >
          <ArrowDownIcon className={isOpen ? 'rotate-180' : ''} />
        </div>
      </button>

      {/* Options */}
      {isOpen && (
        <ul
          className={twMerge(
            'absolute z-20 bg-white mt-2 rounded shadow min-w-[10rem] overflow-hidden',
            bottom && 'bottom-8',
            right && 'right-0',
            optionsClassName,
          )}
        >
          {options.map((option) => (
            <li
              key={option.label}
              className={twMerge(
                'cursor-pointer hover:bg-bg-color p-2 text-label',
                optionClassName,
              )}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
