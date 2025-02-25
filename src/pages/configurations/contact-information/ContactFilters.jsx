import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/Search';
import { useQueryClient } from '@tanstack/react-query';

const ContactFilters = ({
  page,
  pageSize,
  totalPages,
  totalItems,
  setPageSize,
  setPage,
  setSearchTerm,
  getRecordLength,
}) => {
  // console.log(data?.data?.content);
  const queryClient = useQueryClient();

  const handlePageChange = (newPage) => {
    // Prefetch data when page changes
    queryClient.prefetchQuery(['contact-informations', newPage, pageSize]);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <SearchInput
            className='h-6 items-center'
            // value={searchTerm}
            onChange={(e) => setSearchTerm(e)}
          />
          <span className='px-1'> {getRecordLength} Records</span>
        </div>

        <div>
          <Pagination
            itemsPerPage={pageSize}
            totalItems={totalItems}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            setPageSize={setPageSize}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactFilters;
