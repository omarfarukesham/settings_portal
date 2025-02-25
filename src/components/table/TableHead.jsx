const TableHead = ({ children, className = '', ...props }) => {
  return (
    <th className={`p-3 ${className}`} {...props}>
      {children}
    </th>
  );
};

export default TableHead;
