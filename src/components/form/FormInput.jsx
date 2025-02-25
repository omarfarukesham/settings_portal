import { useFormContext } from 'react-hook-form';
import FormInputField from './FormInputField';

/**
 * FormInput component.
 *
 * @component
 * @param {Object} props
 * @param {string} props.label - The label for the input field (optional).
 * @param {string} props.name - The name of the input field.
 * @param {Object} props.validations - The validation rules of react-hook-form (optional).
 * @param {string} props.className - The additional class names for styling the input field (optional).
 * @param {string} props.containerClassName - The additional class names for styling container div (optional).
 * @param {any} props... - Additional props to be spread on the FormInputField component.
 * @returns {JSX.Element} - The rendered FormInput component.
 */
const FormInput = ({
  label,
  name,
  validations = {},
  className,
  labelClassName,
  containerClassName,
  ...props
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={containerClassName}>
      {label && (
        <label
          className={`text-label block mb-2.5 relative ${labelClassName}`}
          htmlFor={name}
        >
          {label}{' '}
          {validations?.required && <span className='text-danger'>*</span>}
        </label>
      )}

      <FormInputField
        className={className}
        validations={validations}
        name={name}
        {...props}
      />

      {/* Errors */}
      {errors[name] && (
        <p className='text-label text-danger'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormInput;
