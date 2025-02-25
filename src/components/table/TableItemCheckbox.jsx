import Checkbox from '@/components/ui/Checkbox';

const TableItemCheckbox = ({ item, selectedItems, setSelectedItems }) => {
  return (
    <Checkbox
      checked={!!selectedItems.find((prod) => prod.sku === item.sku)}
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedItems([...selectedItems, item]);
        } else {
          setSelectedItems(
            selectedItems.filter((prod) => prod.sku !== item.sku),
          );
        }
      }}
    />
  );
};

export default TableItemCheckbox;
