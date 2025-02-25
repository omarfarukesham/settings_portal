import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FromDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAddArea } from '@/services/settings/areaSettingService';
import { useGetZones } from '@/services/settings/zoneSettingService';
import { toast } from 'react-toastify';

const AreaCreateModal = ({ isOpen, setIsOpen }) => {
  const { isLoading, error, mutate: addArea } = useAddArea();

  const handleCreateArea = (data) => {
    addArea(data, {
      onSuccess: () => {
        toast.success('Successfully added');
        setIsOpen(false);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleCreateArea} className='p-10 flex flex-col gap-5'>
        <h4 className='text-center'>New - Area (Thana)</h4>
        <FormInput
          name='name'
          label='Name'
          placeholder='Thana Name'
          validations={{ required: 'Please write a Area Name' }}
        />

        <FromDropdownRest
          name='zoneId'
          label='Zone (District)'
          validations={{ required: 'Please select a District' }}
          restServiceHook={useGetZones}
        />

        {isLoading && <LoadingSpinner text='Adding Area data' />}
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

export default AreaCreateModal;
