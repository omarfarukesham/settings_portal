import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import removeUndefinedKeys from '@/utilities/removeUndefinedKeys';

const AreaFiltersModal = ({
  isOpen,
  setIsOpen,
  filters,
  applyFilters,
  clearFilters,
}) => {
  const filtersData = {
    ...filters,
  };

  const handleApplyFilters = (data) => {
    // console.log(data);
    applyFilters(removeUndefinedKeys(data));
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    clearFilters();
    setIsOpen(false);
  };

  const stateStatusOptions = [
    {
      label: 'Active',
      value: 'ACTIVE',
    },
    {
      label: 'InActive',
      value: 'INACTIVE',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className='flex flex-col gap-10 p-10'
    >
      <Form
        onSubmit={handleApplyFilters}
        defaultValues={filtersData}
        className='flex-1 flex flex-col gap-10'
      >
        <div className='flex-1'>
          <div className='grid md:grid-cols-2 gap-x-10 gap-y-6'>
            <FormInput name='name' label='Name' placeholder='Area' />
            <FormDropdown
              name='status'
              label='Status'
              options={stateStatusOptions}
            />
          </div>
        </div>
        <div className='flex justify-center gap-5'>
          <Button type='submit' className='text-white border-white'>
            Apply Filters
          </Button>
          <Button
            onClick={handleClearFilters}
            variant='secondary'
            className='text-white border-white'
          >
            Clear Filters
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AreaFiltersModal;
