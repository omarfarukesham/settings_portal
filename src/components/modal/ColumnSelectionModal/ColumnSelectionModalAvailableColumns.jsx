import Search from '@/components/ui/Search';
import { useState } from 'react';

const ColumnSelectionModalAvailableColumns = ({
  availableColumns,
  toggleSelection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='flex-1 flex flex-col bg-white drop-shadow rounded-lg text-label-sm overflow-hidden'>
      <div className='bg-light px-4 py-2 flex gap-4 justify-between h-12 items-center'>
        <div>Available Columns</div>
        <Search
          className='bg-white'
          type='text'
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder='Search'
        />
      </div>
      <div className='flex-1 flex flex-col gap-2 p-4 overflow-auto'>
        {availableColumns
          .filter((column) =>
            column.label.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((column, key) => (
            /* Item row for available column */
            <div key={key} className='flex gap-3 items-center'>
              <input
                id={'key' + column.key}
                type='checkbox'
                checked={column.isEnabled}
                value={column.isEnabled}
                onChange={() => {
                  toggleSelection(column);
                }}
              />
              <label htmlFor={'key' + column.key} className='w-full py-1'>
                {column.label}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColumnSelectionModalAvailableColumns;
