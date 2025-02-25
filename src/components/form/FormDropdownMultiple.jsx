import { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import FormDropdown from './form-dropdown/FormDropdown';

const FormDropdownMultiple = ({
  name,
  options,
  data,
  label,
  title,
  validations = {},
  className,
  isMulti,
  isSearchable,
}) => {
  //* Return data format -> price: {se: '500', no: '510', fi: '43'}
  //* Error format -> price: { se: { type: 'required', message: 'Price for se is required' } }
  //* Name format of each input: price.se, price.dk

  return (
    <div>
      {label && (
        <label className='text-label block my-2.5' htmlFor={name}>
          {label}
        </label>
      )}

      {data?.map((item) => {
        return (
          <SingleInput
            key={item.id}
            item={item}
            name={name}
            className={className}
            validations={validations}
            options={options}
            isMulti={isMulti}
            isSearchable={isSearchable}
            title={title}
          />
        );
      })}
    </div>
  );
};

const SingleInput = ({
  item,
  name,
  className,
  validations,
  options,
  isMulti,
  isSearchable,
  placeholder,
}) => {
  // For achieving this data format { price: { se: 500, dk: 300 } } - input name should be price.se, price.dk etc
  const eachInputName = `${name}.${item.id}`;

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Fragment key={item.id}>
      <div className='relative'>
        {item.logo && (
          <div className='absolute top-1/2 left-2 -translate-y-1/2 flex items-center gap-2.5 pointer-events-none'>
            <img src={item.logo} className='h-5 w-5' />
            <span className='w-[85px] h-6 px-1.5 shadow rounded-full text-label text-dark-1 flex items-center justify-center'>
              {item.name}
            </span>
          </div>
        )}

        <FormDropdown
          options={options}
          onChange={(selected) => {
            // eslint-disable-next-line no-console
            console.log(selected);
          }}
          name={eachInputName}
          className={twMerge('pl-32', className)}
          placeholder={placeholder}
          validations={validations}
          isMulti={isMulti}
          isSearchable={isSearchable}
        />
      </div>

      {/* Error Message */}
      {errors[name]?.[item.id] && (
        <p className='text-danger'>{errors[name][item.id]?.message}</p>
      )}
    </Fragment>
  );
};

export default FormDropdownMultiple;
