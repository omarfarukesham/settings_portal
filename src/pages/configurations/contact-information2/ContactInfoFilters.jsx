import Paginations from '@/components/ui/Paginations';
import Search from '@/components/ui/Search';
import debounce from '@/utilities/debounce';
// import debounce from '@/utilities/debounce';

const ContactInfoFilters = ({ onFilterChange, filters, paginate }) => {
  const handleSearchNameChange = (newSearchName) => {
    onFilterChange({
      name: newSearchName,
      perPage: 10,
      page: 1,
    });
  };

  const debounceSearch = debounce(handleSearchNameChange, 500);

  return (
    <div className='p-5 flex items-center flex-wrap gap-3'>
      <div className='flex items-center gap-3'>
        <Search onChange={debounceSearch} />
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
    </div>
  );
};

export default ContactInfoFilters;
