import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleLanguage } from '@/services/settings/languageSettingService';
import LanguageEditForm from './LanguageEditForm';

const LanguageEditModal = ({ isOpen, setIsOpen, id }) => {
  // console.log(id);
  const { data: langData, error, isFetching } = useGetSingleLanguage(id);

  return (
    <Modal isOpen={isOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Language Data' className='flex' />
      )}
      {!isFetching && langData && !error && (
        <LanguageEditForm language={langData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default LanguageEditModal;
