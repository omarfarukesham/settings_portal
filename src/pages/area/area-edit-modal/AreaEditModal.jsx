import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleArea } from '@/services/settings/areaSettingService';
import AreaEditForm from './AreaEditForm';

const AreaEditModal = ({ isOpen, setIsOpen, id }) => {
  // console.log(id);
  const { data: areaData, error, isFetching } = useGetSingleArea(id);
  // console.log(areaData);

  return (
    <Modal isOpen={isOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Area Data' className='flex' />
      )}
      {!isFetching && areaData && !error && (
        <AreaEditForm area={areaData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default AreaEditModal;
