import PageContainer from '@/components/layout/PageContainer';
import ZoneBody from './ZoneBody';
import ZoneHeader from './ZoneHeader';

const Zone = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <ZoneHeader />
      <ZoneBody />
    </PageContainer>
  );
};

export default Zone;
