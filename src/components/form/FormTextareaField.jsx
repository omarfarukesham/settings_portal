import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

/**
 * FormTextareaField component.
 *
 * @component
 * @param {string} name - The name of the input field.
 * @param {object} validations - The validation rules of react-hook-form (optional).
 * @param {string} className - The additional class names for styling (optional).
 * @param {any} props... - Additional props to be spread on the input element.
 * @returns {JSX.Element} - The rendered FormTextareaField component.
 */
const FormTextareaField = ({ name, validations = {}, className, ...props }) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    return () => unregister(name);
  }, [name, unregister]);

  return (
    <textarea
      {...register(name, validations)}
      id={name}
      className={twMerge(
        'border border-gray-4 rounded px-2 py-1 w-full',
        className,
      )}
      rows='5'
      {...props}
    ></textarea>
  );
};

export default FormTextareaField;
