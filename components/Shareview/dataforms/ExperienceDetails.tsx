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
            <div className='flex flex-col gap-1 p-7 px-12'>
              <div className='flex items-center justify-between'>
                <em className='font-bold text-3xl text-gray-800'>
                  {experience.title}
                </em>
                <p className='text-justify text-white rounded-lg mx-4 px-2 py-0.5 text-sm bg-gray-500 w-fit'>
                  {moment(experience.createdAt).format('MMM Do YYYY')}
                </p>
              </div>
              <p className='text-gray-500 font-semibold text-lg'>
                Role : {experience.role} | Company : {experience.company} |
                Package : {experience.salary} LPA | Criteria :{' '}
                {experience.criteria}%
              </p>
              <p className='text-justify text-white rounded-lg px-2 py-0.5 text-sm bg-purple-500 w-fit'>
                {experience.tags}
              </p>
              <p className='text-gray-800 my-4 text-lg text-justify text-ellipsis'>
                {experience.body}
              </p>
              <div className='flex items-center justify-between'>
                <div className='flex gap-2 py-2'>
                  <button className='text-blue-500 hover:text-purple-500 text-left'>
                    like ❤️
                  </button>
                  <button className='text-blue-500 hover:text-purple-500 text-left'>
                    comment 🗨️
                  </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
