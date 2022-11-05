import { Experience, Student, UserRole } from '@prisma/client';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import ExperienceDetails from 'components/Shareview/dataforms/ExperienceDetails';
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

export default function ExperiencePage({ experience, user }: ExpPageProps) {
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
      </div>
    </StudentsLayout>
  );
}
