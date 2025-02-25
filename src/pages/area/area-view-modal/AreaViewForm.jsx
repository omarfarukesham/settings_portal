import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';

const AreaViewForm = ({ area, setIsOpen }) => {
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Area (Thana)</h4>
      <Input value={area.name} label='Name' disabled />
      <Input value={area?.zoneName} label='Zone (District)' disabled />
      <Input value={area.status} label='Status' disabled />
      <div className='flex justify-center mt-5'>
        <Button variant='secondary' onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default AreaViewForm;
