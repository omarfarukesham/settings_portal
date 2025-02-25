import { twMerge } from 'tailwind-merge';
import LoadingSpinner from './LoadingSpinner';

/**
 *
 * @param {Object} props
 * @param {Function} props.onClick
 * @param {string} props.variant
 * @param {string} props.size
 * @param {string} props.className
 * @param {string} props.type
 * @returns {JSX.Element}
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'big',
  type = 'button',
  loading,
  className,
  ...rest
}) => {
  if (variant === 'table-action') size = '';
  return (
    <button
      className={twMerge(
        'flex gap-2 p-2 justify-center items-center',
        variant === 'primary' &&
          'bg-primary text-white hover:bg-secondary hover:text-primary [&>svg]:fill-white [&>svg]:hover:fill-primary',
        variant === 'secondary' &&
          'bg-secondary text-primary hover:bg-primary hover:text-white ',
        variant === 'outlined' && 'bg-transparent border border-gray',
        variant === 'texted' && 'hover:bg-secondary px-5 hover:text-primary',
        variant === 'texted-outlined' &&
          'border border-gray hover:border-secondary hover:bg-secondary hover:text-primary',
        variant === 'table-action' && 'w-6 h-6 p-1 rounded-[50%] bg-light-1',
        size === 'big' &&
          'md:h-[39px] h-[35px] md:px-5 px-3 text-base rounded-md',
        size === 'slim' && 'h-[35px] px-5 text-[14px] rounded-md',
        size === 'small' && 'h-[26px] text-sm rounded [&>svg]:w-[10px]',
        rest.disabled && '!bg-gray hover:bg-gray cursor-not-allowed',
        className,
      )}
      type={type}
      disabled={rest.disabled || loading}
      {...rest}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
