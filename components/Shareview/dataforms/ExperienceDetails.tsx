import { Experience } from '@prisma/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import moment from 'moment';
import { ModifiedExperienceType } from 'lib/interfaces';

export type ExperienceModalProps = {
  experience: ModifiedExperienceType;
  forAdmin: boolean;
  tnp: boolean;
};

export default function ExperienceDetails({
  experience,
  forAdmin,
  tnp,
}: ExperienceModalProps) {
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState(''); // package is reserved word in typescript strict mode
  const [criteria, setCriteria] = useState('');
  const [tags, setTags] = useState('');
  const [link, setLink] = useState('');
  const [body, setBody] = useState('');
  const [follow, setFollow] = useState(false);

  async function handleDelete(e: any) {
    e.preventDefault();
    const data = {
      id: experience.id,
    };
    try {
      const res = await axios.post('/api/shareview/deletePost', data);
      if (res.status == 200) {
        tnp ? Router.push('/tnp/shareview') : Router.push('/shareview');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-4/3 h-screen bg-slate-100' key={experience.id}>
      <div className='flex justify-center gap-10'>
        <div className='w-60 shadow-lg rounded h-fit p-4 py-8 bg-white'>
          <div className='flex flex-col gap-1'>
            <p className='text-gray-700 text-lg font-semibold'>
              👤{experience?.Student.name}
            </p>
            <hr className='border-gray-400' />

            <form action='' method='POST'>
              <button
                className={`px-2 py-1 mt-2 border border-green-700 rounded hover:text-green-500 hover:bg-white ${
                  follow ? 'text-green-500 bg-white' : 'text-white bg-green-500'
                }`}>
                {follow ? 'Following' : 'Follow'}
              </button>
            </form>
          </div>
        </div>

        <div className='w-2/3'>
          <div className='shadow-lg rounded bg-white'>
            <div className='flex flex-col gap-1 p-7 px-5'>
              <div className='flex items-center justify-between'>
                <h1 className='font-bold text-3xl text-gray-800'>
                  {experience.title}
                </h1>
                <p className='text-justify text-white rounded-lg mx-4 px-2 py-0.5 text-sm bg-gray-500 w-fit'>
                  {moment(experience.createdAt).format('MMM Do YYYY')}
                </p>
              </div>
              <p className='text-gray-500 font-semibold text-lg'>
                Role : {experience.role} | Company : {experience.company} |
                Package : {experience.salary} LPA | Criteria :{' '}
                {experience.criteria}%
              </p>
              <p className="text-justify text-white text-xs flex">
                  {experience.tags.split(", ").map(tag =>(
                    <p className="bg-purple-500 w-fit rounded-lg px-2 py-0.5 mr-1">{tag}</p>
                  ))}
              </p>
              <p className='text-gray-800 mt-2 text-lg text-justify text-ellipsis'>
                {experience.body}
              </p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center my-1'>
                  <p className='flex items-center cursor-pointer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5 mr-1 text-red-500'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                      />
                    </svg>
                    {experience.likes ? experience.likes : 0} Likes
                  </p>
                  <p className="flex italic-center cursor-pointer">
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5 ml-4 mr-1'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z'
                      />
                    </svg>
                    Comments
                  </p>
                </div> 
                {forAdmin ? (
                  <div className='flex w-fit items-center'>
                    <div>
                      <Link
                        href={`${
                          tnp
                            ? `/tnp/shareview/edit/${experience.id}`
                            : `/shareview/edit/${experience.id}`
                        }`}>
                        <a className='px-2 py-1 rounded font-semibold text-sm bg-purple-500 hover:bg-purple-700 cursor-pointer text-white'>
                          Edit Post
                        </a>
                      </Link>
                    </div>
                    <div>
                      <div
                        className='w-max ml-4 px-2 py-1 rounded font-semibold text-sm bg-red-500 hover:bg-red-700 cursor-pointer text-white'
                        onClick={handleDelete}>
                        Delete Post
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col items-start rounded mt-2 w-1/2">
                <textarea
                    className='p-2 w-full rounded bg-white text-sm md:text-base border-2 border-gray-500 focus:outline-none focus:border-blue-300 transition ease-in-out delay-75 duration-75'
                    placeholder='Comment your thoughts'
                    required
                />
                <button className='text-white text-sm bg-green-600 border border-green-800 py-0.5 px-3 my-2 rounded'>Comment</button>
              </div>
            </div>
          </div>
          {/* Comment Section */}
          <fieldset className="flex flex-col gap-2 items-start rounded mt-2 p-5 bg-white shadow-lg">
              <h1 className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-2 w-fit">Comments</h1>
              <div className="flex flex-col ml-1">
                <div className="flex my-0.5 gap-2">
                  <p className="text-sm font-semibold">👤Pranav Purkar <span className="text-blue-500">))</span></p>
                  <em className="text-sm mt-0.5">Nice post, thank you for posting this</em>
                </div>
                <div className="flex my-0.5 gap-2">
                  <p className="text-sm font-semibold">👤Aman Ilatkar <span className="text-blue-500">))</span></p>
                  <em className="text-sm mt-0.5">Nice post, thank you for posting this</em>
                </div>
              </div>
          </fieldset>

        </div>

      </div>
    </div>
  );
}
