import { useFormContext, useWatch } from 'react-hook-form';

const FormConditionalRendering = ({ children, fieldName }) => {
  const { getValues } = useFormContext();
  const defaultValue = getValues(fieldName);

  const fieldValue = useWatch({
    name: fieldName,
    defaultValue: defaultValue,
  });

  if (fieldValue) return <>{children(fieldValue)}</>;
};

export default FormConditionalRendering;
