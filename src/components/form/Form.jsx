import { joiResolver } from '@hookform/resolvers/joi';
import { FormProvider, useForm } from 'react-hook-form';

const Form = ({
  onSubmit,
  defaultValues,
  className,
  schema,
  mode = 'onChange',
  children,
}) => {
  const methods = useForm({
    defaultValues,
    mode,
    ...(schema && { resolver: joiResolver(schema) }),
  });

  if (Object.keys(methods.formState.errors)?.length) {
    // eslint-disable-next-line no-console
    console.log(methods.formState.errors);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
