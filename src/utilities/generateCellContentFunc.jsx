const generateCellContentFunc = (type, column) => {
  let content = null;

  if (type === 'image') {
    content = (cellData) => {
      return (
        <div className=''>
          <img src={cellData} className='h-7 ml-4' />
        </div>
      );
    };
  } else if (type === 'time-range') {
    content = (_, row) => {
      const { from, to } = row[column.key];
      return (
        <span>
          {from} - {to}
        </span>
      );
    };
  }

  return content;
};

export default generateCellContentFunc;
