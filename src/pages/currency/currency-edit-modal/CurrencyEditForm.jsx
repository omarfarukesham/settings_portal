import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useEditCurrency } from '@/services/settings/currencySettingService';
import { toast } from 'react-toastify';

const CurrencyEditForm = ({ setIsOpen, currency }) => {
  const { isLoading, error, mutate: updateCurrency } = useEditCurrency();
  const handleUpdateCurrency = (data) => {
    updateCurrency(data, {
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
      onSubmit={handleUpdateCurrency}
      defaultValues={currency}
    >
      <h4 className='text-center'>Edit - Currency</h4>
      <FormInput
        name='name'
        label='Name'
        validations={{ required: 'Please write a name' }}
      />
      <FormInput
        name='code'
        label='Code'
        validations={{ required: 'Please write a code' }}
      />
      <FormInput
        name='symbol'
        label='Symbol'
        validations={{ required: 'Please write a symbol' }}
      />

      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />

      {isLoading && <LoadingSpinner text='Updating Currency' />}
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

export default CurrencyEditForm;
