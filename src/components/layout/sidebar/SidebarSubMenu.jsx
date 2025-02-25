import CrossIcon from '@/assets/icons/CrossIcon';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const SidebarSubMenu = ({ menu, closeSubMenu }) => {
  const navigate = useNavigate();

  const handleSubMenuClick = (subMenu) => {
    navigate(subMenu.link);
    closeSubMenu();
  };
  return (
    <div className='absolute top-[64px] left-[299px] md:left-[250px] z-10 w-64 h-[calc(100vh-64px)] bg-primary-400 text-white pr-5 py-5 from-left'>
      <div className='flex items-center justify-between pl-10'>
        <p className='text-xl font-bold'>{menu.label}</p>
        <button onClick={closeSubMenu}>
          <CrossIcon color='white' className='w-5 h-5 fill-white' />
        </button>
      </div>
      <div className='flex flex-col my-8 pl-6'>
        {menu.children.map((subMenu) => (
          <button
            key={subMenu.label}
            className={twMerge(
              'text-left p-4 rounded-lg hover:bg-secondary hover:text-primary',
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

export default SidebarSubMenu;
