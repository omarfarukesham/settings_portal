import { twMerge } from 'tailwind-merge';
import InputField from './InputField';

/**
 * Reusable input field. All html attribute can be use by default.
 * @param {string} label - If label is passed, it will show a label on top of input field.
 * @param {string} error - If error is passed, it will show a danger text at the bottom of input field.
 *
 */
const Input = ({ name, label, error, className, ...rest }) => {
  return (
    <div className='grid gap-1'>
      {label && (
        <label htmlFor={name} className='text-base'>
          {label}
        </label>
      )}
      <InputField
        name={name}
        {...rest}
        className={twMerge(
          'border border-gray-4 rounded-md px-2 py-1 h-9 w-full outline-none',
          className,
        )}
      />
      {error && <div className='text-danger text-xs'>{error}</div>}
    </div>
  );
};

export default Input;
