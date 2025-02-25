import CalendarIcon from '@/assets/icons/CalendarIcon';
import RemoveIcon from '@/assets/icons/RemoveIcon';
import ReplyIcon from '@/assets/icons/ReplyIcon';
import { useState } from 'react';
import Button from './Button';

const ChatItemBox = ({ name, message, image }) => {
  const [replyComment, setReplyComment] = useState(false);
  const replyComments = () => {
    setReplyComment(!replyComment); // Toggle the state between true and false
  };

  return (
    <>
      <div className='flex gap-4 text-black'>
        <div className=''>
          <img src={image} alt='Chat' className='w-20' />
        </div>
        <div className='h-[133px] flex-1 bg-gray-2 p-4 rounded-lg overflow-y-auto no-scrollbar'>
          <div className='flex justify-between text-gray-6'>
            <p className='lg:text-base-1 text-base-1 font-bold'>{name}</p>
            <p className='text-label flex items-center'>
              <span className='mr-2'>
                <CalendarIcon className='w-3 ' />
              </span>
              5 May, 2023
            </p>
          </div>
          <hr className='mt-1 bg-white'></hr>
          <div className='py-2'>
            <small className='text-base-1'>{message}</small>
          </div>

          <div className='flex justify-start items-center gap-x-3 mt-2 text-gray-6'>
            <button className='flex items-center' onClick={replyComments}>
              <ReplyIcon />
              <span className='px-1 text-label font-bold'>Reply</span>
            </button>
            <button className='flex items-center px-2  font-bold '>
              <RemoveIcon />
              <span className='px-1 text-label'> Remove</span>
            </button>
          </div>
        </div>
      </div>

      {replyComment && (
        <div className='flex gap-4 mt-2'>
          <div className=''>
            <img src={image} alt='' className='w-20' />
          </div>
          <div className='w-[90%] rounded overflow-y-auto no-scrollbar'>
            <textarea
              placeholder='Write your comment here'
              className='w-full rounded-lg border border-white p-2  outline-none text-white bg-primary'
            />
            <div className='flex justify-end mt-2'>
              <Button
                variant='outlined'
                size='small'
                className='text-black bg-gray-1'
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatItemBox;
