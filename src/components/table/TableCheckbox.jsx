import Checkbox from '@/components/ui/Checkbox';

const TableCheckbox = ({ items, selectedItems, setSelectedItems }) => {
  return (
    <Checkbox
      checked={items.length === selectedItems.length}
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedItems(items);
        } else {
          setSelectedItems([]);
        }
      }}
    />
  );
};

export default TableCheckbox;
