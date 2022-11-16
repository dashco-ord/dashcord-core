import { Events, Status, UserRole } from '@prisma/client';
import { EventsPageProps } from 'lib/types';
import InchargesLayout from 'components/Layouts/InchargesLayout';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { useEffect, useState } from 'react';
import { prisma } from 'lib/prisma';
import axios from 'axios';
import { useRouter } from 'next/router';
import UpcomingEventsPage from 'components/Events/Upcoming';
import OngoingEventsPage from 'components/Events/Ongoing';
import ConcludedEventsPage from 'components/Events/Concluded';
import Link from 'next/link';
import StatusColourBadge from 'components/StatusColorBadge';
import StringFilterItem from 'components/FilterItems/StringFilterItem';
import { ModifiedEventType } from 'lib/interfaces';

export async function getServerSideProps(context: any) {
  const upcoming = await prisma.events.findMany({
    where: { status: Status.Upcoming },
  });
  const ongoing = await prisma.events.findMany({
    where: { status: Status.InProgress },
  });
  const concluded = await prisma.events.findMany({
    where: { status: Status.Done },
    include: { Student: { select: { name: true, rollNo: true } } },
  });
  return checkUserRoleAndRedirect(context, UserRole.INCHARGE, {
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
  const [title, setTitle] = useState<string>();
  const [link, setLink] = useState<string>();
  const [date, setDate] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [type, setType] = useState<string>();
  const [body, setBody] = useState<string>();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchresults] = useState<Events[]>();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterResults, setFilterResults] = useState<ModifiedEventType[]>();

  const router = useRouter();

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const data = {
      title,
      link,
      date,
      status,
      type,
      body,
    };

    try {
      const res = await axios.post('/api/incharge/events/create', data);
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      alert(error);
    }
  };

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
    <InchargesLayout>
      <div className='w-full h-screen flex justify-center'>
        <div className='w-[40rem] h-[20rem]'>
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
                className={`border-r-2 pr-1 p-1 cursor-pointer ${
                  view === 'concluded'
                    ? 'bg-purple-500 text-white'
                    : 'text-slate-600'
                }`}
                onClick={() => setView('concluded')}>
                Concluded
              </p>
              <p
                className={` pr-1 p-1 cursor-pointer ${
                  view === 'create'
                    ? 'bg-purple-500 text-white'
                    : 'text-slate-600'
                }`}
                onClick={() => setView('create')}>
                Create
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
              forAdmin={true}
            />
          ) : null}
          {view === 'ongoing' ? (
            <OngoingEventsPage
              //@ts-ignore
              events={filterResults ? filterResults : ongoing}
              forAdmin={true}
            />
          ) : null}
          {view === 'concluded' ? (
            <ConcludedEventsPage
              //@ts-ignore
              events={filterResults ? filterResults : concluded}
              forAdmin={true}
            />
          ) : null}

          {view === 'create' ? (
            <div className='mt-4'>
              <h1 className='font-bold text-2xl'>Create Event</h1>
              <form
                className='w-full h-fit bg-white p-4 rounded mt-4'
                onSubmit={handleCreate}>
                <div className='flex flex-wrap'>
                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                      Event Title :
                    </label>
                    <input
                      className='w-fit p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                      type='text'
                      placeholder='Enter title of the event'
                      required
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                      Regestration Link :
                    </label>
                    <input
                      className='w-fit p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                      type='text'
                      placeholder='Enter regestration link for this event'
                      required
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>

                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                      Event Date :
                    </label>
                    <input
                      className='w-fit p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                      type='date'
                      placeholder='Enter regestration link for this event'
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                      Event Status :
                    </label>
                    <select
                      className='p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                      onChange={(e) => setStatus(e.target.value)}>
                      <option>Select Status</option>
                      <option value={Status.Upcoming}>Upcoming</option>
                      <option value={Status.InProgress}>Ongoing</option>
                      <option value={Status.Done}>Concluded</option>
                    </select>
                  </div>

                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                      Event Type :
                    </label>
                    <select
                      className='p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                      onChange={(e) => setType(e.target.value)}>
                      <option>Select Status</option>
                      <option value='sports'>sports</option>
                      <option value='festivals'>festivals</option>
                      <option value='webinars'>webinars</option>
                      <option value='forum'>forum</option>
                      <option value='ieee'>ieee</option>
                    </select>
                  </div>
                </div>

                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                    Event Description :
                  </label>
                  <textarea
                    className='w-full p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                    placeholder='Enter regestration link for this event'
                    required
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>

                <div className='flex flex-col pb-6 mr-8'>
                  <input
                    className='mt-2 p-2 w-fit flex items-center text-white text-md font-semibold bg-blue-500 hover:bg-blue-900 rounded'
                    type='submit'
                    value='+ Create Event'
                    required
                  />
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </InchargesLayout>
  );
}
