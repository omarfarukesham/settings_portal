import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FromDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetStates } from '@/services/settings/stateSettingService';
import { useAddZone } from '@/services/settings/zoneSettingService';
import { toast } from 'react-toastify';

const ZoneCreateModal = ({ isOpen, setIsOpen }) => {
  const { isLoading, error, mutate: addZone } = useAddZone();

  const handleCreateZone = (data) => {
    addZone(data, {
      onSuccess: () => {
        toast.success('Successfully added');
        setIsOpen(false);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleCreateZone} className='p-10 flex flex-col gap-5'>
        <h4 className='text-center'>New - Zone (District)</h4>
        <FormInput
          name='name'
          label='Name'
          placeholder='District Name'
          validations={{ required: 'Please write a zone Name' }}
        />
        <FromDropdownRest
          name='stateId'
          label='State (Division)'
          validations={{ required: 'Please select a State' }}
          restServiceHook={useGetStates}
        />

        {isLoading && <LoadingSpinner text='Adding Zone data' />}
        {!isLoading && (
          <div className='flex justify-center gap-3 mt-5'>
            <Button type='submit'>Save</Button>
            <Button variant='secondary' onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        )}
        {error && <PageError message={error.message} />}
      </Form>
    </Modal>
  );
};

export default ZoneCreateModal;
