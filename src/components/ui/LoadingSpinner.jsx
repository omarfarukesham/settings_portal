import loadingLogo from '@/assets/images/restoreit_circle.svg';
import { twMerge } from 'tailwind-merge';

const LoadingSpinner = ({ className, text }) => {
  return (
    // <div className='border-2 border-dashed rounded-full w-5 h-5 animate-spin'></div>
    <div
      className={twMerge(
        'h-full w-full flex flex-col items-center justify-center',
        className,
      )}
    >
      <img
        src={loadingLogo}
        alt=''
        className={'animate-spin max-w-full max-h-full w-10'}
      />
      {text}
    </div>
  );
};

export default LoadingSpinner;
