import { UserRole } from '@prisma/client';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import CreateExperience from 'components/Shareview/forms/CreateExperience';
import GlobalFeed from 'components/Shareview/Global';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { useState } from 'react';
import { prisma } from 'lib/prisma';
import { ModifiedExperienceType } from 'lib/interfaces';

export async function getServerSideProps(context: any) {
  const experiences = await prisma.experience.findMany({
    include: { Student: { select: { name: true } } },
  });
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: { experiences: JSON.parse(JSON.stringify(experiences)) },
  });
}

type ShareviewHomeProps = {
  experiences: ModifiedExperienceType[];
};

export default function ShareviewHome({ experiences }: ShareviewHomeProps) {
  const [view, setView] = useState('global');

  return (
    <StudentsLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-xl'>Shareview</h1>
        <em className='text-sm text-slate-400'>Interview Experiences straight from college students</em>

        <div className='mt-5 border border-purple-500 flex w-fit text-sm lg:text-md'>
          <p
            className={`border-r-2 pr-1 p-1 cursor-pointer ${
              view === 'global' ? 'bg-purple-500 text-white' : 'text-slate-600'
            }`}
            onClick={() => setView('global')}>
            Feed
          </p>
          {/* <p
            className={`border-r border-purple-500 pr-1 p-1 cursor-pointer ${
              view === 'personal'
                ? 'bg-purple-500 text-white'
                : 'text-slate-600'
            }`}
            onClick={() => setView('personal')}>
            Personal Feed
          </p> */}
          <p
            className={` pr-1 p-1 cursor-pointer ${
              view === 'post' ? 'bg-purple-500 text-white' : 'text-slate-600'
            }`}
            onClick={() => setView('post')}>
            Post experience
          </p>
        </div>

        {view === 'global' && (
          <GlobalFeed feed={experiences} forAdmins={false} />
        )}
        {view === 'post' && <CreateExperience />}
      </div>
    </StudentsLayout>
  );
}
