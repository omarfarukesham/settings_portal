import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';

const CountryViewForm = ({ country, setIsOpen }) => {
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Country</h4>
      <Input value={country.name} label='Name' disabled />
      <Input value={country.isoCodeFull} label='ISO Code Full' disabled />
      <Input value={country.isoCodeShort} label='ISO Code Short' disabled />
      <Input value={country.dialCode} label='Dial Code' disabled />
      <Input
        value={country.languages?.map((e) => e.name)?.join(', ')}
        label='Languages'
        disabled
      />
      <Input
        value={country.languages?.filter((e) => e.isPrimary)[0]?.name}
        label='Primary Language'
        disabled
      />
      <Input
        value={country.currencies?.map((e) => e.name)?.join(', ')}
        label='Currencies'
        disabled
      />
      <Input
        value={country.currencies?.filter((e) => e.isPrimary)[0]?.name}
        label='Primary Currency'
        disabled
      />
      <Input value={country.status} label='Status' disabled />
      <div className='flex justify-center mb-5'>
        <Button
          className='mb-2'
          variant='secondary'
          onClick={() => setIsOpen(false)}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default CountryViewForm;
