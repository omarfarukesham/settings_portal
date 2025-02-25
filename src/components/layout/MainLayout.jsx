import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuthContext } from '@/context/authContext';
import useTokenFromURL from '@/hooks/useTokenFromURL';
import authService from '@/services/auth/authService';
import { useUserInfo } from '@/services/auth/useAuth';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import RedirectToLogin from './RedirectToLogin';
import Topbar from './Topbar';
import Sidebar from './sidebar/Sidebar';

const MainLayout = () => {
  const { user, setUser } = useAuthContext();

  const {
    data: currentUser,
    isFetching,
    error,
    refetch: userRefresh,
  } = useUserInfo(() => {
    setUser(currentUser);
  });

  const tokenCheckingFromURL = useTokenFromURL();

  useEffect(() => {
    if (!user?.role?.appMenu?.length && authService.getToken()) {
      userRefresh(authService.getToken());
    }
  }, [user, userRefresh]);

  if (!tokenCheckingFromURL && !authService.getToken()) {
    return <RedirectToLogin message='You are not authenticated!' />;
  }

  if (!isFetching && !user && error) {
    authService.logout();
    return <RedirectToLogin message='Authentication failed!' />;
  }

  if (isFetching) {
    return (
      <div className='h-full'>
        <LoadingSpinner text='Authenticating' />
      </div>
    );
  }

  return (
    <div className='h-full flex overflow-hidden'>
      <Sidebar />
      <div className='flex-1 h-full w-full md:w-[calc(100%-250px)]'>
        <Topbar />
        <div className='h-[calc(100%-64px)]'>
          <Suspense fallback={<LoadingSpinner text='Loading your content' />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
