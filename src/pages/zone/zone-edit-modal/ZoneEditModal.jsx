import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleZone } from '@/services/settings/zoneSettingService';
import ZoneEditForm from './ZoneEditForm';

const ZoneEditModal = ({ isOpen, setIsOpen, id }) => {
  // console.log(id);
  const { data: zoneData, error, isFetching } = useGetSingleZone(id);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Zone Data' className='flex' />
      )}
      {!isFetching && zoneData && !error && (
        <ZoneEditForm zone={zoneData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default ZoneEditModal;
