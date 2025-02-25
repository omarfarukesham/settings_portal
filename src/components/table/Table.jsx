const Table = ({ children, className, ...props }) => {
  return (
    <table
      className={`w-full text-label-sm whitespace-nowrap ${className}`}
      {...props}
    >
      {children}
    </table>
  );
};

export default Table;
