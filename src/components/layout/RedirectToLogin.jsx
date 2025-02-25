import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RedirectToLogin = ({ message: RedirectionMessage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    toast.error(RedirectionMessage);
    navigate('/', {
      state: { from: location.pathname },
      replace: true,
    });
  }, [location.pathname, navigate, RedirectionMessage]);

  return null;
};

export default RedirectToLogin;
