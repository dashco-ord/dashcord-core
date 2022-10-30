import { Events, UserRole } from '@prisma/client';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { prisma } from 'lib/prisma';
import { useState } from 'react';
import { Status } from '@prisma/client';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import Link from 'next/link';
import { EventPageProps } from 'lib/types';
import StatusColourBadge from 'components/StatusColorBadge';

export async function getServerSideProps(context: any) {
  const event = await prisma.events.findUnique({
    where: { id: context.params.slug },
    include: {
      Student: {
        select: {
          name: true,
          department: true,
          year: true,
          section: true,
        },
      },
    },
  });
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: { event: JSON.parse(JSON.stringify(event)) },
  });
}

export default function EventAdminPage({ event }: EventPageProps) {
  const [title, setTitle] = useState<string>();
  const [link, setLink] = useState<string>();
  const [date, setDate] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [body, setBody] = useState<string>();

  return (
    <StudentsLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-2xl'>Events</h1>
        <span className='text-sm mt-4 italic text-slate-400'>
          List of all upcoming and concluded events
        </span>
        <br />

        <Link href='/events'>
          <a className='flex mt-3 items-center text-blue-600 hover:text-blue-800 text-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 mr-1'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
              />
            </svg>
            Back
          </a>
        </Link>

        <div className='mt-5 p-4 bg-white rounded'>
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
                defaultValue={event.title}
                readOnly={true}
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
                defaultValue={event.regLink}
                readOnly={true}
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
                defaultValue={event.date}
                readOnly={true}
              />
            </div>

            <div className='flex flex-col pb-6 mr-8'>
              <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                Event Status :
              </label>
              <div
                className={`${StatusColourBadge(
                  event.status
                )} text-xl mt-1 p-1 border rounded-full text-center font-semibold`}>
                {event.status}
              </div>
            </div>
          </div>

          {event.status == Status.Done && (
            <div className='flex flex-col pb-6 mr-8'>
              <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                Winner :
              </label>
              {event.Student != null ? (
                <input
                  className='w-full p-2 italic pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                  required
                  onChange={(e) => setBody(e.target.value)}
                  readOnly={true}
                  defaultValue={`${event.Student.name} of year ${event.Student.year} section ${event.Student.section} ${event.Student.department} department`}
                />
              ) : (
                <input
                  className='w-full p-2 italic pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                  required
                  readOnly={true}
                  onChange={(e) => setBody(e.target.value)}
                  defaultValue='Yet to Declared'
                />
              )}
            </div>
          )}

          <div className='flex flex-col pb-6 mr-8'>
            <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
              Event Description :
            </label>
            <textarea
              className='w-full h-44 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
              placeholder='Enter regestration link for this event'
              required
              onChange={(e) => setBody(e.target.value)}
              defaultValue={event.body}
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </StudentsLayout>
  );
}
