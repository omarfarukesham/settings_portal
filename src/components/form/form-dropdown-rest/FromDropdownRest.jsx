import PageError from '@/components/layout/PageError';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import FormDropdown from '../form-dropdown/FormDropdown';

const FromDropdownRest = ({
  name,
  label,
  validations,
  restServiceHook,
  restFilters,
  labelKey = 'name',
  valueKey = 'id',
  ...props
}) => {
  const filters = { perPage: 1000, page: 1, ...restFilters };
  const { data, error, isFetching } = restServiceHook(filters);

  if (isFetching) return <LoadingSpinner text='Fetching Data' />;

  if (!isFetching && error) return <PageError message={error.message} />;

  return (
    <FormDropdown
      name={name}
      label={label}
      options={data?.items?.map((e) => ({
        label: e[labelKey],
        value: e[valueKey],
      }))}
      validations={validations}
      isSearchable={true}
      {...props}
    />
  );
};

export default FromDropdownRest;
