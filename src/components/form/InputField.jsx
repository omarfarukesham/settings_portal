import { twMerge } from 'tailwind-merge';

const InputField = ({ name, onChange, onEnter, className, ...rest }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEnter && onEnter(e.target.value);
    }
  };

  return (
    <>
      <input
        {...rest}
        name={name}
        id={name}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className={twMerge('outline-none', className)}
      />
    </>
  );
};

export default InputField;
