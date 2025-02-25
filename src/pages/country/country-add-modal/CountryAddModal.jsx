import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  useAddCountry,
  useGetCurrencies,
  useGetLanguage,
} from '@/services/settings/CountriesService';
import { useState } from 'react';
import { toast } from 'react-toastify';
// import { useAddTaxCategory } from '@/services/tax/taxCategoryService';

const CountryAddModal = ({ isOpen, setIsOpen }) => {
  const { isLoading, error, mutate: addCountry } = useAddCountry();
  const [languageOptions, setLanguageOptions] = useState([]);
  const [currenciesOptions, setCurrenciesOptions] = useState([]);

  const handleCreateCountry = (formData) => {
    const data = {
      ...formData,
      languageIds: formData.languageIds.map((languageId) => ({
        id: languageId,
        isPrimary: formData.primaryLanguageId === languageId || false,
      })),
      currencyIds: formData.currencyIds.map((currencyId) => ({
        id: currencyId,
        isPrimary: formData.primaryCurrencyId === currencyId || false,
      })),
    };

    addCountry(data, {
      onSuccess: () => {
        toast.success('Successfully added');
        setIsOpen(false);
      },
    });
  };

  const handleSetLanguageOptions = (languages) => {
    setLanguageOptions(languages);
  };
  const handleSetCurrencyOptions = (currencies) => {
    setCurrenciesOptions(currencies);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        onSubmit={handleCreateCountry}
        className='p-10 flex flex-col gap-5 max-h-[600px]  overflow-auto'
      >
        <h4 className='text-center'>New - Country</h4>
        <FormInput
          name='name'
          label='Name'
          placeholder='Country Name'
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
          restServiceHook={useGetLanguage}
          isMulti={true}
          validations={{ required: 'Please select a Language' }}
          onChange={handleSetLanguageOptions}
        />

        {languageOptions.length > 0 && (
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

        {currenciesOptions.length > 0 && (
          <FormDropdown
            name='primaryCurrencyId'
            label='Primary Currency'
            options={currenciesOptions}
            validations={{ required: 'Please select a primary Currency' }}
          />
        )}

        {isLoading && <LoadingSpinner text='Adding Country' />}
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

export default CountryAddModal;
