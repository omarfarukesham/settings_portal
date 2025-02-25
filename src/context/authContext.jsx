/* eslint-disable react-refresh/only-export-components */
import authReducer, {
  setUser as actionSetUser,
  initialAuthState,
} from '@/reducer/authReducer';
import { createContext, useContext, useReducer } from 'react';

const authContext = createContext();
authContext.displayName = 'authContext';

export const useAuthContext = () => useContext(authContext);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const setUser = (user) => dispatch(actionSetUser(user));

  const contextValue = {
    ...state,
    setUser,
    dispatch,
  };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
