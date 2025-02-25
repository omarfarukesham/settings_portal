import PageContainer from '@/components/layout/PageContainer';
import LanguageBody from './LanguageBody';
import LanguageHeader from './LanguageHeader';

const Language = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <LanguageHeader />
      <LanguageBody />
    </PageContainer>
  );
};

export default Language;
