import CalendarIcon from '@/assets/icons/CalendarIcon';

const Calendar = () => {
  return (
    <div className='relative h-6'>
      <input
        className='py-1 pr-2 pl-7 rounded border border-gray w-full'
        type='text'
      />
      <CalendarIcon className='absolute top-1 right-2 pointer-events-none' />
    </div>
  );
};

export default Calendar;
