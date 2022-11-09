import { Comments, Student, UserRole } from '@prisma/client';
import axios from 'axios';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import ExperienceDetails from 'components/Shareview/dataforms/ExperienceDetails';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { ModifiedExperienceType } from 'lib/interfaces';
import { prisma } from 'lib/prisma';
import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router';

export async function getServerSideProps(context: any) {
  const { params } = context;
  const experience = await prisma.experience.findUnique({
    where: { id: params.slug },
    include: { Student: { select: { name: true } } },
  });
  const comments = await prisma.comments.findMany({
    where: { experienceId: experience?.id },
  });
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: {
      experience: JSON.parse(JSON.stringify(experience)),
      comments: JSON.parse(JSON.stringify(comments)),
    },
  });
}

type ExpPageProps = {
  experience: ModifiedExperienceType;
  user: Student;
  comments: Comments;
};

export default function ExperiencePage({
  experience,
  user,
  comments,
}: ExpPageProps) {
  const [comment, setComment] = useState<string>();

  async function handleComments(e: any) {
    e.preventDefault();
    const data = {
      by: user.email,
      body: comment,
      experienceId: experience.id,
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
    <>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-screen rounded-md shadow-none bg-slate-100'>
        <div className=' flex flex-col'>
          <Link href={'/shareview'}>
            <a className='my-5 ml-28 text-blue-800 font-semibold rounded flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 mr-1'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>
              Back
            </a>
          </Link>
        </div>

        <ExperienceDetails
          experience={experience}
          forAdmin={experience.by === user.email ? true : false}
          tnp={false}
          user={user}
          comments={comments}
        />
        {/*comments form starts*/}
        {/* <div className='w-full flex flex-col items-center mt-4'>
          <fieldset className="flex flex-col gap-2 items-start rounded mt-2 p-5 bg-white shadow-lg w-fit">
              <h1 className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-2 w-fit">Comments</h1>
              <div className="flex flex-col items-start rounded mt-2 w-full">
                
                <form onSubmit={handleComments}>
                  <textarea
                      className='p-2 w-full rounded bg-white text-sm md:text-base border-2 border-gray-500 focus:outline-none focus:border-blue-300 transition ease-in-out delay-75 duration-75'
                      placeholder='Comment your thoughts'
                      required
                  />
                  <button type='submit' className='text-white text-sm bg-purple-500 border py-0.5 px-3 my-2 rounded'>Comment</button>
                </form>
              </div>
              <div className="flex flex-col ml-1">
                <div className="flex flex-col my-0.5 gap-2">
                  <p className="text-sm font-semibold">👤Pranav Purkar <span className="text-blue-500">))</span></p>
                  <em className="text-sm mt-0.5">Nice post, thank you for posting this</em>
                </div>
                <div className="flex flex-col my-0.5 gap-2">
                  <p className="text-sm font-semibold">👤Aman Ilatkar <span className="text-blue-500">))</span></p>
                  <em className="text-sm mt-0.5">Nice post, thank you for posting this</em>
                </div>
              </div>
          </fieldset>

          <div>{comments.body}</div>
        </div> */}
          {/*comments form ends*/}
      </div>
    </>
  );
}
