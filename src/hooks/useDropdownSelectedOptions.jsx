import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const useDropdownSelectedOptions = ({
  isMulti,
  options,
  name,
  defaultOptions,
}) => {
  const { getValues } = useFormContext();
  const formValue = getValues(name);

  const [selectedOptions, setSelectedOptions] = useState(
    defaultOptions?.length
      ? defaultOptions
      : formValue
      ? isMulti
        ? options.filter((option) => {
            return formValue.includes(option.value);
          })
        : options.filter((option) => option.value === formValue)
      : [],
  );

  return { selectedOptions, setSelectedOptions };
};

export default useDropdownSelectedOptions;
