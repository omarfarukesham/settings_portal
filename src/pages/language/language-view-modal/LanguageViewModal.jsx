import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleLanguage } from '@/services/settings/languageSettingService';
import LanguageViewForm from './LanguageViewForm';

const LanguageViewModal = ({ isOpen, setIsOpen, id }) => {
  const { data: langData, error, isFetching } = useGetSingleLanguage(id);

  return (
    <Modal isOpen={isOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading language Info' className='flex' />
      )}
      {!isFetching && langData && !error && (
        <LanguageViewForm language={langData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default LanguageViewModal;
