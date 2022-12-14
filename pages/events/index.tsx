import { Events, Status, UserRole } from '@prisma/client';
import { EventsPageProps } from 'lib/types';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { useEffect, useState } from 'react';
import { prisma } from 'lib/prisma';
import UpcomingEventsPage from 'components/Events/Upcoming';
import OngoingEventsPage from 'components/Events/Ongoing';
import ConcludedEventsPage from 'components/Events/Concluded';
import axios from 'axios';
import StatusColourBadge from 'components/StatusColorBadge';
import Link from 'next/link';
import { ModifiedEventType } from 'lib/interfaces';
import StringFilterItem from 'components/FilterItems/StringFilterItem';

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

export default function EventsPage({
  upcoming,
  ongoing,
  concluded,
}: EventsPageProps) {
  const [view, setView] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchresults] = useState<Events[]>();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterResults, setFilterResults] = useState<ModifiedEventType[]>();

  async function handleSearch() {
    const res = await axios.post('/api/events/search', { data: searchQuery });
    if (res.status === 200) {
      setSearchresults(res.data);
    }
  }

  useEffect(() => {
    if (searchQuery.length >= 3) {
      handleSearch();
    }
  }, [searchQuery]);

  async function handleFilter() {
    const res = await axios.post('/api/events/filter', {
      data: selectedFilter,
    });
    if (res.status === 200) {
      setFilterResults(JSON.parse(JSON.stringify(res.data)));
    }
  }

  useEffect(() => {
    handleFilter();
  }, [selectedFilter]);

  return (
    <StudentsLayout>
      <div className='min-h-full lg:min-w-[35rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-2xl'>Events</h1>
        <span className='text-sm mt-4 italic text-slate-400'>
          List of all upcoming and concluded events
        </span>

        <div className='flex items-center'>
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
                view === 'ongoing'
                  ? 'bg-purple-500 text-white'
                  : 'text-slate-600'
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
          <div className='mt-4 ml-auto'>
            <input
              type='search'
              className='rounded border border-slate-400 bg-slate-100 px-2'
              placeholder='Search event by name'
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults && (
              <div className='bg-white z-50 border border-slate-400 fixed w-60 rounded mt-1 p-2'>
                {searchResults.map((event) => (
                  <div
                    key={event.id}
                    className='flex border-b border-t py-2 border-slate-400'>
                    <Link href={`/events/${event.id}`}>
                      <a className='text-md font-semibold hover:text-purple-600'>
                        {event.title}
                      </a>
                    </Link>
                    <div
                      className={`ml-auto border rounded-full p-1 text-[0.7rem] ${StatusColourBadge(
                        event.status
                      )}`}>
                      {event.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='mt-3 list-none flex'>
          <StringFilterItem
            name='All'
            label='all'
            onSelect={setSelectedFilter}
            selected={selectedFilter == 'all'}
          />
          <StringFilterItem
            name='Sports'
            label='sports'
            onSelect={setSelectedFilter}
            selected={selectedFilter == 'sports'}
          />
          <StringFilterItem
            name='Webinars'
            label='webinars'
            onSelect={setSelectedFilter}
            selected={selectedFilter == 'webinars'}
          />
          <StringFilterItem
            name='Festivals'
            label='festivals'
            onSelect={setSelectedFilter}
            selected={selectedFilter == 'festivals'}
          />
          <StringFilterItem
            name='Forum'
            label='forum'
            onSelect={setSelectedFilter}
            selected={selectedFilter == 'forum'}
          />
          <StringFilterItem
            name='IEEE'
            label='ieee'
            onSelect={setSelectedFilter}
            selected={selectedFilter == 'ieee'}
          />
        </div>

        {view === 'upcoming' ? (
          <UpcomingEventsPage
            //@ts-ignore
            events={filterResults ? filterResults : upcoming}
            forAdmin={false}
          />
        ) : null}
        {view === 'ongoing' ? (
          <OngoingEventsPage
            //@ts-ignore
            events={filterResults ? filterResults : ongoing}
            forAdmin={false}
          />
        ) : null}
        {view === 'concluded' ? (
          <ConcludedEventsPage
            //@ts-ignore
            events={filterResults ? filterResults : concluded}
            forAdmin={false}
          />
        ) : null}

        <div></div>
      </div>
    </StudentsLayout>
  );
}
