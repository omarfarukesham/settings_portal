import FilterIcon from '@/assets/icons/FilterIcon';
import Button from '@/components/ui/Button';
import Paginations from '@/components/ui/Paginations';
import Search from '@/components/ui/Search';
import debounce from '@/utilities/debounce';
import { useState } from 'react';
import AreaFiltersModal from './AreaFiltersModal';
// import debounce from '@/utilities/debounce';

const AreaFilters = ({
  onFilterChange,
  filters,
  paginate,
  applyFilters,
  clearFilters,
}) => {
  const handleSearchNameChange = (newSearchName) => {
    onFilterChange({
      name: newSearchName,
      perPage: 10,
      page: 1,
    });
  };

  const debounceSearch = debounce(handleSearchNameChange, 500);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  return (
    <div className='p-5 flex items-center flex-wrap gap-3'>
      <div className='flex items-center gap-3'>
        <Search onChange={debounceSearch} />
        <Button
          onClick={() => setIsFiltersModalOpen(true)}
          variant='outlined'
          size='small'
          className='bg-white'
        >
          <FilterIcon /> Filter
        </Button>
        {paginate?.totalElements && (
          <div className='flex gap-1'>
            <strong>{paginate?.totalElements}</strong>
            <div>records</div>
          </div>
        )}
      </div>

      <div className='flex-1 flex flex-col gap-3 md:items-end'>
        <Paginations
          perPage={filters.perPage}
          page={filters.page}
          onChange={onFilterChange}
          paginate={paginate}
        />
      </div>
      {isFiltersModalOpen && (
        <AreaFiltersModal
          isOpen={isFiltersModalOpen}
          setIsOpen={setIsFiltersModalOpen}
          filters={filters}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      )}
    </div>
  );
};

export default AreaFilters;
