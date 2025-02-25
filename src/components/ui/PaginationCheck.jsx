import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import Dropdown from '@/components/form/Dropdown';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ArrowRightIcon from './../../assets/icons/ArrowRightIcon';

const commonClasses =
  'bg-light-3 fill-gray-7 h-6 px-1 border border-gray-4 rounded';

const Pagination = ({
  paginate,
  currentPage,
  perPage,
  onChange,
  className,
}) => {
  const [pageNumber, setPageNumber] = useState(currentPage);
  const options = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ];
  const setPerPage = (option) => {
    onChange({
      perPage: option.value,
    });
  };

  const handlePageNumChange = (pageNum) => {
    onChange({
      pageNumber: pageNum > 0 ? pageNum : 1,
    });
  };

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  const handleNextPageClick = () => {
    !paginate?.last && handlePageNumChange(currentPage + 1);
  };

  const handlePrevPageClick = () => {
    !paginate?.first && handlePageNumChange(currentPage - 1);
  };

  return (
    <div className={twMerge('flex gap-3 text-label items-center', className)}>
      <Dropdown
        title='Number of Items Per Page'
        options={options}
        variant='outlined'
        arrowContainerClass='bg-light-3 fill-gray-7'
        defaultOption={{ value: perPage, label: perPage }}
        onChange={setPerPage}
      />
      <div>per page</div>
      <button
        className={commonClasses}
        onClick={handlePrevPageClick}
        disabled={paginate?.first}
      >
        <ArrowLeftIcon className='fill-gray-7' />
      </button>
      <input
        className={`w-6 text-center outline-none ${commonClasses}`}
        type='number'
        min='1'
        max={paginate?.totalPages}
        value={pageNumber}
        onChange={(e) => handlePageNumChange(e.target.value)}
      />
      <div>of {paginate?.totalPages}</div>
      <button
        className={commonClasses}
        onClick={handleNextPageClick}
        disabled={paginate?.last}
      >
        <ArrowRightIcon className='fill-gray-7' />
      </button>
    </div>
  );
};

export default Pagination;
