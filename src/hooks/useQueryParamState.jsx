import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // If using React Router for query parameters

const useQueryParamState = (defaultValue) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialValue = (paramName) => {
    const queryParams = new URLSearchParams(location.search);
    const defaultParam = defaultValue[paramName];
    const queryValue = queryParams.get(paramName);
    if (queryValue !== null) {
      return queryValue;
    } else {
      queryParams.set(paramName, defaultParam);
      return defaultParam;
    }
  };

  const stateFromDefaults = Object.keys(defaultValue).reduce(
    (acc, paramName) => {
      acc[paramName] = getInitialValue(paramName);
      return acc;
    },
    {},
  );

  const [value, setValue] = useState(stateFromDefaults);

  useEffect(() => {
    const queryParams = new URLSearchParams(value);
    navigate(location.pathname + '?' + queryParams.toString(), {
      replace: true,
    });
  }, [location.pathname, navigate, value]);

  return [value, setValue];
};

export default useQueryParamState;
