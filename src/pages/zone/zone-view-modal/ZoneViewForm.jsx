import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';

const ZoneViewForm = ({ zone, setIsOpen }) => {
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Zone (District)</h4>
      <Input value={zone.name} label='Name' disabled />
      <Input value={zone?.stateName} label='State (Division)' disabled />
      <Input value={zone.status} label='Status' disabled />
      <div className='flex justify-center mt-5'>
        <Button variant='secondary' onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default ZoneViewForm;
