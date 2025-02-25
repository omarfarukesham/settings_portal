import { useAuthContext } from '@/context/authContext';

const useUserMenu = () => {
  const { user } = useAuthContext();
  if (user) {
    const { role } = user;
    if (role) return role.appMenu;
  } else return [];
};

export default useUserMenu;
