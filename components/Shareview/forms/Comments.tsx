import { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { CommentsComponentProps } from 'lib/types';
import moment from 'moment';

export default function Comments({
  comments,
  userEmail,
  experienceID,
}: CommentsComponentProps) {
  const [newComment, setNewComment] = useState<string>();

  async function handleComments(e: any) {
    e.preventDefault();
    const data = {
      by: userEmail,
      body: newComment,
      experienceId: experienceID,
    };

    try {
      const res = await axios.post('/api/shareview/createComment', data);
      if (res.status == 200) {
        Router.reload();
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className='w-full flex flex-col mt-4'>
      <div>
        <h3 className='font-bold text-lg'>Comments : </h3>
        <form onSubmit={handleComments}>
          <textarea
            className='shadow rounded w-[30rem] p-2'
            onChange={(e) => setNewComment(e.target.value)}
          />
          <br />
          <input
            type='submit'
            value='comment'
            className='bg-purple-700 hover:bg-purple-900 text-white rounded p-1 mt-2'
          />
        </form>
      </div>
      <div>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className='bg-white shadow w-fit p-3 rounded mt-3 max-w-[40rem]'>
            <div className='flex mb-1'>
              <p className='italic text-sm'>
                {
                  //@ts-ignore
                  comment?.Student.name
                }
              </p>
              <p className='italic text-sm ml-auto'>
                {moment(comment.createdAt).format('MMM Do YYYY')}
              </p>
            </div>

            <hr />
            <div className='mt-1'>{comment.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
