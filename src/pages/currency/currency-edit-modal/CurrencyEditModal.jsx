import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleCurrency } from '@/services/settings/currencySettingService';
import CurrencyEditForm from './CurrencyEditForm';

const CurrencyEditModal = ({ isOpen, setIsOpen, id }) => {
  // console.log(id);
  const { data: currencyData, error, isFetching } = useGetSingleCurrency(id);

  return (
    <Modal isOpen={isOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Currency Data' className='flex' />
      )}

      {!isFetching && currencyData && !error && (
        <CurrencyEditForm currency={currencyData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default CurrencyEditModal;
