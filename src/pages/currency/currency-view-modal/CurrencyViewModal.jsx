import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleCurrency } from '@/services/settings/currencySettingService';
import CurrencyViewForm from './CurrencyViewForm';

const CurrencyViewModal = ({ isOpen, setIsOpen, id }) => {
  const { data: currencyData, error, isFetching } = useGetSingleCurrency(id);

  return (
    <Modal isOpen={isOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Currency Info' className='flex' />
      )}
      {!isFetching && currencyData && !error && (
        <CurrencyViewForm currency={currencyData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default CurrencyViewModal;
