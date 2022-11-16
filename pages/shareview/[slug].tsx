import { UserRole } from '@prisma/client';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import ExperienceDetails from 'components/Shareview/dataforms/ExperienceDetails';
import Comments from 'components/Shareview/forms/Comments';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { prisma } from 'lib/prisma';
import Link from 'next/link';
import { ExperiencePageProps } from 'lib/types';

export async function getServerSideProps(context: any) {
  const { params } = context;
  const experience = await prisma.experience.findUnique({
    where: { id: params.slug },
    include: { Student: { select: { name: true } } },
  });
  const comments = await prisma.comments.findMany({
    where: { experienceId: experience?.id },
    include: { Student: { select: { name: true } } },
  });
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: {
      experience: JSON.parse(JSON.stringify(experience)),
      comments: JSON.parse(JSON.stringify(comments)),
    },
  });
}

export default function ExperiencePage({
  experience,
  user,
  comments,
}: ExperiencePageProps) {
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
        <div>
          <Comments
            userEmail={user.email}
            //@ts-ignore
            comments={comments}
            experienceID={experience.id}
          />
        </div>
      </div>
    </>
  );
}
