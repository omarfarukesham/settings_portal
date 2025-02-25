import TableHead from '../TableHead';
import TableHeader from '../TableHeader';

const DataTableHeader = ({ columns }) => {
  const renderCell = (column, value) => {
    if (column.headerContent) {
      return column.headerContent();
    }
    return value;
  };

  return (
    <TableHeader>
      {columns?.map((column, index) => (
        <TableHead key={index} className='font-normal'>
          {renderCell(column, column.label)}
        </TableHead>
      ))}
    </TableHeader>
  );
};

export default DataTableHeader;
