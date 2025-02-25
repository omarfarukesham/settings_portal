import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import { default as FormDropdownRest } from '@/components/form/form-dropdown-rest/FromDropdownRest';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  useEditCountry,
  useGetCurrencies,
} from '@/services/settings/CountriesService';
import { useGetLanguages } from '@/services/settings/languageSettingService';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CountryEditForm = ({ setIsOpen, country }) => {
  const { isLoading, error, mutate: updateCountry } = useEditCountry();

  const [languageOptions, setLanguageOptions] = useState(
    country?.languages?.map((e) => ({ label: e.name, value: e.id })),
  );
  const [currenciesOptions, setCurrenciesOptions] = useState(
    country?.currencies?.map((e) => ({ label: e.name, value: e.id })),
  );

  const handleUpdateCountry = (formData) => {
    const data = {
      ...formData,
      languageIds: formData.languageIds?.map((languageId) => ({
        id: languageId,
        isPrimary: formData.primaryLanguageId === languageId || false,
      })),
      currencyIds: formData.currencyIds?.map((currencyId) => ({
        id: currencyId,
        isPrimary: formData.primaryCurrencyId === currencyId || false,
      })),
    };

    updateCountry(data, {
      onSuccess: () => {
        toast.success('Successfully updated');
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const statusOptions = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];

  const handleSetLanguageOptions = (languages) => {
    setLanguageOptions(languages);
  };
  const handleSetCurrencyOptions = (currencies) => {
    setCurrenciesOptions(currencies);
  };

  return (
    <Form
      className='p-10 flex flex-col w-full gap-5 max-h-[600px] overflow-auto'
      onSubmit={handleUpdateCountry}
      defaultValues={country}
    >
      <h4 className='text-center'>Edit - Country</h4>
      <FormInput
        name='name'
        label='Name'
        validations={{ required: 'Please write a name' }}
      />
      <FormInput
        name='isoCodeFull'
        label='ISO Code Full'
        placeholder='isoCodeFull'
        validations={{ required: 'Please write a isoCodeFull' }}
      />
      <FormInput
        name='isoCodeShort'
        label='ISO Code Short'
        placeholder='isoCodeShort'
        validations={{ required: 'Please write a isoCodeShort' }}
      />
      <FormInput
        name='dialCode'
        label='Dial Code'
        placeholder='dialCode'
        validations={{ required: 'Please write a dialCode' }}
      />

      <FormDropdownRest
        name='languageIds'
        label='Language'
        restServiceHook={useGetLanguages}
        isMulti={true}
        validations={{ required: 'Please select a Language' }}
        onChange={handleSetLanguageOptions}
      />

      {languageOptions?.length > 0 && (
        <FormDropdown
          name='primaryLanguageId'
          label='Primary Language'
          options={languageOptions}
          validations={{ required: 'Please select a primary Language' }}
        />
      )}

      <FormDropdownRest
        name='currencyIds'
        label='Currency'
        isMulti={true}
        restServiceHook={useGetCurrencies}
        validations={{ required: 'Please select a Currency' }}
        onChange={handleSetCurrencyOptions}
      />

      {currenciesOptions?.length > 0 && (
        <FormDropdown
          name='primaryCurrencyId'
          label='Primary Currency'
          options={currenciesOptions}
          validations={{ required: 'Please select a primary Currency' }}
        />
      )}

      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />

      {isLoading && <LoadingSpinner text='Updating Country' />}
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

export default CountryEditForm;
