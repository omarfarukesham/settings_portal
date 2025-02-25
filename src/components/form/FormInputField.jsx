import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

/**
 * FormInputField component.
 *
 * @component
 * @param {string} name - The name of the input field.
 * @param {object} validations - The validation rules of react-hook-form (optional).
 * @param {string} className - The additional class names for styling (optional).
 * @param {any} props... - Additional props to be spread on the input element.
 * @returns {JSX.Element} - The rendered FormInputField component.
 */
const FormInputField = ({ name, validations = {}, className, ...props }) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    return () => unregister(name);
  }, [name, unregister]);

  return (
    <input
      {...register(name, validations)}
      id={name}
      className={twMerge(
        'border border-gray-4 rounded p-2 h-9 w-full outline-none',
        className,
      )}
      {...props}
    />
  );
};

export default FormInputField;
