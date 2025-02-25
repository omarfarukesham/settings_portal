import { useFormContext } from 'react-hook-form';

const FormCheckbox = ({ label, name, id, validations, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id={id || name}
          {...register(name, validations)}
          {...rest}
        />

        <label htmlFor={id || name} className='text-label'>
          {label}
        </label>
      </div>

      {/* Errors */}
      {errors[name] && <p className='text-danger'>{errors[name].message}</p>}
    </div>
  );
};

export default FormCheckbox;
