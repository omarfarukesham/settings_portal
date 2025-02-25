import InputField from './InputField';

const FilterInput = ({ label, name, ...rest }) => {
  return (
    <div className='grid gap-[10px]'>
      {label && (
        <label htmlFor={name} className='font-bold text-white text-base'>
          {label}
        </label>
      )}
      <InputField
        {...rest}
        className='px-[15px] h-[34px] rounded-md text-label text-gray-8'
      />
    </div>
  );
};

export default FilterInput;
