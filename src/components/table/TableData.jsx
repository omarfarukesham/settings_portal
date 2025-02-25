const TableData = ({ children, className = '', ...props }) => {
  return (
    <td className={`p-3 ${className}`} {...props}>
      {children}
    </td>
  );
};

export default TableData;
