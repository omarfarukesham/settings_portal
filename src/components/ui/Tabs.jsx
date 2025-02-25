import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Tabs = ({
  children,
  items,
  onChange,
  activeClassName = 'border-t border-x border-secondary bg-bg-color-2',
  defaultSelected,
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultSelected);

  // useEffect(() => {
  //   setSelectedTab(items?.[0]?.key);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    onChange(selectedTab);
  }, [onChange, selectedTab]);

  return (
    <div>
      <div className='flex items-center gap-2 w-full overflow-x-scroll md:overflow-x-auto'>
        {items?.length &&
          items.map((item) => {
            return (
              <div
                key={item.key}
                onClick={() => setSelectedTab(item.key)}
                className={twMerge(
                  'bg-white rounded-t-lg p-3 text-center cursor-pointer whitespace-nowrap',
                  selectedTab === item.key && activeClassName,
                )}
              >
                {item.label}
              </div>
            );
          })}
      </div>

      <div className='w-full rounded-lg'>{children}</div>
    </div>
  );
};

export default Tabs;
