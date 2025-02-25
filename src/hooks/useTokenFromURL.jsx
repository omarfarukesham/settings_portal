import authService from '@/services/auth/authService';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useTokenFromURL = () => {
  const [tokenCheckingFromURL, setTokenCheckingFromURL] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const paramName = 'sid';

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has(paramName)) {
      /* Setting token to localStorage */
      try {
        const token = atob(queryParams.get(paramName));
        if (token) {
          authService.setToken(token);
        }
      } catch (error) {
        //throw new Error('Invalid Session ID');
      }
      /* Removing param and replacing URL */
      queryParams.delete(paramName);
      navigate({
        replace: true,
        search: queryParams.toString(),
      });
    }

    setTokenCheckingFromURL(false);
  }, [location.search, navigate]);
  return tokenCheckingFromURL;
};

export default useTokenFromURL;
