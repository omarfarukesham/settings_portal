import CrossIcon from '@/assets/icons/CrossIcon';
import HamburgerIcon from '@/assets/icons/HamburgerIcon';
import { LOGO_COLLAPSED, LOGO_LIGHT } from '@/configuration/resources';
import { useAppContext } from '@/context/appContext';
import useUserMenu from '@/hooks/useUserMenu';
import { toggleSidebar } from '@/reducer/appReducer';
import { Link } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  const { appState, dispatchAppState } = useAppContext();
  const { isSidebarCollapsed } = appState;

  const appMenu = useUserMenu();

  return (
    <>
      <div
        className={`absolute z-20 md:static h-screen shrink-0 flex flex-col bg-primary text-white transition-all duration-300 ${
          isSidebarCollapsed ? 'w-0 md:w-16' : 'w-[299px] md:w-[250px]'
        }`}
      >
        {/* Logo conditionally rendered */}
        <Link to='/'>
          {isSidebarCollapsed ? (
            <img
              src={LOGO_COLLAPSED}
              alt='logo'
              className='w-14 mx-auto my-5'
            />
          ) : (
            <img
              src={LOGO_LIGHT}
              alt='logo'
              className='w-1/2 md:w-4/5 mx-10 md:mx-auto my-5'
            />
          )}
        </Link>

        {/* Cross button for mobile only */}
        <button
          onClick={() => dispatchAppState(toggleSidebar())}
          className='md:hidden absolute right-5 top-6'
        >
          <CrossIcon className='h-5 w-5 fill-white' />
        </button>

        {/* All the menu items */}
        <ul className='my-5 flex-1 overflow-auto flex flex-col gap-4'>
          {appMenu.map((menu) => (
            <SidebarMenu menu={menu} key={menu.label} />
          ))}
        </ul>
      </div>

      <button
        onClick={() => {
          dispatchAppState(toggleSidebar());
        }}
      >
        <HamburgerIcon
          className={`absolute z-10 top-5 transition-all duration-300 fill-white md:fill-gray-7 ${
            isSidebarCollapsed ? 'left-4 md:left-16' : 'md:left-[250px]'
          }`}
        />
      </button>
      {!isSidebarCollapsed && (
        <div className='fixed w-screen h-screen top-0 left-0 bg-black opacity-70 z-10 md:hidden'></div>
      )}
    </>
  );
};

export default Sidebar;
