import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAddLanguage } from '@/services/settings/languageSettingService';
import { toast } from 'react-toastify';

const LanguageCreateModal = ({ isOpen, setIsOpen }) => {
  const { isLoading, error, mutate: addLanguage } = useAddLanguage();

  const handleCreateLanguage = (data) => {
    addLanguage(data, {
      onSuccess: () => {
        toast.success('Successfully added');
        setIsOpen(false);
      },
    });
  };

  return (
    <Modal isOpen={isOpen}>
      <Form
        onSubmit={handleCreateLanguage}
        className='p-10 flex flex-col gap-5'
      >
        <h4 className='text-center'>New - Language</h4>
        <FormInput
          name='name'
          label='Name'
          placeholder='Language Name'
          validations={{ required: 'Please write a Language Name' }}
        />
        <FormInput
          name='code'
          label='Code'
          placeholder='Language Code'
          validations={{ required: 'Please write a Code ' }}
        />

        {/* <FromDropdownRest
          name='stateId'
          label='State'
          validations={{ required: 'Please select a State' }}
          restServiceHook={useGetStates}
        /> */}

        {isLoading && <LoadingSpinner text='Adding  data' />}
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

export default LanguageCreateModal;
