import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
// import { useGetTaxCategory } from '@/services/tax/taxCategoryService';
import { useGetCountry } from '@/services/settings/CountriesService';
import CountryEditForm from './CountryEditForm';

const CountryEditModal = ({ isOpen, setIsOpen, id }) => {
  const { data: countryData, error, isFetching } = useGetCountry(id);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Country ...' className='flex' />
      )}
      {!isFetching && countryData && !error && (
        <CountryEditForm country={countryData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default CountryEditModal;
