/* eslint-disable no-unused-vars */
export const initialAuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

/* Action Types */
const SET_USER = 'SET_USER';
const SET_LOADING = 'SET_LOADING';

/* Action Creators */
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

/* Reducer */
const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case SET_LOADING:
      return {
        isLoading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
