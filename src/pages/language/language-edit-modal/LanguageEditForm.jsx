import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useEditLanguage } from '@/services/settings/languageSettingService';
import { toast } from 'react-toastify';

const LanguageEditForm = ({ setIsOpen, language }) => {
  const { isLoading, error, mutate: updateLanguage } = useEditLanguage();
  const handleUpdateLanguage = (data) => {
    updateLanguage(data, {
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
      onSubmit={handleUpdateLanguage}
      defaultValues={language}
    >
      <h4 className='text-center'>Edit - Language</h4>
      <FormInput
        name='name'
        label='Name'
        // placeholder={console.log(country?.name)}
        validations={{ required: 'Please write a name' }}
      />
      <FormInput
        name='code'
        label='Code'
        // placeholder={console.log(country?.name)}
        validations={{ required: 'Please write a code' }}
      />

      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />

      {isLoading && <LoadingSpinner text='Updating Language' />}
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

export default LanguageEditForm;
