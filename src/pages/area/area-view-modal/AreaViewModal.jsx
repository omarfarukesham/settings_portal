import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleArea } from '@/services/settings/areaSettingService';
import AreaViewForm from './AreaViewForm';

const AreaViewModal = ({ isOpen, setIsOpen, id }) => {
  const { data: areaData, error, isFetching } = useGetSingleArea(id);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Area Info' className='flex' />
      )}
      {!isFetching && areaData && !error && (
        <AreaViewForm area={areaData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default AreaViewModal;
