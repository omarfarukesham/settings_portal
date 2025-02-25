import CrossIcon from '@/assets/icons/CrossIcon';

const SelectedOptions = ({ selectedOptions, removeOption }) => {
  return (
    <div className='flex gap-2 flex-wrap overflow-auto'>
      {selectedOptions.map((option, key) => (
        <div
          key={key}
          className='shadow h-6 pl-2 bg-gray-1 rounded flex items-center justify-between gap-2 overflow-hidden whitespace-nowrap'
        >
          {option?.label}
          <div
            className='hover:bg-danger w-5 h-full p-1 group'
            onClick={() => removeOption(option)}
          >
            <CrossIcon className='w-2 h-full fill-black mx-auto group-hover:fill-white' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedOptions;
