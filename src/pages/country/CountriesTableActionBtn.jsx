import EditIcon from '@/assets/icons/EditIcon';
import EyeIcon from '@/assets/icons/EyeIcon';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import CountryEditModal from './country-edit-modal/CountryEditModal';
import CountryViewModal from './country-view-modal/CountryViewModal';

const CountriesTableActionBtn = (data) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <div className='flex gap-3 pl-6 justify-center'>
      <Button variant='table-action' onClick={() => setIsViewOpen(true)}>
        <EyeIcon className='fill-gray-8' />
      </Button>
      <Button variant='table-action' onClick={() => setIsEditOpen(true)}>
        <EditIcon className='fill-gray-8' />
      </Button>

      {isViewOpen && (
        <CountryViewModal
          isOpen={isViewOpen}
          setIsOpen={setIsViewOpen}
          id={data?.attribute?.id}
        />
      )}

      {isEditOpen && (
        <CountryEditModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          id={data?.attribute?.id}
        />
      )}
    </div>
  );
};

export default CountriesTableActionBtn;
