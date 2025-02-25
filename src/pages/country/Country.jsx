import PageContainer from '@/components/layout/PageContainer';
import CountryBody from './CountryBody';
import CountryHeader from './CountryHeader';

const Country = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <CountryHeader />
      <CountryBody />
    </PageContainer>
  );
};

export default Country;
