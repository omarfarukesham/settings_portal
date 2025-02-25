import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAddContact } from '@/services/configurations/contactConfigurationService';
import { toast } from 'react-toastify';

const ContactCreateModal = ({ isOpen, setIsOpen }) => {
  const { isLoading, error, mutate: addContact } = useAddContact();

  const handleCreateContact = (data) => {
    addContact(data, {
      onSuccess: () => {
        toast.success('Successfully added');
        setIsOpen(false);
      },
    });
  };
  const statusOptions = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];
  return (
    <Modal isOpen={isOpen}>
      <Form onSubmit={handleCreateContact} className='p-10 flex flex-col gap-5'>
        <h4 className='text-center'>New - Contact</h4>
        <FormInput
          name='name'
          label='Name'
          placeholder='Contact Name'
          validations={{ required: 'Please write a Contact Name' }}
        />
        <FormInput
          name='type'
          label='Type'
          placeholder='Contact Type '
          validations={{ required: 'Please write a Contact Type ' }}
        />
        <FormInput
          name='email'
          label='Email'
          placeholder='Contact Email '
          validations={{ required: 'Please write a Contact Email' }}
        />
        <FormInput
          name='phone'
          label='Phone'
          placeholder='Contact Phone'
          validations={{ required: 'Please write a Contact Phone ' }}
        />
        <FormInput
          name='description'
          label='Description'
          placeholder='Contact Description'
          validations={{ required: 'Please write a Description ' }}
        />
        <FormInput
          name='address'
          label='Address'
          placeholder='Contact Address'
          validations={{ required: 'Please write a Contact Address' }}
        />
        {/* <FormDropdown
          name='status'
          label='Status'
          options={statusOptions}
          validations={{ required: 'Please select a status' }}
        /> */}

        {/* <FromDropdownRest
          name='countryId'
          label='Country'
          validations={{ required: 'Please select a country' }}
          restServiceHook={useGetCountries}
          restFilters={{ status: 'ACTIVE' }}
        /> */}

        {isLoading && <LoadingSpinner text='Adding Contact data' />}
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

export default ContactCreateModal;
