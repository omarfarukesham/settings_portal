import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import AppProvider from './context/appContext';
import router from './routes/router';
import './styles/form.css';
import './styles/globals.css';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
