import OneLineIcon from '@/assets/icons/OneLineIcon';
import ThreeLineIcon from '@/assets/icons/ThreeLineIcon';
import Button from '@/components/ui/Button';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * * This component is sortable
 */
const ColumnSelectionModalActiveColumns = ({
  availableColumns,
  setSortedActiveColumns,
  toggleSelection,
}) => {
  const [activeColumns, setActiveColumns] = useState([]);

  useEffect(() => {
    setActiveColumns(
      availableColumns
        .filter((column) => column.isEnabled)
        .sort((a, b) => a.sequenceId - b.sequenceId),
    );
  }, [availableColumns]);

  // Reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    let sortedColumns = reorder(
      activeColumns,
      result.source.index,
      result.destination.index,
    );

    // Updating the sequenceId for each column
    sortedColumns = sortedColumns.map((column, key) => ({
      ...column,
      sequenceId: key + 1,
    }));

    // Need for this component
    setActiveColumns(sortedColumns);

    // Need for parent component to use onSave
    setSortedActiveColumns(sortedColumns);
  };

  return (
    <div className='flex-1 flex flex-col bg-white drop-shadow rounded-lg text-label-sm overflow-hidden'>
      <div className='bg-light px-4 py-2 flex h-12 items-center'>
        Active Columns
      </div>
      <DragDropContext onDragEnd={onDragEnd} className=''>
        <Droppable droppableId='droppableId'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={twMerge(
                'flex-1 flex flex-col gap-2 p-4 overflow-auto',
                snapshot.isDraggingOver ? 'bg-light-3' : 'bg-white',
              )}
            >
              <span style={{ display: 'none' }}>{provided.placeholder}</span>
              {activeColumns.map((column, key) => (
                /* Item row for active column */
                <Draggable
                  key={column.key}
                  draggableId={column.key}
                  index={key}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        userSelect: 'none',
                        position: 'static',
                      }}
                      className={twMerge(
                        'bg-bg-color-2 border border-gray-4 rounded flex items-center px-2 py-1 h-8 justify-between',
                        snapshot.isDragging && 'bg-light',
                      )}
                    >
                      {column.label}
                      <div className='flex gap-2'>
                        <Button
                          variant='table-action'
                          className='h-4 w-4'
                          onClick={() => {
                            toggleSelection(column);
                          }}
                        >
                          <OneLineIcon className='fill-gray-8' />
                        </Button>
                        <Button
                          variant='table-action'
                          className='h-4 w-4'
                          {...provided.dragHandleProps}
                        >
                          <ThreeLineIcon className='fill-gray-8' />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ColumnSelectionModalActiveColumns;
