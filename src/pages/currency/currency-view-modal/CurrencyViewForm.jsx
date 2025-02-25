import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';

const CurrencyViewForm = ({ currency, setIsOpen }) => {
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Currency</h4>
      <Input value={currency.name} label='Name' disabled />
      <Input value={currency.code} label='Code' disabled />
      <Input value={currency.symbol} label='Symbol' disabled />
      <Input value={currency.status} label='Status' disabled />
      <div className='flex justify-center mt-5'>
        <Button variant='secondary' onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default CurrencyViewForm;
