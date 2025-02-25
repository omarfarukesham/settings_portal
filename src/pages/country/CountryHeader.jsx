import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import PlusIcon from '@/assets/icons/PlusIcon';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountryAddModal from './country-add-modal/CountryAddModal';

const CountryHeader = () => {
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className='flex gap-3 items-center justify-between flex-wrap'>
      <div className='grid gap-2'>
        <div className='text-lg font-bold'>Country</div>
        <Breadcrumb />
      </div>

      <div className='flex gap-3'>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeftIcon className='ml-[-5px]' />
          Back
        </Button>
        <Button onClick={() => setIsAddOpen(true)}>
          <PlusIcon className='w-5 h-5 ml-[-5px]' />
          Add New
        </Button>
      </div>

      {isAddOpen && (
        <CountryAddModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      )}
    </div>
  );
};

export default CountryHeader;
