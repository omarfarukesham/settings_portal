import EditIcon from '@/assets/icons/EditIcon';
import EyeIcon from '@/assets/icons/EyeIcon';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import AreaEditModal from './area-edit-modal/AreaEditModal';
import AreaViewModal from './area-view-modal/AreaViewModal';

const AreaTableActionBtn = (data) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // console.log(data.attribute.id);
  return (
    <div className='flex gap-3 pl-6 justify-center'>
      <Button variant='table-action' onClick={() => setIsViewOpen(true)}>
        <EyeIcon className='fill-gray-8' />
      </Button>
      <Button variant='table-action' onClick={() => setIsEditOpen(true)}>
        <EditIcon className='fill-gray-8' />
      </Button>

      {isViewOpen && (
        <AreaViewModal
          isOpen={isViewOpen}
          setIsOpen={setIsViewOpen}
          id={data?.attribute?.id}
        />
      )}

      {isEditOpen && (
        <AreaEditModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          id={data?.attribute?.id}
        />
      )}
    </div>
  );
};

export default AreaTableActionBtn;
