import { useAuthContext } from '@/context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../ui/LoadingSpinner';

const RouteAuthorization = ({
  element: Component,
  permission: permissionName,
}) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  if (!user) {
    return <LoadingSpinner text='Authorizing' />;
  }
  const allowed = user?.role?.permissions?.find(
    (permission) => permission === permissionName,
  );

  if (!allowed) {
    toast.error('You are unauthorized for this action!');
    navigate('/admin/home', { replace: true });
    return;
  }

  return <Component />;
};

export default RouteAuthorization;
