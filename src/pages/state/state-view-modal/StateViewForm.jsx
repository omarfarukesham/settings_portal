import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';

const StateViewForm = ({ country, setIsOpen }) => {
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - State (Division)</h4>
      <Input value={country.name} label='Name' disabled />
      <Input value={country?.countryName} label='Country Name' disabled />
      <Input value={country.status} label='Status' disabled />
      <div className='flex justify-center mt-5'>
        <Button variant='secondary' onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default StateViewForm;
