import Table from '../Table';
import DataTableBody from './DataTableBody';
import DataTableHeader from './DataTableHeader';

const DataTable = ({
  data,
  columns,
  onClick = () => null,
  onRowClick,
  hoverEffect,
  className,
}) => {
  return (
    <Table className={className} onClick={onClick}>
      <DataTableHeader columns={columns} />
      <DataTableBody
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        hoverEffect={hoverEffect}
      />
    </Table>
  );
};

export default DataTable;
