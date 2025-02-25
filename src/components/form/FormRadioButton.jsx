import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

const FormRadioButton = ({
  label,
  name,
  value,
  checked,
  validations,
  className,
  variant,
  ...props
}) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    return () => unregister(name);
  }, [name, unregister]);

  return (
    <label
      className={twMerge(
        'radio-button flex items-center text-dark',
        variant === 'boxed' &&
          'bg-white border border-gray-4 rounded-md p-[10px]',
        className,
      )}
      htmlFor={value.toString()}
    >
      <input
        type='radio'
        {...register(name, validations)}
        id={value.toString()}
        value={value}
        checked={checked}
        className='appearance-none w-[18px] h-[18px] rounded-[50%] mr-2 checked:bg-success  border border-gray-5 focus:ring-1'
        {...props}
      />
      {label}
    </label>
  );
};

export default FormRadioButton;
