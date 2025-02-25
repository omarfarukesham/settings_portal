import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { useAppContext } from '@/context/appContext';
import useOutsideClick from '@/hooks/useClickOutside';
import { toggleSidebar } from '@/reducer/appReducer';
import authService from '@/services/auth/authService';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import MenuIcon from '../../../components/ui/MenuIcon';
import SidebarSubMenu from './SidebarSubMenu';
import SidebarSubMenuCollapsible from './SidebarSubMenuCollapsible';

const SidebarMenu = ({ menu }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const closeSubMenu = () => setShowSubMenu(false);
  const ref = useOutsideClick(closeSubMenu); // closes the sub menu on clicking anywhere other than the button and sub menu

  const location = useLocation();
  const navigate = useNavigate();

  const { appState, dispatchAppState } = useAppContext();
  const { isSidebarCollapsed, isMobile } = appState;

  const menuSelected = menu.children
    ? menu.children.find((subMenu) => subMenu.link === location.pathname)
    : menu.link === location.pathname;

  const handleMenuClick = () => {
    if (menu.link) {
      if (menu.link.includes('http')) {
        window.location.href = `${menu.link}?sid=${btoa(
          authService.getToken(),
        )}`;
      } else navigate(menu.link);
    } else if (isSidebarCollapsed) {
      dispatchAppState(toggleSidebar());
      setShowSubMenu(true);
    } else {
      setShowSubMenu(!showSubMenu);
    }
  };

  return (
    <li
      className={twMerge(
        'p-3 rounded-lg w-5/6 mx-auto text-label',
        menuSelected && 'bg-secondary',
        menu.children && showSubMenu && 'bg-primary-400',
        menu.children && showSubMenu && 'border-primary-300 border',
      )}
      ref={ref}
    >
      <button
        className={`flex items-center w-full ${
          isSidebarCollapsed ? 'justify-center' : 'justify-between'
        }`}
        onClick={handleMenuClick}
      >
        <div
          className={`flex items-center gap-4 ${
            isSidebarCollapsed && 'justify-center'
          }`}
        >
          <div>
            <MenuIcon
              icon={menu.icon}
              isWhite={(menu.children && showSubMenu) || !menuSelected}
            />
          </div>
          {!isSidebarCollapsed && (
            <div
              className={twMerge(
                'text-left',
                menuSelected && 'text-primary',
                menu.children && showSubMenu && 'text-white',
              )}
            >
              {menu.label}
            </div>
          )}
        </div>
        {menu.children && !isSidebarCollapsed && (
          <ArrowRightIcon
            className={twMerge(
              'fill-white',
              menuSelected && 'fill-primary',
              menu.children && showSubMenu && 'fill-white',
              menu.children &&
                showSubMenu &&
                isMobile &&
                'rotate-90 fill-white',
            )}
          />
        )}
      </button>
      {menu.children &&
        showSubMenu &&
        !isSidebarCollapsed &&
        (isMobile ? (
          <SidebarSubMenuCollapsible menu={menu} closeSubMenu={closeSubMenu} />
        ) : (
          <SidebarSubMenu menu={menu} closeSubMenu={closeSubMenu} />
        ))}
    </li>
  );
};

export default SidebarMenu;
