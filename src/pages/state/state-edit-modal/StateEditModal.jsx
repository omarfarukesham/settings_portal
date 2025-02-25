import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleState } from '@/services/settings/stateSettingService';
import StateEditForm from './StateEditForm';

const StateEditModal = ({ isOpen, setIsOpen, id }) => {
  // console.log(id);
  const { data: stateData, error, isFetching } = useGetSingleState(id);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading State Data' className='flex' />
      )}
      {!isFetching && stateData && !error && (
        <StateEditForm country={stateData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default StateEditModal;
