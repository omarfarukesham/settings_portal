import { twMerge } from 'tailwind-merge';

const Checkbox = ({ label, id = label, ...rest }) => {
  return (
    <div className='flex items-center'>
      <input
        checked
        id={id}
        type='checkbox'
        value=''
        className={twMerge(
          'w-4 h-4 bg-gray-1 border-gray-3 rounded-full focus:ring-2 focus:ring-offset-2',
          `focus:ring-gray-4`,
        )}
        {...rest}
      />
      {label && (
        <label htmlFor={id} className='ml-2 text-sm font-medium text-gray-8'>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
