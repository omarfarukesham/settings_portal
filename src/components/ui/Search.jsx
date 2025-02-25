import SearchIcon from '@/assets/icons/SearchIcon';
import { twMerge } from 'tailwind-merge';
import InputField from '../form/InputField';

/**
 * Reusable SearchInput component.
 * @param {string} placeholder - The placeholder text for the search input.
 * @param {function} onSearch - The callback function called when search is triggered.
 * @param {string} className - Any className if needed (try to use it less)
 */
const Search = ({
  name = 'search',
  placeholder = 'Search',
  className,
  iconClassName,
  ...rest
}) => {
  return (
    <div className='relative'>
      <InputField
        className={twMerge(
          'pr-2 pl-7 h-[26px] rounded border border-gray-6 w-full bg-transparent text-sm text-gray-6',
          className,
        )}
        type='text'
        name={name}
        placeholder={placeholder}
        {...rest}
      />
      <SearchIcon
        className={twMerge(
          'absolute top-[5px] left-2 stroke-gray-6 pointer-events-none',
          iconClassName,
        )}
      />
    </div>
  );
};

export default Search;
