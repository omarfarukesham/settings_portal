import PageContainer from '@/components/layout/PageContainer';
import ContactInfoBody from './ContactInfoBody';
import ContactInfoHeader from './ContactInfoHeader';

const ContactInformation = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <ContactInfoHeader />
      <ContactInfoBody />
    </PageContainer>
  );
};
export default ContactInformation;
