import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetSingleContact } from '@/services/configurations/contactConfigurationService';
import ContactViewForm from './ContactViewForm';

const ContactViewModal = ({ isOpen, setIsOpen, id }) => {
  const { data: contactData, error, isFetching } = useGetSingleContact(id);

  return (
    <Modal isOpen={isOpen} className='p-3 flex'>
      {isFetching && (
        <LoadingSpinner text='Loading Contact Info' className='flex' />
      )}
      {!isFetching && contactData && !error && (
        <ContactViewForm contact={contactData} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default ContactViewModal;
