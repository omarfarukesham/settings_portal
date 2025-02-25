import CalendarIcon from '@/assets/icons/CalendarIcon';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';

const FormDatePicker = ({ name, label, placeholder }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const Picker = ({ field }) => {
    const [date, setDate] = useState('');

    return (
      <div>
        {label && (
          <label className='text-label block mb-2.5' htmlFor={name}>
            {label}
          </label>
        )}

        <div className='relative'>
          <DatePicker
            selected={date}
            onChange={(d) => {
              setDate(d);
              field.onChange(new Date(d).toISOString());
            }}
            id={name}
            placeholderText={placeholder}
            dateFormat='dd MMMM, yyyy'
            className='w-full h-9 rounded border border-gray-4 p-2 outline-none'
            calendarClassName='custom-datepicker-calendar'
          />
          <CalendarIcon className='absolute bottom-2 right-2 h-5 w-5 text-gray-400 pointer-events-none' />
        </div>

        {/* Errors */}
        {errors[name] && (
          <p className='text-label text-danger'>{errors[name].message}</p>
        )}
      </div>
    );
  };
  return <Controller control={control} render={Picker} name={name} />;
};

export default FormDatePicker;
