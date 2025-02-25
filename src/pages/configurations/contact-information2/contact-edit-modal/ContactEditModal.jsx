import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleContact } from '@/services/configurations/contactConfigurationService';
import ContactEditForm from './ContactEditForm';

const ContactEditModal = ({ isOpen, setIsOpen, id }) => {
  // console.log(id);
  const { data: contactData, error, isFetching } = useGetSingleContact(id);

  return (
    <Modal isOpen={isOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Contact Data' className='flex' />
      )}
      {!isFetching && contactData && !error && (
        <ContactEditForm contact={contactData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default ContactEditModal;
