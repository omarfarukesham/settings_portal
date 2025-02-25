import PageContainer from '@/components/layout/PageContainer';
import CurrencyBody from './CurrencyBody';
import CurrencyHeader from './CurrencyHeader';

const Currency = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <CurrencyHeader />
      <CurrencyBody />
    </PageContainer>
  );
};

export default Currency;
