import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';

const LanguageViewForm = ({ language, setIsOpen }) => {
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Language</h4>
      <Input value={language.name} label='Name' disabled />
      <Input value={language.code} label='Code' disabled />
      <Input value={language.status} label='Status' disabled />
      <div className='flex justify-center mt-5'>
        <Button variant='secondary' onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default LanguageViewForm;
