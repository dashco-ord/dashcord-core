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
    <StudentsLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none'>
        <div className=' flex flex-col bg-slate-100'>
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
        />
        <div className='w-full flex flex-col items-center mt-4'>
          {/*comments form starts*/}
          <div>
            <h3>Comments : </h3>
            <form onSubmit={handleComments}>
              <textarea
                className='shadow'
                onChange={(e) => setComment(e.target.value)}
              />
              <br />
              <input
                type='submit'
                value='comment'
                className='bg-purple-700 hover:bg-purple-900 text-white rounded p-1'
              />
            </form>
          </div>
          {/*comments form ends*/}

          <div>{JSON.stringify(comments)}</div>
        </div>
      </div>
    </StudentsLayout>
  );
}
