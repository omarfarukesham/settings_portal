import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import PageContainer from '@/components/layout/PageContainer';
import PageInnerContainer from '@/components/layout/PageInnerContainer';
import Table from '@/components/table/Table';
import TableBody from '@/components/table/TableBody';
import TableData from '@/components/table/TableData';
import TableHead from '@/components/table/TableHead';
import TableHeader from '@/components/table/TableHeader';
import TableRow from '@/components/table/TableRow';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  useDeleteEmailInfo,
  useGetEmailData,
} from '@/services/configurations/ConfigEmailServices';

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EmailFilters from './EmailFilters';
import EmailHeader from './EmailHeader';
import EmailUpdateModal from './EmailUpdateModal';

const EmailProviders = () => {
  let [searchParams] = useSearchParams();
  const [page, setPage] = useState(+searchParams.get('currentPage') || 1);
  const [pageSize, setPageSize] = useState(+searchParams.get('limit') || 5);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetEmailData(
    'email-providers',
    `/email-providers`,
    page - 1,
    pageSize,
    searchTerm,
  );

  const [openUpdateEmailModal, setUpdateEmailModal] = useState(false);

  //update Contact data .........
  const openUpdateModal = (id) => {
    const contactForUpdate = data?.data?.content.find((item) => item.id === id);
    if (contactForUpdate) {
      setUpdateEmailModal(contactForUpdate);
    }
  };

  //Delete update data operation
  const deleteDataMutation = useDeleteEmailInfo();
  const deleteData = async (id) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this data?',
    );

    if (userConfirmed) {
      try {
        await deleteDataMutation.mutateAsync(id);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <PageContainer className='flex flex-col '>
      <EmailHeader />

      <div className='bg-white rounded-sm'>
        <EmailFilters
          page={page}
          pageSize={pageSize}
          totalItems={data?.data?.totalElements}
          totalPages={data?.data?.totalPages}
          setPageSize={setPageSize}
          setPage={setPage}
          setSearchTerm={setSearchTerm}
          getRecordLength={data?.data?.content.length}
        />
      </div>
      <PageInnerContainer className='flex-1 overflow-y-auto'>
        <div className='bg-white shadow-md rounded flex flex-col  overflow-hidden'>
          <div className='flex-1 overflow-auto'>
            <Table>
              <TableHeader>
                <TableHead>Sl</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>SMTP Host</TableHead>
                <TableHead>SMTP Port</TableHead>
                <TableHead>Api Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableHeader>

              <TableBody className='text-gray-600 text-sm font-light'>
                {isLoading ? (
                  <TableRow>
                    <TableData colSpan={9} className='items-center'>
                      <div className='flex justify-center w-full'>
                        <LoadingSpinner />
                      </div>
                    </TableData>
                  </TableRow>
                ) : (
                  ''
                )}
                {data?.data.content.length == 0 ? (
                  <TableRow className='text-center text-secondary'>
                    <TableData> No Data available</TableData>
                  </TableRow>
                ) : (
                  ''
                )}

                {/* country data map here  */}
                {data?.data?.content.map((item, index) => (
                  <TableRow key={index}>
                    <TableData>{page * pageSize + index + 1}</TableData>
                    {/* <TableData>{index + 1}</TableData> */}
                    <TableData>{item.name}</TableData>
                    <TableData>{item.smtpHost}</TableData>
                    <TableData>{item.smtpPort}</TableData>
                    <TableData>{item.apiKey}</TableData>
                    <TableData>{item.status}</TableData>
                    <TableData>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='table-action'
                          onClick={() => openUpdateModal(item.id)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => deleteData(item.id)}
                          variant='table-action'
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* modal component and passing props from here  */}
        <EmailUpdateModal
          isOpen={openUpdateEmailModal}
          onClose={setUpdateEmailModal}
          tittle='Update Info'
          // onSubmit={updateCountry}
          values={openUpdateEmailModal}
        />
      </PageInnerContainer>
    </PageContainer>
  );
};

export default EmailProviders;
