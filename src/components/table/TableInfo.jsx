const TableInfo = ({ info }) => {
  return (
    <div className='my-3'>
      <table className='w-full'>
        <tbody className='text-left'>
          {info.map((data, index) => (
            <tr
              key={index}
              className='border-t border-gray-2 hover:bg-secondary-300 odd:bg-light-3'
            >
              <td className='p-3 text-label'>{data.label}</td>
              <td className='p-3 text-right text-label'>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableInfo;
