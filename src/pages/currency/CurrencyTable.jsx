import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import CurrencyTableActionBtn from './CurrencyTableActionBtn';

const CurrencyTable = ({ data }) => {
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
      label: 'Code',
      key: 'code',
    },
    {
      label: 'Symbol',
      key: 'symbol',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: <div className='text-center'>Action</div>,
      content: (_, rowData) => <CurrencyTableActionBtn attribute={rowData} />,
    },
  ];
  return (
    <div className='h-full overflow-auto'>
      <DataTable columns={columns} data={data} />
      {data.length === 0 && <NoDataFound />}
    </div>
  );
};

export default CurrencyTable;
