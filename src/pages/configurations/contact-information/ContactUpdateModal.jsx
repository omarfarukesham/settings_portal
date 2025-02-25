import CrossIcon from '@/assets/icons/CrossIcon';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import { useUpdateContactData } from '@/services/configurations/ConfigContactServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const phoneRegex = /^[0-9+]+$/;

const ContactUpdateModal = ({ isOpen, onClose, tittle, values = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    phone: '',
    description: '',
    status: 'ACTIVE',
  });

  //Hook for refresh the setFormData
  useEffect(() => {
    if (values) {
      setFormData(values);
    }
  }, [values]);

  // Contact Data update hook is calling here from SettingZone service
  const updateDataMutation = useUpdateContactData();
  const UpdateData = async (e) => {
    e.preventDefault();
    try {
      const res = await updateDataMutation.mutateAsync({
        id: values.id,
        formData: formData,
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
      {/* Contact update modal  UI here */}
      <Modal isOpen={isOpen} className='p-6'>
        {/* Modal close button here  */}
        <div className='flex justify-end'>
          <button
            onClick={() => {
              onClose(false);
            }}
          >
            <CrossIcon className='fill-primary' />
          </button>
        </div>

        {/* modal tittle showing from props  */}
        <h5 className='font-bold py-3'>{tittle}</h5>

        {/* update modal form here  */}
        <form onSubmit={(e) => UpdateData(e, formData)}>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Name</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='Contact'
                required
                name='name'
                value={formData.name}
                // onChange={handleNameChange}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-1'>Type</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='type'
                required
                name='type'
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-1'>Email</label>
              <input
                type='email'
                className='border rounded w-full px-3 py-2'
                placeholder='email'
                required
                name='email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-1'>Phone</label>
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
              <label className='block text-gray-700 mb-1'>Details</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='description'
                required
                name='description'
                value={formData.description}
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
                <option value='ACTIVE'>ACTIVE</option>
                <option value='INACTIVE'>INACTIVE</option>
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

export default ContactUpdateModal;
