import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useEditContact } from '@/services/configurations/contactConfigurationService';
import { toast } from 'react-toastify';

const ContactEditForm = ({ setIsOpen, contact }) => {
  const { isLoading, error, mutate: updateContact } = useEditContact();
  const handleUpdateContact = (data) => {
    updateContact(data, {
      onSuccess: () => {
        toast.success('Successfully updated');
        setIsOpen(false);
      },
    });
  };

  const statusOptions = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];

  return (
    <Form
      className='p-10 flex flex-col w-full gap-5'
      onSubmit={handleUpdateContact}
      defaultValues={contact}
    >
      <h4 className='text-center'>Edit - Contact</h4>
      <FormInput
        name='name'
        label='Name'
        validations={{ required: 'Please write a name' }}
      />
      <FormInput
        name='type'
        label='Type'
        validations={{ required: 'Please write a Type' }}
      />
      <FormInput
        name='email'
        label='Email'
        validations={{ required: 'Please write a Email' }}
      />
      <FormInput
        name='phone'
        label='PHone'
        validations={{ required: 'Please write a Phone' }}
      />
      <FormInput
        name='description'
        label='Description'
        validations={{ required: 'Please write a Description' }}
      />
      <FormInput
        name='address'
        label='Address'
        validations={{ required: 'Please write a Address' }}
      />

      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />

      {isLoading && <LoadingSpinner text='Updating Contact' />}
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
  );
};

export default ContactEditForm;
