import { Outlet } from 'react-router-dom';

const Configurations = () => {
  return (
    <div className='h-full w-full p-4 bg-bg-color-1'>
      <Outlet />
    </div>
  );
};

export default Configurations;
