/* eslint-disable no-unused-vars */
export const initialAppState = {
  isSidebarCollapsed: false,
  isMobile: false,
};

/* Action Types */
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
const SET_IS_MOBILE = 'SET_IS_MOBILE';

/* Action Creators */
export const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR,
  };
};
export const openSidebar = () => {
  return {
    type: OPEN_SIDEBAR,
  };
};
export const closeSidebar = () => {
  return {
    type: CLOSE_SIDEBAR,
  };
};
export const setIsMobile = (isMobile) => {
  return {
    type: SET_IS_MOBILE,
    payload: {
      isMobile,
    },
  };
};

/* Reducer */
const appReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
      };
    case OPEN_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: false,
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: true,
      };
    case SET_IS_MOBILE:
      return {
        ...state,
        isMobile: action.payload.isMobile,
        isSidebarCollapsed: action.payload.isMobile ? true : false,
      };
    default:
      return state;
  }
};

export default appReducer;

// /* eslint-disable no-unused-vars */
// export const initialAppState = {
//   isSidebarCollapsed: false,
// };

// /* Action Types */
// const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
// const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';

// /* Action Creators */
// export const toggleSidebar = () => {
//   return {
//     type: TOGGLE_SIDEBAR,
//   };
// };
// export const closeSidebar = () => {
//   return {
//     type: CLOSE_SIDEBAR,
//   };
// };

// /* Reducer */
// const appReducer = (state, action) => {
//   switch (action.type) {
//     case TOGGLE_SIDEBAR:
//       return {
//         ...state,
//         isSidebarCollapsed: !state.isSidebarCollapsed,
//       };
//     case CLOSE_SIDEBAR:
//       return {
//         ...state,
//         isSidebarCollapsed: false,
//       };
//     default:
//       return state;
//   }
// };

// export default appReducer;
