import { useFormContext } from 'react-hook-form';
import FormRadioButton from './FormRadioButton';

const FormRadioButtonGroup = ({
  name,
  label,
  options = [],
  validations = {},
  className,
  labelClassName,
  buttonClassName,
  buttonVariant,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {label && (
        <label
          className={`text-label block mb-2.5 relative ${labelClassName}`}
          htmlFor={name}
        >
          {label}{' '}
          {validations?.required && <span className='text-danger'>*</span>}
        </label>
      )}
      <div className={`flex gap-5 ${className}`}>
        {options.map((option, key) => (
          <FormRadioButton
            key={key}
            name={name}
            label={option.label}
            value={option.value}
            className={buttonClassName}
            validations={validations}
            variant={buttonVariant}
          />
        ))}
      </div>

      {/* Errors */}
      {errors[name] && (
        <p className='text-label text-danger'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormRadioButtonGroup;
