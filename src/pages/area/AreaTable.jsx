import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import AreaTableActionBtn from './AreaTableActionBtn';

const AreaTable = ({ data }) => {
  // console.log(data);
  const columns = [
    {
      label: 'SL No.',
      key: 'serial',
    },
    {
      label: 'Area Name',
      key: 'name',
    },
    {
      label: 'Zone Name',
      key: 'zoneName',
    },
    {
      label: 'State Name',
      key: 'stateName',
    },
    {
      label: 'Country Name',
      key: 'countryName',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: <div className='text-center'>Action</div>,

      content: (_, rowData) => <AreaTableActionBtn attribute={rowData} />,
    },
  ];
  return (
    <div className='h-full overflow-auto'>
      <DataTable columns={columns} data={data} />
      {data.length === 0 && <NoDataFound />}
    </div>
  );
};

export default AreaTable;
