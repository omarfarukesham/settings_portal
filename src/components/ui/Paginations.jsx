import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import Dropdown from '@/components/form/Dropdown';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ArrowRightIcon from './../../assets/icons/ArrowRightIcon';

const commonClasses =
  'bg-light-3 fill-gray-7 h-6 px-1 border border-gray-4 rounded disabled:cursor-not-allowed';

const Paginations = ({ paginate, page, perPage, onChange, className }) => {
  const [pageNumber, setPageNumber] = useState(page);
  const options = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ];
  const setPerPage = (option) => {
    onChange({
      perPage: option.value,
      page: 1,
    });
  };
  const handlePageNumChange = (pageNum) => {
    if (pageNum > 0 && pageNum <= paginate?.totalPages && !(pageNum === page)) {
      // Updating parent state
      onChange({
        page: pageNum,
      });
    } else if (pageNum === '' || !(pageNum < 1) || pageNum === page) {
      // Allowing wrong input (Local state change only).
      setPageNumber(pageNum);
    }
  };

  // Auto update the wrong input (Local state change only).
  const handlePageNumBlur = (pageNum) => {
    pageNum < 1 && setPageNumber(page);
    pageNum > paginate?.totalPages && handlePageNumChange(paginate?.totalPages);
  };

  // For wrong page number given by user
  useEffect(() => {
    paginate?.totalPages < page && onChange({ page: paginate?.totalPages });
  }, [paginate, page, onChange]);

  // Updating the local state if parent state is changed
  useEffect(() => {
    setPageNumber(page);
  }, [page]);

  const handlePrevPageClick = () => {
    handlePageNumChange(Number(pageNumber) - 1);
  };
  const handleNextPageClick = () => {
    handlePageNumChange(Number(pageNumber) + 1);
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
        disabled={paginate?.first || !paginate?.totalPages}
      >
        <ArrowLeftIcon className='fill-gray-7' />
      </button>
      <input
        className={`w-6 text-center outline-none ${commonClasses}`}
        type='number'
        max={paginate?.totalPages}
        value={pageNumber}
        onChange={(e) => handlePageNumChange(e.target.value)}
        onBlur={(e) => handlePageNumBlur(e.target.value)}
      />
      <div>of {paginate?.totalPages}</div>
      <button
        className={commonClasses}
        onClick={handleNextPageClick}
        disabled={paginate?.last || !paginate?.totalPages}
      >
        <ArrowRightIcon className='fill-gray-7' />
      </button>
    </div>
  );
};

export default Paginations;
