import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import Dropdown from '@/components/form/Dropdown';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import InputField from '../form/InputField';
import ArrowRightIcon from './../../assets/icons/ArrowRightIcon';
const Pagination = ({
  page,
  setPage,
  totalPages,
  itemsPerPage,
  className,
  setPageSize,
  handlePageSizeChange,
}) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [inputPage, setInputPage] = useState(page);

  const options = [
    { value: '2', label: '2' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ];
  const setNumberOfItemsPerPage = (option) => {
    // eslint-disable-next-line no-console
    setPageSize(option.value);
    setPage(0);
    setInputPage(1);
    setSearchParams({
      currentPage: 0,
      limit: option.value,
    });
  };

  const goBack = () => {
    if (page > 1) {
      setPage(page - 1);
      setInputPage(page - 1);
      setSearchParams({
        currentPage: page - 1,
        limit: searchParams.get('limit') || 5,
      });
    }
  };

  const goNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setInputPage(page + 1);
      setSearchParams({
        currentPage: page + 1,
        limit: searchParams.get('limit') || 5,
      });
    }
  };

  // console.log({ currentPage: page, inputPage });
  const commonClasses =
    'bg-light-3 fill-gray-7 h-6 px-1 border border-gray-4 rounded';

  return (
    <div className={twMerge('flex gap-3 text-label items-center', className)}>
      <Dropdown
        title='Number of Items Per Page'
        options={options}
        variant='outlined'
        arrowContainerClass='bg-light-3 fill-gray-7'
        defaultOption={{ value: itemsPerPage, label: itemsPerPage }}
        onChange={setNumberOfItemsPerPage}
      />
      <div>per page</div>
      <button
        className={twMerge(commonClasses, page <= 1 && 'cursor-not-allowed')}
        onClick={goBack}
        disabled={page <= 1}
      >
        <ArrowLeftIcon className='fill-gray-7' />
      </button>
      <InputField
        className={`w-6 text-center ${commonClasses}`}
        value={inputPage}
        type='number'
        min='1'
        max={totalPages}
        onBlur={(e) => {
          if (!e.target.value) {
            setInputPage(+searchParams.get('currentPage') || 1);
            setPage(+searchParams.get('currentPage') || 1);
            return;
          }
          setInputPage(+e.target.value);
          setPage(+e.target.value);
        }}
        onChange={(e) => {
          if (e) {
            setInputPage(+e);
          } else {
            setInputPage('');
          }
        }}
      />

      <div>of {totalPages}</div>
      <button
        className={twMerge(
          commonClasses,
          page >= totalPages && 'cursor-not-allowed',
        )}
        onClick={goNext}
        disabled={page >= totalPages}
      >
        <ArrowRightIcon className='fill-gray-7' />
      </button>
    </div>
  );
};

export default Pagination;
