import CalendarIcon from '@/assets/icons/CalendarIcon';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

const Datepicker = ({ defaultDate, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  useEffect(() => {
    onChange(selectedDate);
  }, [onChange, selectedDate]);

  return (
    <>
      <div className='relative'>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className='py-1 pr-2 lg:pl-8 pl-3 rounded border border-gray w-full text-black'
        />
        <CalendarIcon className='absolute top-1 right-2 h-5 w-5 text-gray-400 pointer-events-none' />
      </div>
    </>
  );
};

export default Datepicker;
