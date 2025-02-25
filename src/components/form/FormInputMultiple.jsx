import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import FormInputField from './FormInputField';

const FormInputMultiple = ({
  label,
  name,
  leftItemName, // If it is a two column input, then name would be like: time.from & time.to
  rightItemName, // name="time", leftItemName = "from", rightItemName = "to";
  data,
  validations = {},
  className,
}) => {
  //* Return data format -> price: {se: '500', no: '510', fi: '43'}
  //* Error format -> price: { se: { type: 'required', message: 'Price for se is required' } }
  //* Name format of each input: price.se, price.dk

  return (
    <div>
      {label && (
        <label className='text-label block mb-2.5' htmlFor={name}>
          {label}
        </label>
      )}

      {data?.map((item) => {
        return (
          <Fragment key={item.id}>
            {leftItemName && rightItemName ? (
              <div className='flex items-end gap-2'>
                <SingleInput
                  item={item}
                  name={name}
                  nestedName={leftItemName}
                  className={className}
                  validations={validations}
                />
                <hr className='w-3 mb-4 border border-gray-4' />

                <SingleInput
                  key={item.id}
                  item={item}
                  name={name}
                  nestedName={rightItemName}
                  className={className}
                  validations={validations}
                />
              </div>
            ) : (
              <SingleInput
                item={item}
                name={name}
                className={className}
                validations={validations}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

/**
 *
 * @param {string} nestedName for two column input, the name of each nested input
 */
const SingleInput = ({ item, name, nestedName, className, validations }) => {
  // For achieving this data format { price: { se: 500, dk: 300 } } - input name should be price.se, price.dk etc
  const eachInputName = nestedName
    ? `${name}.${item.id}.${nestedName}`
    : `${name}.${item.id}`;

  const {
    formState: { errors },
  } = useFormContext();

  // For dynamically calculating the padding left of each input according to the width of it's left portion
  const inputLeftRef = useRef(null);
  const [inputLeftWidth, setInputLeftWidth] = useState(0);

  //! remove this
  useLayoutEffect(() => {
    setInputLeftWidth(inputLeftRef.current?.offsetWidth);
  }, [item]);

  return (
    <Fragment key={item.id}>
      <div className='relative'>
        {item.logo && (
          <div
            ref={inputLeftRef}
            className='absolute top-1/2 left-2 -translate-y-1/2 flex items-center gap-2.5 pointer-events-none'
          >
            <img src={item.logo} className='h-5 w-5' />
            <span className='h-6 px-1.5 shadow rounded-full text-label text-dark-1 flex items-center justify-center'>
              {item.name}
            </span>
          </div>
        )}

        <FormInputField
          className={twMerge(item.currency && 'pr-12', className)}
          style={{
            paddingLeft: inputLeftWidth + 15,
          }}
          name={eachInputName}
          validations={validations}
        />

        {item.currency && (
          <span className='absolute top-1/2 right-3 -translate-y-1/2 text-label text-gray-6'>
            {item.currency}
          </span>
        )}
      </div>

      {/* Error Message */}
      {errors[name]?.[item.id] && (
        <p className='text-danger'>{errors[name][item.id]?.message}</p>
      )}
    </Fragment>
  );
};

export default FormInputMultiple;
