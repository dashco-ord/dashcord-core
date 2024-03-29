import { Experience, Student, UserRole } from '@prisma/client';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import ExperienceModal from 'components/Shareview/dataforms/ExperienceModal';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { ModifiedExperienceType } from 'lib/interfaces';
import { prisma } from 'lib/prisma';
import Link from 'next/link';

export async function getServerSideProps(context: any) {
  const { params } = context;
  const experience = await prisma.experience.findUnique({
    where: { id: params.slug },
    include: { Student: { select: { name: true } } },
  });

  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: { experience: JSON.parse(JSON.stringify(experience)) },
  });
}

type ExpPageProps = {
  experience: ModifiedExperienceType;
  user: Student;
};

export default function UpdateExperiencePage({
  experience,
  user,
}: ExpPageProps) {
  return (
    <StudentsLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <div className=' flex flex-col mb-7'>
          <h1 className='font-bold text-xl'>Shareview</h1>
          <Link href={'/shareview'}>
            <a className='mt-7 text-blue-800 font-semibold rounded flex items-center'>
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

        <ExperienceModal
          experience={experience}
          forAdmin={experience.by === user.email ? true : false}
          tnp={false}
        />
      </div>
    </StudentsLayout>
  );
}
