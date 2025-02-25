import LogoutIcon from '@/assets/icons/LogoutIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import Button from '@/components/ui/Button';
import { MASTER_PORTAL_URL } from '@/configuration/config';
import { useAuthContext } from '@/context/authContext';
import useOutsideClick from '@/hooks/useClickOutside';
import authService from '@/services/auth/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const closeUserMenu = () => setShowUserMenu(false);

  const userMenuRef = useOutsideClick(closeUserMenu);

  const { user } = useAuthContext();

  const handleLogout = () => {
    authService.logout();
    navigate('/', { replace: true });
    window.location.reload();
  };

  const goToProfile = () => {
    window.location.href = `${MASTER_PORTAL_URL}/admin/profile?sid=${btoa(
      authService.getToken(),
    )}`;
  };

  return (
    <div className='relative w-full h-16 bg-primary md:bg-bg-color-2 text-white md:text-black px-4 flex items-center gap-8 justify-end'>
      {/* <div className='relative'>
        <BellIcon className='stroke-white md:stroke-black' />
        <div className='absolute top-0 right-0 h-4 w-4 rounded-full bg-danger text-white text-xs flex justify-center items-center'>
          2
        </div>
      </div> */}

      <div className='flex items-center gap-4'>
        <span>{user?.username}</span>
        <div ref={userMenuRef}>
          <button onClick={toggleUserMenu}>
            <img
              src={user?.image}
              alt='user image'
              className='h-8 md:h-10 aspect-square rounded-full border border-gray-4'
            />
          </button>
          {showUserMenu && (
            <div className='absolute top-14 right-5 z-10 bg-primary text-white shadow-lg p-2 rounded-lg w-[220px]'>
              <div className='bg-white text-black p-3 rounded-lg'>
                <div className='flex items-center gap-3'>
                  <img
                    src={user?.image}
                    alt='user image'
                    className='h-8 md:h-10 aspect-square rounded-full border border-gray-4'
                  />
                  <div>
                    <p>{user?.name}</p>
                    <span className='text-sm text-gray-6 italic'>
                      {user?.username}
                    </span>
                  </div>
                </div>

                <Button
                  variant='texted'
                  className='mt-3 w-full justify-start'
                  onClick={goToProfile}
                >
                  <ProfileIcon />
                  Profile
                </Button>
              </div>
              {/* <hr className='text-gray my-3' /> */}
              <Button
                variant='texted'
                className='w-full justify-start mt-2'
                onClick={handleLogout}
              >
                <LogoutIcon className='fill-white' /> Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
