import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';

const FormYesNoToggle = ({ label, name }) => {
  const { register, getValues, setValue } = useFormContext();
  const [selected, setSelected] = useState(getValues(name));

  const onClick = (value) => {
    setSelected(value);
    setValue(name, value);
  };

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {label && (
        <label className='text-label block mb-2.5' htmlFor={name}>
          {label}
        </label>
      )}
      <div className='flex'>
        <input className='hidden' {...register(name)} id={name} />

        <Button
          type='button'
          className={twMerge(
            'flex-1 rounded-none rounded-s-md border-gray-5',
            selected && 'bg-success border-none text-white',
          )}
          variant='outlined'
          size='slim'
          onClick={() => onClick(true)}
        >
          Yes
        </Button>

        <Button
          type='button'
          className={twMerge(
            'flex-1 rounded-none rounded-e-md border-gray-5',
            !selected && 'bg-danger border-none text-white',
          )}
          variant='outlined'
          size='slim'
          onClick={() => onClick(false)}
        >
          No
        </Button>
      </div>
      {/* Errors */}
      {errors[name] && (
        <p className='text-label text-danger'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormYesNoToggle;
