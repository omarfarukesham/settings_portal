import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleState } from '@/services/settings/stateSettingService';
import StateViewForm from './StateViewForm';

const StateViewModal = ({ isOpen, setIsOpen, id }) => {
  const { data: stateData, error, isFetching } = useGetSingleState(id);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading State Info' className='flex' />
      )}
      {!isFetching && stateData && !error && (
        <StateViewForm country={stateData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default StateViewModal;
