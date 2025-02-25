import { twMerge } from 'tailwind-merge';

const Options = ({
  optionClassName,
  optionsClassName,
  filteredOptions,
  handleOptionSelect,
  isMulti,
  selectedOptions,
}) => {
  return (
    <ul
      className={twMerge(
        'absolute z-20 bg-white mt-2 rounded shadow min-w-[10rem] w-full max-h-[400px] overflow-auto',
        optionsClassName,
      )}
    >
      {filteredOptions.map((option) => (
        <div
          key={option.value}
          className={twMerge(
            'cursor-pointer hover:bg-bg-color p-2 text-label flex items-center gap-2',
            optionClassName,
          )}
          onClick={() => handleOptionSelect(option)}
        >
          {isMulti && (
            <input
              type='checkbox'
              readOnly
              checked={
                !!selectedOptions.find((opt) => opt?.value === option?.value)
              }
            />
          )}
          {option.label}
        </div>
      ))}
    </ul>
  );
};

export default Options;
