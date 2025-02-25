import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FromDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useEditArea } from '@/services/settings/areaSettingService';
import { useGetZones } from '@/services/settings/zoneSettingService';
import { toast } from 'react-toastify';

const AreaEditForm = ({ setIsOpen, area }) => {
  // console.log(area);
  const { isLoading, error, mutate: updateArea } = useEditArea();
  const handleUpdateArea = (data) => {
    updateArea(data, {
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
      onSubmit={handleUpdateArea}
      defaultValues={area}
    >
      <h4 className='text-center'>Edit - Area (Thana)</h4>
      <FormInput
        name='name'
        label='Name'
        // placeholder={console.log(country?.name)}
        validations={{ required: 'Please write a name' }}
      />

      <FromDropdownRest
        name='zoneId'
        label='Zone (District)'
        validations={{ required: 'Please select a zones' }}
        restServiceHook={useGetZones}
      />
      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />

      {isLoading && <LoadingSpinner text='Updating Area' />}
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

export default AreaEditForm;
