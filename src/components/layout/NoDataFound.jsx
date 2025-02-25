const NoDataFound = ({ className }) => {
  return (
    <div
      className={`h-full flex justify-center items-center p-3 text-label text-gray-8 ${className}`}
    >
      No Data Found
    </div>
  );
};

export default NoDataFound;
