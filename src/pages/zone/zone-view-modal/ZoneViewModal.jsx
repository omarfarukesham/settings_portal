import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleZone } from '@/services/settings/zoneSettingService';
import ZoneViewForm from './ZoneViewForm';

const ZoneViewModal = ({ isOpen, setIsOpen, id }) => {
  const { data: zoneData, error, isFetching } = useGetSingleZone(id);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Zone Info' className='flex' />
      )}
      {!isFetching && zoneData && !error && (
        <ZoneViewForm zone={zoneData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default ZoneViewModal;
