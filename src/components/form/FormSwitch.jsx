import { Controller, useFormContext } from 'react-hook-form';

const FormSwitch = ({ label, name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const Switch = ({ field }) => (
    <>
      <span className='text-sm mb-2'>{label}</span>

      <input
        type='checkbox'
        id={name}
        className='hidden'
        defaultChecked={field.value}
        onChange={(e) => field.onChange(e.target.checked)}
      />
      <label
        htmlFor={name}
        className='relative flex items-center w-fit cursor-pointer select-none'
      >
        {/* Background box */}
        <div
          className={`w-[55px] h-6 rounded shadow-inner ${
            field.value ? 'bg-success' : 'bg-gray-4'
          }`}
        >
          {field.value ? (
            <span className='text-xs text-white ml-2'>ON</span>
          ) : (
            <span className='text-xs text-white ml-7'>OFF</span>
          )}
        </div>

        {/* Circle */}
        <div
          className={`${
            field.value ? 'translate-x-[31px]' : ''
          } absolute top-0.5 left-0.5 w-5 h-5 bg-white transform rounded transition-transform`}
        ></div>
      </label>
    </>
  );

  return (
    <div className='flex flex-col gap-1'>
      <Controller control={control} name={name} render={Switch} />
      {errors[name] && <p className='text-danger'>{errors[name].message}</p>}
    </div>
  );
};

export default FormSwitch;
