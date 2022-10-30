import { Events, Status, UserRole } from '@prisma/client';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { useState } from 'react';
import { prisma } from 'lib/prisma';
import UpcomingEvents from 'components/Events/Upcoming';
import OngoingEventsPage from 'components/Events/Ongoing';
import ConcludedEventsPage from 'components/Events/Concluded';

export async function getServerSideProps(context: any) {
  const upcoming = await prisma.events.findMany({
    where: { status: Status.Upcoming },
    include: {
      Student: {
        select: {
          name: true,
        },
      },
    },
  });
  const ongoing = await prisma.events.findMany({
    where: { status: Status.InProgress },
    include: {
      Student: {
        select: {
          name: true,
        },
      },
    },
  });
  const concluded = await prisma.events.findMany({
    where: { status: Status.Done },
    include: {
      Student: {
        select: {
          name: true,
        },
      },
    },
  });
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: {
      upcoming: JSON.parse(JSON.stringify(upcoming)),
      ongoing: JSON.parse(JSON.stringify(ongoing)),
      concluded: JSON.parse(JSON.stringify(concluded)),
    },
  });
}

export type EventsPageProps = {
  upcoming: Events[];
  ongoing: Events[];
  concluded: Events[];
};

export default function EventsPage({
  upcoming,
  ongoing,
  concluded,
}: EventsPageProps) {
  const [view, setView] = useState('upcoming');

  return (
    <StudentsLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-2xl'>Events</h1>
        <span className='text-sm mt-4 italic text-slate-400'>
          List of all upcoming and concluded events
        </span>

        <div className='mt-4 border border-slate-400 flex rounded w-fit text-sm lg:text-md'>
          <p
            className={`border-r-2 pr-1 p-1 cursor-pointer ${
              view === 'upcoming'
                ? 'bg-purple-500 text-white'
                : 'text-slate-600'
            }`}
            onClick={() => setView('upcoming')}>
            Upcoming
          </p>
          <p
            className={`border-r-2 pr-1 p-1 cursor-pointer ${
              view === 'ongoing' ? 'bg-purple-500 text-white' : 'text-slate-600'
            }`}
            onClick={() => setView('ongoing')}>
            Ongoing
          </p>
          <p
            className={` pr-1 p-1 cursor-pointer ${
              view === 'concluded'
                ? 'bg-purple-500 text-white'
                : 'text-slate-600'
            }`}
            onClick={() => setView('concluded')}>
            Concluded
          </p>
        </div>

        {view === 'upcoming' ? (
          <UpcomingEvents events={upcoming} forAdmin={false} />
        ) : null}
        {view === 'ongoing' ? (
          <OngoingEventsPage events={ongoing} forAdmin={false} />
        ) : null}
        {view === 'concluded' ? (
          <ConcludedEventsPage events={concluded} forAdmin={false} />
        ) : null}

        <div></div>
      </div>
    </StudentsLayout>
  );
}
