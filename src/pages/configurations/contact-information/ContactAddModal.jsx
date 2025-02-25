import CrossIcon from '@/assets/icons/CrossIcon';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import { useAddContactData } from '@/services/configurations/ConfigContactServices';
import { useState } from 'react';
import { toast } from 'react-toastify';
const phoneRegex = /^[0-9+]+$/;

const ContactAddModal = ({ isOpen, onClose, tittle }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    phone: '',
    description: '',
    status: 'ACTIVE',
  });

  // contact information add to database hooks that calling from contact service
  const addDataMutation = useAddContactData();
  const addContact = async (e) => {
    e.preventDefault();
    try {
      const statusArray = formData.status;
      const res = await addDataMutation.mutateAsync({
        formData: { ...formData, status: statusArray },
        onClose,
      });
      onClose(false);
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} className='p-6'>
        {/* modal close button here  */}
        <div className='flex justify-end'>
          <button
            onClick={() => {
              onClose(false);
            }}
          >
            <CrossIcon className='fill-primary' />
          </button>
        </div>

        {/* modal tittle is showing as props  */}
        <h5 className='font-bold py-3'>{tittle}</h5>

        {/* contact info submit form here  */}
        <form onSubmit={(e) => addContact(e, formData)}>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Name</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='Contact'
                required
                name='name'
                // value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Business Type</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='Business Type'
                required
                name='type'
                // value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Email</label>
              <input
                type='email'
                className='border rounded w-full px-3 py-2'
                placeholder='Email'
                required
                name='email'
                // value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Phone</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='Phone No'
                required
                name='phone'
                value={formData.phone}
                onChange={(e) => {
                  const phoneValue = e.target.value;
                  if (phoneRegex.test(phoneValue)) {
                    setFormData({ ...formData, phone: phoneValue });
                  }
                }}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Descriptions</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='Desc'
                required
                name='description'
                // value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-1'>Status</label>
              <select
                name='status'
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
                className='border rounded w-full px-3 py-2'
              >
                <option value='ACTIVE'>Active</option>
                <option value='INACTIVE'>Inactive</option>
              </select>
            </div>
          </div>
          <div className='mt-6 flex justify-center'>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ContactAddModal;
