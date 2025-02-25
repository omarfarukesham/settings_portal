import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FromDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetCountries } from '@/services/settings/CountriesService';
import { useAddState } from '@/services/settings/stateSettingService';
import { toast } from 'react-toastify';

const StateCreateModal = ({ isOpen, setIsOpen }) => {
  const { isLoading, error, mutate: addState } = useAddState();

  const handleCreateState = (data) => {
    addState(data, {
      onSuccess: () => {
        toast.success('Successfully added');
        setIsOpen(false);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleCreateState} className='p-10 flex flex-col gap-5'>
        <h4 className='text-center'>New - State (Division)</h4>
        <FormInput
          name='name'
          label='Name'
          placeholder='Division Name'
          validations={{ required: 'Please write a State Name' }}
        />
        <FromDropdownRest
          name='countryId'
          label='Country'
          validations={{ required: 'Please select a country' }}
          restServiceHook={useGetCountries}
          restFilters={{ status: 'ACTIVE' }}
        />

        {isLoading && <LoadingSpinner text='Adding Country data' />}
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

export default StateCreateModal;
