import { twMerge } from 'tailwind-merge';

const CardContainer = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge('bg-bg-color-2 rounded-lg shadow', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default CardContainer;
