const DropdownLabel = ({ label, required, className }) => {
  return (
    <>
      {label && (
        <span className={`text-label block mb-2.5 ${className}`}>
          {label} {required && <span className='text-danger'>*</span>}
        </span>
      )}
    </>
  );
};

export default DropdownLabel;
