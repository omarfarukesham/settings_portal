import ArrowRightGroupIcon from '@/assets/icons/ArrowRightGroupIcon';
import { useState } from 'react';
import CardContainer from './CardContainer';

const StatusCard = ({
  title,
  icon: Icon,
  value,
  channels,
  isClickAble = false,
}) => {
  const [showExpandedView, setShowExpandedView] = useState(false);

  return (
    <>
      <CardContainer
        className='w-full h-36 px-8 py-5 cursor-pointer relative'
        onClick={() => setShowExpandedView(true)}
      >
        <p className='text-label'>{title}</p>
        <div className='flex items-center gap-5 my-5'>
          <div className='bg-light h-16 w-16 rounded-full flex items-center justify-center'>
            <Icon />
          </div>
          <h3 className='font-bold'>{value}</h3>
        </div>
        {isClickAble && (
          <ArrowRightGroupIcon className='fill-secondary absolute right-4 bottom-4' />
        )}
      </CardContainer>
    </>
  );
};

export default StatusCard;
