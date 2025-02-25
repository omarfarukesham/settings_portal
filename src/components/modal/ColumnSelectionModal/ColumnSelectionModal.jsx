import { useState } from 'react';
import Modal from '../Modal';
import ColumnSelectionModalActiveColumns from './ColumnSelectionModalActiveColumns';
import ColumnSelectionModalAvailableColumns from './ColumnSelectionModalAvailableColumns';
import ColumnSelectionModalHeader from './ColumnSelectionModalHeader';

const ColumnSelectionModal = ({
  availableColumns = [],
  setAvailableColumns,
  isOpen,
  setIsOpen,
  onSave,
}) => {
  const [allAvailableColumns, setAllAvailableColumns] =
    useState(availableColumns); // Local state
  const [sortedActiveColumns, setSortedActiveColumns] = useState(
    availableColumns.filter((column) => column.isEnabled),
  ); // Local state for updating later on save

  const toggleSelection = (column) => {
    const modifiedAvailableColumns = allAvailableColumns.map((aColumn) => {
      if (aColumn.key === column.key)
        return { ...aColumn, isEnabled: !aColumn.isEnabled };
      else return aColumn;
    });
    setAllAvailableColumns(modifiedAvailableColumns);
  };

  const saveColumnsConfiguration = () => {
    // Create a map using sortedActiveColumns for efficient lookup
    const updateMap = new Map(
      sortedActiveColumns.map(({ key, sequenceId }) => [key, sequenceId]),
    );

    // Update sequenceId in allAvailableColumns using the updateMap
    const aColumns = allAvailableColumns.map((column) => ({
      ...column,
      sequenceId: updateMap.get(column.key) || column.sequenceId,
    }));

    // Updating to local state
    setAllAvailableColumns(aColumns);

    // Saving to parent state
    setAvailableColumns(aColumns);
  };

  const onSaveHandle = () => {
    saveColumnsConfiguration();
    // Optional to use now. This will be needed later to save data in backend.
    onSave && onSave(allAvailableColumns);
    setIsOpen(false);
  };

  const onCancelHandle = () => {
    setAllAvailableColumns(availableColumns);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      className='bg-bg-color-2 flex flex-col gap-4 h-[92%] lg:h-[555px] xl:w-[853px] p-8 overflow-hidden'
    >
      {/* Header */}
      <ColumnSelectionModalHeader
        setIsOpen={setIsOpen}
        onSave={onSaveHandle}
        onCancel={onCancelHandle}
      />

      {/* Body */}
      <div className='flex-1 flex flex-col gap-5 md:flex-row p-[2px] overflow-hidden'>
        {/* Available Columns */}
        <ColumnSelectionModalAvailableColumns
          availableColumns={allAvailableColumns}
          toggleSelection={toggleSelection}
        />

        {/* Active Columns */}
        <ColumnSelectionModalActiveColumns
          availableColumns={allAvailableColumns}
          sortedActiveColumns={sortedActiveColumns}
          setSortedActiveColumns={setSortedActiveColumns}
          toggleSelection={toggleSelection}
        />
      </div>
      {/* End: Body */}
    </Modal>
  );
};

export default ColumnSelectionModal;
