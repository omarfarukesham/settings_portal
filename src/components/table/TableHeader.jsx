const TableHeader = ({ children, className, ...props }) => {
  return (
    <thead>
      <tr
        className={`bg-light sticky top-0 border-b border-gray-2 h-[46px] text-left ${className}`}
        {...props}
      >
        {children}
      </tr>
    </thead>
  );
};

export default TableHeader;
