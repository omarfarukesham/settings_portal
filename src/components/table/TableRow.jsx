const TableRow = ({ children, className, hoverEffect = true, ...props }) => {
  return (
    <tr
      className={`border-y border-light-2 text-left even:bg-light-3 ${className} ${
        hoverEffect && 'hover:bg-gray-2'
      }`}
      {...props}
    >
      {children}
    </tr>
  );
};

export default TableRow;
