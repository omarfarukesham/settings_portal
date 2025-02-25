import Button from '@/components/ui/Button';

const ColumnSelectionModalHeader = ({ onSave, onCancel }) => {
  return (
    <div className='flex justify-between'>
      <div className='text-base-2 font-normal'>Select and Arrange Columns</div>
      <div className='flex gap-4'>
        <Button
          variant='texted-outlined'
          className='h-[31px]'
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant='texted-outlined'
          className='h-[31px] bg-primary text-white border-none'
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ColumnSelectionModalHeader;
