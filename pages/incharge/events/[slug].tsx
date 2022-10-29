import { Events, UserRole } from '@prisma/client';
import InchargesLayout from 'components/Layouts/InchargesLayout';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { prisma } from 'lib/prisma';
import { useState } from 'react';
import { Status } from '@prisma/client';

export type EventPageProps = {
  event: Events;
};

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
  return checkUserRoleAndRedirect(context, UserRole.INCHARGE, {
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
    <InchargesLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-2xl'>Events</h1>
        <span className='text-sm mt-4 italic text-slate-400'>
          List of all upcoming and concluded events
        </span>
        <br />
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
              />
            </div>

            <div className='flex flex-col pb-6 mr-8'>
              <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                Event Status :
              </label>
              <select
                className='p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={event.staus}>
                <option>Select Status</option>
                <option value={Status.Upcoming}>Upcoming</option>
                <option value={Status.InProgress}>Ongoing</option>
                <option value={Status.Done}>Concluded</option>
              </select>
            </div>
          </div>

          {event.staus == Status.Done && (
            <div className='flex flex-col pb-6 mr-8'>
              <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                Winner :
              </label>
              <input
                className='w-full p-2 italic pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                required
                onChange={(e) => setBody(e.target.value)}
                readOnly
                defaultValue={
                  //@ts-ignore
                  `${event?.Student.name} of year ${event?.Student.year} section ${event?.Student.section} ${event?.Student.department} department`
                }
              />
            </div>
          )}

          <div className='flex flex-col pb-6 mr-8'>
            <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
              Event Description :
            </label>
            <textarea
              className='w-full h-32 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
              placeholder='Enter regestration link for this event'
              required
              onChange={(e) => setBody(e.target.value)}
              defaultValue={event.body}
            />
          </div>

          <div className='flex flex-wrap'>
            <div className='flex flex-col pb-6 mr-8'>
              <input
                className='mt-2 p-2 w-fit flex items-center text-white text-md font-semibold bg-blue-500 hover:bg-blue-900 rounded'
                type='submit'
                value='+ Update Event'
                required
              />
            </div>

            <div className='mt-2 p-2 h-fit w-fit flex items-center text-white text-md font-semibold bg-red-400 hover:bg-red-700 rounded'>
              - Delete Event
            </div>
          </div>
        </div>
      </div>
    </InchargesLayout>
  );
}
