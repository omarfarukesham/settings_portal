import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import PlusIcon from '@/assets/icons/PlusIcon';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { BREADCRUMB_ROUTES } from '@/configuration/constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactAddModal from './ContactAddModal';

const ContactHeader = () => {
  const navigate = useNavigate();
  const [contactModal, setContactModal] = useState(false);

  //reuseable modal controller
  const handleCloseModal = () => {
    setContactModal(false);
  };

  return (
    <>
      <div className='flex items-center justify-between mb-3'>
        <div className='grid gap-2'>
          <div className='text-lg font-bold'>Contact </div>
          <Breadcrumb routes={BREADCRUMB_ROUTES.configurations} />
        </div>
        <div className='flex gap-3'>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
            Go Back
          </Button>
          <Button onClick={() => setContactModal(true)}>
            <PlusIcon className='w-5' />
            Add Contact
          </Button>
        </div>
      </div>

      {/* modal component and passing props from here  */}
      <ContactAddModal
        isOpen={contactModal}
        onClose={handleCloseModal}
        tittle='Add Contact'
      />
    </>
  );
};

export default ContactHeader;
