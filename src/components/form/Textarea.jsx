import { twMerge } from 'tailwind-merge';

const Textarea = ({ name, label, error, className, ...rest }) => {
  return (
    <div className='grid gap-1'>
      {label && (
        <label htmlFor={name} className='text-base'>
          {label}
        </label>
      )}
      <textarea
        id={name}
        className={twMerge(
          'border border-gray-4 rounded-md px-2 py-1 w-full',
          className,
        )}
        rows='5'
        {...rest}
      ></textarea>
      {error && <div className='text-danger text-xs'>{error}</div>}
    </div>
  );
};

export default Textarea;
