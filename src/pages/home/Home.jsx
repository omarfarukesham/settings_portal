import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import MenuIcon from '@/components/ui/MenuIcon';
import useUserMenu from '@/hooks/useUserMenu';
import { Link } from 'react-router-dom';

const Home = () => {
  const appMenu = useUserMenu();
  return (
    <div className='px-10 pb-10 overflow-y-auto h-full'>
      <h2 className='my-5'>Welcome back!</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        {appMenu.map((menu) => (
          <div
            key={menu.label}
            className='shadow border-gray-8 p-3 rounded hover:scale-105 transition-all'
          >
            <h4 className='flex items-center gap-1  transition-all'>
              <MenuIcon menuName={menu.label} className='fill-black' />
              {menu.link ? (
                <>
                  <Link className='hover:underline' to={menu.link}>
                    {menu.label}
                  </Link>
                  <ArrowRightIcon />
                </>
              ) : (
                menu.label
              )}
            </h4>
            {menu.children && (
              <ul className='flex flex-col gap-3 ml-8 mt-3'>
                {menu.children.map((child) => (
                  <li
                    key={child.label}
                    className='flex items-center gap-1 hover:gap-5 transition-all text-gray-7'
                  >
                    <Link className='hover:underline' to={child.link}>
                      {child.label}
                    </Link>
                    <ArrowRightIcon />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
