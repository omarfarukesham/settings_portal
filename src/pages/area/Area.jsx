import PageContainer from '@/components/layout/PageContainer';
import AreaBody from './AreaBody';
import AreaHeader from './AreaHeader';

const Area = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <AreaHeader />
      <AreaBody />
    </PageContainer>
  );
};

export default Area;
