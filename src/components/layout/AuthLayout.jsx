import { DEFAULT_REDIRECTION_PATH } from '@/configuration/config';
import authService from '@/services/auth/authService';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authService.getToken()) {
      navigate(location.state?.from || DEFAULT_REDIRECTION_PATH, {
        replace: true,
      });
    }
  }, [navigate, location]);

  return (
    <div className='w-full h-screen bg-gradient-to-tr from-primary-400 to-primary-500'>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
