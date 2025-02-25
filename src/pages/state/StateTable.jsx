import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import StateTableActionBtn from './StateTableActionBtn';

const StateTable = ({ data }) => {
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
      label: 'Country',
      key: 'countryName',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: <div className='text-center'>Action</div>,
      content: (_, rowData) => <StateTableActionBtn attribute={rowData} />,
    },
  ];
  return (
    <div className='h-full overflow-auto'>
      <DataTable columns={columns} data={data} />
      {data.length === 0 && <NoDataFound />}
    </div>
  );
};

export default StateTable;
