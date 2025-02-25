import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { DASHBOARD_URL } from '@/configuration/config';
import authService from '@/services/auth/authService';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Dashboard = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const dashboardURL = DASHBOARD_URL + '?sid=' + btoa(authService.getToken());

  const handleLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <>
      <iframe
        className={twMerge('h-full w-full', !iframeLoaded && 'hidden')}
        src={dashboardURL}
        onLoad={handleLoad}
      ></iframe>

      {!iframeLoaded && (
        <div className='h-screen'>
          <LoadingSpinner text='Loading Dashboard' />
        </div>
      )}
    </>
  );
};

export default Dashboard;
