const PageInnerContainer = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-bg-color-2 h-full rounded overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default PageInnerContainer;
