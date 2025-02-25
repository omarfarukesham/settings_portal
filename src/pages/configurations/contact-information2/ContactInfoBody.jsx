import PageError from '@/components/layout/PageError';
import PageInnerContainer from '@/components/layout/PageInnerContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useQueryParamState from '@/hooks/useQueryParamState';
// import { useGetCountries } from '@/services/settings/CountriesService';
import { useGetContacts } from '@/services/configurations/contactConfigurationService';
import { useEffect } from 'react';
import ContactInfoFilters from './ContactInfoFilters';
import ContactInfoTable from './ContactInfoTable';

const ContactInfoBody = () => {
  const [filters, setFilters] = useQueryParamState({
    name: '',
    perPage: 10,
    page: 1,
  });
  const { data, error, isFetching, refetch } = useGetContacts(filters);

  // Data fetch will occur whenever filter is changed
  useEffect(() => {
    refetch(filters);
  }, [filters, refetch]);

  // Changing the filter base on user interaction
  const handleFilterChange = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  return (
    <PageInnerContainer className='flex flex-col'>
      <ContactInfoFilters
        onFilterChange={handleFilterChange}
        filters={filters}
        paginate={data?.paginate}
      />

      {isFetching && <LoadingSpinner text='Loading contact data... ' />}
      {!isFetching && data && !error && <ContactInfoTable data={data?.items} />}
      {!isFetching && error && <PageError message={error.message} />}
    </PageInnerContainer>
  );
};

export default ContactInfoBody;
