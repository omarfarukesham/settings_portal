import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import ContactInfoTableActionBtn from './ContactInfoTableActionBtn';

const ContactInfoTable = ({ data }) => {
  const columns = [
    {
      label: 'SL No.',
      key: 'serial',
    },
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Type',
      key: 'type',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Phone',
      key: 'phone',
    },
    {
      label: 'Description',
      key: 'description',
    },
    {
      label: 'Address',
      key: 'address',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: <div className='text-center'>Action</div>,
      content: (_, rowData) => (
        <ContactInfoTableActionBtn attribute={rowData} />
      ),
    },
  ];
  return (
    <div className='h-full overflow-auto'>
      <DataTable columns={columns} data={data} />
      {data.length === 0 && <NoDataFound />}
    </div>
  );
};

export default ContactInfoTable;
