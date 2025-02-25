/**
 * A multi purpose (select, multi-select, searchable) dropdown component for forms.
 *
 * @author Fahim
 * @createdAt 2023-06-19
 */

import SearchIcon from '@/assets/icons/SearchIcon';
import useOutsideClick from '@/hooks/useClickOutside';
import useDropdownSelectedOptions from '@/hooks/useDropdownSelectedOptions';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DropdownArrowIcon from './DropdownArrowIcon';
import DropdownButton from './DropdownButton';
import DropdownLabel from './DropdownLabel';
import Options from './Options';
import SelectedOptions from './SelectedOptions';

/**
 * A multi purpose (select, multi-select, searchable) dropdown component for forms.
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.title='Select An Option'] - The title or placeholder text for the dropdown.
 * @param {string} props.label - The label for the dropdown.
 * @param {Array<Object>} props.options - (Required) The array of options for the dropdown.
 * @param {Object} props.defaultOption - The default option for the dropdown.
 * @param {string} [props.variant='outlined'] - The variant style of the dropdown.
 * @param {string} props.className - The CSS class for the dropdown component.
 * @param {string} props.arrowContainerClass - The CSS class for the arrow container of the dropdown.
 * @param {string} props.optionsClassName - The CSS class for the options container of the dropdown.
 * @param {string} props.optionClassName - The CSS class for individual options in the dropdown.
 * @param {string} props.name - (Required) The name or identifier for the dropdown.
 * @param {Function} props.onChange - The callback function invoked when the dropdown value changes.
 * @param {Function} props.onSelect - The callback function invoked when one option is selected.
 * @param {Function} props.onRemove - The callback function invoked when one option is removed.
 * @param {Object} props.validations - The validation rules or constraints for the dropdown value.
 * @param {boolean} [props.isMulti=false] - Specifies whether the dropdown allows multiple selections.
 * @param {boolean} [props.isSearchable=false] - Specifies whether the dropdown allows searching for options.
 * @returns {React.Component} The rendered dropdown component.
 */

const FormDropdown = ({
  placeholder = 'Select Option',
  label,
  options,
  defaultOptions = [],
  variant = 'outlined',
  className,
  labelClassName,
  arrowContainerClass,
  optionsClassName,
  optionClassName,
  name,
  onChange,
  onSelect,
  onRemove,
  validations,
  isMulti,
  isSearchable,
}) => {
  const {
    register,
    unregister,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    // unregister on unmount
    // example use case: changing attribute set will keep previous set's attributes if not unregistered
    // return () => unregister(name);
  }, [name, unregister]);

  const dropdownRef = useOutsideClick(() => {
    setIsOptionsOpen(false);
  });
  const inputRef = useRef(null);

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { selectedOptions, setSelectedOptions } = useDropdownSelectedOptions({
    isMulti,
    options,
    defaultOptions,
    name,
  });

  const handleDropdownClick = () => {
    setIsOptionsOpen(true);

    // focus the input on clicking anywhere on the dropdown
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOptionSelect = (clickedOption) => {
    let newOptions, newFormValue;

    const optionExists = selectedOptions.find(
      (option) => option.value === clickedOption.value,
    );

    if (optionExists) {
      // remove clicked option
      newOptions = selectedOptions.filter(
        (option) => option.value !== clickedOption.value,
      );

      if (isMulti) {
        newFormValue = newOptions.map((option) => option.value);
      }
    } else {
      if (isMulti) {
        // if doesn't exist then, push clicked option
        newOptions = [...selectedOptions, clickedOption];
        newFormValue = [
          ...selectedOptions.map((option) => option.value),
          clickedOption.value,
        ];
      } else {
        // if not multi select then, set the clicked option as selected
        newOptions = [clickedOption];
        newFormValue = clickedOption.value;
      }
    }
    setSelectedOptions(newOptions);
    setValue(name, newFormValue);

    if (onChange) {
      onChange(newOptions);
    }

    if (onSelect) {
      onSelect(clickedOption);
    }

    // close dropdown options if not a multi select
    if (!isMulti) {
      setIsOptionsOpen(false);

      // clear input text after selecting
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const removeOption = (option) => {
    const newOptions = selectedOptions.filter(
      (opt) => opt.value !== option.value,
    );
    const newFormValue = newOptions.map((option) => option.value);

    setSelectedOptions(newOptions);

    setValue(name, newFormValue.length ? newFormValue : undefined);

    if (onChange) {
      onChange(newOptions);
    }
    if (onRemove) {
      onRemove(option);
    }
  };

  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const onType = (e) => {
    //TODO: call API if needed
    const matchedOptions = options.filter((option) => {
      return new RegExp(e.target.value, 'i').test(option.label);
    });
    setFilteredOptions(matchedOptions);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    register(name, {
      ...validations,
      value: selectedOptions[0]?.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, register, validations]);

  if (!options) {
    return (
      <p className='text-danger'>
        You did not provide any option to show in this dropdown
      </p>
    );
  }

  return (
    <div className='dropdown relative' ref={dropdownRef}>
      <DropdownLabel
        label={label}
        name={name}
        required={validations?.required}
        className={labelClassName}
      />

      <DropdownButton
        variant={variant}
        className={className}
        handleDropdownClick={handleDropdownClick}
      >
        {isSearchable && <SearchIcon className='h-5 w-5 stroke-gray-6' />}
        <div className='flex-1 text-left flex gap-2 items-center'>
          <SelectedOptions
            selectedOptions={selectedOptions}
            inputRef={inputRef}
            removeOption={removeOption}
            placeholder={placeholder}
          />

          <div className='flex flex-1'>
            <input
              className='outline-none w-full bg-transparent cursor-pointer focus:cursor-auto pointer-events-none'
              onChange={onType}
              ref={inputRef}
              placeholder={selectedOptions.length === 0 ? placeholder : ''}
              disabled={!isSearchable}
              onKeyDown={handleEnterPress}
            />
          </div>
        </div>

        <DropdownArrowIcon
          isOpen={isOptionsOpen}
          arrowContainerClass={arrowContainerClass}
        />
      </DropdownButton>

      {isOptionsOpen && (
        <Options
          filteredOptions={filteredOptions}
          handleOptionSelect={handleOptionSelect}
          isMulti={isMulti}
          optionClassName={optionClassName}
          optionsClassName={optionsClassName}
          selectedOptions={selectedOptions}
        />
      )}

      {/* Errors */}
      {errors[name] && (
        <p className='text-label text-danger'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormDropdown;
