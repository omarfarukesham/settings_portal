import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import CountriesTableActionBtn from './CountriesTableActionBtn';
// import CountriesTableActionButtons from './CountriesTableActionButtons';
// import TaxRulesTableActionButtons from './TaxRulesTableActionButtons';

const CountriesTable = ({ data }) => {
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
      label: 'ISO Code Full',
      key: 'isoCodeFull',
    },
    {
      label: 'ISO Code Short',
      key: 'isoCodeShort',
    },
    {
      label: 'Dial Code',
      key: 'dialCode',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: <div className='text-center'>Action</div>,
      content: (_, rowData) => <CountriesTableActionBtn attribute={rowData} />,
    },
  ];
  return (
    <div className='h-full overflow-auto'>
      <DataTable columns={columns} data={data} />
      {data.length === 0 && <NoDataFound />}
    </div>
  );
};

export default CountriesTable;
