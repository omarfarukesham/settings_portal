const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`h-full w-full px-6 py-4 bg-bg-color-1 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
