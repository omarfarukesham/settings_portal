import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetCountry } from '@/services/settings/CountriesService';
import CountryViewForm from './CountryViewForm';

const CountryViewModal = ({ isOpen, setIsOpen, id }) => {
  const { data: countryData, error, isFetching } = useGetCountry(id);
  // console.log(countryData);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className='p-3 flex max-h-[600px] overflow-auto'
    >
      {isFetching && (
        <LoadingSpinner text='Loading Tax Rules' className='flex' />
      )}
      {!isFetching && countryData && !error && (
        <CountryViewForm country={countryData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default CountryViewModal;
