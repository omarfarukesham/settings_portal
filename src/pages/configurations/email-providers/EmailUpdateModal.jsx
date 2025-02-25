import CrossIcon from '@/assets/icons/CrossIcon';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import { useUpdateEmailData } from '@/services/configurations/ConfigEmailServices';
// import { useUpdateContactData } from '@/services/configurations/ConfigContactServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EmailUpdateModal = ({ isOpen, onClose, tittle, values = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    smtpHost: '',
    smtpPort: '',
    apiKey: '',
    apiSecretKey: '',
    accessToken: '',
    username: '',
    password: '',
    status: 'ACTIVE',
  });

  const isSMTPHostValid = (host) => {
    const pattern =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return pattern.test(host);
  };

  //Hook for refresh the setFormData
  useEffect(() => {
    if (values) {
      setFormData(values);
    }
  }, [values]);

  // Contact Data update hook is calling here from SettingZone service
  const updateDataMutation = useUpdateEmailData();
  const UpdateData = async (e) => {
    e.preventDefault();

    if (!isSMTPHostValid(formData.smtpHost)) {
      toast.error('SMTP Host is not a valid IP address');
      return;
    }

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
        <div className='flex justify-end'>
          <button
            onClick={() => {
              onClose(false);
            }}
          >
            <CrossIcon className='fill-primary' />
          </button>
        </div>
        <h5 className='font-bold py-3'>{tittle}</h5>
        <form onSubmit={(e) => UpdateData(e, formData)}>
          <div className='grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Name</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='Provider Name'
                required
                name='name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>SMTP Host</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='smtpHost'
                required
                name='smtpHost'
                value={formData.smtpHost}
                onChange={(e) =>
                  setFormData({ ...formData, smtpHost: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>SMTP Port</label>
              <input
                type='number'
                className='border rounded w-full px-3 py-2'
                placeholder='Port'
                required
                name='smtpPort'
                value={formData.smtpPort}
                onChange={(e) =>
                  setFormData({ ...formData, smtpPort: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>API Key</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='API Key'
                required
                name='apiKey'
                value={formData.apiKey}
                onChange={(e) =>
                  setFormData({ ...formData, apiKey: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Api Secret Key</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='Api Secret Key'
                required
                name='apiSecretKey'
                value={formData.apiSecretKey}
                onChange={(e) =>
                  setFormData({ ...formData, apiSecretKey: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>AccessToken</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='Access Token'
                required
                name='accessToken'
                value={formData.accessToken}
                onChange={(e) =>
                  setFormData({ ...formData, accessToken: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>User Name</label>
              <input
                type='text'
                className='border rounded w-full px-3 py-2'
                placeholder='User Name'
                required
                name='username'
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Password</label>
              <input
                type='password'
                className='border rounded w-full px-3 py-2'
                placeholder='password'
                required
                name='password'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 mb-1'>Status</label>
              <select
                name='status'
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
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

export default EmailUpdateModal;

{
  /* <div className='mb-4'>
<label className='block text-gray-700 mb-1'>Status</label>
<select
  name='status'
  value={formData.status}
  onChange={(e) =>
    setFormData({ ...formData, status: e.target.value })
  }
  className='border rounded w-full px-3 py-2'
>
  <option value='ENABLED'>ENABLED</option>
  <option value='DISABLED'>DISABLED</option>
</select>
</div> */
}
