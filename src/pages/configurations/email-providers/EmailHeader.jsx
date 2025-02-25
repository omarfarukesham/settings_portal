import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import PlusIcon from '@/assets/icons/PlusIcon';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailAddModal from './EmailAddModal';
// import ContactAddModal from './ContactAddModal';

const EmailHeader = () => {
  const navigate = useNavigate();
  const [emailModal, setEmailModal] = useState(false);

  //reuseable modal controller
  const handleCloseModal = () => {
    setEmailModal(false);
  };

  return (
    <>
      <div className='flex items-center justify-between mb-3'>
        <div className='grid gap-2'>
          <div className='text-lg font-bold'>Email Provider </div>
          <Breadcrumb />
        </div>
        <div className='flex gap-3'>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
            Go Back
          </Button>
          <Button onClick={() => setEmailModal(true)}>
            <PlusIcon className='w-5' />
            Add Email
          </Button>
        </div>
      </div>

      {/* modal component and passing props from here  */}
      <EmailAddModal
        isOpen={emailModal}
        onClose={handleCloseModal}
        tittle='Add Email Provider'
      />
    </>
  );
};

export default EmailHeader;
