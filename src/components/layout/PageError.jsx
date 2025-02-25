const PageError = ({ message }) => {
  return (
    <div className='h-full flex justify-center items-center text-danger'>
      {message}
    </div>
  );
};

export default PageError;
