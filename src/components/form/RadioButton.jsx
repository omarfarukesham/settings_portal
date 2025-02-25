import { twMerge } from 'tailwind-merge';

const RadioButton = ({
  name,
  label,
  value,
  checked,
  className,
  variant,
  ...props
}) => {
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
        name={name}
        value={value}
        checked={checked}
        id={value.toString()}
        className='appearance-none w-[18px] h-[18px] rounded-[50%] mr-2 checked:bg-success  border border-gray-5 focus:ring-1'
        {...props}
      />
      {label}
    </label>
  );
};

export default RadioButton;
