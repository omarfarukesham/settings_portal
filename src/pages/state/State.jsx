import PageContainer from '@/components/layout/PageContainer';
import StateBody from './StateBody';
import StateHeader from './StateHeader';

const State = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <StateHeader />
      <StateBody />
    </PageContainer>
  );
};

export default State;
