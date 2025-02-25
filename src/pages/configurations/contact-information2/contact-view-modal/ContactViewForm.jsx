import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';

const ContactViewForm = ({ contact, setIsOpen }) => {
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Contact</h4>
      <Input value={contact.name} label='Name' disabled />
      <Input value={contact.type} label='Type' disabled />
      <Input value={contact.email} label='Email' disabled />
      <Input value={contact.phone} label='Phone' disabled />
      <Input value={contact.description} label='Description' disabled />
      <Input value={contact.address} label='Address' disabled />
      <Input value={contact.status} label='Status' disabled />
      <div className='flex justify-center mt-5'>
        <Button variant='secondary' onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default ContactViewForm;
