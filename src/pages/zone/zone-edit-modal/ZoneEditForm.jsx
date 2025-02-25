import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FromDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetStates } from '@/services/settings/stateSettingService';
import { useEditZone } from '@/services/settings/zoneSettingService';
import { toast } from 'react-toastify';

const ZoneEditForm = ({ setIsOpen, zone }) => {
  const { isLoading, error, mutate: updateZone } = useEditZone();
  const handleUpdateZone = (data) => {
    updateZone(data, {
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
      onSubmit={handleUpdateZone}
      defaultValues={zone}
    >
      <h4 className='text-center'>Edit - Zone (District)</h4>
      <FormInput
        name='name'
        label='Name'
        // placeholder={console.log(country?.name)}
        validations={{ required: 'Please write a name' }}
      />

      <FromDropdownRest
        name='stateId'
        label='State (Division)'
        validations={{ required: 'Please select a State' }}
        restServiceHook={useGetStates}
      />

      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />

      {isLoading && <LoadingSpinner text='Updating Zone' />}
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

export default ZoneEditForm;
