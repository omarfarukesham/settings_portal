import { useAppContext } from '@/context/appContext';
import { closeSidebar } from '@/reducer/appReducer';
import authService from '@/services/auth/authService';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const SidebarSubMenuCollapsible = ({ menu }) => {
  const navigate = useNavigate();
  const { dispatchAppState } = useAppContext();

  const handleSubMenuClick = (subMenu) => {
    if (subMenu.link.includes('http')) {
      window.location.href = `${subMenu.link}?sid=${btoa(
        authService.getToken(),
      )}`;
    } else navigate(subMenu.link);

    // Closing Sidebar as this is from mobile device
    dispatchAppState(closeSidebar(0));
  };

  return (
    <div className='w-full bg-primary-400 text-white text-label-sm mt-3'>
      <div className='flex flex-col pl-6 gap-1'>
        {menu.children.map((subMenu) => (
          <button
            key={subMenu.label}
            className={twMerge(
              'text-left px-4 py-3 rounded-lg hover:bg-secondary hover:text-primary',
              subMenu.link === location.pathname && 'bg-secondary text-primary',
            )}
            onClick={() => handleSubMenuClick(subMenu)}
          >
            {subMenu.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarSubMenuCollapsible;
